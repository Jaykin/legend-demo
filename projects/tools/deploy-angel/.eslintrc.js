module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": [
            2,
            4, {
                "SwitchCase": 1
            }
        ],
        "key-spacing": 0,
        "object-curly-spacing": 0,
        "no-multi-spaces": 0,
        "no-console": 0,
        "no-underscore-dangle": 0,
        "global-require": 0,
        "newline-per-chained-call": 0,
        "import/no-dynamic-require": 0
    }
};
