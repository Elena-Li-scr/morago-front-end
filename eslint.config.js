import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const kebabCaseClassNameRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure className values are in kebab-case",
    },
    messages: {
      notKebabCase:
        'CSS class name "{{className}}" should be in kebab-case (lowercase with hyphens)',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === "className" && node.value && node.value.type === "Literal") {
          const classNames = String(node.value.value).split(" ");
          for (const name of classNames) {
            if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
              context.report({
                node,
                messageId: "notKebabCase",
                data: { className: name },
              });
            }
          }
        }
      },
    };
  },
};

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "custom-kebab": {
        rules: {
          "class-name-kebab-case": kebabCaseClassNameRule,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "custom-kebab/class-name-kebab-case": "warn",
    },
  },
);
