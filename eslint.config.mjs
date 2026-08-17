import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Design-system guardrails.
 *
 * The point of the token layer is that a colour or a piece of chrome
 * has exactly one definition. These two rules stop the codebase
 * drifting back: inline styles bypass the tokens entirely, and a hex
 * literal in a component is a value that no theme can reassign.
 *
 * Runtime-computed geometry is the legitimate exception — see the
 * per-file override at the bottom, which lifts the inline-style rule
 * for the handful of files that need it and nothing else.
 */
const noInlineStyle = {
  selector: "JSXAttribute[name.name='style']",
  message:
    "Style with token-driven Tailwind classes, not inline styles. If the value is genuinely computed at runtime, add the file to the allowlist in eslint.config.mjs.",
};

/**
 * The colour half of the guardrails. Split out so a file that has a
 * legitimate reason to compute geometry inline still cannot smuggle a
 * hex value past the token layer — the two exemptions are unrelated,
 * and turning the whole rule off for one grants the other by accident.
 */
const noHexColours = [
  {
    selector:
      "Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
    message:
      "No hex colours in components. Add the value to src/styles/primitives.css and reference it through a semantic role.",
  },
  {
    selector:
      "TemplateElement[value.raw=/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b/]",
    message:
      "No hex colours in components. Add the value to src/styles/primitives.css and reference it through a semantic role.",
  },
  {
    // Tailwind's arbitrary-value escape hatch: bg-[#00A14B].
    selector: "Literal[value=/\\[#[0-9a-fA-F]{3,8}\\]/]",
    message:
      "No hex colours in arbitrary Tailwind values. Add the value to src/styles/primitives.css and use the generated utility.",
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", noInlineStyle, ...noHexColours],
    },
  },
  {
    /**
     * Files whose geometry genuinely cannot be a class, because the value
     * is not known until it is computed:
     *
     * - `club-map` positions its tooltip at the pointer.
     * - `coming-soon-flip` rotates by an angle that accumulates without
     *   bound — 180deg, 360deg, 540deg — so there is no finite set of
     *   classes that covers it.
     * - `ingredient-wall` and the `coming-soon` page each hand a marquee's
     *   keyframes the number of copies the component chose to render, so
     *   the travel distance is derived from that constant rather than
     *   restated beside it in a class.
     *
     * Only the inline-style rule is lifted. The colour rules still apply:
     * needing to compute a position is no licence to hardcode a hex.
     */
    files: [
      // Not the literal `src/app/[locale]/coming-soon/page.tsx`: these
      // patterns are globs, so `[locale]` reads as a character class
      // matching one of l/o/c/a/e and silently never matches the route
      // directory. Any dynamic segment has to be reached around this way.
      "src/app/**/coming-soon/page.tsx",
      "src/components/site/club-map.tsx",
      "src/components/site/coming-soon/coming-soon-flip.tsx",
      "src/components/site/coming-soon/ingredient-wall.tsx",
    ],
    rules: { "no-restricted-syntax": ["error", ...noHexColours] },
  },
]);

export default eslintConfig;
