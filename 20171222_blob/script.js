main = async () => {
  response = await fetch("./test.xml");
  blob = await response.blob();
  console.log(blob);

  document.querySelector("#downloadButton").addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "testBlob";
    a.click();
  });
}

main();


