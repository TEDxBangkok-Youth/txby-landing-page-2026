import type { Tagline } from "@/lib/thaigredient/data";

/**
 * Tagline lookup table for the Secret Thaigredient slot machine, generated
 * from txby-data's taglines.json (see that repo's KEY_FORMAT.md).
 *
 * Keys are the three drawn item keys sorted ascending (plain UTF-16 order,
 * which matches the generator's Python sort for these ASCII slugs) and
 * joined with underscores — build them with buildTaglineKey() in slot.ts,
 * never by hand.
 *
 * The full pool is C(14,3) = 364 unordered draws; this table holds the
 * 169 written so far. Misses fall back to FALLBACK_TAGLINE.
 */
export const TAGLINES: Readonly<Record<string, Tagline>> = {
  "pork-skewer_rooster-bowl_tray": {
    en: "Wolfing down pork skewers before flag ceremony",
    th: "รีบกินหมูปิ้งก่อนเข้าแถวเคารพธงชาติ",
  },
  "chilli_fish-sauce_lime": {
    en: "This sauce trio saves any bad cooking",
    th: "จานไหนไม่อร่อย น้ำจิ้มนี้เซฟได้หมด",
  },
  "boxing_chair_sticky-rice": {
    en: "Cheering muay thai with sticky rice hands",
    th: "เชียร์มวยจนแหบ มือเปื้อนข้าวเหนียว",
  },
  "chair_lottery_tray": {
    en: "Waiting for lottery results with snacks",
    th: "นั่งรอหวยออก พร้อมขนมถ้วยในถาดหลุม",
  },
  "pepper_pork-skewer_sticky-rice": {
    en: "20 baht, full day: the student hack",
    th: "20 บาทอิ่มทั้งวัน สไตล์เด็กนักเรียน",
  },
  "cucumber_fish-sauce_rooster-bowl": {
    en: "Grandma's cooking, money can't buy",
    th: "ข้าวแกงรสมือยาย ที่ร้านไหนก็ทำไม่ได้",
  },
  "boxing_lime_lottery": {
    en: "Boxing shorts, lottery ticket, big dreams",
    th: "ใส่กางเกงมวยไปซื้อหวย ลุ้นดวงประจำเดือน",
  },
  "chilli_sticky-rice_tray": {
    en: "School cafeteria: food's gone by break",
    th: "โรงอาหารโรงเรียน กับข้าวหมดก่อนพัก",
  },
  "chair_lottery_pork-skewer": {
    en: "Pork skewers while watching the lottery draw",
    th: "กินหมูปิ้งรอฟังเลขหวยออกทางทีวี",
  },
  "boxing_cucumber_rooster-bowl": {
    en: "Dad's boxing shorts after mowing the lawn",
    th: "พ่อใส่กางเกงมวยกินข้าวหลังตัดหญ้า",
  },
  "fish-sauce_pork-skewer_pork-skewer": {
    en: "Two skewers aren't enough, need more fish sauce",
    th: "สองไม้ไม่พอ ขอน้ำปลาราดเพิ่มอีกรอบ",
  },
  "chair_lottery_lottery": {
    en: "Two lottery tickets, one plastic chair, all afternoon",
    th: "ซื้อหวยสองใบ นั่งเก้าอี้งานวัดลุ้นทั้งบ่าย",
  },
  "boxing_boxing_sticky-rice": {
    en: "Two boxing shorts on rotation, sticky rice every meal",
    th: "มีกางเกงมวยสองตัวสลับใส่ กินข้าวเหนียวทุกมื้อ",
  },
  "pork-skewer_pork-skewer_pork-skewer": {
    en: "Three skewers: the office worker's lunch",
    th: "หมูปิ้งสามไม้ มื้อเที่ยงพนักงานออฟฟิศ",
  },
  "lottery_lottery_lottery": {
    en: "Three lottery tickets, hoping luck triples too",
    th: "ซื้อหวยสามใบ เผื่อดวงมาแรงงวดนี้",
  },
  "boxing_boxing_boxing": {
    en: "A closet full of boxing shorts, fits every occasion",
    th: "ตู้เสื้อผ้ามีแต่กางเกงมวย ใส่ได้ทุกสถานการณ์",
  },
  "boxing_lottery_rooster-bowl": {
    en: "Boxing shorts, lottery ticket, rooster bowl in hand",
    th: "ใส่กางเกงมวยซื้อหวย กินข้าวในชามตราไก่รอผล",
  },
  "boxing_lottery_sticky-rice": {
    en: "Lottery bought, sticky rice ready, waiting in comfort",
    th: "ซื้อหวยเสร็จ กินข้าวเหนียวใส่กางเกงมวยรอฟังผล",
  },
  "boxing_chilli_lottery": {
    en: "Spicy lottery nerves, cooled by comfy boxing shorts",
    th: "ลุ้นหวยเผ็ดร้อนเหมือนพริก ใส่กางเกงมวยสบายตัว",
  },
  "pork-skewer_pork-skewer_rooster-bowl": {
    en: "Two skewers in a rooster bowl feel extra fancy",
    th: "สองไม้บนชามตราไก่ ดูขลังกว่าเดิม",
  },
  "pork-skewer_pork-skewer_tray": {
    en: "Two skewers in a lunch tray, back to school days",
    th: "สองไม้ในถาดหลุม อิ่มแบบเด็กประถม",
  },
  "chilli_pork-skewer_pork-skewer": {
    en: "Two skewers, so much chili your eyes water",
    th: "สองไม้จิ้มพริกจนน้ำตาไหล",
  },
  "lime_pork-skewer_pork-skewer": {
    en: "Squeeze lime on two skewers, extra sour kick",
    th: "บีบมะนาวใส่สองไม้ เปรี้ยวจี๊ดถึงใจ",
  },
  "pepper_pork-skewer_pork-skewer": {
    en: "Peppered skewers so good, friends beg for a bite",
    th: "โรยพริกไทยสองไม้ หอมจนเพื่อนขอแบ่ง",
  },
  "cucumber_pork-skewer_pork-skewer": {
    en: "Cucumber can't save you, order more skewers",
    th: "แตงกวาแก้เผ็ดไม่ทัน สั่งเพิ่มอีกไม้",
  },
  "pork-skewer_pork-skewer_sticky-rice": {
    en: "Two skewers, one sticky rice, food coma incoming",
    th: "สองไม้ข้าวเหนียวหนึ่งห่อ อิ่มจนขยับไม่ไหว",
  },
  "boxing_pork-skewer_pork-skewer": {
    en: "Two skewers later, thank goodness for stretchy shorts",
    th: "กินสองไม้พุงกาง ต้องใส่กางเกงมวยยืดได้",
  },
  "chair_pork-skewer_pork-skewer": {
    en: "Plastic chair, two skewers, waiting for friends",
    th: "นั่งเก้าอี้งานวัด กินสองไม้รอเพื่อนมา",
  },
  "lottery_pork-skewer_pork-skewer": {
    en: "Bought a lottery ticket, treated myself to two skewers",
    th: "ซื้อหวยเสร็จ ให้รางวัลตัวเองสองไม้",
  },
  "pork-skewer_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls still can't hold enough skewers",
    th: "ชามตราไก่สองใบ ยังไม่พอใส่หมูปิ้ง",
  },
  "fish-sauce_pork-skewer_rooster-bowl": {
    en: "Fish sauce in a rooster bowl, dinner is served",
    th: "ราดน้ำปลาลงชามตราไก่ กินคู่หมูปิ้งมื้อเย็น",
  },
  "chilli_pork-skewer_rooster-bowl": {
    en: "Rooster bowl full of chili, skewers on the side",
    th: "ชามตราไก่ใส่พริก คู่หมูปิ้งจัดเต็ม",
  },
  "lime_pork-skewer_rooster-bowl": {
    en: "Lime squeezed in a rooster bowl before the first bite",
    th: "บีบมะนาวลงชามตราไก่ ก่อนตักหมูปิ้งเข้าปาก",
  },
  "pepper_pork-skewer_rooster-bowl": {
    en: "Pepper in a rooster bowl, the whole house smells good",
    th: "ชามตราไก่โรยพริกไทย หอมทั้งบ้าน",
  },
  "cucumber_pork-skewer_rooster-bowl": {
    en: "Cucumber in a rooster bowl, easy skewer lunch",
    th: "แตงกวาในชามตราไก่ คู่หมูปิ้งมื้อสบายๆ",
  },
  "pork-skewer_rooster-bowl_sticky-rice": {
    en: "Sticky rice in a rooster bowl, no rush to finish",
    th: "ข้าวเหนียวในชามตราไก่ กินคู่หมูปิ้งไม่ต้องรีบ",
  },
  "boxing_pork-skewer_rooster-bowl": {
    en: "Boxing shorts, rooster bowl, skewers at home",
    th: "ใส่กางเกงมวยกินหมูปิ้งจากชามตราไก่ที่บ้าน",
  },
  "chair_pork-skewer_rooster-bowl": {
    en: "Plastic chair, rooster bowl, skewers in hand",
    th: "นั่งเก้าอี้งานวัด ถือชามตราไก่กินหมูปิ้ง",
  },
  "lottery_pork-skewer_rooster-bowl": {
    en: "Lottery ticket, rooster bowl, waiting for the draw",
    th: "ถือลอตเตอรี่ กินหมูปิ้งจากชามตราไก่รอผล",
  },
  "pork-skewer_tray_tray": {
    en: "Two lunch trays still not enough for the skewers",
    th: "สองถาดหลุมยังไม่พอ ต้องเพิ่มหมูปิ้ง",
  },
  "fish-sauce_pork-skewer_tray": {
    en: "Fish sauce in a lunch tray, cafeteria-style skewers",
    th: "น้ำปลาในถาดหลุม คู่หมูปิ้งมื้อโรงอาหาร",
  },
  "chilli_pork-skewer_tray": {
    en: "Chili in a lunch tray, spicy enough for extra water",
    th: "พริกในถาดหลุม เผ็ดจนต้องขอน้ำเพิ่ม",
  },
  "lime_pork-skewer_tray": {
    en: "Lime in a lunch tray, sour lunch with skewers",
    th: "มะนาวในถาดหลุม เปรี้ยวคู่หมูปิ้งมื้อเที่ยง",
  },
  "pepper_pork-skewer_tray": {
    en: "Pepper in a lunch tray, cafeteria smells amazing",
    th: "พริกไทยในถาดหลุม หอมทั้งโรงอาหาร",
  },
  "cucumber_pork-skewer_tray": {
    en: "Cucumber in a lunch tray, budget-friendly skewer meal",
    th: "แตงกวาในถาดหลุม กินคู่หมูปิ้งแบบสบายกระเป๋า",
  },
  "pork-skewer_sticky-rice_tray": {
    en: "Sticky rice in a lunch tray, classic school lunch",
    th: "ข้าวเหนียวในถาดหลุม อิ่มแบบเด็กโรงเรียน",
  },
  "boxing_pork-skewer_tray": {
    en: "Boxing shorts, lunch tray, queuing for skewers",
    th: "ใส่กางเกงมวยถือถาดหลุม ต่อคิวซื้อหมูปิ้ง",
  },
  "chair_pork-skewer_tray": {
    en: "Plastic chair, lunch tray, skewers for dinner",
    th: "นั่งเก้าอี้งานวัด ถือถาดหลุมกินหมูปิ้ง",
  },
  "lottery_pork-skewer_tray": {
    en: "Lunch tray of skewers while waiting for lottery results",
    th: "ถือถาดหลุมกินหมูปิ้ง รอฟังผลลอตเตอรี่",
  },
  "fish-sauce_fish-sauce_pork-skewer": {
    en: "Double fish sauce, skewers salty enough for two rice bowls",
    th: "ราดน้ำปลาสองรอบ หมูปิ้งเค็มจนต้องรีบกินข้าว",
  },
  "chilli_fish-sauce_pork-skewer": {
    en: "Fish sauce and chili, every home's skewer recipe",
    th: "น้ำปลาพริกคู่หมูปิ้ง สูตรเด็ดทุกบ้าน",
  },
  "fish-sauce_lime_pork-skewer": {
    en: "Fish sauce and lime, the classic skewer pairing",
    th: "น้ำปลามะนาว คู่หมูปิ้งแบบดั้งเดิม",
  },
  "fish-sauce_pepper_pork-skewer": {
    en: "Fish sauce and pepper, bold skewer flavor",
    th: "น้ำปลาพริกไทย คู่หมูปิ้งรสจัดจ้าน",
  },
  "cucumber_fish-sauce_pork-skewer": {
    en: "Fish sauce and cucumber, a lighter skewer meal",
    th: "น้ำปลาแตงกวา คู่หมูปิ้งแบบเบาๆ",
  },
  "fish-sauce_pork-skewer_sticky-rice": {
    en: "Fish sauce over skewers with sticky rice, stuffed full",
    th: "น้ำปลาราดหมูปิ้ง กินคู่ข้าวเหนียวจนอิ่มแปล้",
  },
  "boxing_fish-sauce_pork-skewer": {
    en: "Fish sauce and skewers, comfy in boxing shorts",
    th: "ราดน้ำปลาหมูปิ้ง กินสบายในกางเกงมวย",
  },
  "chair_fish-sauce_pork-skewer": {
    en: "Plastic chair, fish sauce, skewers for the win",
    th: "นั่งเก้าอี้งานวัด ราดน้ำปลากินหมูปิ้ง",
  },
  "fish-sauce_lottery_pork-skewer": {
    en: "Fish sauce skewers while waiting for the lottery draw",
    th: "กินหมูปิ้งราดน้ำปลา รอฟังผลลอตเตอรี่",
  },
  "chilli_chilli_pork-skewer": {
    en: "Double chili dip, skewers so spicy you need a break",
    th: "จิ้มพริกสองรอบ หมูปิ้งเผ็ดจนต้องพักปาก",
  },
  "chilli_lime_pork-skewer": {
    en: "Chili and lime, sour-spicy skewer perfection",
    th: "พริกมะนาวคู่หมูปิ้ง เปรี้ยวเผ็ดครบรส",
  },
  "chilli_pepper_pork-skewer": {
    en: "Chili and pepper, double the heat on skewers",
    th: "พริกพริกไทยคู่หมูปิ้ง เผ็ดร้อนสองเท่า",
  },
  "chilli_cucumber_pork-skewer": {
    en: "Chili and cucumber, spicy skewers with a quick fix",
    th: "พริกแตงกวาคู่หมูปิ้ง เผ็ดแล้วแก้ได้ทัน",
  },
  "chilli_pork-skewer_sticky-rice": {
    en: "Chili-dipped skewers with sticky rice, plate cleaned",
    th: "จิ้มพริกหมูปิ้ง กินคู่ข้าวเหนียวจนหมดจาน",
  },
  "boxing_chilli_pork-skewer": {
    en: "Spicy skewers make you sweat, loose shorts save the day",
    th: "กินหมูปิ้งจิ้มพริกจนเหงื่อออก ใส่กางเกงมวยสบายตัว",
  },
  "chair_chilli_pork-skewer": {
    en: "Plastic chair, chili-dipped skewers, spicy afternoon",
    th: "นั่งเก้าอี้งานวัด จิ้มพริกกินหมูปิ้งจนเผ็ดปาก",
  },
  "chilli_lottery_pork-skewer": {
    en: "Spicy skewers and a racing heart waiting on the lottery",
    th: "กินหมูปิ้งจิ้มพริก รอลุ้นผลลอตเตอรี่ใจเต้น",
  },
  "lime_lime_pork-skewer": {
    en: "Two limes squeezed, skewers sour enough to pucker",
    th: "บีบมะนาวสองลูก หมูปิ้งเปรี้ยวจนหน้าย่น",
  },
  "lime_pepper_pork-skewer": {
    en: "Lime and pepper, just the right sour-spicy balance",
    th: "มะนาวพริกไทยคู่หมูปิ้ง เปรี้ยวหอมกำลังดี",
  },
  "cucumber_lime_pork-skewer": {
    en: "Lime and cucumber, refreshing with every bite",
    th: "มะนาวแตงกวาคู่หมูปิ้ง สดชื่นทุกคำ",
  },
  "lime_pork-skewer_sticky-rice": {
    en: "Lime-drizzled skewers with sticky rice, time flies",
    th: "บีบมะนาวใส่หมูปิ้ง กินคู่ข้าวเหนียวจนลืมเวลา",
  },
  "boxing_lime_pork-skewer": {
    en: "Extra sour skewers, bloated belly saved by loose shorts",
    th: "กินหมูปิ้งมะนาวจัด ท้องป่องต้องพึ่งกางเกงมวย",
  },
  "chair_lime_pork-skewer": {
    en: "Plastic chair, lime squeezed on skewers, pure bliss",
    th: "นั่งเก้าอี้งานวัด บีบมะนาวใส่หมูปิ้งเพลินๆ",
  },
  "lime_lottery_pork-skewer": {
    en: "Sour skewers and a nervous wait for lottery numbers",
    th: "กินหมูปิ้งมะนาว รอฟังผลลอตเตอรี่ใจตุ๊มๆ ต่อมๆ",
  },
  "pepper_pepper_pork-skewer": {
    en: "Double pepper skewers so fragrant, neighbors ask",
    th: "โรยพริกไทยสองรอบ หมูปิ้งหอมจนเพื่อนบ้านถาม",
  },
  "cucumber_pepper_pork-skewer": {
    en: "Pepper and cucumber, fragrant and fresh skewers",
    th: "พริกไทยแตงกวาคู่หมูปิ้ง หอมสดชื่นในคำเดียว",
  },
  "boxing_pepper_pork-skewer": {
    en: "Peppered skewers, comfy in favorite boxing shorts",
    th: "โรยพริกไทยหมูปิ้ง กินสบายในกางเกงมวยตัวโปรด",
  },
  "chair_pepper_pork-skewer": {
    en: "Plastic chair, peppered skewers, easy evening",
    th: "นั่งเก้าอี้งานวัด กินหมูปิ้งโรยพริกไทยเพลิน",
  },
  "lottery_pepper_pork-skewer": {
    en: "Peppered skewers while the radio calls lottery numbers",
    th: "กินหมูปิ้งโรยพริกไทย รอฟังผลลอตเตอรี่ทางวิทยุ",
  },
  "cucumber_cucumber_pork-skewer": {
    en: "Two cucumber slices can't save these spicy skewers",
    th: "แตงกวาสองชิ้นก็เอาไม่อยู่ หมูปิ้งเผ็ดเกินไป",
  },
  "cucumber_pork-skewer_sticky-rice": {
    en: "Cucumber cools the heat, skewers with sticky rice",
    th: "แตงกวาแก้เผ็ด กินคู่หมูปิ้งข้าวเหนียวพอดีมื้อ",
  },
  "boxing_cucumber_pork-skewer": {
    en: "Skewers and cucumber, trusty boxing shorts on standby",
    th: "กินหมูปิ้งแตงกวา ใส่กางเกงมวยตัวเก่งสบายพุง",
  },
  "chair_cucumber_pork-skewer": {
    en: "Plastic chair, skewers and cool cucumber slices",
    th: "นั่งเก้าอี้งานวัด กินหมูปิ้งแตงกวาเย็นๆ",
  },
  "cucumber_lottery_pork-skewer": {
    en: "Skewers, cucumber, and a relaxed lottery wait",
    th: "กินหมูปิ้งแตงกวา รอฟังผลลอตเตอรี่แบบชิลๆ",
  },
  "pork-skewer_sticky-rice_sticky-rice": {
    en: "Two packs of sticky rice, one skewer is plenty",
    th: "ข้าวเหนียวสองห่อ หมูปิ้งไม้เดียวก็อิ่มได้",
  },
  "boxing_pork-skewer_sticky-rice": {
    en: "Skewers and sticky rice, boxing shorts to the rescue",
    th: "กินหมูปิ้งข้าวเหนียวจนพุงกาง ใส่กางเกงมวยรอด",
  },
  "chair_pork-skewer_sticky-rice": {
    en: "Plastic chair, skewers and sticky rice at dusk",
    th: "นั่งเก้าอี้งานวัด กินหมูปิ้งข้าวเหนียวยามเย็น",
  },
  "lottery_pork-skewer_sticky-rice": {
    en: "Skewers, sticky rice, waiting on this month's lottery",
    th: "กินหมูปิ้งข้าวเหนียว รอฟังผลลอตเตอรี่งวดนี้",
  },
  "boxing_boxing_pork-skewer": {
    en: "Two spare boxing shorts, just in case of overeating",
    th: "มีกางเกงมวยสองตัวสำรอง เผื่อกินหมูปิ้งจนอ้วก",
  },
  "boxing_chair_pork-skewer": {
    en: "Plastic chair, boxing shorts, skewers at ease",
    th: "นั่งเก้าอี้งานวัด ใส่กางเกงมวยกินหมูปิ้งสบายๆ",
  },
  "boxing_lottery_pork-skewer": {
    en: "Boxing shorts, skewers, lottery ticket in hand",
    th: "ใส่กางเกงมวยกินหมูปิ้ง มือถือลอตเตอรี่รอผล",
  },
  "chair_chair_pork-skewer": {
    en: "Grabbed two plastic chairs, skewers while waiting",
    th: "แย่งเก้าอี้งานวัดสองตัว กินหมูปิ้งรอเพื่อนมา",
  },
  "lottery_lottery_pork-skewer": {
    en: "Two lottery tickets, skewers, heart racing for the draw",
    th: "ซื้อหวยสองใบ กินหมูปิ้งรอฟังผลใจเต้นแรง",
  },
  "rooster-bowl_rooster-bowl_rooster-bowl": {
    en: "A house full of rooster bowls, never runs out",
    th: "บ้านมีแต่ชามตราไก่ ใช้กี่ใบก็ไม่มีวันหมด",
  },
  "rooster-bowl_rooster-bowl_tray": {
    en: "Two rooster bowls and a lunch tray, classic Thai kitchen",
    th: "ชามตราไก่สองใบคู่ถาดหลุม ครัวไทยแท้ๆ",
  },
  "fish-sauce_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls of fish sauce, grandma's touch",
    th: "ชามตราไก่สองใบราดน้ำปลา รสมือยายแท้ๆ",
  },
  "chilli_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls of chili, double the heat",
    th: "ชามตราไก่สองใบใส่พริก เผ็ดคูณสอง",
  },
  "lime_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls of lime, sour all around",
    th: "ชามตราไก่สองใบบีบมะนาว เปรี้ยวทั้งโต๊ะ",
  },
  "pepper_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls of pepper, fragrant kitchen",
    th: "ชามตราไก่สองใบโรยพริกไทย หอมทั้งครัว",
  },
  "cucumber_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls of cucumber, doubly refreshing",
    th: "ชามตราไก่สองใบใส่แตงกวา สดชื่นคู่กัน",
  },
  "rooster-bowl_rooster-bowl_sticky-rice": {
    en: "Two rooster bowls with sticky rice, a full spread",
    th: "ชามตราไก่สองใบคู่ข้าวเหนียว มื้อนี้จัดเต็ม",
  },
  "boxing_rooster-bowl_rooster-bowl": {
    en: "Washing two rooster bowls in comfy boxing shorts",
    th: "ล้างชามตราไก่สองใบ ใส่กางเกงมวยตัวสบาย",
  },
  "chair_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls, plastic chair, waiting to eat",
    th: "ถือชามตราไก่สองใบ นั่งเก้าอี้งานวัดรอกิน",
  },
  "lottery_rooster-bowl_rooster-bowl": {
    en: "Two rooster bowls in one hand, lottery ticket in the other",
    th: "ถือชามตราไก่สองใบ มืออีกข้างกำลอตเตอรี่",
  },
  "rooster-bowl_tray_tray": {
    en: "Two lunch trays and a rooster bowl, grandma's kitchen",
    th: "ถาดหลุมสองใบคู่ชามตราไก่ ครัวคุณยายแท้ๆ",
  },
  "fish-sauce_rooster-bowl_tray": {
    en: "Fish sauce in a lunch tray, rooster bowl on the side",
    th: "น้ำปลาในถาดหลุม เสิร์ฟคู่ชามตราไก่มื้อบ้านๆ",
  },
  "chilli_rooster-bowl_tray": {
    en: "Chili in a lunch tray, rooster bowl for a spicy meal",
    th: "พริกในถาดหลุม เสิร์ฟคู่ชามตราไก่เผ็ดถึงใจ",
  },
  "lime_rooster-bowl_tray": {
    en: "Lime in a lunch tray, rooster bowl for extra sour",
    th: "มะนาวในถาดหลุม เสิร์ฟคู่ชามตราไก่เปรี้ยวจี๊ด",
  },
  "pepper_rooster-bowl_tray": {
    en: "Pepper in a lunch tray, fragrant rooster bowl meal",
    th: "พริกไทยในถาดหลุม เสิร์ฟคู่ชามตราไก่หอมกรุ่น",
  },
  "cucumber_rooster-bowl_tray": {
    en: "Cucumber in a lunch tray, refreshing rooster bowl",
    th: "แตงกวาในถาดหลุม เสิร์ฟคู่ชามตราไก่สดชื่น",
  },
  "rooster-bowl_sticky-rice_tray": {
    en: "Sticky rice in a lunch tray, hearty rooster bowl meal",
    th: "ข้าวเหนียวในถาดหลุม เสิร์ฟคู่ชามตราไก่มื้ออิ่ม",
  },
  "boxing_rooster-bowl_tray": {
    en: "Washing dishes in casual boxing shorts",
    th: "ล้างถาดหลุมชามตราไก่ ใส่กางเกงมวยตัวลำลอง",
  },
  "chair_rooster-bowl_tray": {
    en: "Plastic chair, lunch tray, rooster bowl for dinner",
    th: "นั่งเก้าอี้งานวัด ถือถาดหลุมชามตราไก่กินข้าว",
  },
  "lottery_rooster-bowl_tray": {
    en: "Lunch tray and rooster bowl while waiting for the draw",
    th: "ถือถาดหลุมชามตราไก่ รอฟังผลลอตเตอรี่ไปด้วย",
  },
  "fish-sauce_fish-sauce_rooster-bowl": {
    en: "Double fish sauce in a rooster bowl, salty enough for rice",
    th: "ราดน้ำปลาสองรอบในชามตราไก่ เค็มจนต้องรีบตักข้าว",
  },
  "chilli_fish-sauce_rooster-bowl": {
    en: "Fish sauce and chili in a rooster bowl, every Thai kitchen",
    th: "น้ำปลาพริกในชามตราไก่ สูตรเด็ดทุกครัวไทย",
  },
  "fish-sauce_lime_rooster-bowl": {
    en: "Fish sauce and lime in a rooster bowl, classic and bold",
    th: "น้ำปลามะนาวในชามตราไก่ รสจัดจ้านแบบดั้งเดิม",
  },
  "fish-sauce_pepper_rooster-bowl": {
    en: "Fish sauce and pepper in a rooster bowl, just right",
    th: "น้ำปลาพริกไทยในชามตราไก่ หอมฉุนกำลังดี",
  },
  "fish-sauce_rooster-bowl_sticky-rice": {
    en: "Fish sauce in a rooster bowl with sticky rice, stuffed",
    th: "น้ำปลาในชามตราไก่ กินคู่ข้าวเหนียวจนอิ่มแปล้",
  },
  "boxing_fish-sauce_rooster-bowl": {
    en: "Fish sauce in a rooster bowl, comfy in boxing shorts",
    th: "ราดน้ำปลาในชามตราไก่ กินสบายใส่กางเกงมวย",
  },
  "chair_fish-sauce_rooster-bowl": {
    en: "Plastic chair, rooster bowl, fish sauce drizzled on",
    th: "นั่งเก้าอี้งานวัด ถือชามตราไก่ราดน้ำปลากิน",
  },
  "fish-sauce_lottery_rooster-bowl": {
    en: "Fish sauce in a rooster bowl, lottery ticket in hand",
    th: "ราดน้ำปลาในชามตราไก่ มืออีกข้างถือลอตเตอรี่",
  },
  "chilli_chilli_rooster-bowl": {
    en: "Rooster bowl, double chili, need a break from the heat",
    th: "ชามตราไก่ใส่พริกสองรอบ เผ็ดจนต้องพักปาก",
  },
  "chilli_lime_rooster-bowl": {
    en: "Chili and lime in a rooster bowl, sour-spicy perfection",
    th: "พริกมะนาวในชามตราไก่ เปรี้ยวเผ็ดครบรส",
  },
  "chilli_pepper_rooster-bowl": {
    en: "Chili and pepper in a rooster bowl, double the heat",
    th: "พริกพริกไทยในชามตราไก่ เผ็ดร้อนสองเท่า",
  },
  "chilli_cucumber_rooster-bowl": {
    en: "Chili and cucumber in a rooster bowl, quick relief",
    th: "พริกแตงกวาในชามตราไก่ เผ็ดแล้วแก้ได้ทัน",
  },
  "chilli_rooster-bowl_sticky-rice": {
    en: "Chili in a rooster bowl with sticky rice, plate cleaned",
    th: "พริกในชามตราไก่ กินคู่ข้าวเหนียวจนหมดจาน",
  },
  "boxing_chilli_rooster-bowl": {
    en: "Spicy rooster bowl dip, boxing shorts keep it cool",
    th: "จิ้มพริกในชามตราไก่จนเหงื่อ ใส่กางเกงมวยคลายร้อน",
  },
  "chair_chilli_rooster-bowl": {
    en: "Plastic chair, spicy dip in a rooster bowl, eyes watering",
    th: "นั่งเก้าอี้งานวัด จิ้มพริกในชามตราไก่จนน้ำตาซึม",
  },
  "chilli_lottery_rooster-bowl": {
    en: "Chili in a rooster bowl, lottery ticket in the other hand",
    th: "ชามตราไก่ใส่พริก มืออีกข้างกำลอตเตอรี่รอผล",
  },
  "lime_lime_rooster-bowl": {
    en: "Two limes in a rooster bowl, sour enough to pucker",
    th: "บีบมะนาวสองลูกลงชามตราไก่ เปรี้ยวจนหน้าย่น",
  },
  "lime_pepper_rooster-bowl": {
    en: "Lime and pepper in a rooster bowl, just right",
    th: "มะนาวพริกไทยในชามตราไก่ เปรี้ยวหอมกำลังดี",
  },
  "cucumber_lime_rooster-bowl": {
    en: "Lime and cucumber in a rooster bowl, refreshing bite",
    th: "มะนาวแตงกวาในชามตราไก่ สดชื่นทุกคำ",
  },
  "lime_rooster-bowl_sticky-rice": {
    en: "Lime in a rooster bowl with sticky rice, time flies",
    th: "บีบมะนาวในชามตราไก่ กินคู่ข้าวเหนียวจนลืมเวลา",
  },
  "boxing_lime_rooster-bowl": {
    en: "Lime in a rooster bowl, comfy in boxing shorts",
    th: "บีบมะนาวในชามตราไก่ นั่งกินสบายในกางเกงมวย",
  },
  "chair_lime_rooster-bowl": {
    en: "Plastic chair, lime squeezed in a rooster bowl, easy day",
    th: "นั่งเก้าอี้งานวัด บีบมะนาวลงชามตราไก่เพลินๆ",
  },
  "lime_lottery_rooster-bowl": {
    en: "Lime in a rooster bowl, heart racing for the lottery",
    th: "บีบมะนาวในชามตราไก่ รอฟังผลลอตเตอรี่ใจเต้น",
  },
  "pepper_pepper_rooster-bowl": {
    en: "Double pepper in a rooster bowl, the whole house smells good",
    th: "โรยพริกไทยสองรอบในชามตราไก่ หอมทั้งบ้าน",
  },
  "cucumber_pepper_rooster-bowl": {
    en: "Pepper and cucumber in a rooster bowl, fresh and fragrant",
    th: "พริกไทยแตงกวาในชามตราไก่ หอมสดชื่นในคำเดียว",
  },
  "pepper_rooster-bowl_sticky-rice": {
    en: "Pepper in a rooster bowl with sticky rice, stuffed full",
    th: "โรยพริกไทยในชามตราไก่ กินคู่ข้าวเหนียวอิ่มแปล้",
  },
  "boxing_pepper_rooster-bowl": {
    en: "Pepper in a rooster bowl, comfy in boxing shorts",
    th: "โรยพริกไทยในชามตราไก่ กินสบายใส่กางเกงมวย",
  },
  "chair_pepper_rooster-bowl": {
    en: "Plastic chair, pepper in a rooster bowl, easy evening",
    th: "นั่งเก้าอี้งานวัด โรยพริกไทยในชามตราไก่เพลิน",
  },
  "lottery_pepper_rooster-bowl": {
    en: "Pepper in a rooster bowl while the radio calls numbers",
    th: "โรยพริกไทยในชามตราไก่ รอฟังผลลอตเตอรี่ทางวิทยุ",
  },
  "cucumber_cucumber_rooster-bowl": {
    en: "Two cucumber slices in a rooster bowl still not enough",
    th: "แตงกวาสองชิ้นในชามตราไก่ ยังไม่พอแก้เผ็ด",
  },
  "cucumber_rooster-bowl_sticky-rice": {
    en: "Cucumber in a rooster bowl with sticky rice, just right",
    th: "แตงกวาในชามตราไก่ กินคู่ข้าวเหนียวพอดีมื้อ",
  },
  "chair_cucumber_rooster-bowl": {
    en: "Plastic chair, cool cucumber from a rooster bowl",
    th: "นั่งเก้าอี้งานวัด กินแตงกวาจากชามตราไก่เย็นๆ",
  },
  "cucumber_lottery_rooster-bowl": {
    en: "Cucumber in a rooster bowl, a relaxed lottery wait",
    th: "แตงกวาในชามตราไก่ รอฟังผลลอตเตอรี่แบบชิลๆ",
  },
  "rooster-bowl_sticky-rice_sticky-rice": {
    en: "Two packs of sticky rice with a rooster bowl, food coma",
    th: "ข้าวเหนียวสองห่อคู่ชามตราไก่ อิ่มจนขยับไม่ไหว",
  },
  "boxing_rooster-bowl_sticky-rice": {
    en: "Sticky rice from a rooster bowl, boxing shorts to the rescue",
    th: "กินข้าวเหนียวจากชามตราไก่จนพุงกาง ใส่กางเกงมวยรอด",
  },
  "chair_rooster-bowl_sticky-rice": {
    en: "Plastic chair, sticky rice from a rooster bowl at dusk",
    th: "นั่งเก้าอี้งานวัด กินข้าวเหนียวจากชามตราไก่ยามเย็น",
  },
  "lottery_rooster-bowl_sticky-rice": {
    en: "Sticky rice from a rooster bowl, waiting on the lottery",
    th: "กินข้าวเหนียวจากชามตราไก่ รอฟังผลลอตเตอรี่งวดนี้",
  },
  "boxing_boxing_rooster-bowl": {
    en: "Washing a rooster bowl, two boxing shorts on rotation",
    th: "ล้างชามตราไก่ มีกางเกงมวยสองตัวสลับใส่",
  },
  "boxing_chair_rooster-bowl": {
    en: "Plastic chair, boxing shorts, rooster bowl for dinner",
    th: "นั่งเก้าอี้งานวัด ใส่กางเกงมวยถือชามตราไก่กินข้าว",
  },
  "chair_chair_rooster-bowl": {
    en: "Grabbed two plastic chairs, rooster bowl while waiting",
    th: "แย่งเก้าอี้งานวัดสองตัว ถือชามตราไก่รอเพื่อนมา",
  },
  "chair_lottery_rooster-bowl": {
    en: "Plastic chair, rooster bowl, waiting for the lottery draw",
    th: "นั่งเก้าอี้งานวัด ถือชามตราไก่รอฟังผลลอตเตอรี่",
  },
  "lottery_lottery_rooster-bowl": {
    en: "Rooster bowl in hand, two lottery tickets, heart racing",
    th: "ถือชามตราไก่ ซื้อหวยสองใบรอลุ้นผลใจเต้น",
  },
  "tray_tray_tray": {
    en: "A house full of lunch trays, never runs out",
    th: "บ้านมีแต่ถาดหลุม ใช้กี่ใบก็ไม่มีวันหมด",
  },
  "fish-sauce_tray_tray": {
    en: "Two lunch trays with fish sauce, home-cooked flavor",
    th: "ถาดหลุมสองใบราดน้ำปลา รสมือแม่ครัวแท้ๆ",
  },
  "chilli_tray_tray": {
    en: "Two lunch trays of chili, double the heat",
    th: "ถาดหลุมสองใบใส่พริก เผ็ดคูณสอง",
  },
  "lime_tray_tray": {
    en: "Two lunch trays of lime, sour all around",
    th: "ถาดหลุมสองใบบีบมะนาว เปรี้ยวทั้งโต๊ะ",
  },
  "pepper_tray_tray": {
    en: "Two lunch trays of pepper, cafeteria smells amazing",
    th: "ถาดหลุมสองใบโรยพริกไทย หอมทั้งโรงอาหาร",
  },
  "cucumber_tray_tray": {
    en: "Two lunch trays of cucumber, doubly refreshing",
    th: "ถาดหลุมสองใบใส่แตงกวา สดชื่นคู่กัน",
  },
  "sticky-rice_tray_tray": {
    en: "Two lunch trays with sticky rice, a full spread",
    th: "ถาดหลุมสองใบคู่ข้าวเหนียว มื้อนี้จัดเต็ม",
  },
  "boxing_tray_tray": {
    en: "Washing two lunch trays in comfy boxing shorts",
    th: "ล้างถาดหลุมสองใบ ใส่กางเกงมวยตัวสบาย",
  },
  "chair_tray_tray": {
    en: "Two lunch trays, plastic chair, waiting to eat",
    th: "ถือถาดหลุมสองใบ นั่งเก้าอี้งานวัดรอกิน",
  },
  "lottery_tray_tray": {
    en: "Two lunch trays in one hand, lottery ticket in the other",
    th: "ถือถาดหลุมสองใบ มืออีกข้างกำลอตเตอรี่",
  },
  "fish-sauce_fish-sauce_tray": {
    en: "Double fish sauce in a lunch tray, salty enough for rice",
    th: "ราดน้ำปลาสองรอบในถาดหลุม เค็มจนต้องรีบตักข้าว",
  },
  "chilli_fish-sauce_tray": {
    en: "Fish sauce and chili in a lunch tray, cafeteria classic",
    th: "น้ำปลาพริกในถาดหลุม สูตรเด็ดโรงอาหาร",
  },
  "fish-sauce_lime_tray": {
    en: "Fish sauce and lime in a lunch tray, classic and bold",
    th: "น้ำปลามะนาวในถาดหลุม รสจัดจ้านแบบดั้งเดิม",
  },
  "fish-sauce_pepper_tray": {
    en: "Fish sauce and pepper in a lunch tray, just right",
    th: "น้ำปลาพริกไทยในถาดหลุม หอมฉุนกำลังดี",
  },
};

/** Shown when a drawn combination has no tagline yet (spec FR7). */
export const FALLBACK_TAGLINE: Tagline = {
  en: "This secret combination hasn't been discovered yet…",
  th: "ส่วนผสมลับนี้ยังไม่ถูกค้นพบ…",
};
