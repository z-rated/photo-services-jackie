module.exports = {
  projects: [
    {
      displayName: 'Server Unit Test',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/server.test.js'],
      transform: {},
    },
    {
      displayName: 'Client Unit Test',
      testMatch: ['<rootDir>/__tests__/Gallery.test.jsx'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
        // '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
      },
      // setupFilesAfterEnv: ['<rootDir>__tests__/test-setup.js'],
    },
  ],
  moduleFileExtensions: ['js', 'jsx'],
};


// supertest server unit test
// enzyme unit test
// enzyme integration tests
// puppeteer end to end tests
