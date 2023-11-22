module.exports = {
  root: ["<rootDir>/src"],
  preset: "ts-jest",
  collectCoverageFrom: ["<rootDir>/src/**/*ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
}
