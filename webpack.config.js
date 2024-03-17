const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: ['./src/DOM.js', './src/Gameboard.js', './src/Player.js', './src/Ship.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
              },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Battleship',
            filename: 'index.html',
            template: 'template.html'
        }),
    ],
};