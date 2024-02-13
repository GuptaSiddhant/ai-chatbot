module.exports = {
  extends: ['prettier', 'eslint:recommended'],
  plugins: ['unused-imports'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['off'],
    'unused-imports/no-unused-imports': 'warn',
    'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
    prettier: {
      trailingComma: 'all',
      tabWidth: 4,
      semi: false,
      singleQuote: true,
      useTabs: false,
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    React: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
    beforeAll: 'readonly',
    beforeEach: 'readonly',
  },
}
