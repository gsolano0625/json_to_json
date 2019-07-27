module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "arrow-spacing": "error",
        "eol-last": ["error", "always"],
        "func-call-spacing": "error",
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "key-spacing": ["error", { "beforeColon": false }],
        "keyword-spacing": "error",
        "max-len": ["error", {"code": 160}],
        "no-console": "error",
        "no-debugger": "error",
        "no-plusplus": "off",
        "no-script-url": "error",
        "no-undef": "error",
        "no-unused-vars": "error",
        "object-curly-spacing": ["error", "always"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": "error",
        "space-infix-ops": "error"
    }
};
