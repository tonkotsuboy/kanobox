document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-button");
  const box = document.querySelector(".box");

  if (toggleButton && box) {
    toggleButton.addEventListener("click", () => {
      // .openクラスをトグルする
      box.classList.toggle("open");
    });
  }
});
