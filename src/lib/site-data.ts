/**
 * Content for the TEDxBangkok Youth 2026 landing page (v3).
 * Mirrors the data + renderVals() logic from the Claude Design document
 * "TEDxBangkokYouth Landing v3".
 */

export const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "TED Club", href: "#club" },
  { label: "Speakers", href: "#speakers" },
  { label: "Volunteers", href: "#volunteers" },
];

// ─── Gallery ────────────────────────────────────────────────
/** Brand tones, resolved to token-driven classes in the card components. */
export type Tone = "pink" | "yellow" | "cyan" | "green" | "red";

export type GalleryYear = {
  /** Drives the card field and its image panel tint. */
  tone: Tone;
  /** The eyebrow tone. 2023 deliberately pairs a red chip with a yellow card. */
  chipTone: Tone;
  year: string;
  talks: string;
  title: string;
  desc: string;
  slotId: string;
  placeholder: string;
};

export const galleryYears: GalleryYear[] = [
  {
    tone: "cyan",
    chipTone: "cyan",
    year: "2024",
    talks: "10 talks",
    title: "คัมมิ่งโฮม",
    desc: "กลับสู่บ้านแสนอบอุ่น ค้นหาตัวตนและพลังแห่งวัยเยาว์",
    slotId: "v3-gallery-2024-cover",
    placeholder: "รูปปี 2024",
  },
  {
    tone: "yellow",
    chipTone: "red",
    year: "2023",
    talks: "9 talks",
    title: "UnleashXpression",
    desc: "ปลดพันธนาการ ปล่อยตัวตนและความเป็นเด็ก",
    slotId: "v3-gallery-2023-cover",
    placeholder: "รูปปี 2023",
  },
  {
    tone: "green",
    chipTone: "green",
    year: "2022",
    talks: "8 talks",
    title: "You(th) Matter!",
    desc: "สะท้อนเสียงของเด็กมีของและคุณครูไฟแรงให้ดังก้องไปทั่วสังคม",
    slotId: "v3-gallery-2022-cover",
    placeholder: "รูปปี 2022",
  },
  {
    tone: "pink",
    chipTone: "pink",
    year: "2019",
    talks: "8 talks",
    title: "Playing From Playlist",
    desc: "เพลย์ลิสต์ของชีวิตที่เราเลือกเปิดเอง",
    slotId: "v3-gallery-2019-cover",
    placeholder: "รูปปี 2019",
  },
  {
    tone: "red",
    chipTone: "red",
    year: "2018",
    talks: "6 talks",
    title: "TEDx Youth 2018",
    desc: "เวทีที่สปีกเกอร์เป็นเด็กทั้งหมด",
    slotId: "v3-gallery-2018-cover",
    placeholder: "รูปปี 2018",
  },
];

// ─── Speakers ───────────────────────────────────────────────
type SpeakerSource = {
  name: string;
  role: string;
  talk: string;
  photo: string;
};

const SPEAKERS: SpeakerSource[] = [
  { name: "ปุณณ์ อริยะวงศ์", role: "นักเรียน ม.6 · นักพัฒนาเกม", talk: "เกมที่สอนให้ฉันล้มเหลว", photo: "2025-01" },
  { name: "ญาดา เตชะวิบูลย์", role: "นักวิจัยเยาวชนด้านคุณภาพอากาศ", talk: "ฝุ่นที่เราหายใจร่วมกัน", photo: "2025-02" },
  { name: "กันต์ ศรีวรกุล", role: "ผู้ก่อตั้งวงดนตรีในโรงเรียน", talk: "เสียงรบกวนก็เป็นดนตรีได้", photo: "2025-04" },
  { name: "พิมพ์ชนก โชติวัฒน์", role: "นักเรียนพยาบาล", talk: "ดูแลคนอื่นก่อนดูแลตัวเอง", photo: "2025-03" },
  { name: "ธีรัตม์ นิลกำแหง", role: "อาสาสมัครกู้ภัยอายุ 19", talk: "สิบสองนาทีแรก", photo: "2025-06" },
  { name: "อรณิชา บุญมาก", role: "ช่างภาพสารคดี", talk: "เมืองที่ไม่มีใครถ่าย", photo: "2025-05" },
  { name: "ปวีณ์นุช ทองประเสริฐ", role: "นักเรียนละครเวที ม.5", talk: "หัวเราะทั้งที่ยังไม่หายเจ็บ", photo: "2025-07" },
  { name: "ชยากร ไวยกิจ", role: "นักออกแบบเสื้อผ้ารีไซเคิล", talk: "เศษผ้าที่กลายเป็นตัวตน", photo: "2025-08" },
  { name: "ณิชาภัทร วงศ์เจริญ", role: "ประธานชมรมโต้วาที", talk: "แพ้บนเวทีไม่ใช่จบ", photo: "2025-09" },
  { name: "ภัสสร ดำรงพันธุ์", role: "นักออกแบบเกมกระดาน", talk: "กติกาที่ฉันเขียนเอง", photo: "2025-10" },
  { name: "กมลชนก ศรีสวัสดิ์", role: "นักเรียนแลกเปลี่ยนกลับบ้าน", talk: "บ้านที่เปลี่ยนไปตอนฉันไม่อยู่", photo: "2025-11" },
  { name: "สุพิชญา ธรรมวัฒน์", role: "ผู้ประกาศข่าวโรงเรียน", talk: "ไมโครโฟนที่มือฉันสั่น", photo: "2025-12" },
];

