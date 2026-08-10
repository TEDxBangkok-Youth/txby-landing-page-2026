/**
 * Thai volunteer roster, one name array per team. Paired with
 * roster.en.ts; `src/lib/site-data.ts` zips this together with the team
 * order (`TEAM_KEYS`) by index — both files must keep the same order and
 * the same number of teams. The team labels themselves ("Producer",
 * "ที่ปรึกษา", …) are messages (`volunteers.teams.*`), not content, since
 * they're UI chrome rather than a specific person's name.
 */

export const rosterTh: string[][] = [
  ["ปาล์ม ธีรเดช", "มายด์ ณัฐชยา", "บีม ศุภกร", "ฟ้า ปวีณา", "โอ๊ต ธนดล", "พราว ชญานิษฐ์"],
  ["กัน วรวุฒิ", "เจน จิรัชญา", "ต้น ปรเมศวร์", "ไอซ์ อิศราภรณ์", "นิว นวพล", "พีท พีรพัฒน์", "แนน นันทวัน"],
  ["มิ้นท์ มนัสวี", "ปอ ภูวดล", "จูน จุฑามาศ", "เต๋า ธนวัฒน์", "แพร แพรววนิต"],
  ["ตูน ธีรภัทร", "หญิง ญาณิศา", "แบงค์ ภาณุพงศ์", "อาย อัยยา", "โอม โอฬาร", "ปันปัน ปุณิกา"],
  ["ฟลุค กฤตเมธ", "เมย์ เมธาวี", "จ๋า จรรยพร", "ดิว ดนุพล"],
  ["บอส บวรพจน์", "ขนม ขวัญชนก", "ปิง พิชญุตม์", "ตาล ธัญวรัตน์", "กี้ กีรติ", "หนึ่ง อนุชา", "มิว มุทิตา"],
  ["โฟม ภูมิพัฒน์", "พีพี ปพน", "เกม เกียรติศักดิ์", "ลูกหมี ลลิตา", "ซัน ศุภณัฐ"],
  ["ใบตอง กัญญาณัฐ", "แทน ธนกร", "หมิว ธมลวรรณ", "จิ๊บ จิรภัทร", "ปุ๊ก ปุณยวีร์", "นาย นภัส"],
];
