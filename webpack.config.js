// commonjs tree shaking
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const { NODE_ENV } = process.env;

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'template.html'),
    title: 'react-hooks-i18n-template',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new webpack.DefinePlugin({
    'window.__CID__': JSON.stringify(process.env.cid || 'sg'),
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CopyPlugin([{ from: 'public', to: 'public' }]),
  new MiniCssExtractPlugin({
    filename: 'chunk.[name].[contenthash:8].css',
    ignoreOrder: true,
  }),
  new OptimizeCssAssetsWebpackPlugin({
    cssProcessPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
  }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 10,
    minChunkSize: 10000,
  }),
  new HappyPack({
    id: 'babel',
    loaders: ['cache-loader', 'babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: 'tsloader',
    loaders: ['cache-loader', 'ts-loader'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: 'css',
    loaders: ['style-loader', 'css-loader'],
    threadPool: happyThreadPool,
  }),
  new AntdDayjsWebpackPlugin(),
];

if (process.env.ANALYSE) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: true,
      statsOptions: { source: false },
    })
  );
}

if (NODE_ENV !== 'production') {
  plugins.push(new webpack.SourceMapDevToolPlugin());
}

const entry = ['@babel/polyfill', './src/index.tsx'];

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  stats: {
    entrypoints: false,
    children: false,
  },
  entry,
  resolve: {
    mainFields: ['module', 'main', 'browser'],
    alias: {
      root: path.resolve(__dirname),
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.tsx', '.d.ts', '.ts', '.jsx', '.json', '.css'],
  },
  output: {
    filename: 'main.[hash:8].js',
    path: path.resolve(__dirname, 'dist/static'),
    chunkFilename: 'chunk.[name].[contenthash:8].js',
    publicPath: '/',
  },
  mode: NODE_ENV,
  devtool: false,
  plugins,
  module: {
    rules: [
      // static assets comes first
      {
        test: /fonts\/.+?\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(jpg|jpeg|bmp|png|webp|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/',
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false,
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false,
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2,
                }),
                require('imagemin-svgo')({
                  plugins: [{ removeTitle: true }, { convertPathData: false }],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel',
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true,
              }),
            ],
          }),
          compilerOptions: require('./tsconfig.json').compilerOptions,
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true,
              modifyVars: {
                // inject our own global vars
                // https://github.com/ant-design/ant-design/issues/16464#issuecomment-491656849
                hack: `true;@import '${require.resolve('./src/vars.less')}';`,
              },
              limit: 10000,
              name: '[name].[hash:7].[ext]',
              outputPath: 'styles/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: [],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules/,
          enforce: true,
          priority: 5,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          priority: 10,
        },
        antdIcons: {
          test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
          priority: 15,
        },
        styles: {
          test: /\.(scss|css)$/,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
          priority: 20,
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  devServer: {
    hot: true,
    port: 8080,
    proxy: [
      {
        context: ['/api'],
        target: 'your_config',
        changeOrigin: true,
        onProxyRes(proxyRes, _, res) {
          const cookies = proxyRes.headers['set-cookie'] || [];
          const re = /domain=[\w.]+;/i;
          const newCookie = cookies.map((cookie) =>
            cookie.replace(re, 'Domain=localhost;'));
          res.writeHead(proxyRes.statusCode, {
            ...proxyRes.headers,
            'set-cookie': newCookie,
          });
        },
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});
