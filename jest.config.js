// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js$': 'babel-jest',
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "/node_modules/"
  ]
};
