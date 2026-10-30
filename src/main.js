import { questions } from './content/questions.js';
import { checklist } from './content/checklist.js';
import { detectLanguage, t } from './lib/i18n.js';
import { itemStatusFromAnswers } from './lib/scoring.js';
import * as storage from './lib/storage.js';
import { homeView } from './views/home.js';
import { checkupView } from './views/checkup.js';
import { resultView } from './views/result.js';
import { checklistView } from './views/checklist.js';
import { welcomeView } from './views/welcome.js';

const app = document.getElementById('main');

// Saved progress, plus things that only matter during this visit.
let state = storage.load();
// No saved language means a first visit: show the language screen before anything else.
let choosingLanguage = !state.lang;
if (!state.lang) state.lang = detectLanguage(navigator.languages || [navigator.language]);
if (!state.device) state.device = detectDevice(navigator.userAgent);
const session = { open: null, confirmClear: false };
let lastRouteKey = null;

function detectDevice(userAgent = '') {
  if (/android/i.test(userAgent)) return 'android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iphone';
  return null;
}

function persist() {
  storage.save(state);
}

/** '#/checkup/3' → { name: 'checkup', index: 2 }; '#/checklist?open=email' → { name: 'checklist', open: 'email' } */
export function parseRoute(hash) {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query);

  if (parts[0] === 'checkup') {
    const n = Number.parseInt(parts[1], 10);
    const index = Number.isInteger(n) ? Math.min(Math.max(n - 1, 0), questions.length - 1) : 0;
    return { name: 'checkup', index };
  }
  if (parts[0] === 'result') return { name: 'result' };
  if (parts[0] === 'checklist') return { name: 'checklist', open: params.get('open') };
  return { name: 'home' };
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function render() {
  if (choosingLanguage) {
    app.innerHTML = welcomeView();
    document.documentElement.lang = 'en';
    document.title = 'Secure Family';
    app.querySelector('h1')?.focus({ preventScroll: true });
    return;
  }

  const route = parseRoute(location.hash);
  const ctx = {
    state: { ...state, open: session.open, confirmClear: session.confirmClear },
    lang: state.lang,
    t: (key, vars) => t(state.lang, key, vars),
  };

  // A link like #/checklist?open=email opens that step once, then tidies the address.
  let scrollToItem = null;
  if (route.name === 'checklist' && route.open && checklist.some((item) => item.id === route.open)) {
    session.open = route.open;
    ctx.state.open = route.open;
    scrollToItem = route.open;
    history.replaceState(null, '', '#/checklist');
  }

  const focusedKey = document.activeElement?.dataset?.key;

  let html;
  if (route.name === 'checkup') html = checkupView(ctx, route.index);
  else if (route.name === 'result') html = resultView(ctx);
  else if (route.name === 'checklist') html = checklistView(ctx);
  else html = homeView(ctx);

  app.innerHTML = html;
  document.documentElement.lang = state.lang;
  document.title = state.lang === 'es' ? 'Secure Family · Protege a tu familia' : 'Secure Family · Keep your family safe';
  document.querySelector('.skip-link').textContent = t(state.lang, 'skip');

  const routeKey = route.name === 'checkup' ? `checkup-${route.index}` : route.name;
  if (routeKey !== lastRouteKey) session.confirmClear = false;
  const routeChanged = lastRouteKey !== null && routeKey !== lastRouteKey;
  const firstRender = lastRouteKey === null;
  lastRouteKey = routeKey;

  if (scrollToItem) {
    const el = document.getElementById(`item-${scrollToItem}`);
    el?.scrollIntoView({ block: 'start' });
    el?.querySelector('.item__toggle')?.focus({ preventScroll: true });
  } else if (routeChanged) {
    window.scrollTo(0, 0);
    app.querySelector('h1[tabindex="-1"]')?.focus({ preventScroll: true });
  } else if (!firstRender && focusedKey) {
    app.querySelector(`[data-key="${CSS.escape(focusedKey)}"]`)?.focus({ preventScroll: true });
  }
}

const actions = {
  'choose-lang'(el) {
    state.lang = el.dataset.lang === 'es' ? 'es' : 'en';
    choosingLanguage = false;
    persist();
    lastRouteKey = 'welcome'; // so the first real screen moves focus to its heading
    render();
  },

  lang(el) {
    state.lang = el.dataset.lang === 'es' ? 'es' : 'en';
    persist();
    render();
  },

  answer(el) {
    const question = questions.find((q) => q.id === el.dataset.question);
    if (!question) return;
    state.answers[question.id] = el.dataset.value;

    // The answer also ticks or unticks the matching checklist step.
    const status = itemStatusFromAnswers(questions, state.answers, question.item);
    if (status !== undefined) state.done[question.item] = status;
    persist();

    const index = questions.indexOf(question);
    go(index + 1 < questions.length ? `#/checkup/${index + 2}` : '#/result');
  },

  restart() {
    state.answers = {};
    persist();
    go('#/checkup/1');
  },

  'toggle-done'(el) {
    const id = el.dataset.id;
    state.done[id] = !(state.done[id] === true);
    persist();
    render();
  },

  'toggle-open'(el) {
    const id = el.dataset.id;
    session.open = session.open === id ? null : id;
    render();
  },

  tab(el) {
    const { id, tab } = el.dataset;
    state.tabs[id] = tab;
    if (tab === 'iphone' || tab === 'android') state.device = tab;
    persist();
    render();
  },

  // Two taps instead of a browser dialog: clearer for everyone, and dialogs are blocked in some embeds.
  clear() {
    if (!session.confirmClear) {
      session.confirmClear = true;
      render();
      return;
    }
    session.confirmClear = false;
    storage.clear();
    const lang = state.lang;
    state = storage.emptyState();
    state.lang = lang;
    state.device = detectDevice(navigator.userAgent);
    session.open = null;
    go('#/');
  },

  'cancel-clear'() {
    session.confirmClear = false;
    render();
  },
};

app.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el || !app.contains(el)) return;
  actions[el.dataset.action]?.(el);
});

window.addEventListener('hashchange', render);
render();
