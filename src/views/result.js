import { escapeHtml, icon } from '../lib/html.js';
import { pick } from '../lib/i18n.js';
import { checklist } from '../content/checklist.js';
import { questions } from '../content/questions.js';
import { scoreCheckup } from '../lib/scoring.js';
import { topBar } from './shared.js';

const LEVEL_KEYS = {
  green: ['levelGreen', 'levelGreenText'],
  amber: ['levelAmber', 'levelAmberText'],
  red: ['levelRed', 'levelRedText'],
};

const byId = (id) => checklist.find((item) => item.id === id);

export function resultView(ctx) {
  const { state, lang, t } = ctx;
  const score = scoreCheckup(questions, state.answers, checklist);
  const [levelKey, levelTextKey] = LEVEL_KEYS[score.level];
  const levelName = t(levelKey);

  const lights = ['red', 'amber', 'green']
    .map((color) => `<span class="light light--${color}${color === score.level ? ' is-on' : ''}"></span>`)
    .join('');

  const pendingSteps = score.pending.map((id, i) => {
    const item = byId(id);
    const first = i === 0;
    return `
      <li>
        <a class="step${first ? ' step--first' : ''}" href="#/checklist?open=${encodeURIComponent(id)}" data-key="step-${escapeHtml(id)}">
          <span class="step__number" aria-hidden="true">${i + 1}</span>
          <span class="step__body">
            ${first ? `<span class="step__flag">${escapeHtml(t('mostImportant'))}</span>` : ''}
            <span class="step__title">${escapeHtml(pick(item.title, lang))}</span>
          </span>
          <span class="step__time">${escapeHtml(t('minutes', { n: item.minutes }))}</span>
        </a>
      </li>`;
  }).join('');

  const doneRows = score.done.map((id) => `
      <li class="done-row">${icon('check', 24, 'icon--green')}<span>${escapeHtml(pick(byId(id).title, lang))}</span></li>`).join('');

  return `
    <div class="screen">
      ${topBar(ctx, { title: t('resultTitle') })}

      <section class="card card--center">
        <div class="traffic" role="img" aria-label="${escapeHtml(t('trafficLight', { level: levelName }))}">${lights}</div>
        <h1 class="result__title" tabindex="-1">${escapeHtml(levelName)}</h1>
        <p class="lead">${escapeHtml(t('resultSafe', { safe: score.safe, total: score.total }))} ${escapeHtml(t(levelTextKey))}</p>
      </section>

      <section class="stack">
        <h2 class="section-title">${escapeHtml(t('nextSteps'))}</h2>
        ${pendingSteps ? `<ol class="steps">${pendingSteps}</ol>` : `<p class="card card--plain">${escapeHtml(t('nothingPending'))}</p>`}
      </section>

      ${doneRows ? `
      <section class="stack">
        <h2 class="section-title">${escapeHtml(t('alreadyDone'))}</h2>
        <ul class="card card--list">${doneRows}</ul>
      </section>` : ''}

      <div class="stack">
        <a class="button" href="#/checklist" data-key="open-checklist">${escapeHtml(t('openChecklist'))}</a>
        <button type="button" class="button button--ghost" data-action="restart" data-key="restart">${escapeHtml(t('repeatCheckup'))}</button>
      </div>
    </div>`;
}
