module.exports = {
  setupFiles: ['<rootDir>/jest.init.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js',
    '^vuetify/lib$': 'vuetify',
    '^vuetify/lib/directives$': 'vuetify',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less)$': 'css-loader',
  },
  transformIgnorePatterns: ['node_modules/(?!vuetify)'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  coverageThreshold: {
    global: {
      // branches: 50,
      functions: 50,
      // lines: 50,
      // statements: -10,
    },
  },
};
