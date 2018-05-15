module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子
        test: /\.css/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // CSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // CSS+PostCSSの場合は1を指定
              importLoaders: 1
            },
          },
          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require("postcss-gap-properties")(),
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require('autoprefixer')({grid: true})
              ]
            },
          }
        ],
      },
    ],
  }
};
