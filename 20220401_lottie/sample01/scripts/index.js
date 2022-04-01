// アニメーションの読み込みと再生
bodymovin.loadAnimation({
  // アニメーションを再生するための要素
  container: document.querySelector(".box"),
  // アニメーション用のJSONファイル
  path: "assets/box-open.json",
  // レンダラーのタイプ
  renderer: "svg",
});
