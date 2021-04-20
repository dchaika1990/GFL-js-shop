const path = require("path");
const fs = require("fs");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const generateHtml = function (templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map((item) => {
		const parts = item.split(".");
		const name = parts[0];
		const extension = parts[1];
		console.log(name)
		console.log(extension)
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: false,
		});
	});
}

const htmlPlugins = generateHtml("./src/html-templates/pages");

const config = {
	entry: ["./src/js/index.js", "./src/scss/style.scss"],
	target: isDev ? "web" : "browserslist",
	output: {
		filename: "./js/bundle.js",
	},

	devtool: isDev ? 'source-map' : false,
	devServer: {
		contentBase: "./dist",
		compress: true,
		port: 4000,
		// hot: true,
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				include: path.resolve(__dirname, "src/scss"),
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: isDev,
							url: false,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: isDev,
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
									],
								],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: /\.html$/,
				include: path.resolve(__dirname, "src/html-templates/includes"),
				use: ["raw-loader"],
			},
			{
				test: /\.js/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/style.bundle.css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "./src/assets",
					to: "./"
				}
			],
		}),
	].concat(htmlPlugins),
};

module.exports = (env, argv) => {
	if (argv.mode === "production") {
		config.plugins.push(new CleanWebpackPlugin());
	}
	return config;
};
