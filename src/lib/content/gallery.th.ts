/**
 * Thai editorial content for the landing page's year archive. Paired
 * with gallery.en.ts; `src/lib/site-data.ts` zips this together with the
 * non-localized data (tone, chipTone, talks count, slotId) by `year`.
 */

export type LocalizedGalleryYear = {
  year: string;
  title: string;
  desc: string;
};

export const galleryTh: LocalizedGalleryYear[] = [
  {
    year: "2024",
    title: "คัมมิ่งโฮม",
    desc: "กลับสู่บ้านแสนอบอุ่น ค้นหาตัวตนและพลังแห่งวัยเยาว์",
  },
  {
    year: "2023",
    title: "UnleashXpression",
    desc: "ปลดพันธนาการ ปล่อยตัวตนและความเป็นเด็ก",
  },
  {
    year: "2022",
    title: "You(th) Matter!",
    desc: "สะท้อนเสียงของเด็กมีของและคุณครูไฟแรงให้ดังก้องไปทั่วสังคม",
  },
  {
    year: "2019",
    title: "Playing From Playlist",
    desc: "เพลย์ลิสต์ของชีวิตที่เราเลือกเปิดเอง",
  },
  {
    year: "2018",
    title: "TEDx Youth 2018",
    desc: "เวทีที่สปีกเกอร์เป็นเด็กทั้งหมด",
  },
];
