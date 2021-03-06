module.exports = {
  // The root of source code
  roots: ['./src'],

  // using ts-jest: Jest transformations
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ],

  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
