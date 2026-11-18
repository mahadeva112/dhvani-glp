import test from 'node:test';
import assert from 'node:assert/strict';
import { lineSyllables, syllablesIn } from './syllables.js';
import { syllablesIn as appSyllablesIn, timeLine } from '../../services/speechTiming.ts';

const LINES = [
  'जब आप वाकई में जीवन के साथ पूरी तरह से जुड़े होते हैं, तो ऊब का कोई सवाल ही नहीं उठता।',
  'मैं कल सुबह दस बजे बाज़ार नहीं जाऊँगा, क्योंकि बारिश होगी',
  'ধীরে-ধীরে আপনি নিজের স্বাস্থ্য বুঝতে পারবেন।',
  'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
  'நீங்கள் எப்படி இருக்கிறீர்கள்?',
  'మీరు ఎలా ఉన్నారు, మిత్రమా?',
  'When you are truly involved with life, there is no question of boredom.',
  'Sadhguru कहते हैं कि 2024 में Isha Yoga Center…',
  'Когда вы по-настоящему вовлечены в жизнь, скуке нет места.',
  'Όταν είστε πραγματικά δοσμένοι στη ζωή, δεν υπάρχει πλήξη.',
  'როცა ცხოვრებაში მთლიანად ხართ ჩართული, მოწყენილობა არ არსებობს.',
  'Quand vous êtes vraiment engagé dans la vie, l’ennui n’existe pas.',
  'Khi bạn thực sự gắn bó với cuộc sống, không có chỗ cho buồn chán.',
  'Kiedy naprawdę angażujesz się w życie, nie ma miejsca na nudę.',
  '人生に本当に関わっていると、退屈など生まれません。',
  '当你真正投入生活时，就不会感到无聊。',
  '삶에 진정으로 몰입하면 지루함은 없습니다.',
  'כשאתה באמת מעורב בחיים, אין מקום לשעמום.',
  'عندما تكون منخرطًا حقًا في الحياة، لا مكان للملل.',
  'เมื่อคุณมีส่วนร่วมกับชีวิตจริงๆ ก็ไม่มีความเบื่อ',
];

test('the server counts syllables exactly as the app does', () => {
  for (const line of LINES) {
    assert.equal(lineSyllables(line), timeLine(line, 1).syllables, line);
    for (const word of line.split(/\s+/)) assert.equal(syllablesIn(word), appSyllablesIn(word), word);
  }
});

test('joined consonants are one syllable, and a dropped final vowel is not counted', () => {
  assert.equal(syllablesIn('प्रेम'), 1);
  assert.equal(syllablesIn('कमल'), 2);
  assert.equal(syllablesIn('मित्र'), 2);
  assert.equal(lineSyllables(''), 0);
  assert.equal(lineSyllables('…, ।'), 0);
});

test('global scripts are counted by their own vowels or characters', () => {
  assert.equal(syllablesIn('время'), 2);
  assert.equal(syllablesIn('България'), 4);
  assert.equal(syllablesIn('είναι'), 2);
  assert.equal(syllablesIn('ქართული'), 3);
  assert.equal(syllablesIn('człowiek'), 2);
  assert.equal(syllablesIn('người'), 1);
  assert.equal(syllablesIn('mañana'), 3);
  assert.equal(syllablesIn('ışık'), 2);
  // One syllable a character: kana (a small ょ joins the one before), Han and Hangul blocks.
  assert.equal(syllablesIn('ありがとう'), 5);
  assert.equal(syllablesIn('きょう'), 2);
  assert.equal(syllablesIn('你好世界'), 4);
  assert.equal(syllablesIn('안녕하세요'), 5);
});
