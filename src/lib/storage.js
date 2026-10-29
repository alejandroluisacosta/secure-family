// Saves progress in this browser only (localStorage). Nothing leaves the device.
// Every access is wrapped in try/catch: private browsing or blocked storage
// must never break the site, it just stops remembering.

const KEY = 'secure-family:v1';

export function emptyState() {
  return { lang: null, answers: {}, done: {}, tabs: {}, device: null };
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Keeps only the fields and value types we expect, so stale or edited data can't break the app. */
export function sanitize(raw) {
  const state = emptyState();
  if (!isPlainObject(raw)) return state;

  if (raw.lang === 'en' || raw.lang === 'es') state.lang = raw.lang;
  if (typeof raw.device === 'string') state.device = raw.device.slice(0, 32);

  if (isPlainObject(raw.answers)) {
    for (const [id, answer] of Object.entries(raw.answers)) {
      if (['yes', 'no', 'unsure'].includes(answer)) state.answers[id] = answer;
    }
  }
  if (isPlainObject(raw.done)) {
    for (const [id, value] of Object.entries(raw.done)) {
      if (typeof value === 'boolean') state.done[id] = value;
    }
  }
  if (isPlainObject(raw.tabs)) {
    for (const [id, value] of Object.entries(raw.tabs)) {
      if (typeof value === 'string') state.tabs[id] = value.slice(0, 32);
    }
  }
  return state;
}

export function load() {
  try {
    const text = window.localStorage.getItem(KEY);
    return text ? sanitize(JSON.parse(text)) : emptyState();
  } catch {
    return emptyState();
  }
}

export function save(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: the app keeps working for this visit.
  }
}

export function clear() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
