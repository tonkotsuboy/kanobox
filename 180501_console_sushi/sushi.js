(async () => {
  const sushi = "🍣";
  const maxSushi = 100;
  const sushiUnitCount = 2;
  const maxLoopNum = 10;

  let gain = true;
  let count = 0;
  let loop = 0;

  // for文は初期化、条件、反復終了時の処理のいずれも省略可能
  for (; loop < maxLoopNum;) {
    count += gain ? sushiUnitCount : -sushiUnitCount;

    console.log("".padEnd(count, sushi));

    await new Promise(resolve => setTimeout(() => resolve(), 10));

    if (count >= maxSushi) {
      gain = false;
    }
    if (count <= 0) {
      gain = true;
      loop += 1;
    }
  }
})();
