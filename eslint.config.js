import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    files: ["/*.js", "/*.jsx"], // Применяем правила только к JS и JSX файлам
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser, // Глобальные переменные для браузера
        ...globals.node, // Глобальные переменные для Node.js
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX
        },
      },
    },
    plugins: {
      react: react,
      "react-hooks": hooks,
      prettier: prettier,
    },
    rules: {
      // Правила ESLint
      semi: ["error", "always"], // Требуем точки с запятой
      "react/prop-types": "off", // Отключаем проверку prop-types
      "react/react-in-jsx-scope": "off", // Отключаем требование импорта React (актуально для React 17+)
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // Автоматическое определение конца строки
          singleQuote: true, // Использование одинарных кавычек
          trailingComma: "es5", // Висячие запятые в стиле ES5
          printWidth: 80, // Максимальная длина строки
          tabWidth: 2, // Ширина табуляции
          semi: true, // Точки с запятой в конце выражений (должно совпадать с правилом ESLint)
        },
      ],
    },
    settings: {
      react: {
        version: "detect", // Автоматически определяет версию React
      },
    },
  },
];
