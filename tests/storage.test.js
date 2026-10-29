import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyState, sanitize } from '../src/lib/storage.js';

test('sanitize returns an empty state for junk', () => {
  assert.deepEqual(sanitize(null), emptyState());
  assert.deepEqual(sanitize('hello'), emptyState());
  assert.deepEqual(sanitize([1, 2]), emptyState());
});

test('sanitize keeps only valid values', () => {
  const state = sanitize({
    lang: 'fr',
    device: 'android',
    answers: { q1: 'yes', q2: 'maybe', q3: 'unsure' },
    done: { email: true, lock: 'yes' },
    tabs: { email: 'gmail', lock: 42 },
    extra: '<script>',
  });
  assert.equal(state.lang, null);
  assert.equal(state.device, 'android');
  assert.deepEqual(state.answers, { q1: 'yes', q3: 'unsure' });
  assert.deepEqual(state.done, { email: true });
  assert.deepEqual(state.tabs, { email: 'gmail' });
  assert.equal('extra' in state, false);
});
