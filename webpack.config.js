const { resolve } = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = function (env) {
  const prod = env !== undefined && env.production === true;
  const dev = env !== undefined && env.devepolment === true;

  return {
    //   entry: "./src/js/app.js",
    entry: { app: "./src/js/app.js", vendors: ["jquery"] },

    output: {
      publicPath: "/dist/",
      path: resolve(__dirname, "dist/"),
      // filename: "bundle.js",
      filename: prod ? "[name].[chunkhash].js" : "[name].js",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.hbs$/,
          exclude: /node_modules/,
          use: {
            loader: "handlebars-loader",
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
