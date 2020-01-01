const prettierrc = require('./prettier.config.js');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@nuxtjs',
    'vuetify',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // 'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', prettierrc],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],
  },
};
