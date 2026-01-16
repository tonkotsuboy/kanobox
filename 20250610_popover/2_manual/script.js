document.addEventListener("DOMContentLoaded", () => {
  const popover = document.getElementById("manual-popover");
  const anchor = document.querySelector(
    'button[popovertarget="manual-popover"][popovertargetaction="show"]'
  );

  if (!popover || !anchor) {
    return;
  }

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
