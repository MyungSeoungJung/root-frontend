module.exports = {
  // 코드 실행환경
  env: {
    browser: true,
    es2021: true,
  },
  //    기본적으로 사용할 규칙 세트
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    //예외처리할 특정 규칙을 넣는 곳

    // 해당 룰은 검사하지 않음
    "react/react-in-jsx-scope": "off",

    // 해당 룰은 경고수준으로 처리
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
