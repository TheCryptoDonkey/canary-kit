import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // ── Library (src/) — strict, type-aware ────────────────────
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.test.ts', '**/*.bench.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
      }],
      'no-throw-literal': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],
      eqeqeq: ['error', 'always'],
    },
  },

  // ── Test files — relaxed ───────────────────────────────────
  {
    files: ['src/**/*.test.ts', 'src/**/*.bench.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // ── Global ignores ─────────────────────────────────────────
  {
    ignores: ['dist/', 'docs/', 'node_modules/', 'e2e/', 'app/'],
  },
)
