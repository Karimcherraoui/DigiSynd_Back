module.exports = {
    testEnvironment: 'node',
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
	transform: {
		"^.+\\.(t|j)sx?$": "@swc/jest",
	},
    testMatch: ['**/*.test.(js|jsx)'],
    collectCoverage: true,
    coverageReporters: ['lcov', 'text', 'html'],
};
