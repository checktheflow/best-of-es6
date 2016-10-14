module.exports = {
    entry: ['babel-polyfill', './oneliners/js/entry.js'],
    output: {
        path: __dirname + '/oneliners',
        filename: 'bundle.js'
    },
    devtool: 'sourcemap',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }]
    }
}
