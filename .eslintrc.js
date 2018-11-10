module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules":{
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
    "env": {
        "jest": true,
        "browser": true
    }
};