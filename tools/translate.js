// const args = process.argv.slice(2);
// autoTranslate(args).catch(console.error);
import deeplTranslate from 'deepl';
import chokidar from 'chokidar';
import Promise from 'bluebird';
import {
  transform
} from 'babel-core';
import {
  readFile,
  writeFile,
  glob
} from './lib/fs';
import pkg from '../package.json';
import {
  locales,
  translations
} from '../src/config';

let translateOptions;
if (!process.argv.includes('--keyFilename') && process.argv.length > 0) {
  translateOptions = {
    key: Buffer.from(
      "QUl6YVN5QW9mcnlzSzJxeDVkZnlBZnRSNk15RXhwZ0xlVy1rNzlB",
      "base64"
    ).toLocaleString()
  };
} else {
  translateOptions = {
    keyFilename: process.argv[2].split('=')[1]
  };
}

const GLOB_PATTERN = 'src/**/*.{js,jsx}'; // 'src/locale/messages.js';
const posixPath = fileName => fileName.replace(/\\/g, '/');
const fileToMessages = {};
const requestedLocales = [];

let translationText = "";
let messages = {};

async function writeMessages(fileName, msgs) {
  await writeFile(fileName, `${JSON.stringify(msgs, null, 2)}\n`);
}

function addNoTranslate(sourceString) {
  return sourceString
    .replace(/{/g, '<x>')
    .replace(/}/g, "</x>")
    .replace(/&/g, "<x>&</x>");
}

function removeNoTranslate(sourceString) {
  return sourceString
    .replace(/<x>&<\/x>/g, '&')
    .replace(/<x>/g, "{")
    .replace(/<\/x>/g, "}");
}

function getLocaleCode(locale) {
  switch (locale) {
    case 'de':
      return 'DE';
    case 'es':
      return 'ES';
    case 'it-IT':
      return 'IT';
    case 'fr-FR':
      return 'FR';
    case 'pt-PT':
      return 'PT-PT';
    case 'en-US':
    case '_default':
    default:
      return 'EN';
  }
}


// merge messages to source files
async function mergeToFile(locale, toBuild) {
  const fileName = `src/messages/${locale}.json`;
  const originalMessages = {};
  try {
    const oldFile = await readFile(fileName);

    let oldJson;
    try {
      oldJson = JSON.parse(oldFile);
    } catch (err) {
      throw new Error(`Error parsing messages JSON in file ${fileName}`);
    }

    oldJson.forEach((message) => {
      originalMessages[message.id] = message;
      delete originalMessages[message.id].files;
    });
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  let i = 0

  const tResponse = await deeplTranslate({
    free_api: true,
    text: addNoTranslate(translationText),
    source_lang: "EN",
    target_lang: getLocaleCode(locale),
    tag_handling: ['xml'],
    ignore_tags: ['x'],
    auth_key: translations.deepl.auth_key,
  });
  const translatedText = removeNoTranslate(tResponse.data.translations[0].text);

  Object.keys(messages).forEach(async (id) => {
    const newMsg = messages[id];
    originalMessages[id] = originalMessages[id] || {
      id
    };
    const msg = originalMessages[id];

    let tMessage;
    const regex = new RegExp(`<${id}>(.*?)</${id}>`);
    const matches = regex.exec(translatedText); 

    if (matches != null && matches.length >= 2) {
      tMessage = matches[1];
    }

    msg.description = newMsg.description || msg.description;
    msg.defaultMessage = newMsg.defaultMessage || msg.defaultMessage;
    msg.message = tMessage || '';
    msg.files = newMsg.files;
  });

  const result = Object.keys(originalMessages)
    .map(key => originalMessages[key])
    .filter(msg => msg.files || msg.message);

  await writeMessages(fileName, result);

  console.log(`Messages updated: ${fileName}`);

  if (toBuild && locale !== '_default') {
    const buildFileName = `build/messages/${locale}.json`;
    try {
      await writeMessages(buildFileName, result);
      console.log(`Build messages updated: ${buildFileName}`);
    } catch (err) {
      console.error(`Failed to update ${buildFileName}`);
    }
  }
}

// call everytime before updating file!
function mergeMessages() {
  messages = {};
  Object.keys(fileToMessages).forEach((fileName) => {
    fileToMessages[fileName].forEach(async (newMsg) => {
      const message = messages[newMsg.id] || {};

      messages[newMsg.id] = {
        description: newMsg.description || message.description,
        defaultMessage: newMsg.defaultMessage || message.defaultMessage,
        message: newMsg.message || message.message || '',
        files: message.files ? [...message.files, fileName].sort() : [fileName],
      };
    });
  });
}

async function updateMessages(toBuild) {
  mergeMessages();

  Object.keys(messages).forEach((key) => {
    translationText += `<${key}>${messages[key].defaultMessage}</${key}>`;
  });

  await Promise.all(
    locales.map(locale => mergeToFile(locale, toBuild)),
  );
}

/**
 * Extract react-intl messages and write it to src/messages/_default.json
 * Also extends known localizations
 */
async function translate() {
  const compare = (a, b) => {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  };

  const compareMessages = (a, b) => compare(a.id, b.id);

  const processFile = async (fileName) => {

    try {
      const code = await readFile(fileName);
      const posixName = posixPath(fileName);
      const result = transform(code, {
        presets: pkg.babel.presets,
        plugins: ['react-intl'],
      }).metadata['react-intl'];

      if (result.messages && result.messages.length) {
        fileToMessages[posixName] = result.messages.sort(compareMessages);
      } else {
        delete fileToMessages[posixName];
      }
           
    } catch (err) {
      console.error(`extractMessages: In ${fileName}:\n`, err.codeFrame || err);
    }
  };

  // locales
  locales.forEach((locale) => {
    if (process.argv.includes(locale)) {
      requestedLocales.push(locale);
    }
  });

  const files = await glob(GLOB_PATTERN);

  await Promise.all(files.map(processFile));
  await updateMessages(false);


  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch(GLOB_PATTERN, {
      ignoreInitial: true
    });
    watcher.on('changed', async (file) => {
      await processFile(file);
      await updateMessages(true);
    });
  }
}

export default translate;