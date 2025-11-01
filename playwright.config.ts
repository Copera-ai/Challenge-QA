import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";


const testDir = defineBddConfig({
  features: "./src/features/**/*.feature",
  steps: "./src/steps/**/*.ts",
  outputDir: "./build",
});

// biome-ignore lint/style/noDefaultExport: previous committer is a bad coder
export default defineConfig({
  testDir,
  reporter: [["list", { printSteps: true }]],
  timeout: 60 * 1000,
  expect: {
    timeout: 10_000,
  },
  workers: 1,
  use: {
    baseURL: "http://localhost:3456",
    screenshot: "on",
    trace: "on",
  },
});
