import { escapeHtml, icon } from '../lib/html.js';
import { pick } from '../lib/i18n.js';
import { questions } from '../content/questions.js';
import { ANSWERS } from '../lib/scoring.js';
import { progressBar, topBar } from './shared.js';

const ANSWER_KEYS = { yes: 'answerYes', no: 'answerNo', unsure: 'answerUnsure' };

export function checkupView(ctx, index) {
  const { state, lang, t } = ctx;
  const question = questions[index];
  const total = questions.length;
  const current = state.answers[question.id];

  const backHref = index === 0 ? '#/' : `#/checkup/${index}`;
  const backLabel = index === 0 ? t('home') : t('previous');

  const answers = ANSWERS.map((answer) => {
    const selected = current === answer;
    return `
      <button type="button" class="answer${selected ? ' is-selected' : ''}" data-action="answer" data-question="${escapeHtml(question.id)}" data-value="${answer}" data-key="answer-${answer}" aria-pressed="${selected}">
        <span>${escapeHtml(t(ANSWER_KEYS[answer]))}</span>
        ${selected ? icon('check', 22) : ''}
      </button>`;
  }).join('');

  return `
    <div class="screen">
      ${topBar(ctx, { title: t('questionOf', { n: index + 1, total }), backHref, backLabel })}
      ${progressBar({
        percent: (index / total) * 100,
        label: t('checkupProgress'),
        valueNow: index,
        valueMax: total,
      })}

      <div class="question">
        <span class="chip">${escapeHtml(pick(question.category, lang))}</span>
        <h1 class="question__text" tabindex="-1">${escapeHtml(pick(question.text, lang))}</h1>
        <p class="lead">${escapeHtml(pick(question.hint, lang))}</p>
      </div>

      <div class="answers" role="group" aria-label="${escapeHtml(pick(question.text, lang))}">${answers}</div>

      <aside class="note">
        ${icon('info', 24, 'icon--accent')}
        <div class="stack-tight">
          <h2 class="note__title">${escapeHtml(t('whyItMatters'))}</h2>
          <p class="note__text">${escapeHtml(pick(question.why, lang))}</p>
        </div>
      </aside>
    </div>`;
}
