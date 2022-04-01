const animation = bodymovin.loadAnimation({
  // アニメーションを再生するための要素
  container: document.querySelector(".box"),
  // アニメーション用のJSONファイル
  path: "assets/box-open.json",
  // レンダラーのタイプ
  renderer: "svg",
});

// 再生が完了したときの処理
animation.addEventListener("loopComplete", () => {
  // index2.htmlに遷移する
  location.href = "index2.html";
});
