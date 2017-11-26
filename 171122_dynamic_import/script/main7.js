async function main() {
  const { Sub, Sub2 } = await import('./sub.js');

  const sub = new Sub();
  sub.subMethod();

  const sub2 = new Sub2();
  sub2.subMethod2();
}

main();