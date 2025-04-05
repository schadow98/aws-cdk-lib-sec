import js from '@eslint/js';
import noSecrets from 'eslint-plugin-no-secrets';
import security from 'eslint-plugin-security';

export default [
  {
    ...js.configs.recommended,
    files: ['src/**/*.ts', 'src/**/*.js'], // ← das ist wichtig!
    ignores: ['jest.config.cjs'],
    plugins: {
      'no-secrets': noSecrets,
      security: security
    },
    rules: {
      'no-secrets/no-secrets': 'warn',
      'security/detect-object-injection': 'warn',
    }
  }
];
