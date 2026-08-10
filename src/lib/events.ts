/**
 * Per-edition event pages, one per year, served from /events/[year].
 *
 * Everything a year's page renders lives in one `EventYear` object, so
 * adding the next edition is adding one entry to `events` — no new route
 * and no new component. The pages run on the TEDx main CI scope only
 * ([data-theme="main"]); nothing here carries a seasonal brand value.
 *
 * TODO(content): the `youtubeId` / `playlistUrl` values below are
 * placeholders (`REPLACEME*`). Paste the real 11-character video ids and
 * the playlist id once the talks are published; the links are already
 * well-formed everywhere else.
 */

export type EventSpeaker = {
  /** ชื่อเล่น — the headline on the card. */
  nickname: string;
  /** ชื่อ-นามสกุล, set below the nickname. */
  fullName: string;
  /** One line about who they are, not a job title. */
  oneLiner: string;
  talkTitle: string;
  /** 11-char YouTube video id, or null while the talk is unpublished. */
  youtubeId: string | null;
  /** m:ss as printed on YouTube. */
  duration: string;
  /** Path under /public, or null to fall back to the initial panel. */
  photo: string | null;
};

/** Tile shape in the photo wall. Keys map to aspect classes in the component. */
export type PhotoRatio = "video" | "square" | "portrait" | "landscape";

export type EventPhoto = {
  /** Path under /public, or null to render the placeholder drop-zone. */
  src: string | null;
  alt: string;
  ratio: PhotoRatio;
};

export type EventYear = {
  /** Also the URL segment: /events/2025. */
  year: string;
  /** ธีมของปี — the hero headline. */
  theme: string;
  /** Latin lockup set above the Thai theme. */
  themeEn: string;
  date: string;
  venue: string;
  /** รายละเอียด — the hero paragraph. */
  description: string;
  cover: { src: string; alt: string } | null;
  /** Full playlist for the year, or null if nothing is published yet. */
  playlistUrl: string | null;
  speakers: EventSpeaker[];
  photos: EventPhoto[];
};

const PHOTO_WALL_2025: EventPhoto[] = [
  {
    src: "/assets/gallery-2025-cover.jpg",
    alt: "ผู้ชมเต็มห้องประชุมก่อนเริ่มงาน TEDxBangkok Youth 2025",
    ratio: "video",
  },
  { src: null, alt: "จุดลงทะเบียนหน้างาน", ratio: "portrait" },
  { src: null, alt: "สปีกเกอร์ซ้อมบนเวทีก่อนเปิดงาน", ratio: "square" },
  { src: null, alt: "ผู้ชมระหว่างช่วงพัก", ratio: "landscape" },
  { src: null, alt: "เวทีวงกลมแดงและแสงไฟ", ratio: "portrait" },
  { src: null, alt: "เวิร์กช็อปโซนกิจกรรม", ratio: "square" },
  { src: null, alt: "ทีมอาสาสมัครหลังเวที", ratio: "landscape" },
  { src: null, alt: "ภาพหมู่สปีกเกอร์และทีมงานปิดงาน", ratio: "video" },
];

