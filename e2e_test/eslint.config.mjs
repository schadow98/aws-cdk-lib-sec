import tseslint from 'typescript-eslint';
import noSecrets from 'eslint-plugin-no-secrets';
import security from 'eslint-plugin-security';

export default tseslint.config(
  {
    files: ['src/**/*.ts'],
    ignores: ['jest.config.cjs'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'no-secrets': noSecrets,
      security: security
    },
    rules: {
      'no-secrets/no-secrets': 'warn',
      'security/detect-object-injection': 'warn'
    }
  }
);
