import test from 'node:test';
import assert from 'node:assert/strict';
import { LANGUAGES, isRtlLanguage, scriptOf, toBcp47, toDisplayName, toIsoCode, writesWithoutSpaces } from './languages.js';

test('every language has a unique name, and a code and tag past Auto Detect', () => {
  const names = LANGUAGES.map((l) => l.name);
  assert.equal(new Set(names).size, names.length);
  for (const lang of LANGUAGES.slice(1)) {
    assert.match(lang.iso, /^[a-z]{3}$/, lang.name);
    assert.match(lang.bcp47, /^[a-z]{2,3}-[A-Z]{2}$/, lang.name);
  }
});

test('the global languages map to Scribe codes and back', () => {
  for (const [name, iso] of [
    ['Bulgarian', 'bul'], ['Czech', 'ces'], ['Filipino', 'fil'], ['Georgian', 'kat'], ['Greek', 'ell'], ['Hebrew', 'heb'],
    ['Hungarian', 'hun'], ['Latvian', 'lav'], ['Lithuanian', 'lit'], ['Macedonian', 'mkd'], ['Persian', 'fas'],
    ['Romanian', 'ron'], ['Croatian', 'hrv'], ['Serbian', 'srp'], ['Kurdish', 'kur'], ['Slovak', 'slk'], ['Slovenian', 'slv'], ['Ukrainian', 'ukr'],
  ]) {
    assert.equal(toIsoCode(name), iso, name);
    assert.equal(toDisplayName(iso), name, iso);
  }
  assert.equal(toDisplayName('he'), 'Hebrew');
  assert.equal(toDisplayName('hr'), 'Croatian');
  assert.equal(toDisplayName('sr'), 'Serbian');
  assert.match(scriptOf('Serbian'), /Latin/);
  assert.equal(toDisplayName('ckb'), 'Kurdish');
  assert.equal(toDisplayName('ku'), 'Kurdish');
  assert.match(scriptOf('Kurdish'), /Sorani/);
  assert.equal(toDisplayName('fa'), 'Persian');
  assert.equal(toDisplayName('tgl'), 'Filipino');
  assert.equal(toDisplayName('xyz', 'Unknown'), 'Unknown');
});

test('Chinese is one voice in two scripts: Simplified answers for Scribe, Traditional for Taiwan', () => {
  assert.equal(toIsoCode('Simplified Chinese'), 'zho');
  assert.equal(toIsoCode('Traditional Chinese'), 'zho');
  assert.equal(toIsoCode('Chinese'), 'zho');
  assert.equal(toDisplayName('zho'), 'Simplified Chinese');
  assert.equal(toDisplayName('cmn'), 'Simplified Chinese');
  assert.equal(toDisplayName('zh-TW'), 'Traditional Chinese');
  assert.equal(toBcp47('Traditional Chinese'), 'zh-TW');
  assert.match(scriptOf('Traditional Chinese'), /Traditional/);
  assert.match(scriptOf('Simplified Chinese'), /Simplified/);
});

test('right-to-left and no-space languages are marked', () => {
  for (const name of ['Arabic', 'Hebrew', 'Persian', 'Kurdish']) assert.ok(isRtlLanguage(name), name);
  for (const name of ['English', 'Hindi', 'Greek']) assert.ok(!isRtlLanguage(name), name);
  for (const name of ['Japanese', 'Simplified Chinese', 'Traditional Chinese', 'Thai']) assert.ok(writesWithoutSpaces(name), name);
  assert.ok(!writesWithoutSpaces('Korean'));
});
