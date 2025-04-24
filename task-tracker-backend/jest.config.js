// export default {
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest'
//   },
//   testEnvironment: 'node',
//   moduleFileExtensions: ['js', 'jsx', 'json'],
//   transformIgnorePatterns: [
//     'node_modules/(?!(supertest)/)'
//   ]
// };

export default {
  transform: null,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js'],
  verbose: true,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};

// export default {
//   transform: {},
//   extensionsToTreatAsEsm: ['.js'],
//   moduleNameMapper: {
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   },
//   testEnvironment: 'node',
//   testMatch: ['**/__tests__/**/*.js'],
//   verbose: true
// };