export const events: EventYear[] = [
  {
    year: "2025",
    theme: "เย็บปักถักทอล์ก",
    themeEn: "Woven Talks",
    date: "23 พฤศจิกายน 2568",
    venue: "หอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร",
    description:
      "12 เรื่องเล่า จาก 12 เสียงต่างวัย ต่างเส้นทาง ที่ถักทอมาจากประสบการณ์ ความฝัน ความหวัง และความเจ็บปวด ร้อยเรียงและถ่ายทอดอย่างพิถีพิถัน เพื่อให้หัวใจของคุณกลับมาพองโตอีกครั้ง",
    cover: {
      src: "/assets/gallery-2025-cover.jpg",
      alt: "บรรยากาศงาน TEDxBangkok Youth 2025",
    },
    playlistUrl:
      "https://www.youtube.com/playlist?list=REPLACEME_PLAYLIST_2025",
    speakers: [
      {
        nickname: "ปุณณ์",
        fullName: "ปุณณ์ อริยะวงศ์",
        oneLiner: "เด็กหลังห้องที่สร้างโลกทั้งใบขึ้นมาจากความพ่ายแพ้",
        talkTitle: "เกมที่สอนให้ฉันล้มเหลว",
        youtubeId: "REPLACEME01",
        duration: "11:42",
        photo: "/assets/speakers/2025-01.png",
      },
      {
        nickname: "ญาดา",
        fullName: "ญาดา เตชะวิบูลย์",
        oneLiner: "สาวน้อยผู้ออกไปวัดอากาศที่ทุกคนบอกว่ามองไม่เห็น",
        talkTitle: "ฝุ่นที่เราหายใจร่วมกัน",
        youtubeId: "REPLACEME02",
        duration: "09:58",
        photo: "/assets/speakers/2025-02.png",
      },
      {
        nickname: "พิมพ์",
        fullName: "พิมพ์ชนก โชติวัฒน์",
        oneLiner: "นักเรียนพยาบาลที่เรียนรู้การดูแลก่อนจะรู้จักพักผ่อน",
        talkTitle: "ดูแลคนอื่นก่อนดูแลตัวเอง",
        youtubeId: "REPLACEME03",
        duration: "13:07",
        photo: "/assets/speakers/2025-03.png",
      },
      {
        nickname: "กันต์",
        fullName: "กันต์ ศรีวรกุล",
        oneLiner: "เด็กชายผู้ได้ยินทำนองในเสียงที่คนอื่นเรียกว่าน่ารำคาญ",
        talkTitle: "เสียงรบกวนก็เป็นดนตรีได้",
        youtubeId: "REPLACEME04",
        duration: "10:21",
        photo: "/assets/speakers/2025-04.png",
      },
      {
        nickname: "นิช",
        fullName: "อรณิชา บุญมาก",
        oneLiner: "ช่างภาพวัยสิบแปดที่ตามหาเมืองซึ่งไม่มีใครอยากถ่าย",
        talkTitle: "เมืองที่ไม่มีใครถ่าย",
        youtubeId: "REPLACEME05",
        duration: "12:35",
        photo: "/assets/speakers/2025-05.png",
      },
      {
        nickname: "ตั้ม",
        fullName: "ธีรัตม์ นิลกำแหง",
        oneLiner: "หนุ่มน้อยที่โตมากับเสียงไซเรนและนาทีแรกของชีวิตคนอื่น",
        talkTitle: "สิบสองนาทีแรก",
        youtubeId: "REPLACEME06",
        duration: "14:12",
        photo: "/assets/speakers/2025-06.png",
      },
      {
        nickname: "มะปราง",
        fullName: "ปวีณ์นุช ทองประเสริฐ",
        oneLiner: "สาวน้อยผู้เติบโตมากับแสงไฟและความคาดหวัง",
        talkTitle: "หัวเราะทั้งที่ยังไม่หายเจ็บ",
        youtubeId: "REPLACEME07",
        duration: "12:50",
        photo: "/assets/speakers/2025-07.png",
      },
      {
        nickname: "โฟกัส",
        fullName: "ชยากร ไวยกิจ",
        oneLiner: "นักออกแบบที่เย็บตัวตนขึ้นใหม่จากเศษผ้าที่ถูกทิ้ง",
        talkTitle: "เศษผ้าที่กลายเป็นตัวตน",
        youtubeId: "REPLACEME08",
        duration: "10:44",
        photo: "/assets/speakers/2025-08.png",
      },
      {
        nickname: "ไอซ์",
        fullName: "ณิชาภัทร วงศ์เจริญ",
        oneLiner: "นักโต้วาทีที่เก่งเรื่องแพ้มากกว่าเรื่องชนะ",
        talkTitle: "แพ้บนเวทีไม่ใช่จบ",
        youtubeId: "REPLACEME09",
        duration: "11:03",
        photo: "/assets/speakers/2025-09.png",
      },
      {
        nickname: "แพร",
        fullName: "ภัสสร ดำรงพันธุ์",
        oneLiner: "เด็กสาวผู้เบื่อกติกาเดิม เลยลงมือเขียนกติกาใหม่ทั้งกระดาน",
        talkTitle: "กติกาที่ฉันเขียนเอง",
        youtubeId: "REPLACEME10",
        duration: "09:26",
        photo: "/assets/speakers/2025-10.png",
      },
      {
        nickname: "จูน",
        fullName: "กมลชนก ศรีสวัสดิ์",
        oneLiner: "เด็กแลกเปลี่ยนที่กลับมาเจอบ้านหลังเดิมในเมืองที่ไม่เหมือนเดิม",
        talkTitle: "บ้านที่เปลี่ยนไปตอนฉันไม่อยู่",
        youtubeId: "REPLACEME11",
        duration: "13:31",
        photo: "/assets/speakers/2025-11.png",
      },
      {
        nickname: "ปอ",
        fullName: "สุพิชญา ธรรมวัฒน์",
        oneLiner: "เสียงตามสายประจำโรงเรียนที่ยังสั่นทุกครั้งที่จับไมโครโฟน",
        talkTitle: "ไมโครโฟนที่มือฉันสั่น",
        youtubeId: "REPLACEME12",
        duration: "10:09",
        photo: "/assets/speakers/2025-12.png",
      },
    ],
    photos: PHOTO_WALL_2025,
  },
  {
    year: "2024",
    theme: "คัมมิ่งโฮม",
    themeEn: "Coming Home",
    date: "17 พฤศจิกายน 2567",
    venue: "หอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร",
    description:
      "กลับสู่บ้านแสนอบอุ่น ค้นหาตัวตนและพลังแห่งวัยเยาว์ 10 เรื่องเล่าของคนรุ่นใหม่ที่ออกเดินทางไกล แล้วพบว่าคำตอบรออยู่ตรงที่เริ่มต้น",
    cover: null,
    playlistUrl: null,
    speakers: [
      {
        nickname: "อุ้ม",
        fullName: "ณัฐธิดา พงศ์พิพัฒน์",
        oneLiner: "ลูกสาวร้านข้าวแกงที่หนีไปไกลแล้วเดินกลับมาเอง",
        talkTitle: "กลับบ้านตอนที่ยังไม่สำเร็จ",
        youtubeId: null,
        duration: "12:18",
        photo: null,
      },
      {
        nickname: "บอล",
        fullName: "ปรมินทร์ สุขเจริญ",
        oneLiner: "เด็กต่างจังหวัดที่ใช้เวลาสามปีทำความรู้จักกรุงเทพฯ",
        talkTitle: "เมืองที่ไม่เคยจำชื่อฉัน",
        youtubeId: null,
        duration: "10:55",
        photo: null,
      },
      {
        nickname: "แนน",
        fullName: "ศศิวิมล ชัยประเสริฐ",
        oneLiner: "พี่สาวคนโตที่โตเร็วกว่าอายุจริงหลายปี",
        talkTitle: "โตก่อนวันเกิด",
        youtubeId: null,
        duration: "11:29",
        photo: null,
      },
      {
        nickname: "ต้าร์",
        fullName: "กิตติภพ วรรณดี",
        oneLiner: "นักฟุตบอลโรงเรียนที่เลิกวิ่งตามความคาดหวังของคนอื่น",
        talkTitle: "ออกจากสนามที่ไม่ใช่ของเรา",
        youtubeId: null,
        duration: "09:47",
        photo: null,
      },
      {
        nickname: "อิ่ม",
        fullName: "ธัญชนก เรืองศรี",
        oneLiner: "เด็กสาวที่เขียนจดหมายถึงบ้านทุกสัปดาห์โดยไม่เคยส่ง",
        talkTitle: "จดหมายที่ไม่ได้ส่ง",
        youtubeId: null,
        duration: "13:02",
        photo: null,
      },
      {
        nickname: "ภูมิ",
        fullName: "ภูมิรพี อินทรสุข",
        oneLiner: "หลานชายที่เรียนภาษาถิ่นจากยายตอนสายเกินไป",
        talkTitle: "ภาษาที่หายไปกับยาย",
        youtubeId: null,
        duration: "12:41",
        photo: null,
      },
      {
        nickname: "เฟิร์น",
        fullName: "ชนิสรา บุญยงค์",
        oneLiner: "นักเรียนศิลปะที่วาดบ้านตัวเองซ้ำ ๆ จนกว่าจะจำได้",
        talkTitle: "วาดบ้านจากความทรงจำ",
        youtubeId: null,
        duration: "10:16",
        photo: null,
      },
      {
        nickname: "กร",
        fullName: "ธนกร อภิชาติ",
        oneLiner: "เด็กชายที่ย้ายโรงเรียนหกครั้งก่อนอายุสิบห้า",
        talkTitle: "เพื่อนใหม่ทุกปีการศึกษา",
        youtubeId: null,
        duration: "11:08",
        photo: null,
      },
      {
        nickname: "มุก",
        fullName: "พรชนก ธีระวัฒน์",
        oneLiner: "ลูกครึ่งสองวัฒนธรรมที่ใช้เวลานานกว่าจะเลือกไม่ต้องเลือก",
        talkTitle: "เป็นได้ทั้งสองอย่าง",
        youtubeId: null,
        duration: "12:24",
        photo: null,
      },
      {
        nickname: "เจ",
        fullName: "จิรายุ สถาพรกุล",
        oneLiner: "เด็กชายที่ดูแลพ่อแม่ก่อนเรียนจบมัธยม",
        talkTitle: "หัวหน้าครอบครัวอายุสิบเจ็ด",
        youtubeId: null,
        duration: "14:03",
        photo: null,
      },
    ],
    photos: [
      { src: null, alt: "บรรยากาศหน้างานปี 2024", ratio: "video" },
      { src: null, alt: "ผู้ชมในห้องประชุม", ratio: "portrait" },
      { src: null, alt: "ช่วงถามตอบหลังเวที", ratio: "square" },
      { src: null, alt: "ทีมงานและสปีกเกอร์ปี 2024", ratio: "landscape" },
    ],
  },
];

/** The years that have a page, newest first. */
export const eventYears = events.map((e) => e.year);

export function getEvent(year: string): EventYear | null {
  return events.find((e) => e.year === year) ?? null;
}

/** Route for a year's page, or null when that year has no page yet. */
export function eventHref(year: string): string | null {
  return eventYears.includes(year) ? `/events/${year}` : null;
}

export function talkUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
