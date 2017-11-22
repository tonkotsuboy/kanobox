async function main() {
  const module = await import('./sub.js');
  const sub = new module.Sub()
  sub.subMethod()
}

main();
