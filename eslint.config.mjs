import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // 1. Reguły dotyczące importów
      "no-unused-vars": "off", // Wyłączamy domyślną regułę, by uniknąć konfliktów
      "unused-imports/no-unused-imports": "error", // Traktuj zbędne importy jako błąd
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // 2. Reguły "czystości kodu"
      "no-console": "warn", // Ostrzegaj przed zostawionymi console.log

      // 3. Opcjonalnie: Całkowity zakaz komentarzy (bardzo restrykcyjne!)
      // Odkomentuj poniższe linie, jeśli naprawdę nie chcesz ŻADNYCH komentarzy w kodzie:
      // "no-inline-comments": "error",
      // "multiline-comment-style": ["error", "bare-block"],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;