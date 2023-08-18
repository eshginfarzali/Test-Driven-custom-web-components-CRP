/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		main: path.resolve(__dirname, "src", "main.js"),
		website: path.resolve(__dirname, "src", "website-section.js"),
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "build"),
		clean: true,
	},
	devServer: {
		// hot: true, // If you want to use the hot module replacement feature, add
		// open: true,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: {
					"^/api": ""
				},
				changeOrigin: true,
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "src/assets/",
					to: "assets",
				},
			],
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};
