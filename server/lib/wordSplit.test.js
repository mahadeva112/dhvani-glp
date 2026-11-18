import test from 'node:test';
import assert from 'node:assert/strict';
import { joinWords, joinsWithoutSpace, splitWords, textWidth, wordsLike } from './wordSplit.js';

test('text with spaces splits on them exactly as before', () => {
  for (const line of ['नमस्ते दुनिया, कैसे हो?', 'Bonjour à tous.', 'Привет,  мир!', 'مرحبا بالعالم', '']) {
    assert.deepEqual(splitWords(line), line.trim().split(/\s+/).filter(Boolean), line);
    assert.equal(joinWords(splitWords(line)), line.trim().replace(/\s+/g, ' '), line);
  }
});

test('Chinese, Japanese and Thai are cut into words, punctuation kept on the word before', () => {
  const ja = splitWords('今日はいい天気ですね。');
  assert.ok(ja.length > 1, ja.join('|'));
  assert.equal(ja.join(''), '今日はいい天気ですね。');
  assert.ok(ja[ja.length - 1].endsWith('。'));
  const zh = splitWords('我用iPhone拍照，很好看！');
  assert.ok(zh.includes('iPhone'), zh.join('|'));
  assert.equal(zh.join(''), '我用iPhone拍照，很好看！');
  assert.ok(splitWords('สวัสดีครับ').length > 1);
  // An opening quote goes with the word after it.
  assert.ok(splitWords('「こんにちは」と言った。')[0].startsWith('「'));
});

test('words are joined without a space only between no-space scripts', () => {
  assert.equal(joinWords(['今日', 'は', 'いい', '天気']), '今日はいい天気');
  assert.equal(joinWords(['今日', 'は', 'Apple', 'を']), '今日は Apple を');
  assert.equal(joinWords(['Hello', 'world.']), 'Hello world.');
  assert.ok(joinsWithoutSpace('天気。', '今日'));
  assert.ok(!joinsWithoutSpace('हाँ', 'जी'));
});

test('Chinese, Japanese and Korean characters count two wide', () => {
  assert.equal(textWidth('abc'), 3);
  assert.equal(textWidth('天気'), 4);
  assert.equal(textWidth('안녕'), 4);
  assert.equal(textWidth('नमस्ते'), 'नमस्ते'.length);
});

test('a line that still says its measured words keeps their cuts', () => {
  assert.deepEqual(wordsLike('今日はいい天気', ['今日は', 'いい天気']), ['今日は', 'いい天気']);
  assert.deepEqual(wordsLike('one two', ['one', 'two']), ['one', 'two']);
  // Edited text: cut as the text is now.
  assert.deepEqual(wordsLike('今日は悪い天気', ['今日は', 'いい天気']), splitWords('今日は悪い天気'));
});
