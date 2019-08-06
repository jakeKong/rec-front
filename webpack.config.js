const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    devtool : 'eval-source-map',
    mode: 'production'    ,//production
    entry: {
        vendor: ['@babel/polyfill', 'eventsource-polyfill', 'react', 'react-dom'],
        app: ['@babel/polyfill', 'eventsource-polyfill', './src/index.js'],
    },
    output: {
        path: '/build',
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                    [
                        '@babel/preset-env', {
                        targets: { node: 'current' }, // 노드일 경우만
                        modules: 'false'
                        }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-stage-0'
                    ],
                },
                exclude: ['/node_modules'],
            }
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    //   new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': JSON.stringify('production'), // 아래 EnvironmentPlugin처럼 할 수도 있습니다.
    //   }),
        new webpack.EnvironmentPlugin(['NODE_ENV']), // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세입니다.
        new HtmlWebpackPlugin(),
        new HtmlWebpackTagsPlugin({
            scripts: [{
                /* JQuery cdn*/
                path: 'https://code.jquery.com/jquery-1.12.4.min.js',
                attributes: {
                    type: 'text/javascript',
                },
            },
            {
                /* 아임포트 SDK */
                path: 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js',
                attributes: {
                type: 'text/javascript',
                },
            }
            ]
        })
    ],
    optimization: {
        minimize: true/false,
        splitChunks: {},
        concatenateModules: true,
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    },
}
module.exports = config;