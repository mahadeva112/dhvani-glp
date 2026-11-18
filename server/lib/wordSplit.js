/**
 * Words in a line, for languages that put spaces between their words and for
 * those that do not (Chinese, Japanese, Thai).
 *
 * Text with spaces splits on them exactly as before, so Hindi, English or
 * French lines come out word for word unchanged. A run of a script written
 * without spaces is cut into words by the platform's word segmenter (the
 * same dictionary Chrome uses to select a word on double-click), with
 * punctuation kept on the word it follows.
 */

/** Letters of scripts written without spaces between words, and the marks that live inside their words. */
const NO_SPACE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}\p{Script=Myanmar}ー々〆〇]/u;

/** Full-width punctuation (、。「」！？…): it sits against the words around it, with no space. */
const WIDE_PUNCTUATION = /[　-〿！-／：-＠［-｀｛-･]/u;

/** Punctuation that opens: it belongs to the word after it. */
const OPENING = /^[「『（〈《【〔“‘(\["']+$/u;

/** Characters a subtitle line counts as two wide: Han, kana, Hangul and full-width forms. */
const WIDE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}　-〿＀-｠￠-￦ー]/u;

const segmenter =
  typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, { granularity: 'word' }) : null;

/** True when `text` holds letters of a script written without spaces. */
export const hasNoSpaceScript = (text) => NO_SPACE.test(String(text ?? ''));

/** One space-free chunk of a no-space script, cut into words with their punctuation. */
const segmentChunk = (chunk) => {
  const words = [];
  let lead = '';
  for (const { segment, isWordLike } of segmenter.segment(chunk)) {
    if (isWordLike) {
      words.push(lead + segment);
      lead = '';
    } else if (OPENING.test(segment) || words.length === 0) lead += segment;
    else words[words.length - 1] += segment;
  }
  if (lead) {
    if (words.length) words[words.length - 1] += lead;
    else words.push(lead);
  }
  return words;
};

/** The words of a line: split on spaces, and runs of Chinese, Japanese or Thai cut into their words. */
export const splitWords = (text) => {
  const words = [];
  for (const chunk of String(text ?? '').trim().split(/\s+/)) {
    if (!chunk) continue;
    if (!segmenter || !NO_SPACE.test(chunk)) words.push(chunk);
    else words.push(...segmentChunk(chunk));
  }
  return words;
};

const squash = (text) => String(text ?? '').replace(/\s+/gu, '');

/**
 * The words of `text`, one for each of its measured words when it still says
 * exactly them: then in their own spelling, so a Chinese or Japanese line
 * keeps the transcriber's cuts rather than the segmenter's. Otherwise as
 * splitWords cuts it.
 */
export const wordsLike = (text, measured) => {
  const words = splitWords(text);
  if (!Array.isArray(measured) || measured.length === 0 || words.length === measured.length) return words;
  const own = measured.map((word) => String(word ?? '').trim());
  return own.every(Boolean) && squash(text) === squash(own.join('')) ? own : words;
};

const lastChar = (text) => {
  const chars = [...String(text ?? '')];
  return chars[chars.length - 1] || '';
};
const firstChar = (text) => [...String(text ?? '')][0] || '';
const tight = (ch) => NO_SPACE.test(ch) || WIDE_PUNCTUATION.test(ch);

/** True when two words are written together, with no space: both sides Chinese, Japanese, Thai or their punctuation. */
export const joinsWithoutSpace = (left, right) => {
  const a = lastChar(left);
  const b = firstChar(right);
  return Boolean(a && b) && tight(a) && tight(b);
};

/** Words back into a line: a space between them, except where the script writes them together. */
export const joinWords = (words) => {
  let text = '';
  for (const word of words) {
    const w = String(word ?? '');
    if (!w) continue;
    text = text && !joinsWithoutSpace(text, w) ? `${text} ${w}` : text + w;
  }
  return text;
};

/** How wide a line reads on screen, in characters: Chinese, Japanese and Korean characters count two. */
export const textWidth = (text) => {
  let width = 0;
  for (const ch of String(text ?? '')) width += WIDE.test(ch) ? 2 : 1;
  return width;
};
