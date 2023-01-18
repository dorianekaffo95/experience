// const args = process.argv.slice(2);
// autoTranslate(args).catch(console.error);
import deeplTranslate from 'deepl';
import fs from 'fs';
import {
  join
} from 'path';
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
let concernedKeys = [];

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


async function updateMessages(locale, messages, parsedLocaleData) {

  const relatedKeys = [...concernedKeys];

  let translatedText = '';
  try {
    const tResponse = await deeplTranslate({
      free_api: true,
      text: addNoTranslate(translationText),
      // source_lang: "EN",
      target_lang: getLocaleCode(locale),
      tag_handling: ['xml'],
      ignore_tags: ['x'],
      auth_key: translations.deepl.auth_key,
    });

    translatedText = removeNoTranslate(tResponse.data.translations[0].text);
  } catch (e) {
    translatedText = removeNoTranslate(translatedText);
  }

  const localeData = parsedLocaleData.map((data) => {
    if (relatedKeys.includes(data.id)) {

      relatedKeys.splice(relatedKeys.indexOf(data.id), 1);

      const regex = new RegExp(`<${data.id}>(.*?)</${data.id}>`);
      const matches = regex.exec(translatedText);

      if (matches != null && matches.length >= 2) {
        return {
          ...data,
          message: matches[1]
        };
      }

    }

    return data;
  });


  messages.filter((msg) => relatedKeys.includes(msg.id)).forEach((msg) => {
    // if (concernedKeys.includes(msg.id)) {
    localeData.push(msg);
    // }
  });

  await writeFile(join(CONTENT_DIR, `${locale}.json`), JSON.stringify(localeData));
}

/**
 * Extract react-intl messages and write it to src/messages/_default.json
 * Also extends known localizations
 */
async function translate(messages) {

  translationText = "";
  let localeData;
  concernedKeys = messages.filter(msg => msg.defaultMessage && msg.message).map((msg) => msg.id);

  messages.forEach((msg) => {
    if (concernedKeys.includes(msg.id)) {
      translationText += `<${msg.id}>${msg.message}</${msg.id}>`;
    }
  });

  locales.forEach(async (locale) => {
    localeData = await readFile(join(CONTENT_DIR, `${locale}.json`));
    const parsedLocaleData = JSON.parse(localeData);

    await updateMessages(locale, messages, parsedLocaleData);
  });

}

export default translate;