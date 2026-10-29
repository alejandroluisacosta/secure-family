import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  checklistProgress,
  isSafe,
  itemStatusFromAnswers,
  levelFor,
  nextUnanswered,
  scoreCheckup,
} from '../src/lib/scoring.js';

const checklist = [{ id: 'email' }, { id: 'manager' }, { id: 'lock' }];
const questions = [
  { id: 'q1', item: 'email', safeAnswer: 'yes' },
  { id: 'q2', item: 'manager', safeAnswer: 'no' },
  { id: 'q3', item: 'lock', safeAnswer: 'yes' },
];

test('isSafe follows each question\'s safe answer', () => {
  assert.equal(isSafe(questions[0], 'yes'), true);
  assert.equal(isSafe(questions[1], 'no'), true);
  assert.equal(isSafe(questions[1], 'yes'), false);
  assert.equal(isSafe(questions[0], 'unsure'), false);
});

test('levelFor sets the traffic light thresholds', () => {
  assert.equal(levelFor(10, 10), 'green');
  assert.equal(levelFor(8, 10), 'green');
  assert.equal(levelFor(7, 10), 'amber');
  assert.equal(levelFor(5, 10), 'amber');
  assert.equal(levelFor(4, 10), 'red');
  assert.equal(levelFor(0, 0), 'red');
});

test('nextUnanswered finds the first gap', () => {
  assert.equal(nextUnanswered(questions, {}), 0);
  assert.equal(nextUnanswered(questions, { q1: 'yes' }), 1);
  assert.equal(nextUnanswered(questions, { q1: 'yes', q2: 'no', q3: 'unsure' }), 3);
  assert.equal(nextUnanswered(questions, { q1: 'maybe' }), 0, 'ignores invalid answers');
});

test('scoreCheckup splits pending and done steps in checklist order', () => {
  const result = scoreCheckup(questions, { q1: 'no', q2: 'no', q3: 'unsure' }, checklist);
  assert.equal(result.safe, 1);
  assert.equal(result.total, 3);
  assert.equal(result.complete, true);
  assert.deepEqual(result.pending, ['email', 'lock']);
  assert.deepEqual(result.done, ['manager']);
});

test('one unsafe answer keeps a shared step pending', () => {
  const shared = [
    { id: 'a', item: 'email', safeAnswer: 'yes' },
    { id: 'b', item: 'email', safeAnswer: 'yes' },
  ];
  const result = scoreCheckup(shared, { a: 'yes', b: 'no' }, checklist);
  assert.deepEqual(result.pending, ['email']);
  assert.deepEqual(result.done, []);
  assert.equal(itemStatusFromAnswers(shared, { a: 'yes', b: 'no' }, 'email'), false);
  assert.equal(itemStatusFromAnswers(shared, { a: 'yes', b: 'yes' }, 'email'), true);
  assert.equal(itemStatusFromAnswers(shared, {}, 'email'), undefined);
});

test('checklistProgress counts ticked steps only', () => {
  assert.deepEqual(checklistProgress(checklist, { email: true, lock: false }), { done: 1, total: 3, percent: 33 });
  assert.deepEqual(checklistProgress([], {}), { done: 0, total: 0, percent: 0 });
});
