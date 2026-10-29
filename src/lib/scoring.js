// Pure functions for the check-up result and checklist progress.
// No DOM or storage here, so they are easy to test.

export const ANSWERS = ['yes', 'no', 'unsure'];

/** True when the answer means the person is already protected. */
export function isSafe(question, answer) {
  return answer === question.safeAnswer;
}

/** green (80%+ safe), amber (50%+), red (below 50%). */
export function levelFor(safe, total) {
  if (total === 0) return 'red';
  const ratio = safe / total;
  if (ratio >= 0.8) return 'green';
  if (ratio >= 0.5) return 'amber';
  return 'red';
}

/** Index of the first unanswered question, or questions.length when all are answered. */
export function nextUnanswered(questions, answers) {
  const index = questions.findIndex((q) => !ANSWERS.includes(answers[q.id]));
  return index === -1 ? questions.length : index;
}

/**
 * Summarises the check-up.
 * pending and done hold checklist item ids, in checklist order.
 * An item is pending when any question linked to it is not answered safely.
 */
export function scoreCheckup(questions, answers, checklist) {
  const answered = questions.filter((q) => ANSWERS.includes(answers[q.id]));
  const safe = answered.filter((q) => isSafe(q, answers[q.id])).length;
  const total = questions.length;

  const status = {};
  for (const q of answered) {
    const ok = isSafe(q, answers[q.id]);
    status[q.item] = status[q.item] === false ? false : ok;
  }

  const order = checklist.map((item) => item.id);
  const pending = order.filter((id) => status[id] === false);
  const done = order.filter((id) => status[id] === true);

  return {
    answered: answered.length,
    total,
    safe,
    complete: answered.length === total,
    level: levelFor(safe, total),
    pending,
    done,
  };
}

/**
 * What the check-up says about each checklist item after one answer:
 * true (protected), false (not yet) or undefined (no linked question answered).
 */
export function itemStatusFromAnswers(questions, answers, itemId) {
  const linked = questions.filter((q) => q.item === itemId && ANSWERS.includes(answers[q.id]));
  if (linked.length === 0) return undefined;
  return linked.every((q) => isSafe(q, answers[q.id]));
}

/** How many checklist items are ticked. */
export function checklistProgress(checklist, done) {
  const count = checklist.filter((item) => done[item.id] === true).length;
  return {
    done: count,
    total: checklist.length,
    percent: checklist.length === 0 ? 0 : Math.round((count / checklist.length) * 100),
  };
}
