/* eslint-disable import/prefer-default-export */
import { locales } from '../config';
import { setLocale } from './intl';

export function setLocaleByIP() {
  return async(dispatch, getState, {graphqlRequest}) => {
        try {
            const resp = await fetch('https://ipapi.co/json', {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const values = await resp.json();

            // let match = document.cookie.match(/(^| )lang=([^;]+)/);

            // if (!match) {

            const countryLanguages = values.languages.split(",");
            let localeFound = false;
            for (let i = 0; i < countryLanguages.length; i++) {
              for (let j = 0; j < locales.length ; j++) {
                if (locales[j].substring(0, 2) == countryLanguages[i].substring(0, 2)) {
                  dispatch(setLocale({locale: locales[j]}));
                  localeFound = true;
                  break;
                }
              }
              if (localeFound) break;
            }

            if (!localeFound) dispatch(setLocale({locale: "en-US"}));

            if (values.status) {
                return true;
            }
          // }
        } catch (error) {
            console.log('error', error);
        }

    };
  }
  