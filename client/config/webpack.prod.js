const WebpackMerge = require('webpack-merge');
const common = require('./webpack.common');

const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = WebpackMerge(common, {
	mode: 'production',
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					ecma: 6,
				},
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css"
		})
	]
});