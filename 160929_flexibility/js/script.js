document.addEventListener("DOMContentLoaded", function () {
  var ua = navigator.userAgent;
  if (ua.indexOf("Android 4.") > 0) {
    flexibility(document.body);
  }
});
