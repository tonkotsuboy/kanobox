module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 1
            },
          },
          // PostCSSのための設定
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                // postcss-gap-propertiesを有効化
                require("postcss-gap-properties")(),
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require("autoprefixer")({grid: true})
              ]
            }
          }
        ]
      }
    ]
  }
};
