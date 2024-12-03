import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "jest-expo",
  collectCoverage: true,
  transform: {},
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  detectOpenHandles: true,
};

export default config;
