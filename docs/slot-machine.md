# Spec: Secret Thaigredient — Slot Machine Feature

> **สถานะเอกสารนี้:** ระบุเฉพาะ **Functional Requirements + Feature Behavior** สำหรับ implement เป็น Next.js Component เท่านั้น
> เรื่อง **Design / Layout / ตำแหน่งวาง / Asset ภาพ / Animation choreography** จะระบุเพิ่มเติมภายหลัง — ห้ามตัดสินใจเรื่องเหล่านี้เองในรอบ implement นี้ ให้ทำเฉพาะโครงสร้าง logic/state/data ที่รองรับได้ทุกแบบ

---

## 1. Overview

**โปรเจกต์:** Secret Thaigredient — feature ธีม "ส่วนผสมลับฉบับคนไทย" สำหรับงาน **TEDxBangkokYouth**
กลุ่มเป้าหมายมีทั้งคนไทยและชาวต่างชาติ

**สิ่งที่ feature นี้ทำ:** เป็น Slot Machine บนเว็บ ที่สุ่ม "ของไทย" 3 อย่างจากทั้งหมด 12 อย่าง เมื่อสุ่มเสร็จ ระบบจะแสดงเรื่องราวสั้นๆ (Tagline) แบบสองภาษา (ไทย/อังกฤษ) ที่บอกว่าของ 3 อย่างนี้รวมกันแล้วทำให้นึกถึงอะไรในความเป็นไทย

---

## 2. Core Concept & Data Source

### 2.1 Item Pool (fixed, 12 รายการ)

> ⚠️ **สำคัญ:** ลำดับ index 0–11 ด้านล่างนี้ **ต้องคงไว้ตามนี้เป๊ะๆ** เพราะเป็น canonical order ที่ใช้ generate ชุดข้อมูล combination ทั้งหมด (364 ชุด) การเรียง key เพื่อ lookup ผลลัพธ์ต้องอิงลำดับนี้ ไม่ใช่เรียงตามตัวอักษร

| Index | id (suggested) | ชื่อไทย | English |
|---|---|---|---|
| 0 | `moo-ping` | หมูปิ้ง | Pork Skewers |
| 1 | `rooster-bowl` | ชามตราไก่ | Rooster Bowl |
| 2 | `compartment-tray` | ถาดหลุม | Compartment Tray |
| 3 | `fish-sauce` | น้ำปลา | Fish Sauce |
| 4 | `chili` | พริก | Chili |
| 5 | `lime` | มะนาว | Lime |
| 6 | `pepper` | พริกไทย | Pepper |
| 7 | `cucumber` | แตงกวา | Cucumber |
| 8 | `sticky-rice` | ข้าวเหนียว | Sticky Rice |
| 9 | `boxing-shorts` | กางเกงมวย | Boxing Shorts |
| 10 | `temple-chair` | เก้าอี้งานวัด | Temple Fair Chair |
| 11 | `lottery-ticket` | ลอตเตอรี่ | Lottery Ticket |

### 2.2 Combination Dataset

- ผลลัพธ์ที่เป็นไปได้ทั้งหมด = การเลือก 3 อย่างจาก 12 อย่าง **แบบซ้ำกันได้ ลำดับไม่สำคัญ** (combination with repetition) = `C(14,3) = 364` ชุด
- แต่ละชุดที่ไม่ซ้ำกัน (unordered, unique) จะ map ไปยังเนื้อหา 1 ชุด: `taglineTh` และ `taglineEn` (ความยาว ≤ 60 ตัวอักษรต่อภาษา)
- ชุดข้อมูลนี้กำลังถูกสร้างแยกต่างหาก (ปัจจุบันอยู่ใน Excel `secret_thaigredient_combinations.xlsx`) — **ก่อน implement ต้อง export เป็น JSON ตาม Data Model ในข้อ 3** ห้ามสมมติว่าข้อมูลครบ 364 ชุดเสมอ (ดู FR7 เรื่อง fallback)

---

## 3. Data Model (TypeScript)

```ts
type ItemId =
  | "moo-ping" | "rooster-bowl" | "compartment-tray" | "fish-sauce"
  | "chili" | "lime" | "pepper" | "cucumber" | "sticky-rice"
  | "boxing-shorts" | "temple-chair" | "lottery-ticket";

interface ThaigredientItem {
  id: ItemId;
  index: number;      // 0–11, ตามตาราง 2.1 — ใช้เป็น sort key
  nameTh: string;
  nameEn: string;
}

interface Combination {
  key: string;                          // canonical key เช่น "0-0-1" (ดูข้อ 5.3)
  itemIds: [ItemId, ItemId, ItemId];    // เรียงตาม index จากน้อยไปมาก
  taglineTh: string;                    // <= 60 ตัวอักษร
  taglineEn: string;                    // <= 60 ตัวอักษร
}
```

