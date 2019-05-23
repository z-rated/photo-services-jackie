module.exports = {
  projects: [
    {
      displayName: 'server-unit-test',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/server.test.js'],
      transform: {},
    },
    {
      displayName: 'app-unit-test',
      testMatch: ['<rootDir>/__tests__/*.test.jsx'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
        // '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
      },
      setupFiles: ['<rootDir>/__tests__/setupTests.js'],
    },
  ],
  moduleFileExtensions: ['js', 'jsx'],
};


// supertest server unit test
// enzyme unit test
// enzyme integration tests
// puppeteer end to end tests
