import { escapeHtml, icon } from '../lib/html.js';
import { pick } from '../lib/i18n.js';
import { checklist } from '../content/checklist.js';
import { questions } from '../content/questions.js';
import { checklistProgress, scoreCheckup } from '../lib/scoring.js';
import { progressBar, topBar } from './shared.js';

const SECTIONS = [
  ['important', 'sectionImportant'],
  ['next', 'sectionNext'],
  ['extra', 'sectionExtra'],
];

/** Which guide tab to show: the one picked before, then the person's device, then the first. */
export function activeTab(item, state) {
  const tabs = item.guide.tabs || [];
  const ids = tabs.map((tab) => tab.id);
  if (ids.includes(state.tabs[item.id])) return state.tabs[item.id];
  if (state.device && ids.includes(state.device)) return state.device;
  return ids[0];
}

function guideHtml(item, ctx) {
  const { state, lang, t } = ctx;
  let steps = item.guide.steps;
  let tabsHtml = '';

  if (item.guide.tabs) {
    const current = activeTab(item, state);
    tabsHtml = `
      <div class="tabs" role="group" aria-label="${escapeHtml(t('chooseGuide'))}">
        ${item.guide.tabs.map((tab) => `
          <button type="button" class="tabs__option${tab.id === current ? ' is-active' : ''}" data-action="tab" data-id="${escapeHtml(item.id)}" data-tab="${escapeHtml(tab.id)}" data-key="tab-${escapeHtml(item.id)}-${escapeHtml(tab.id)}" aria-pressed="${tab.id === current}">${escapeHtml(pick(tab.label, lang))}</button>`).join('')}
      </div>`;
    steps = item.guide.tabs.find((tab) => tab.id === current).steps;
  }

  const stepList = pick(steps, lang)
    .map((text, i) => `<li class="guide-step"><span class="guide-step__n" aria-hidden="true">${i + 1}</span><span>${escapeHtml(text)}</span></li>`)
    .join('');

  return `${tabsHtml}<ol class="guide">${stepList}</ol>`;
}

function itemHtml(item, ctx, recommended) {
  const { state, lang, t } = ctx;
  const done = state.done[item.id] === true;
  const open = state.open === item.id;
  const title = pick(item.title, lang);
  const panelId = `panel-${item.id}`;

  const panel = open ? `
      <div class="item__panel" id="${panelId}">
        <p class="item__why">${escapeHtml(pick(item.why, lang))}</p>
        ${guideHtml(item, ctx)}
        ${item.tip ? `<p class="tip">${icon('bulb', 20, 'icon--accent')}<span><strong>${escapeHtml(t('tip'))}:</strong> ${escapeHtml(pick(item.tip, lang))}</span></p>` : ''}
        ${item.link ? `<a class="link-button" href="${escapeHtml(item.link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(pick(item.link.label, lang))} ${icon('external', 18)}</a>` : ''}
        <p class="item__note">${escapeHtml(t('menuNote'))}</p>
        <button type="button" class="button" data-action="toggle-done" data-id="${escapeHtml(item.id)}" data-key="mark-${escapeHtml(item.id)}">${escapeHtml(done ? t('markUndone') : t('markDone'))}</button>
      </div>` : '';

  return `
    <li class="item${open ? ' is-open' : ''}${done ? ' is-done' : ''}" id="item-${escapeHtml(item.id)}">
      <div class="item__row">
        <button type="button" class="check" data-action="toggle-done" data-id="${escapeHtml(item.id)}" data-key="check-${escapeHtml(item.id)}" aria-pressed="${done}" aria-label="${escapeHtml(t(done ? 'markUndoneLabel' : 'markDoneLabel', { title }))}">
          <span class="check__box">${done ? icon('check', 16) : ''}</span>
        </button>
        <button type="button" class="item__toggle" data-action="toggle-open" data-id="${escapeHtml(item.id)}" data-key="open-${escapeHtml(item.id)}" aria-expanded="${open}"${open ? ` aria-controls="${panelId}"` : ''}>
          <span class="item__text">
            <span class="item__title">${escapeHtml(title)}</span>
            <span class="item__meta">
              ${escapeHtml(t('minutes', { n: item.minutes }))}
              ${recommended && !done ? `<span class="badge">${escapeHtml(t('forYou'))}</span>` : ''}
            </span>
          </span>
          ${icon('chevronDown', 20, 'icon--accent item__chevron')}
        </button>
      </div>
      ${panel}
    </li>`;
}

export function checklistView(ctx) {
  const { state, t } = ctx;
  const progress = checklistProgress(checklist, state.done);
  const recommended = new Set(scoreCheckup(questions, state.answers, checklist).pending);

  const sections = SECTIONS.map(([key, labelKey]) => {
    const items = checklist.filter((item) => item.section === key);
    if (items.length === 0) return '';
    return `
      <section class="stack">
        <h2 class="section-title">${escapeHtml(t(labelKey))}</h2>
        <ul class="items">${items.map((item) => itemHtml(item, ctx, recommended.has(item.id))).join('')}</ul>
      </section>`;
  }).join('');

  return `
    <div class="screen">
      ${topBar(ctx, { title: t('checklistTitle') })}
      <h1 class="visually-hidden" tabindex="-1">${escapeHtml(t('checklistTitle'))}</h1>

      <div class="card card--dark">
        <span class="kicker">${escapeHtml(t('yourProgress'))}</span>
        <span class="card__title card__title--large" aria-live="polite">${escapeHtml(t('progressSteps', { done: progress.done, total: progress.total }))}</span>
        ${progressBar({ percent: progress.percent, onDark: true })}
        <span class="card__text">${escapeHtml(t('savedHere'))}</span>
      </div>

      ${sections}

      ${state.confirmClear
        ? `<div class="confirm" role="alert">
            <p>${escapeHtml(t('clearConfirm'))}</p>
            <button type="button" class="button" data-action="clear" data-key="clear">${escapeHtml(t('clearYes'))}</button>
            <button type="button" class="text-button" data-action="cancel-clear" data-key="cancel-clear">${escapeHtml(t('clearNo'))}</button>
          </div>`
        : `<button type="button" class="text-button" data-action="clear" data-key="clear">${escapeHtml(t('clearProgress'))}</button>`}
    </div>`;
}
