import detectBrowserLanguage from 'detect-browser-language';
import messages from './messages';

/**
 * Returns the language code for one of the languages for which translations
 * exist, based on the browser's language setting.
 */
export const getLanguage = () => {
  let browserLang = detectBrowserLanguage().substring(0, 2).toLowerCase();
  let translations = Object.keys(messages);
  if (translations.indexOf(browserLang) >= 0) {
    return browserLang;
  }
  return 'en'
}

export const getParsedFromLocalStorage = (name) => {
	let raw = localStorage.getItem(name);
	return JSON.parse(raw);
}
