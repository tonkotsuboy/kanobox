showMarten1('.marten1');
showMarten2('.marten2');
showMarten3('.marten3');
showMarten4('.marten4');

/** 貂1を表示 */
function showMarten1(target) {
  showMarten(target, 65324);
}

/** 貂2を表示 */
function showMarten2(target) {
  showMarten(target, 65327);
}

/** 貂3を表示 */
function showMarten3(target) {
  showMarten(target, 65334);
}

/** 貂4を表示 */
function showMarten4(target) {
  showMarten(target, 65317);
}

/**
 * 指定のセレクタにUnicodeから生成した文字を挿入する
 */
function showMarten(targetSelector, uniCode) {
  document.querySelectorAll(targetSelector).forEach(element => {
    element.innerText = String.fromCharCode(uniCode);
  });
}