- `items.json` → `ThaigredientItem[]` (12 รายการ)
- `combinations.json` → `Combination[]` (สูงสุด 364 รายการ)

---

## 4. Functional Requirements

### 4.1 Item Pool
- **FR1** — ระบบมี pool ของ 12 items คงที่ตามข้อ 2.1 โหลดจาก static data ไม่ใช่ hardcode ใน component

### 4.2 Spin / Randomization
- **FR2** — เมื่อ user trigger การ "spin" (เช่น กดปุ่ม) ระบบจะสุ่มเลือก item **อิสระต่อกัน (independent)** และ **มีโอกาสเท่ากันทุก item (uniform)** จำนวน 3 ครั้ง จาก pool 12 อย่าง แบบ **สุ่มซ้ำได้ (with replacement)** — เทียบเท่ากับแต่ละ reel สุ่มเองอิสระ 1-12
- **FR3** — ระหว่าง spin กำลังทำงาน ปุ่ม spin ต้องถูก disable ป้องกันการกด spin ซ้อนกัน
- **FR4** — spin มีระยะเวลาขั้นต่ำก่อนแสดงผล (ค่า exact เวลา/รูปแบบ animation **ยังไม่กำหนดในสเปกนี้** — ให้ implement เป็นค่า config ที่ปรับได้ เช่น `SPIN_DURATION_MS`, default ชั่วคราว 2000–3000ms)

### 4.3 Result Resolution
- **FR5** — เมื่อสุ่มครบ 3 item แล้ว ระบบต้องสร้าง **canonical key** โดยเรียง 3 item ตาม `index` (น้อย→มาก) แล้ว join เป็น string เช่น `[4, 0, 4]` → เรียงแล้ว `[0, 4, 4]` → key = `"0-4-4"`
- **FR6** — นำ canonical key ไป lookup ใน `combinations.json` เพื่อดึง `taglineTh` / `taglineEn` ที่ตรงกัน
- **FR7** — ถ้า lookup ไม่พบ (กรณีข้อมูลยังไม่ครบ 364 ชุด) ระบบต้องมี **fallback tagline** ที่กำหนดไว้ล่วงหน้าทั้งสองภาษา (เช่น "ส่วนผสมลับนี้ยังไม่ถูกค้นพบ..." / "This secret combination hasn't been discovered yet...") — **ห้าม error หรือแสดงหน้าว่าง**
- **FR8** — แสดงผลลัพธ์: 3 items ที่สุ่มได้ (ตามลำดับที่ reel หยุด ไม่ต้องเรียงใหม่ตอนแสดงผล) + tagline ภาษาที่เลือกอยู่

### 4.4 Language
- **FR9** — รองรับสลับภาษาแสดงผลระหว่างไทย (default) และอังกฤษ กระทบต่อ: tagline ที่แสดง และ UI copy อื่นๆ ที่จะระบุเพิ่มเติม (**Open Question** — ดูข้อ 6)
- **FR10** — ค่าภาษาที่เลือกคงอยู่ตลอด session (client state พอ) ไม่จำเป็นต้อง persist ข้าม reload เว้นแต่ระบุเพิ่มภายหลัง

### 4.5 Reset / Repeat
- **FR11** — หลังแสดงผลลัพธ์แล้ว user สามารถกด "Spin Again" เพื่อกลับไป state spinning และทำ FR2–FR8 ซ้ำได้
- **FR12** — ไม่จำกัดจำนวนครั้งที่ spin ได้ต่อ session เว้นแต่ระบุเพิ่มเติม (**Open Question** — ดูข้อ 6)

### 4.6 Share Result (Optional — ต้อง confirm ก่อน implement)
- **FR13** — (ยังไม่ยืนยัน) ปุ่ม copy ผลลัพธ์ (ชื่อ 3 items + tagline) เป็นข้อความ ไป clipboard — ไม่ต้องทำ export เป็นรูปภาพ เว้นแต่ระบุเพิ่มเติม

---

## 5. Technical / Component Requirements (Next.js)

### 5.1 Data Delivery
- Bundle `items.json` และ `combinations.json` เป็น static file ที่ build time — ข้อมูลเล็ก (< 100KB) ไม่ต้องใช้ database หรือ API call
- มี typed loader กลาง เช่น `lib/thaigredient/data.ts` ที่ export array/map ที่ type แล้ว

### 5.2 Suggested Component Structure

> โครงสร้าง path/ตำแหน่งเป็นแค่ข้อเสนอเพื่อรองรับ logic ด้านบน **ยังไม่ใช่ final placement** จะ confirm ทีหลัง

