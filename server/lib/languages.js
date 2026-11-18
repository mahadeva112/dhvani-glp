/**
 * Shared language registry.
 *
 * The UI speaks in display names ("Bengali"); ElevenLabs Scribe wants ISO-639
 * codes. This table is the single place that maps between the two, plus the
 * BCP-47 tags used when generating SSML.
 */
export const LANGUAGES = [
  { name: 'Auto Detect', iso: '', bcp47: '' },
  { name: 'English', iso: 'eng', bcp47: 'en-US' },
  { name: 'Assamese', iso: 'asm', bcp47: 'as-IN', script: 'Assamese (Bengali-Assamese, with ৰ and ৱ)' },
  { name: 'Bengali', iso: 'ben', bcp47: 'bn-IN', script: 'Bengali' },
  { name: 'Bodo', iso: 'brx', bcp47: 'brx-IN', script: 'Devanagari' },
  { name: 'Dogri', iso: 'doi', bcp47: 'doi-IN', script: 'Devanagari' },
  { name: 'Gujarati', iso: 'guj', bcp47: 'gu-IN', script: 'Gujarati' },
  { name: 'Hindi', iso: 'hin', bcp47: 'hi-IN', script: 'Devanagari' },
  { name: 'Kannada', iso: 'kan', bcp47: 'kn-IN', script: 'Kannada' },
  { name: 'Kashmiri', iso: 'kas', bcp47: 'ks-IN', script: 'Perso-Arabic' },
  { name: 'Konkani', iso: 'kok', bcp47: 'kok-IN', script: 'Devanagari' },
  { name: 'Maithili', iso: 'mai', bcp47: 'mai-IN', script: 'Devanagari' },
  { name: 'Malayalam', iso: 'mal', bcp47: 'ml-IN', script: 'Malayalam' },
  { name: 'Manipuri', iso: 'mni', bcp47: 'mni-IN', script: 'Meitei Mayek' },
  { name: 'Marathi', iso: 'mar', bcp47: 'mr-IN', script: 'Devanagari' },
  { name: 'Nepali', iso: 'nep', bcp47: 'ne-NP', script: 'Devanagari' },
  { name: 'Odia', iso: 'ori', bcp47: 'or-IN', script: 'Odia' },
  { name: 'Punjabi', iso: 'pan', bcp47: 'pa-IN', script: 'Gurmukhi' },
  { name: 'Sanskrit', iso: 'san', bcp47: 'sa-IN', script: 'Devanagari' },
  { name: 'Santali', iso: 'sat', bcp47: 'sat-IN', script: 'Ol Chiki' },
  { name: 'Sindhi', iso: 'snd', bcp47: 'sd-IN', script: 'Perso-Arabic' },
  { name: 'Tamil', iso: 'tam', bcp47: 'ta-IN', script: 'Tamil' },
  { name: 'Telugu', iso: 'tel', bcp47: 'te-IN', script: 'Telugu' },
  { name: 'Arabic', iso: 'ara', bcp47: 'ar-SA', script: 'Arabic', rtl: true },
  { name: 'Bulgarian', iso: 'bul', bcp47: 'bg-BG', script: 'Cyrillic' },
  { name: 'Croatian', iso: 'hrv', bcp47: 'hr-HR', script: 'Latin (Croatian alphabet)' },
  { name: 'Czech', iso: 'ces', bcp47: 'cs-CZ' },
  { name: 'Dutch', iso: 'nld', bcp47: 'nl-NL' },
  { name: 'Filipino', iso: 'fil', bcp47: 'fil-PH' },
  { name: 'French', iso: 'fra', bcp47: 'fr-FR' },
  { name: 'Georgian', iso: 'kat', bcp47: 'ka-GE', script: 'Georgian (Mkhedruli)' },
  { name: 'German', iso: 'deu', bcp47: 'de-DE' },
  { name: 'Greek', iso: 'ell', bcp47: 'el-GR', script: 'Greek' },
  { name: 'Hebrew', iso: 'heb', bcp47: 'he-IL', script: 'Hebrew', rtl: true },
  { name: 'Hungarian', iso: 'hun', bcp47: 'hu-HU' },
  { name: 'Indonesian', iso: 'ind', bcp47: 'id-ID' },
  { name: 'Italian', iso: 'ita', bcp47: 'it-IT' },
  { name: 'Japanese', iso: 'jpn', bcp47: 'ja-JP', noSpaces: true },
  { name: 'Korean', iso: 'kor', bcp47: 'ko-KR', script: 'Hangul' },
  // Sorani (Central Kurdish): the only Kurdish an ElevenLabs voice speaks, and only Eleven v4. Scribe's code is plain "kur".
  { name: 'Kurdish', iso: 'kur', bcp47: 'ckb-IQ', script: 'Sorani Kurdish (Central Kurdish) Arabic-based alphabet', rtl: true },
  { name: 'Latvian', iso: 'lav', bcp47: 'lv-LV' },
  { name: 'Lithuanian', iso: 'lit', bcp47: 'lt-LT' },
  { name: 'Macedonian', iso: 'mkd', bcp47: 'mk-MK', script: 'Macedonian Cyrillic' },
  { name: 'Persian', iso: 'fas', bcp47: 'fa-IR', script: 'Persian (Perso-Arabic)', rtl: true },
  { name: 'Polish', iso: 'pol', bcp47: 'pl-PL' },
  { name: 'Portuguese', iso: 'por', bcp47: 'pt-BR' },
  { name: 'Romanian', iso: 'ron', bcp47: 'ro-RO' },
  { name: 'Russian', iso: 'rus', bcp47: 'ru-RU', script: 'Cyrillic' },
  // Latin script (latinica), as Serbian is read across the Adriatic region beside Croatian.
  { name: 'Serbian', iso: 'srp', bcp47: 'sr-RS', script: 'Serbian Latin (latinica)' },
  // Mandarin either way: one voice, two ways of writing it. Scribe's "zho" reads as Simplified.
  { name: 'Simplified Chinese', iso: 'zho', bcp47: 'zh-CN', script: 'Simplified Chinese characters', noSpaces: true },
  { name: 'Traditional Chinese', iso: 'zho', bcp47: 'zh-TW', script: 'Traditional Chinese characters', noSpaces: true },
  { name: 'Slovak', iso: 'slk', bcp47: 'sk-SK' },
  { name: 'Slovenian', iso: 'slv', bcp47: 'sl-SI' },
  { name: 'Spanish', iso: 'spa', bcp47: 'es-ES' },
  { name: 'Thai', iso: 'tha', bcp47: 'th-TH', script: 'Thai', noSpaces: true },
  { name: 'Turkish', iso: 'tur', bcp47: 'tr-TR' },
  { name: 'Ukrainian', iso: 'ukr', bcp47: 'uk-UA', script: 'Ukrainian Cyrillic' },
  { name: 'Vietnamese', iso: 'vie', bcp47: 'vi-VN' },
];

