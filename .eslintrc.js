module.exports = {
    // ...
    plugins: ["react-hooks", "prettier"],
    extends: [
      // ...
      "plugin:react-hooks/recommended",
      "prettier",
      "prettier/react",
    ],
    rules: {
      // ...
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": "error",
    },
  };
  