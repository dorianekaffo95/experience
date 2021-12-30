// const args = process.argv.slice(2);
// autoTranslate(args).catch(console.error);
import deeplTranslate from 'deepl';
import fs from 'fs';
import { join } from 'path';
import Promise from 'bluebird';
import {
  locales,
  translations
} from '../../src/config';

const CONTENT_DIR = join(__dirname, './messages');

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

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

let translationText = "";
let parsedLocaleData = [];
let concernedKeys = [];

function addNoTranslate(sourceString) {
  return sourceString
    .replace("{", '<x>')
    .replace("}", "</x>");
}

function removeNoTranslate(sourceString) {
  return sourceString
    .replace('<x>', "{")
    .replace("</x>", "}");
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
async function mergeToFile(locale, messages) {

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

  let transMsgs = {};

  messages.forEach((msg) => {
    let tMessage;
    const regex = new RegExp(`<${msg.id}>(.*?)</${msg.id}>`);
    const matches = regex.exec(translatedText);

    if (matches != null && matches.length >= 2) {
      tMessage = matches[1];
    }
    msg.message = tMessage || msg.defaultMessage;
    transMsgs[msg.id] = tMessage || msg.defaultMessage;
  });

    parsedLocaleData.forEach((transObj) => {
        if (transObj && concernedKeys.includes(transObj.id)) {
            transObj.message = transMsgs[transObj.id];
            concernedKeys.splice(concernedKeys.indexOf(transObj.id), 1);
        }
    });

    messages.forEach((msg) => {
        if (concernedKeys.includes(msg.id)) {
            parsedLocaleData.push(msg);
        }
    });

  await writeFile(join(CONTENT_DIR, `${locale}.json`), JSON.stringify(parsedLocaleData));

}

async function updateMessages(locale, messages) {

  messages.forEach((msg) => {
      if (concernedKeys.includes(msg.id)) {
        translationText += `<${msg.id}>${msg.message}</${msg.id}>`;
      }
  });

  await mergeToFile(locale, messages);
}

/**
 * Extract react-intl messages and write it to src/messages/_default.json
 * Also extends known localizations
 */
async function translate(messages) {

    let localeData;
    concernedKeys = messages.filter(msg => msg.defaultMessage && msg.message).map((msg) => msg.id);
    locales.forEach(async (locale) => {
        localeData = await readFile(join(CONTENT_DIR, `${locale}.json`));
        parsedLocaleData = JSON.parse(localeData);

        await updateMessages(locale, messages);
    });

}

export default translate;