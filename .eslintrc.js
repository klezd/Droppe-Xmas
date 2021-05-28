module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },  
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },

  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.

  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  'rules': {
    'indent': [ 'error', 2 ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        bracketSpacing: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'space-before-function-paren': ['warn', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],
    'comma-dangle': ['warn', 'never'],
    'no-prototype-builtins': 'warn'
  }
};
