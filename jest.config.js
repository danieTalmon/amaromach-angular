const tsJestPreset = require("jest-preset-angular/jest-preset").globals[
  "ts-jest"
];

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src", "<rootDir>"],
  setupFiles: [],
  modulePaths: ["<rootDir>/dist"],
  testMatch: [
    "<rootDir>/src/app/product-list/product/product.component.spec.ts",
    "<rootDir>/src/app/cart/cart.component.spec.ts",
    '**/**.reducer.spec.ts'
  ],
  globals: {
    "ts-jest": {
      ...tsJestPreset,
      tsConfig: "tsconfig.spec.json",
    },
  }
};
