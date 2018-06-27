const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	output: {
		filename: './assets/bundle.js',
		path: __dirname
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/index.html', to: 'assets/index.html' },
		])
	]
};
