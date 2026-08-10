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
        nickname: "Poon",
        fullName: "Poon Ariyawong",
        oneLiner: "The back-row kid who built a whole world out of losing.",
        talkTitle: "The Game That Taught Me How to Lose",
      },
      {
        nickname: "Yada",
        fullName: "Yada Techawiboon",
        oneLiner: "The girl who went out to measure air everyone said was invisible.",
        talkTitle: "The Dust We All Breathe",
      },
      {
        nickname: "Pim",
        fullName: "Pimchanok Chotiwat",
        oneLiner: "The nursing student who learned to care for others before she learned to rest.",
        talkTitle: "Caring for Everyone Except Myself",
      },
      {
        nickname: "Kan",
        fullName: "Kan Sriworakul",
        oneLiner: "The boy who hears melody in the noise everyone else calls annoying.",
        talkTitle: "Noise Can Be Music Too",
      },
      {
        nickname: "Nich",
        fullName: "Oranicha Boonmak",
        oneLiner: "An 18-year-old photographer chasing the city nobody wants to photograph.",
        talkTitle: "The City Nobody Photographs",
      },
      {
        nickname: "Tam",
        fullName: "Teerat Nilkamhaeng",
        oneLiner: "The kid who grew up with siren sounds and other people's first minutes of life.",
        talkTitle: "The First Twelve Minutes",
      },
      {
        nickname: "Maprang",
        fullName: "Paweenuch Thongprasert",
        oneLiner: "A girl who grew up under stage lights and everyone's expectations.",
        talkTitle: "Laughing Before the Hurt Was Over",
      },
      {
        nickname: "Focus",
        fullName: "Chayakorn Waiyakit",
        oneLiner: "A designer stitching a new self out of fabric scraps other people threw away.",
        talkTitle: "The Scraps That Became Me",
      },
      {
        nickname: "Ice",
        fullName: "Nichapat Wongcharoen",
        oneLiner: "A debater better at losing than winning.",
        talkTitle: "Losing on Stage Isn't the End",
      },
      {
        nickname: "Prae",
        fullName: "Passorn Damrongphan",
        oneLiner: "A girl tired of the old rules, so she rewrote the whole rulebook.",
        talkTitle: "The Rules I Wrote Myself",
      },
      {
        nickname: "June",
        fullName: "Kamonchanok Srisawat",
        oneLiner: "An exchange student who came home to the same house in a city that wasn't the same anymore.",
        talkTitle: "The Home That Changed While I Was Gone",
      },
      {
        nickname: "Por",
        fullName: "Supitchaya Thammawat",
        oneLiner: "The school's daily announcer whose hands still shake every time she picks up the mic.",
        talkTitle: "The Microphone My Hands Still Shake For",
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
