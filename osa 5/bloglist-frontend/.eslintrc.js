module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    //'jest/globals': true
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true,
        //'jest': true
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': 'true',
    },
  },
  'plugins': [
    'react'
  ],
  'ignorePatterns': [
    '**/*.test.js', 'cypress'
    //'cypress/*'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
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
      'never'
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  }
}