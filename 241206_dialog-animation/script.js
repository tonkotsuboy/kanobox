document.querySelector(".dialog-button").addEventListener("click", () => {
  document.querySelector(".dialog").showModal();
});
document.querySelector(".close-button").addEventListener("click", () => {
  document.querySelector(".dialog").close();
});
