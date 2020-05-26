const tsJestPreset = require("jest-preset-angular/jest-preset").globals[
  "ts-jest"
];

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src", "<rootDir>"],
  setupFiles: [],
  //setupFilesAfterEnv: "<rootDir>/src/setup-jest.ts",
  modulePaths: ["<rootDir>/dist"],
  moduleNameMapper: {
    "@amaromach-angular/(.*)": "<rootDir>/amaromach-angular/src/$1",
  },
  testMatch: ["**/amaromach-angular/**/services/**/*.spec.ts"],
  globals: {
    "ts-jest": {
      ...tsJestPreset,
      tsConfig: "tsconfig.spec.json",
    },
  }
};
