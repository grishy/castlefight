const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dev = process.env.NODE_ENV === 'dev';

let cssLoaders = [{
    loader: 'css-loader',
    options: {
        importLoaders: 1
    }
}];

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')()
            ]
        }
    });
}

let config = {
    entry: './assets/ts/app.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css',
            disable: false // désactiver le plugin
        })
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader', {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            sourceMap: dev,
                        }
                    }
                }],

            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [...cssLoaders, 'sass-loader']
                })
            }
        ]
    }
};

if (!dev) {
    // prod
    config.mode = "production";
    config.plugins.push(new UglifyJSPlugin());
} else {
    // dev
    config.mode = "development";
    config.watch = true;
    config.devtool = 'cheap-module-eval-source-map';
    //config.devtool = 'inline-source-map';
}

module.exports = config;
