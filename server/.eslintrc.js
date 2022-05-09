module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: ['./tsconfig.json', 'jest.config.ts']
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
