module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules":{
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-shadow": "off",
        "linebreak-style": 0,
        "object-curly-spacing": 0,
        "comma-dangle": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "arrow-body-style": 0,
        // function components get default values as default parameters: React 19 doesn't use their defaultProps
        "react/require-default-props": 0
    },
    "env": {
        "jest": true,
        "browser": true
    }
};