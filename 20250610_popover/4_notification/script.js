document.addEventListener("DOMContentLoaded", () => {
  const showBtn = document.getElementById("show-notification-btn");
  const container = document.getElementById("notification-container");
  let notificationCount = 0;

  showBtn.addEventListener("click", () => {
    createNotification();
  });

  function updateNotificationPositions() {
    const visibleNotifications = document.querySelectorAll(".notification-popover:popover-open");
    let topOffset = 16; // Start 1rem from the top

    visibleNotifications.forEach((notif) => {
      notif.style.top = `${topOffset}px`;
      // Increase offset by notification height + 1rem gap
      topOffset += notif.offsetHeight + 16;
    });
  }

  function createNotification() {
    notificationCount++;

    const popover = document.createElement("div");
    popover.id = `notification-${notificationCount}`;
    popover.popover = "manual";
    popover.classList.add("notification-popover");
    popover.innerHTML = `
      <div class="icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <span>新しい通知メッセージです。</span>
    `;

    container.appendChild(popover);
    popover.showPopover();

    // Use rAF to ensure the popover has been rendered before positioning.
    requestAnimationFrame(updateNotificationPositions);

    setTimeout(() => {
      popover.classList.add("slide-out");

      popover.addEventListener(
        "animationend",
        () => {
          popover.hidePopover();
          popover.remove();
          updateNotificationPositions();
        },
        { once: true }
      );
    }, 4000);
  }
});
