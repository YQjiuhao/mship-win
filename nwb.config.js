const path = require('path')

module.exports = function (nwb) {
	return {
		type: 'react-app',
		webpack: {
			extra: {
				module: {
					rules: [
						{
							test: /\.(ts|tsx)$/,
							use: [
								{
									loader: 'babel-loader',
									options: {
										babelrc: false,
										plugins: ['react-hot-loader/babel']
									},
								},
								'ts-loader',
							],
							exclude: /node_modules/
						}
					]
				},
				resolve: {
					extensions: ['.ts', '.tsx', '.js', '.less', '.json']
				}
			},
		},
		// devServer: {
		// 	hot: true,
		// 	allowedHosts: [
		// 		'localhost',
		// 		'127.0.0.1',
		// 		'0.0.0.0'
		// 	],
		// },
	}
}