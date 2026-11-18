import type { Voice } from './elevenLabsService';
import { LANGUAGES } from '../server/lib/languages.js';

/**
 * Which ElevenLabs voices to suggest for an Indian-language dub.
 *
 * A voice counts as Indian by its own labels (an Indian accent, or an Indian
 * language as its language) or, for clones that carry no labels, by its name
 * ("Hindi dub 2"). The languages ElevenLabs has verified a voice in are not
 * used for this: large multilingual voices are verified in Hindi and Tamil
 * alongside twenty others, which would make half the library "Indian". They
 * only help rank voices for the dub language.
 */

/** ISO 639 codes ElevenLabs uses for a voice's language, by DHVANI's language name. */
export const INDIAN_LANGUAGE_CODES: Record<string, string> = {
  Hindi: 'hi',
  Bengali: 'bn',
  Tamil: 'ta',
  Telugu: 'te',
  Marathi: 'mr',
  Gujarati: 'gu',
  Kannada: 'kn',
  Malayalam: 'ml',
  Punjabi: 'pa',
  Odia: 'or',
  Assamese: 'as',
  Nepali: 'ne',
  Sanskrit: 'sa',
  Sindhi: 'sd',
  Konkani: 'kok',
  Maithili: 'mai',
};

const INDIAN_CODES = new Set(Object.values(INDIAN_LANGUAGE_CODES));

/** True for a dub in one of the Indian languages, where the voice list starts on Indian voices. */
export const isIndianLanguage = (languageName: string): boolean => languageName in INDIAN_LANGUAGE_CODES;

/** Codes ElevenLabs may give a voice's language in, past the base of the language's BCP-47 tag. */
const EXTRA_CODES: Record<string, string[]> = {
  Filipino: ['tl'],
  Hebrew: ['iw'],
  Kurdish: ['ku', 'kur'],
};

/** The codes a voice's language label may carry for a dub language, or none for a language DHVANI does not know. */
const codesOf = (languageName: string): string[] => {
  const indian = INDIAN_LANGUAGE_CODES[languageName];
  if (indian) return [indian];
  const entry = (LANGUAGES as { name: string; bcp47: string }[]).find((l) => l.name === languageName);
  const base = baseCode(entry?.bcp47);
  return base ? [base, ...(EXTRA_CODES[languageName] || [])] : [];
};

/** The words a voice's name may use for a language: "Simplified Chinese" voices are named "Chinese" or "Mandarin". */
const nameWords = (languageName: string): string[] =>
  /Chinese$/.test(languageName) ? ['Chinese', 'Mandarin'] : [languageName];

const INDIAN_WORDS =
  'indian|hindi|hinglish|desi|bengali|bangla|tamil|telugu|marathi|gujarati|kannada|malayalam|punjabi|odia|assamese';
const INDIAN_ACCENT = new RegExp(INDIAN_WORDS, 'i');
const INDIAN_NAME = new RegExp(`\\b(${INDIAN_WORDS})\\b`, 'i');

type VoiceLike = Pick<Voice, 'name' | 'labels' | 'verified_languages'>;

const baseCode = (code?: string | null) => String(code || '').toLowerCase().split(/[-_]/)[0];

/** Accents that mark a voice as not Indian, whatever its name says. */
const NON_INDIAN_ACCENT = /american|british|latin|australian|canadian|irish|scottish|african|spanish|mexican|argentin/i;

export const isIndianVoice = (voice: VoiceLike): boolean => {
  const labels = voice.labels || {};
  const accent = labels.accent || '';
  if (INDIAN_ACCENT.test(accent) || INDIAN_CODES.has(baseCode(labels.language))) return true;
  // The name only decides for voices whose labels don't say otherwise.
  return !NON_INDIAN_ACCENT.test(accent) && INDIAN_NAME.test(voice.name || '');
};

/**
 * How well a voice fits a dub language: 2 if it is the voice's own language
 * (by label, or named for it), 1 if ElevenLabs has verified it in the
 * language, 0 otherwise.
 */
export const languageFit = (voice: VoiceLike, languageName: string): number => {
  const codes = codesOf(languageName);
  if (!codes.length) return 0;
  if (codes.includes(baseCode(voice.labels?.language))) return 2;
  if (nameWords(languageName).some((word) => new RegExp(`\\b${word}\\b`, 'i').test(voice.name || ''))) return 2;
  return (voice.verified_languages || []).some((l) => codes.includes(baseCode(l.language))) ? 1 : 0;
};
