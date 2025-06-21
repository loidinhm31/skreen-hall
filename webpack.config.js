const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        content: './src/content/content.tsx',
        popup: './src/popup/popup.tsx',
        'video-player': './src/video-player/video-player.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'manifest.json', to: 'manifest.json' },
                { from: 'src/popup/popup.html', to: 'popup.html' },
                { from: 'src/video-player/video-player.html', to: 'video-player.html' }
            ],
        }),
    ],
};