import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import noSecrets from 'eslint-plugin-no-secrets';
import security from 'eslint-plugin-security';

export default [
  {
    files: ['src/**/*.ts'],
    ignores: ['jest.config.cjs'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': plugin,
      'no-secrets': noSecrets,
      security: security
    },
    rules: {
      'no-secrets/no-secrets': 'warn',
      'security/detect-object-injection': 'warn'
    }
  }
];
