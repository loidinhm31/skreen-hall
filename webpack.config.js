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
    clean: true,
    // Disable webpack runtime chunk to avoid CSP issues
    chunkLoadingGlobal: 'webpackChunkMyExtension',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              // Optimize for smaller bundles
              target: 'es2018',
              module: 'esnext',
            }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // Add alias for common components
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: {
    // Disable code splitting for Chrome extension CSP compliance
    splitChunks: false,
    // Enable tree shaking
    usedExports: true,
    sideEffects: false,
    // Minimize bundle size
    minimize: true,
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
  // CSP-safe configuration
  devtool: false, // Disable source maps for production
  performance: {
    maxAssetSize: 300000, // 300 KiB
    maxEntrypointSize: 300000,
    hints: 'warning'
  },
  // Ensure no dynamic imports
  externals: {
    // Mark React as external if you want to load it separately
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  }
};