const byName = new Map(LANGUAGES.map((lang) => [lang.name.toLowerCase(), lang]));
// Older projects and Dhvani's own list say "Chinese": that is the Simplified one.
byName.set('chinese', byName.get('simplified chinese'));
// Where two names share a code (both Chinese scripts), the first listed answers for it.
const byIso = new Map();
for (const lang of LANGUAGES) if (lang.iso && !byIso.has(lang.iso)) byIso.set(lang.iso, lang);

// ElevenLabs may answer with a two-letter code; map the common ones back.
const TWO_LETTER_TO_ISO = {
  en: 'eng', hi: 'hin', bn: 'ben', ta: 'tam', te: 'tel', kn: 'kan', ml: 'mal', mr: 'mar',
  gu: 'guj', pa: 'pan', or: 'ori', as: 'asm', ne: 'nep', sa: 'san', sd: 'snd',
  ar: 'ara', zh: 'zho', nl: 'nld', fr: 'fra', de: 'deu', id: 'ind', it: 'ita', ja: 'jpn',
  ko: 'kor', pl: 'pol', pt: 'por', ru: 'rus', es: 'spa', th: 'tha', tr: 'tur', vi: 'vie',
  bg: 'bul', cs: 'ces', tl: 'fil', ka: 'kat', el: 'ell', he: 'heb', iw: 'heb', hu: 'hun', lv: 'lav',
  lt: 'lit', mk: 'mkd', fa: 'fas', ro: 'ron', sk: 'slk', sl: 'slv', uk: 'ukr', hr: 'hrv', sr: 'srp', ku: 'kur',
};

// Three-letter codes Scribe may use that differ from the ones listed (bibliographic, macro or individual).
const ISO_ALIASES = {
  cmn: 'zho', chi: 'zho', yue: 'zho', cze: 'ces', dut: 'nld', fre: 'fra', ger: 'deu', geo: 'kat',
  gre: 'ell', per: 'fas', pes: 'fas', rum: 'ron', slo: 'slk', mac: 'mkd', tgl: 'fil', arb: 'ara',
  lvs: 'lav', scr: 'hrv', scc: 'srp', ckb: 'kur', kmr: 'kur',
};

/** Display name -> ISO-639-3 code for the ElevenLabs `language_code` field. */
export const toIsoCode = (displayName) => {
  const key = String(displayName || '').trim().toLowerCase();
  if (!key || key === 'auto' || key === 'auto detect' || key === 'automatic') return '';
  return byName.get(key)?.iso || '';
};

/** ElevenLabs `language_code` -> display name for the UI. */
export const toDisplayName = (isoCode, fallback = 'Unknown') => {
  const raw = String(isoCode || '').trim().toLowerCase();
  if (!raw) return fallback;
  // Taiwan, Hong Kong and Macau write Chinese in its traditional characters.
  if (/^(zh|zho|cmn)[-_](tw|hk|mo|hant)\b/.test(raw)) return 'Traditional Chinese';
  const base = raw.split(/[-_]/)[0];
  const three = base.length === 2 ? TWO_LETTER_TO_ISO[base] || base : base.slice(0, 3);
  const normalized = ISO_ALIASES[three] || three;
  return byIso.get(normalized)?.name || fallback;
};

/** Display name -> the script a dub in that language is written in, or empty when none is listed. */
export const scriptOf = (displayName) => byName.get(String(displayName || '').trim().toLowerCase())?.script || '';

const entryOf = (displayName) => byName.get(String(displayName || '').trim().toLowerCase());

/** True when a language is written right to left (Arabic, Hebrew, Persian...). */
export const isRtlLanguage = (displayName) => Boolean(entryOf(displayName)?.rtl);

/** True when a language does not put spaces between its words (Chinese, Japanese, Thai). */
export const writesWithoutSpaces = (displayName) => Boolean(entryOf(displayName)?.noSpaces);

/** Display name -> BCP-47 tag, used when generating SSML. */
export const toBcp47 = (displayName) =>
  byName.get(String(displayName || '').trim().toLowerCase())?.bcp47 || 'en-US';
