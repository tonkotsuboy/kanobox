showMarten('.marten1', 65324);
showMarten('.marten2', 65327);
showMarten('.marten3', 65334);
showMarten('.marten4', 65317);

function showMarten(targetId, uniCode) {
  document.querySelectorAll(targetId).forEach(element => {
    element.innerText = String.fromCharCode(uniCode);
  });
}