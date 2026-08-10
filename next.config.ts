import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// Wires the request-time locale/message resolution in src/i18n/request.ts
// into the Next.js build so Server Components can call getTranslations /
// setRequestLocale without any further per-page setup.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
