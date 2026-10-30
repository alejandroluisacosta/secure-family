import { escapeHtml, icon } from '../lib/html.js';
import { LANGUAGES } from '../lib/i18n.js';

export function languageToggle(ctx) {
  const buttons = LANGUAGES.map((lang) => {
    const active = lang === ctx.lang;
    return `<button type="button" class="lang__option${active ? ' is-active' : ''}" data-action="lang" data-lang="${lang}" data-key="lang-${lang}" aria-pressed="${active}" lang="${lang}">${lang.toUpperCase()}</button>`;
  }).join('');
  return `<div class="lang" role="group" aria-label="${escapeHtml(ctx.t('language'))}">${buttons}</div>`;
}

/** Top bar for inner screens: back link, centred title, language switch. */
export function topBar(ctx, { title, backHref = '#/', backLabel }) {
  return `
    <header class="topbar">
      <a class="icon-button" href="${backHref}" aria-label="${escapeHtml(backLabel || ctx.t('back'))}" data-key="back">${icon('back')}</a>
      <span class="topbar__title">${escapeHtml(title)}</span>
      ${languageToggle(ctx)}
    </header>`;
}

export function progressBar({ percent, label, onDark = false, valueNow, valueMax, fromPercent }) {
  const aria = label
    ? ` role="progressbar" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="${valueMax}" aria-valuenow="${valueNow}"`
    : ' aria-hidden="true"';
  return `<div class="progress${onDark ? ' progress--dark' : ''}"${aria}><div class="progress__fill${fromPercent != null ? ' progress__fill--grow' : ''}" style="width: ${Number(percent) || 0}%${fromPercent != null ? `; --from: ${Number(fromPercent) || 0}%` : ''}"></div></div>`;
}

export function privacyNote(ctx) {
  return `<p class="privacy">${icon('lock', 20)}<span>${escapeHtml(ctx.t('privacy'))}</span></p>`;
}
