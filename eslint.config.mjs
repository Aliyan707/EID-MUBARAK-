// eslint-config-next@16+ ships as a native ESLint 9 flat config array.
// Import and spread it directly — no FlatCompat, no legacy bridge needed.
import nextConfig from 'eslint-config-next'

const eslintConfig = [
  // Next.js flat config: react, react-hooks, import, jsx-a11y, @next/next rules
  ...nextConfig,

  // Project-specific overrides (applied after next's rules)
  {
    rules: {
      '@typescript-eslint/no-explicit-any':      'warn',
      '@typescript-eslint/no-unused-vars':       ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]

export default eslintConfig
