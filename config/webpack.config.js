const fs = require('fs');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const getPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: getPath('src/index.tsx'),
  output: {
    path: getPath('build/'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: getPath('src'),
      },
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            include: getPath('src'),
            loader: require.resolve('ts-loader'),
          },
          {
            test: /\.html$/,
            include: getPath('src'),
            loader: require.resolve('html-loader'),
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: [/node_modules/, /webpack/],
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.(css|scss)$/,
            enforce: 'pre',
            use: [
              {
                loader: require.resolve('style-loader'),
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9'
                      ],
                      flexbox: 'no-2009'
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  data: '@import "src/app-mixins-and-vars.scss";'
                }
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  stats: {
    children: false,
    errors: true,
    errorDetails: true,
    warnings: true
  }
};
