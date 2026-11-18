/**
 * Right-to-left text (Arabic, Hebrew, Persian, Kurdish Sorani) in subtitle
 * files and text boxes.
 *
 * A player lays a subtitle line out by its first letter: a Hebrew line that
 * opens with "iPhone" or "DHVANI" is laid out left to right, and its full stop
 * and the words after the name land on the wrong side. A right-to-left mark
 * (U+200F, never seen or said) at the start of such a line fixes it in every
 * player. Lines that are mostly left to right are written as they are.
 */

const RTL_LETTER = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Thaana}\p{Script=Nko}]/u;
const LETTER = /\p{L}/u;

/** The right-to-left mark, and its left-to-right twin, as they may start a line. */
export const RLM = '‏';
const DIRECTION_MARKS = /^[‎‏]+/u;

/** True when most of a line's letters are written right to left. */
export const isMostlyRtl = (text) => {
  let rtl = 0;
  let letters = 0;
  for (const ch of String(text ?? '')) {
    if (!LETTER.test(ch)) continue;
    letters += 1;
    if (RTL_LETTER.test(ch)) rtl += 1;
  }
  return letters > 0 && rtl * 2 > letters;
};

/** A subtitle line marked to read right to left when it is mostly right-to-left letters; any other line as it is. */
export const markRtlLine = (line) => {
  const text = String(line ?? '');
  return isMostlyRtl(text) && !text.startsWith(RLM) ? `${RLM}${text}` : text;
};

/** Every line of a subtitle's text marked as markRtlLine does. */
export const markRtlLines = (text) => String(text ?? '').split('\n').map(markRtlLine).join('\n');

/** A line read back from a subtitle file, without the direction mark it was written with. */
export const withoutDirectionMark = (line) => String(line ?? '').replace(DIRECTION_MARKS, '');
