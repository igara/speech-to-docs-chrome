const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  target: "web",
  entry: {
    background: path.join(__dirname, "src/background.ts"),
    content_script: path.join(__dirname, "src/content_script.ts"),
    browser_action: path.join(__dirname, "src/browser_action.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        loaders: ["style-loader", "css-loader?modules"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: ".",
          to: "../",
          context: "public",
        },
      ],
    }),
    new TypedCssModulesPlugin({
      globPattern: "src/**/*.css",
    }),
  ],
};