const TONES: Tone[] = ["pink", "yellow", "cyan", "green", "red"];

// The design only has speaker photos 01–03 and 05–12 available; the card
// for a missing photo falls back to the speaker's initial on a tinted panel.
const AVAILABLE_PHOTOS = new Set([
  "2025-01", "2025-02", "2025-03", "2025-05", "2025-06",
  "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12",
]);

export const speakers = SPEAKERS.map((s, i) => {
  const hasPhoto = AVAILABLE_PHOTOS.has(s.photo);
  return {
    name: s.name,
    role: s.role,
    talk: s.talk,
    hasPhoto,
    photo: hasPhoto ? `/assets/speakers/${s.photo}.jpg` : null,
    initial: (s.name || "?").trim().charAt(0),
    tone: TONES[i % TONES.length],
  };
});

// ─── Volunteers roster ──────────────────────────────────────
const TEAM_NAMES = [
  "Producer", "Advisor", "Director", "Production",
  "People", "Finance", "Sponsor", "IT",
];

const ROSTER: string[][] = [
  ["ปาล์ม ธีรเดช", "มายด์ ณัฐชยา", "บีม ศุภกร", "ฟ้า ปวีณา", "โอ๊ต ธนดล", "พราว ชญานิษฐ์"],
  ["กัน วรวุฒิ", "เจน จิรัชญา", "ต้น ปรเมศวร์", "ไอซ์ อิศราภรณ์", "นิว นวพล", "พีท พีรพัฒน์", "แนน นันทวัน"],
  ["มิ้นท์ มนัสวี", "ปอ ภูวดล", "จูน จุฑามาศ", "เต๋า ธนวัฒน์", "แพร แพรววนิต"],
  ["ตูน ธีรภัทร", "หญิง ญาณิศา", "แบงค์ ภาณุพงศ์", "อาย อัยยา", "โอม โอฬาร", "ปันปัน ปุณิกา"],
  ["ฟลุค กฤตเมธ", "เมย์ เมธาวี", "จ๋า จรรยพร", "ดิว ดนุพล"],
  ["บอส บวรพจน์", "ขนม ขวัญชนก", "ปิง พิชญุตม์", "ตาล ธัญวรัตน์", "กี้ กีรติ", "หนึ่ง อนุชา", "มิว มุทิตา"],
  ["โฟม ภูมิพัฒน์", "พีพี ปพน", "เกม เกียรติศักดิ์", "ลูกหมี ลลิตา", "ซัน ศุภณัฐ"],
  ["ใบตอง กัญญาณัฐ", "แทน ธนกร", "หมิว ธมลวรรณ", "จิ๊บ จิรภัทร", "ปุ๊ก ปุณยวีร์", "นาย นภัส"],
];

export const teams = TEAM_NAMES.map((name, i) => ({
  name,
  names: ROSTER[i] ?? [],
}));

// ─── Footer ─────────────────────────────────────────────────
export const footerLinks = [
  { title: "Event", items: ["Gallery", "Speakers", "Schedule", "Venue"] },
  { title: "Community", items: ["TED Club", "Volunteers", "Sponsors"] },
  { title: "Info", items: ["About", "FAQ", "Contact"] },
];

export const social = ["Instagram", "Facebook", "YouTube", "TikTok"];

// ─── TED Club map ───────────────────────────────────────────
export type Club = {
  city: string;
  en: string;
  clubs: number;
  since: number;
  note: string;
  provinceId: string;
};

export const CLUBS: Club[] = [
  { city: "กรุงเทพมหานคร", en: "Bangkok", clubs: 6, since: 2019, note: "ศูนย์กลางเครือข่าย · 6 ชมรม", provinceId: "TH-10" },
  { city: "นนทบุรี", en: "Nonthaburi", clubs: 1, since: 2024, note: "1 ชมรม", provinceId: "TH-12" },
  { city: "ชลบุรี", en: "Chonburi", clubs: 2, since: 2023, note: "2 ชมรม", provinceId: "TH-20" },
  { city: "เชียงใหม่", en: "Chiang Mai", clubs: 3, since: 2021, note: "3 ชมรม", provinceId: "TH-50" },
  { city: "เชียงราย", en: "Chiang Rai", clubs: 1, since: 2024, note: "1 ชมรม", provinceId: "TH-57" },
  { city: "พิษณุโลก", en: "Phitsanulok", clubs: 1, since: 2023, note: "1 ชมรม", provinceId: "TH-65" },
  { city: "ขอนแก่น", en: "Khon Kaen", clubs: 2, since: 2022, note: "2 ชมรม", provinceId: "TH-40" },
  { city: "นครราชสีมา", en: "Nakhon Ratchasima", clubs: 2, since: 2022, note: "2 ชมรม", provinceId: "TH-30" },
  { city: "อุบลราชธานี", en: "Ubon Ratchathani", clubs: 1, since: 2024, note: "1 ชมรม", provinceId: "TH-34" },
  { city: "สุราษฎร์ธานี", en: "Surat Thani", clubs: 1, since: 2024, note: "1 ชมรม", provinceId: "TH-84" },
  { city: "ภูเก็ต", en: "Phuket", clubs: 1, since: 2023, note: "1 ชมรม", provinceId: "TH-83" },
  { city: "หาดใหญ่ สงขลา", en: "Hat Yai", clubs: 2, since: 2022, note: "2 ชมรม", provinceId: "TH-90" },
];

export const MAP_DEFAULT_TITLE = "จังหวัดที่มี TED Club";
