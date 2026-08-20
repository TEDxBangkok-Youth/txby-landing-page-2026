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
 * per-file override below.
 */
const designSystemRules = {
  "no-restricted-syntax": [
    "error",
    {
      selector: "JSXAttribute[name.name='style']",
      message:
        "Style with token-driven Tailwind classes, not inline styles. If the value is genuinely computed at runtime, add the file to the allowlist in eslint.config.mjs.",
    },
    {
      selector: "Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
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
  ],
};

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
    rules: designSystemRules,
  },
  {
    // The club map positions its tooltip at the pointer, which can
    // only be known at runtime.
    //
    // The Coming Soon headline accumulates its flip angle (180deg,
    // 360deg, 540deg, …) rather than toggling between two values, so
    // there is no finite set of classes to switch between. Its timing
    // and easing are still tokens (--ease-flip); only the angle is
    // inline.
    //
    // The slot machine's reel travel is a translateY derived from the
    // strip length built per spin, and its duration from the per-reel
    // stagger — both runtime values. The easing stays a token
    // (--ease-reel).
    files: [
      "src/components/site/club-map.tsx",
      "src/components/site/coming-soon-flip.tsx",
      "src/components/site/slot-machine.tsx",
    ],
    rules: { "no-restricted-syntax": "off" },
  },
]);

export default eslintConfig;
