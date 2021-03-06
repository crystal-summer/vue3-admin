module.exports ={
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
  endOfLine: 'auto',
  vueIndentScriptAndStyle: true,
  trailingComma: 'all',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
}
