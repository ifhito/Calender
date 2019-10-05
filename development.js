import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin' 
const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

export default {
  mode: 'development',
  entry: './src/js/index.jsx',

  output: {
    path: dist,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
      test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }]
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }]
    },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: src + '/index.html',
        filename: 'index.html'
      })
  ]
}