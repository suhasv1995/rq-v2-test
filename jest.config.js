module.exports = {
  collectCoverage: false,
  coverageReporters: ["json", "lcov", "text", "clover", "text-summary"],
  testMatch: ["<rootDir>/src/**/*.test.jsx"],
  testEnvironment: "jsdom",
};
