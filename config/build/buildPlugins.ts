import webpack from "webpack"
import HTMLWebpackPlugin from "html-webpack-plugin"
import { BuildOptions } from "./types/config"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import Dotenv from "dotenv-webpack"
import CopyWebpackPlugin from 'copy-webpack-plugin'

export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {

	return [
		new HTMLWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}),
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public, // копируем всю папку public
					to: '.', // копируем в корень папки build
					globOptions: {
						ignore: ['**/index.html'], // исключаем index.html, так как он обрабатывается HTMLWebpackPlugin
					},
				},
			],
		}),
	]
}