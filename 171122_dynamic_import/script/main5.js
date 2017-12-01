import('./sub.js')
  .then(({ Sub }) => {
  // 動的に読み込まれたSubクラス
  const sub = new Sub();
  sub.subMethod();
});
