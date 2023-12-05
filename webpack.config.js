const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const { env } = require("process");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": __dirname + "/src",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2020",
        },
      },
      {
        test: /\.(gif|jpg|png|webp|svg|mp4)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    publicPath: "/",
    filename: "js/[name]-[chunkhash].js",
    assetModuleFilename: "asset/[hash][ext][query]",
    path: __dirname + "/dist",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ProvidePlugin({
      React: "react",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // HTML 파일로 출력
      reportFilename: "report.html", // 리포트 파일 이름
      openAnalyzer: false, // 빌드 후 리포트 자동 열기 여부
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: "./dist",
    open: true,
  },
  // 소스맵 최적화
  devtool: env.WEBPACK_SERVE ? "eval-cheap-module-source-map" : false,
  // 빌드 캐시 최적화
  cache: {
    type: env.WEBPACK_SERVE ? "memory" : "filesystem",
  },
};
