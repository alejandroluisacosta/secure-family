import { escapeHtml, icon, logo } from '../lib/html.js';
import { checklist } from '../content/checklist.js';
import { questions } from '../content/questions.js';
import { checklistProgress, nextUnanswered } from '../lib/scoring.js';
import { languageToggle, privacyNote, progressBar } from './shared.js';

export function homeView(ctx) {
  const { state, t } = ctx;
  const next = nextUnanswered(questions, state.answers);
  const started = next > 0;
  const complete = next === questions.length;

  let ctaLabel = t('homeStart');
  let ctaHref = '#/checkup/1';
  if (complete) {
    ctaLabel = t('homeSeeResult');
    ctaHref = '#/result';
  } else if (started) {
    ctaLabel = t('homeContinue');
    ctaHref = `#/checkup/${next + 1}`;
  }

  const progress = checklistProgress(checklist, state.done);

  return `
    <div class="screen screen--home">
      <header class="topbar topbar--home">
        ${logo()}
        ${languageToggle(ctx)}
      </header>

      <div class="intro">
        <h1 class="display" tabindex="-1">${escapeHtml(t('homeTitle'))} <span class="accent">${escapeHtml(t('homeTitleAccent'))}</span></h1>
        <p class="lead">${escapeHtml(t('homeSubtitle'))}</p>
      </div>

      <a class="card card--dark card--link" href="${ctaHref}" data-key="cta-checkup">
        <span class="kicker">${escapeHtml(t('homeKicker', { total: questions.length }))}</span>
        <span class="card__title card__title--large">${escapeHtml(t('homeCheckupTitle'))}</span>
        <span class="card__text">${escapeHtml(t('homeCheckupText'))}</span>
        <span class="pill-button">${escapeHtml(ctaLabel)} ${icon('forward', 20)}</span>
      </a>

      <a class="card card--link" href="#/checklist" data-key="cta-checklist">
        <span class="card__row">
          <span class="card__title">${escapeHtml(t('homeChecklist'))}</span>
          ${icon('chevronRight', 22, 'icon--accent')}
        </span>
        <span class="card__text card__text--muted">${escapeHtml(t('homeProgress', { done: progress.done, total: progress.total }))}</span>
        ${progressBar({ percent: progress.percent })}
      </a>

      <div class="card card--dashed">
        <span class="icon-tile">${icon('message', 22)}</span>
        <span class="stack-tight">
          <span class="card__title card__title--small">${escapeHtml(t('homeScamTitle'))}</span>
          <span class="card__text card__text--muted">${escapeHtml(t('homeScamText'))}</span>
        </span>
      </div>

      ${privacyNote(ctx)}
    </div>`;
}
