// Guards the content files, so a typo while editing text can't break the site.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checklist } from '../src/content/checklist.js';
import { questions } from '../src/content/questions.js';
import { ui } from '../src/content/ui.js';

const LANGS = ['en', 'es'];
const hasBothLanguages = (field) => LANGS.every((lang) => typeof field?.[lang] === 'string' && field[lang].trim() !== '');

test('checklist ids are unique and sections are valid', () => {
  const ids = checklist.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const item of checklist) {
    assert.ok(['important', 'next', 'extra'].includes(item.section), item.id);
    assert.ok(Number.isInteger(item.minutes) && item.minutes > 0, item.id);
  }
});

test('every checklist item is written in both languages', () => {
  for (const item of checklist) {
    assert.ok(hasBothLanguages(item.title), `${item.id} title`);
    assert.ok(hasBothLanguages(item.why), `${item.id} why`);
    if (item.tip) assert.ok(hasBothLanguages(item.tip), `${item.id} tip`);
    if (item.link) {
      assert.ok(item.link.url.startsWith('https://'), `${item.id} link`);
      assert.ok(hasBothLanguages(item.link.label), `${item.id} link label`);
    }
  }
});

test('every guide has the same number of steps in each language', () => {
  for (const item of checklist) {
    const stepSets = item.guide.tabs ? item.guide.tabs.map((tab) => tab.steps) : [item.guide.steps];
    assert.ok(stepSets.length > 0, item.id);
    if (item.guide.tabs) {
      const tabIds = item.guide.tabs.map((tab) => tab.id);
      assert.equal(new Set(tabIds).size, tabIds.length, `${item.id} tab ids`);
      for (const tab of item.guide.tabs) assert.ok(hasBothLanguages(tab.label), `${item.id}/${tab.id} label`);
    }
    for (const steps of stepSets) {
      assert.ok(steps.en.length > 0, item.id);
      assert.equal(steps.en.length, steps.es.length, `${item.id} step count`);
    }
  }
});

test('every question points to a real checklist item and is fully translated', () => {
  const itemIds = new Set(checklist.map((item) => item.id));
  const questionIds = questions.map((q) => q.id);
  assert.equal(new Set(questionIds).size, questionIds.length);
  for (const q of questions) {
    assert.ok(itemIds.has(q.item), `${q.id} → ${q.item}`);
    assert.ok(['yes', 'no'].includes(q.safeAnswer), q.id);
    for (const field of ['category', 'text', 'hint', 'why']) {
      assert.ok(hasBothLanguages(q[field]), `${q.id} ${field}`);
    }
  }
});

test('interface text has the same keys in English and Spanish', () => {
  assert.deepEqual(Object.keys(ui.es).sort(), Object.keys(ui.en).sort());
});
