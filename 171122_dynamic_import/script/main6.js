async function main() {
  const { Sub } = await import('./sub.js');

  const sub = new Sub();
  sub.subMethod();
}

main();