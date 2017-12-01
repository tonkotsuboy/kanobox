showMarten('.marten1', 65324);
showMarten('.marten2', 65327);
showMarten('.marten3', 65334);
showMarten('.marten4', 65317);

/**
 * 指定のセレクタにユニコードから生成した文字を表示する
 * @param targetSelector
 * @param uniCode
 */
function showMarten(targetSelector, uniCode) {
  document.querySelectorAll(targetSelector).forEach(element => {
    element.innerText = String.fromCharCode(uniCode);
  });
}