```
lib/thaigredient/
  types.ts          # Data Model (ข้อ 3)
  data.ts           # loader สำหรับ items.json / combinations.json
  randomDraw.ts      # () => [ItemId, ItemId, ItemId]   -- FR2
  getResult.ts       # (itemIds) => Combination | undefined  -- FR5-FR7

components/SlotMachine/
  SlotMachine.tsx     # "use client" — owns state machine, orchestration
  Reel.tsx            # single reel, รับ target item + spinning flag
  ResultPanel.tsx      # แสดงผล 3 items + tagline สองภาษา
  LanguageToggle.tsx   # สลับ TH/EN
```

### 5.3 State Machine

```ts
type SpinState =
  | { status: "idle" }
  | { status: "spinning" }
  | { status: "result"; itemIds: [ItemId, ItemId, ItemId]; combination: Combination };
```

- ใช้ local state (`useState` / `useReducer`) พอ ไม่จำเป็นต้องมี external state library
- Transition: `idle → spinning (FR2-FR4) → result (FR5-FR8)`, และ `result → spinning` เมื่อกด Spin Again (FR11)

### 5.4 Pure Function Contracts (สำหรับ unit test)

```ts
function randomDraw(): [ItemId, ItemId, ItemId];
// FR2 — สุ่มอิสระ, uniform, with replacement

function getComboKey(itemIds: ItemId[]): string;
// FR5 — เรียงตาม index แล้ว join ด้วย "-"

function getResult(itemIds: ItemId[]): Combination | undefined;
// FR6-FR7 — lookup + คืน undefined ถ้าไม่พบ (caller จัดการ fallback เอง)
```

ทั้งสามฟังก์ชันต้อง **ไม่มี DOM dependency** เพื่อให้ unit test ได้ตรงๆ (เช่น เทส distribution, เทส key เรียงถูกไม่ว่าจะ draw ลำดับไหน, เทส fallback path)

### 5.5 Accessibility
- **FR14** — เคารพ `prefers-reduced-motion`: ถ้า user ตั้งค่านี้ไว้ ต้อง resolve ผลลัพธ์โดยไม่ยืด animation ยาว (ยังคง delay ขั้นต่ำได้ถ้าจำเป็นเพื่อความ suspense — ไม่บังคับ)
- **FR15** — ผลลัพธ์ต้องประกาศผ่าน `aria-live="polite"` region เมื่อพร้อมแสดง
- **FR16** — ปุ่ม spin ต้องเป็น `<button>` จริง กด keyboard ได้

---

## 6. Open Questions (ต้อง confirm ก่อน implement บางส่วน)

| # | คำถาม | Default ที่ใช้ถ้ายังไม่ confirm |
|---|---|---|
| Q1 | ระยะเวลา/รูปแบบ animation การหมุน exact เท่าไหร่ | Config ปรับได้ ค่าเริ่มต้น 2-3s (ไม่ผูก logic) |
| Q2 | ถ้าสุ่มได้ผลซ้ำกับรอบก่อนหน้า (ติดกัน) ต้อง re-roll หรือปล่อยผ่าน | ปล่อยผ่าน — สุ่มจริงอนุญาตให้ซ้ำได้ |
| Q3 | จำกัดจำนวนครั้ง spin ต่อ user/session สำหรับหน้างาน (ควบคุมคิว kiosk) หรือไม่ | ไม่จำกัด จนกว่าจะระบุเพิ่ม |
| Q4 | ถ้าข้อมูล 364 ชุดไม่ครบตอน launch งานจริง ยอมรับ fallback ได้ไหม หรือต้องครบ 100% ก่อนขึ้นงาน | FR7 fallback ใช้ได้ชั่วคราว แต่ควร flag ให้ทีมเนื้อหารู้ |
| Q5 | ต้องการ sound effect / haptic feedback ไหม | Out of scope รอบนี้ |
| Q6 | ต้องการ sync ข้ามเครื่อง/kiosk (เช่น leaderboard ว่าชุดไหนออกบ่อยสุด) ไหม | Out of scope รอบนี้ ถ้าต้องการ ต้องเพิ่ม backend/storage layer แยก |
| Q7 | UI copy อื่นๆ นอกจาก tagline ที่ต้อง i18n มีอะไรบ้าง (ปุ่ม, headline, ฯลฯ) | ยังไม่ระบุ — ทำ i18n hook ไว้รองรับ แต่ยังไม่ต้อง fill ข้อความจริงทั้งหมด |

---

## 7. Out of Scope (สำหรับรอบ implement นี้)

- Visual design, layout, ตำแหน่งวางบนหน้าเว็บ, สี, typography, asset ภาพ/ไอคอนของ 12 items
- รายละเอียด animation choreography (นอกเหนือจาก timing constraint แบบ functional ในข้อ 4.2)
- Route/page path จริงที่จะ mount component นี้
- Backend/analytics integration ใดๆ นอกจากที่ระบุว่า optional
