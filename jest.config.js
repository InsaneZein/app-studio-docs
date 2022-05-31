module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/stories/*'],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/src/'],
  testRegex: '(/__tests__/.*|(\\.|/)((?<!ct.)test|(?<!ct.)spec))\\.[jt]sx?$',
  transformIgnorePatterns: ['/node_modules/(?!@redhat-cloud-services)', '/node_modules/(?!@patternfly)'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
