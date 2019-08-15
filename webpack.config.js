const path = require('path');
const production = process.env.NODE_ENV === 'production';
const filename = production ? 'react.prod.js' : 'react.dev.js';

module.exports = {
  entry: path.join(__dirname, 'react', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@system': path.join(__dirname, 'react'),
      '@components': path.join(__dirname, 'react', 'components'),
      '@pages': path.join(__dirname, 'react', 'pages'),
      '@styles': path.join(__dirname, 'react', 'styles'),

    }
  },

  // IMPORTANT: Do not bundle react and react-dom
  externals: {
    '@geum/admin': '@geum/admin',
    'react': 'react',
    'react-dom': 'react-dom',
    'react-pose': 'react-pose',
    'react-router-dom': 'react-router-dom'
  }
}
