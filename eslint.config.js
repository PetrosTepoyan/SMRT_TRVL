module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        module: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        require: 'readonly'
      }
    },
    rules: {}
  }
];
