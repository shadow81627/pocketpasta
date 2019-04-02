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
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
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
