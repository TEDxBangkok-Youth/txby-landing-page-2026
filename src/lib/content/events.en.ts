/**
 * English editorial content for /events/[year]. Paired with events.th.ts;
 * `src/lib/events.ts` zips this together with the non-localized data in
 * `SHARED_EVENTS` by `year`, and by array index for `speakers` / `photos`.
 *
 * This is new copy, not a literal translation — see the copywriting pass
 * described in the Dev B handoff. Two things worth knowing when editing:
 *
 * - Dates: Thai source dates use the Buddhist era (CE + 543). `date` here
 *   is already converted — 23 พฤศจิกายน 2568 → 23 November 2025, and
 *   17 พฤศจิกายน 2567 → 17 November 2024.
 * - Names: `nickname` / `fullName` are Latin transliterations of the Thai
 *   originals in events.th.ts (โฟกัส → Focus), not translations. They are
 *   the same people, spelled for an English reader.
 */

import type { LocalizedEventYear } from "@/lib/events";

export const eventsEn: LocalizedEventYear[] = [
  {
    year: "2025",
    theme: "Woven Talks",
    date: "23 November 2025",
    venue: "Bangkok Art and Culture Centre",
    description:
      "Twelve stories, twelve voices, twelve different roads — woven from experience, dreams, hope, and heartbreak, and told with care so your heart grows a little bigger by the end.",
    coverAlt: "Atmosphere at TEDxBangkok Youth 2025",
    speakers: [
      {
        nickname: "JangJang",
        fullName: "Jantarapim Sungnimit",
        oneLiner:
          "A girl who wants us to look at the \"dinner table\" again — not just a place to set plates, but a place to set a family's trust. Sometimes the understanding we've searched for our whole lives starts with sitting back down at that same table.",
        talkTitle: "Family Ties",
      },
      {
        nickname: "Khunpol",
        fullName: "Khunpol Charoenlapnumchai",
        oneLiner:
          "A young person who believes finding yourself isn't a race, but growing at your own pace — so we can pause, reflect, and move forward with understanding.",
        talkTitle: "Finding Yourself",
      },
      {
        nickname: "Khaimoog",
        fullName: "Chananya Lertwatthanamongkol",
        oneLiner:
          "From a girl who grew up amid stage lights and expectations, to learning to see her own worth in every small step of growing up.",
        talkTitle: "Seeing My Own Worth, Right Now",
      },
      {
        nickname: "Paint",
        fullName: "Warintorn Sengsuwan",
        oneLiner:
          "A young person who believes in the power of \"teachers\" and stands up to defend the value of a profession that's too often overlooked.",
        talkTitle: "Teacher Empowerment",
      },
      {
        nickname: "Mookmix",
        fullName: "Natcha Boonroj",
        oneLiner:
          "A 'star conservationist' who wants the stars to stay in Thailand's sky, because she believes city people can still 'see' the stars — if we all help.",
        talkTitle: "Conserving the Stars",
      },
      {
        nickname: "Oon-Oon",
        fullName: "Termoon Sanpakaew",
        oneLiner:
          "A 20-year-old who once survived because of \"books,\" and learned that reading doesn't just give you \"knowledge\" — it adds to \"life\" itself.",
        talkTitle: "Preserving the Reading Culture",
      },
      {
        nickname: "Saint",
        fullName: "Phoomphat Wilachuenphon",
        oneLiner:
          "A young person who grew up inside the \"boxes\" others drew, to the day he learned that being yourself starts with daring to step outside them and question them.",
        talkTitle: "Self Love / LGBTQ+",
      },

      {
        nickname: "Bamboo",
        fullName: "Onwara Thumrongphonsawad",
        oneLiner:
          "From someone who never felt confident, always compared to everyone around her, to seeing her own worth again through one simple thing: a compliment.",
        talkTitle: "A Compliment, a Small Happiness",
      },
      {
        nickname: "Faaef",
        fullName: "Asfan Yusoh",
        oneLiner:
          "A young man from Yala who champions \"building an art community,\" believing the power of community can change a city.",
        talkTitle: "Building an Art Community",
      },
      {
        nickname: "Bayla",
        fullName: "Chanya Somboonvechakarn",
        oneLiner:
          "A 13-year-old who picked up the piano at age three, now a young artist who's learned that perfection doesn't come from talent alone.",
        talkTitle: "Music and Becoming Yourself",
      },
      {
        nickname: "Unda",
        fullName: "Kulteera Yordchang",
        oneLiner:
          "A girl who grew up in showbiz from a young age, to discovering that the \"performing arts\" are more than beauty — they can truly \"heal\" people.",
        talkTitle: "The Performing Arts",
      },
      {
        nickname: "Peach",
        fullName: "Penpitcha Prasongcharon",
        oneLiner:
          "A life that once saw only emptiness — she wove faith and her mother's teachings, hidden in the small things she gathered, into a 'safe space' in the present.",
        talkTitle: "Faith and the Safe Space Woven From My Mother's Teachings",
      },
    ],
    photos: [
      { alt: "A packed room before TEDxBangkok Youth 2025 begins" },
      { alt: "The registration desk" },
      { alt: "A speaker rehearsing on stage before doors open" },
      { alt: "The audience during a break" },
      { alt: "The red circle stage under the lights" },
      { alt: "The workshop activity zone" },
      { alt: "The volunteer team backstage" },
      { alt: "The closing group photo with speakers and crew" },
    ],
  },
  {
    year: "2024",
    theme: "Coming Home",
    date: "17 November 2024",
    venue: "Bangkok Art and Culture Centre",
    description:
      "Ten stories about coming home — a new generation who traveled far to find themselves, only to discover the answer was waiting right where they started.",
    speakers: [
      {
        nickname: "Um",
        fullName: "Nattida Pongpipat",
        oneLiner: "The rice-shop owner's daughter who ran far away and walked herself back.",
        talkTitle: "Coming Home Before I'd Made It",
      },
      {
        nickname: "Ball",
        fullName: "Poramin Sukcharoen",
        oneLiner: "A kid from the provinces who spent three years learning how to know Bangkok.",
        talkTitle: "The City That Never Learned My Name",
      },
      {
        nickname: "Nan",
        fullName: "Sasiwimon Chaiprasert",
        oneLiner: "The eldest sister who grew up years faster than her age.",
        talkTitle: "Grown Up Before My Birthday",
      },
      {
        nickname: "Ta",
        fullName: "Kittipop Wandee",
        oneLiner: "A school footballer who stopped running after everyone else's expectations.",
        talkTitle: "Leaving a Field That Was Never Mine",
      },
      {
        nickname: "Im",
        fullName: "Thanchanok Ruangsri",
        oneLiner: "A girl who wrote home every week and never mailed a single letter.",
        talkTitle: "The Letters I Never Sent",
      },
      {
        nickname: "Phum",
        fullName: "Phumrapee Insuk",
        oneLiner: "A grandson who started learning his grandmother's dialect one year too late.",
        talkTitle: "The Language That Left With My Grandmother",
      },
      {
        nickname: "Fern",
        fullName: "Chanisara Boonyong",
        oneLiner: "An art student who drew her own house over and over until she could remember it right.",
        talkTitle: "Drawing Home From Memory",
      },
      {
        nickname: "Korn",
        fullName: "Thanakorn Apichart",
        oneLiner: "A boy who changed schools six times before he turned fifteen.",
        talkTitle: "New Friends Every School Year",
      },
      {
        nickname: "Mook",
        fullName: "Pornchanok Theerawat",
        oneLiner: "Caught between two cultures, it took her years to realize she didn't have to pick one.",
        talkTitle: "I Get to Be Both",
      },
      {
        nickname: "Jay",
        fullName: "Jirayu Sathapornkul",
        oneLiner: "A boy who was taking care of his parents before he'd even finished high school.",
        talkTitle: "Head of the Family at Seventeen",
      },
    ],
    photos: [
      { alt: "The scene at TEDxBangkok Youth 2024" },
      { alt: "The audience in the hall" },
      { alt: "A backstage Q&A" },
      { alt: "The 2024 crew and speakers" },
    ],
  },
];
