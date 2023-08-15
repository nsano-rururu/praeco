module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  rules: {
    'vuejs-accessibility/rule-name': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/no-autofocus': 'off',
    'vuejs-accessibility/anchor-has-content': 'off',
    quotes: ['error', 'single'],
    'no-underscore-dangle': 'off',
    'no-empty': 'off',
    radix: 'off',
    'no-cond-assign': 'off',
    'no-plusplus': 'off',
    'default-case': 'off',
    'no-labels': 'off',
    'no-restricted-syntax': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'arrow-parens': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'prefer-const': 'off',
    'comma-dangle': 'off',
    'prefer-destructuring': 'off',
    'space-before-function-paren': 'off',
    'no-new': 'off',
    'max-len': 'off',
    'vue/require-v-for-key': 'off',
    'vue/require-prop-types': 'off',
    'vue/max-attributes-per-line': 'off',
    // TODO: 'vue/component-api-style': ['error', ['composition-vue2']],
    'vue/no-lone-template': 'off', // TODO:
    'vue/multi-word-component-names': 'off', // TODO:
    'import/prefer-default-export': 'off',
    'vue/no-template-shadow': 'off',
    'import/no-cycle': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/this-in-template': 'warn',
    'vue/no-deprecated-slot-attribute': 'warn',
    'vue/no-deprecated-slot-scope-attribute': 'warn',
    // 'vue/no-deprecated-filter': 'warn',
    // 'vue/no-deprecated-functional-template': 'warn',
    'import/extensions': [
      'off',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ]
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  }
};
