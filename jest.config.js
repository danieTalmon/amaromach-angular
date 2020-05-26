const tsJestPreset = require("jest-preset-angular/jest-preset").globals[
  "ts-jest"
];

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src", "<rootDir>"],
  setupFiles: [],
  modulePaths: ["<rootDir>/dist"],
  testMatch: ["**/amaromach-angular/**/services/product/*.spec.ts"],
  globals: {
    "ts-jest": {
      ...tsJestPreset,
      tsConfig: "tsconfig.spec.json",
    },
  }
};
