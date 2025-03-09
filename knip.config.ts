import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: ["src/components/ui/**/*"],
  ignoreBinaries: [],
  ignoreDependencies: [
    "@commitlint/config-conventional",
    "tailwindcss-animate",
    "eslint-config-next",
    "eslint",
    "tailwindcss",
  ],
};

export default config;
