import test from 'node:test';
import assert from 'node:assert/strict';
import { RLM, isMostlyRtl, markRtlLine, markRtlLines, withoutDirectionMark } from './textDirection.js';

test('a mostly right-to-left line is marked, any other is left as it is', () => {
  assert.equal(markRtlLine('iPhone هو هاتف جيد.'), `${RLM}iPhone هو هاتف جيد.`);
  assert.equal(markRtlLine('שלום עולם'), `${RLM}שלום עולם`);
  assert.equal(markRtlLine('Hello world'), 'Hello world');
  assert.equal(markRtlLine('नमस्ते'), 'नमस्ते');
  assert.equal(markRtlLine(`${RLM}سلام`), `${RLM}سلام`);
  assert.equal(markRtlLines('سلام دنیا\nHello'), `${RLM}سلام دنیا\nHello`);
  assert.ok(!isMostlyRtl('Apple and سلام'));
});

test('reading a line back drops the mark it was written with', () => {
  assert.equal(withoutDirectionMark(markRtlLine('שלום עולם')), 'שלום עולם');
  assert.equal(withoutDirectionMark('Hello'), 'Hello');
});
