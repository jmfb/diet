const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: [
		'core-js/es/promise',
		'core-js/es/symbol',
		'whatwg-fetch',
		'./src/index.tsx'
	],
	output: {
		path: path.resolve(__dirname, 'web'),
		filename: 'bundle.js'
	},

	resolve: {
		modules: ['node_modules'],
		alias: {
			'~': path.resolve(__dirname, 'src')
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	resolveLoader: {
		modules: ['node_modules']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'tslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'ts-loader'
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, 'node_modules')],
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]_[local]_[hash:base64:3]'
							}
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},

	performance: {
		hints: false
	},

	stats: {
		all: false,
		modules: true,
		assets: true,
		errors: true,
		warnings: true,
		moduleTrace: true,
		errorDetails: true,
		timings: true
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
			chunkFilename: '[id].css'
		})
	]
};
