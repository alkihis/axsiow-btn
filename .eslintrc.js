module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'no-useless-constructor': 'off',
    'arrow-parens': 'off',
    'no-use-before-define': 'off',
  },
};
