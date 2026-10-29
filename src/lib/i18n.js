import { ui } from '../content/ui.js';

export const LANGUAGES = ['en', 'es'];

/** Spanish if the browser prefers it, English otherwise. */
export function detectLanguage(navigatorLanguages = []) {
  const first = (navigatorLanguages[0] || '').toLowerCase();
  return first.startsWith('es') ? 'es' : 'en';
}

/** Interface text by key, with {placeholders} filled in. */
export function t(lang, key, vars = {}) {
  const text = ui[lang]?.[key] ?? ui.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}

/** Picks the right language from a content field like { en, es }. */
export function pick(field, lang) {
  if (field == null) return '';
  return field[lang] ?? field.en;
}
