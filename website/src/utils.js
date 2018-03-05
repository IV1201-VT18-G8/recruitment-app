import detectBrowserLanguage from 'detect-browser-language';
import messages from './messages';

export const getLanguage = () => {
  let browserLang = detectBrowserLanguage().substring(0, 2).toLowerCase();
  let translations = Object.keys(messages);
  if (translations.indexOf(browserLang) >= 0) {
    return browserLang;
  }
  return 'en'
}
