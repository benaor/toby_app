import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "jest-expo",
  collectCoverage: true,
  transform: {},
  transformIgnorePatterns: [],
};

export default config;
