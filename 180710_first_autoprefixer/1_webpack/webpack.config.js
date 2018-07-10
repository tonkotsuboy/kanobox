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
          // PostCSSのための設定★
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                // Autoprefixerを有効化
                require("autoprefixer")({
                  // ☆IEは11以上、Androidは4.4以上
                  // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
                  browsers: ["last 2 versions", "ie >= 11", "Android >= 4"]
                })
              ]
            }
          }
        ]
      }
    ]
  }
};