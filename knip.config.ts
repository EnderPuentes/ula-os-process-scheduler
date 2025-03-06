import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    "src/lib/**/*", // TODO: Temp
  ],
  ignoreBinaries: [],
  ignoreDependencies: [
    "@commitlint/config-conventional",
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwindcss-animate",
    "tailwind-merge",
    "eslint-config-next",
    "eslint",
    "tailwindcss",
  ],
};

export default config;
