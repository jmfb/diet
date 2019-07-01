const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

function cssConfig(modules) {
	return {
		localIdentName: '[name]_[local]_[hash:base64:3]',
		modules
	};
}

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

	devtool: 'source-map',

	resolve: {
		modules: [path.resolve(__dirname, 'node_modules')],
		alias: {
			'~': path.resolve(__dirname, 'src')
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	resolveLoader: {
		modules: [path.resolve(__dirname, 'node_modules')]
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre'
			},
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
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: false
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: false
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
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
		maxModules: 0,
		assets: true,
		errors: true,
		warnings: true,
		moduleTrace: true,
		errorDetails: true
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
			chunkFilename: '[id].css'
		})
	]
};
