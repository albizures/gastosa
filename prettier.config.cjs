/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('@albizures/prettier-config');

/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	...config,
};
