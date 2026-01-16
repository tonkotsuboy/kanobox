document.addEventListener("DOMContentLoaded", () => {
  const popover = document.getElementById("js-popover");
  const anchor = document.querySelector(".button-group");
  const showBtn = document.getElementById("show-btn");
  const hideBtn = document.getElementById("hide-btn");
  const toggleBtn = document.getElementById("toggle-btn");

  if (!popover || !anchor || !showBtn || !hideBtn || !toggleBtn) {
    return;
  }

  showBtn.addEventListener("click", () => popover.showPopover());
  hideBtn.addEventListener("click", () => popover.hidePopover());
  toggleBtn.addEventListener("click", () => popover.togglePopover());

  const updatePosition = () => {
    const anchorRect = anchor.getBoundingClientRect();

    // Position the popover below the anchor element
    popover.style.top = `${anchorRect.bottom + 8}px`;
    popover.style.left = `${anchorRect.left + anchorRect.width / 2}px`;

    // Center the popover horizontally relative to the anchor
    popover.style.transform = "translateX(-50%)";
  };

  popover.addEventListener("beforetoggle", (event) => {
    if (event.newState === "open") {
      updatePosition();
    }
  });

  window.addEventListener("resize", () => {
    if (popover.matches(":popover-open")) {
      updatePosition();
    }
  });
});
