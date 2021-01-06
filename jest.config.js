module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(.*).js$": ["$1.ts", "$1.js"],
  },
};
