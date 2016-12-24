const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const sassConfig = {
	sourceMap: true
};

function cssConfig(modules) {
	return {
		localIdentName: '[name]_[local]_[hash:base64:3]',
		modules
	};
}

module.exports = {
	entry: [
		'core-js/es6/promise',
		'core-js/es6/symbol',
		'whatwg-fetch',
		'./src/index.tsx'
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/web'
	},

	devtool: 'source-map',

	resolve: {
		alias: {
			'~': path.join(__dirname, 'src')
		},
		extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
		modulesDirectories: [path.join(__dirname, 'node_modules')]
	},

	resolveLoader: {
		modulesDirectories: [path.join(__dirname, 'node_modules')]
	},

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'tslint-loader',
				include: /src/
			}
		],
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				include: /src/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', [
					`css-loader?${JSON.stringify(cssConfig(true))}`,
					'postcss-loader',
					`sass-loader?${JSON.stringify(sassConfig)}`
				]),
				include: /src/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', [
					`css-loader?${JSON.stringify(cssConfig(false))}`,
					'postcss-loader'
				]),
				include: /node_modules/
			}
		]
	},

	postcss: [autoprefixer({
		browsers: [
			'Android 2.3',
			'Android >= 4',
			'Chrome >= 35',
			'Firefox >= 31',
			'Explorer >= 10',
			'iOS >= 7',
			'Opera >= 12',
			'Safari >= 7.1'
		]
	})],

	plugins: [
		new ExtractTextPlugin('style.css')
	]
};
