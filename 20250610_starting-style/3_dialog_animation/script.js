const dialog = document.querySelector(".dialog");
const openButton = document.querySelector(".dialog-button");
const closeButton = document.querySelector(".close-button");

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// ダイアログの外側（::backdrop）をクリックしたときもダイアログを閉じる
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
