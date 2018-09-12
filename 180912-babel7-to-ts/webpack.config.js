module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',
  entry: "./src/main.ts",

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              "presets": [
                "@babel/typescript",
                "@babel/preset-env"
              ],
              "plugins": [
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
              ]
            }
          }
        ]
      }
    ]
  }
};