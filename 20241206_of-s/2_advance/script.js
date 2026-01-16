// 選択肢に応じてhidden属性を付与するための処理
document.querySelector("select").addEventListener("change", (event) => {
  document
    .querySelectorAll("tbody tr")
    .forEach(($tr) => $tr.removeAttribute("hidden"));

  const selectedGender = event.target.value;
  if (selectedGender === "male" || selectedGender === "female") {
    document
      .querySelectorAll(`tbody tr:not([data-type="${selectedGender}"])`)
      .forEach(($tr) => $tr.setAttribute("hidden", "hidden"));
  }
});
