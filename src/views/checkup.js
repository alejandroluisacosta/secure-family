import { escapeHtml, icon } from '../lib/html.js';
import { pick } from '../lib/i18n.js';
import { questions } from '../content/questions.js';
import { ANSWERS } from '../lib/scoring.js';
import { progressBar, topBar } from './shared.js';

const ANSWER_KEYS = { yes: 'answerYes', no: 'answerNo', unsure: 'answerUnsure' };

export function checkupView(ctx, index, { intro = false } = {}) {
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
    <div class="screen${intro ? ' is-intro' : ''}">
      ${intro ? `
      <div class="splash" aria-hidden="true">
        <span class="splash__badge">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">
            <path class="splash__shield" pathLength="1" d="M12 3l7 3v5c0 4.6-3 8.1-7 10-4-1.9-7-5.4-7-10V6z"/>
            <path class="splash__check" pathLength="1" d="M8.6 12.2l2.4 2.4 4.6-4.8"/>
          </svg>
        </span>
        <span class="splash__text">${escapeHtml(t('checkupIntro'))}</span>
      </div>` : ''}
      ${topBar(ctx, { title: t('questionOf', { n: index + 1, total }), backHref, backLabel })}
      ${progressBar({
        percent: (index / total) * 100,
        label: t('checkupProgress'),
        valueNow: index,
        valueMax: total,
        fromPercent: (Math.max(index - 1, 0) / total) * 100,
      })}

      <div class="question">
        <span class="chip enter" style="--i: 0">${escapeHtml(pick(question.category, lang))}</span>
        <h1 class="question__text enter" style="--i: 1" tabindex="-1">${escapeHtml(pick(question.text, lang))}</h1>
        <p class="lead enter" style="--i: 2">${escapeHtml(pick(question.hint, lang))}</p>
      </div>

      <div class="answers enter" style="--i: 3" role="group" aria-label="${escapeHtml(pick(question.text, lang))}">${answers}</div>

      <aside class="note enter" style="--i: 4">
        ${icon('info', 24, 'icon--accent')}
        <div class="stack-tight">
          <h2 class="note__title">${escapeHtml(t('whyItMatters'))}</h2>
          <p class="note__text">${escapeHtml(pick(question.why, lang))}</p>
        </div>
      </aside>
    </div>`;
}
