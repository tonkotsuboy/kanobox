async function main() {
  const { Sub, Sub2 } = await import('./sub.js');

  const sub = new Sub();
  sub.subMethod();

  const sub2 = new Sub();
  new Sub2().subMethod2();
}

main();