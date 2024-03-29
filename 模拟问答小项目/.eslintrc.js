module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-mixed-spaces-and-tabs": [0],
		"no-multi-spaces": 0,
		"no-trailing-spaces": 0,
		"quotes": [0, "single"],
		"prettier/prettier": 0,
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
