# Popover API デモ

このフォルダには、Popover APIの様々な使い方を示すデモが含まれています。

## Popover APIとは？

Popover APIは、他のすべてのUI要素の最前面（トップレイヤー）に、ダイアログ、メニュー、ツールチップなどの一時的なUIを簡単に作成するための新しいWeb技術です。

主なメリット：

- **`z-index`が不要**：自動的に最前面に表示されるため、複雑な`z-index`の管理から解放されます。
- **アクセシビリティ**：`Esc`キーで閉じたり、フォーカスを管理したりといった、基本的なアクセシビリティ機能が組み込まれています。
- **シンプルなAPI**：`popovertarget`属性などを使うことで、JavaScriptを書かずに表示・非表示を制御できます。

---

### 各デモの説明

#### 1. 基本的なポップオーバー (`1_basic`)

[デモを見る: `1_basic/index.html`](./1_basic/index.html)

最も基本的なポップオーバーの実装です。ボタンをクリックすると、画面の中央にポップオーバーが表示されます。

**ポイント**

- `popover`属性を要素に追加するだけで、その要素はポップオーバーになります。
- `popovertarget`属性を持つボタンと、ポップオーバー要素の`id`を紐付けることで、クリックするだけで表示の切り替えができます。

```html
<!-- ポップオーバーを開くボタン -->
<button popovertarget="mypopover">メニューを開く</button>

<!-- ポップオーバー本体 -->
<div id="mypopover" popover>...</div>
```

---

#### 2. 手動制御のポップオーバー (`2_manual`)

[デモを見る: `2_manual/index.html`](./2_manual/index.html)

`popover="manual"`を使用した例です。このモードでは、ポップオーバーの外側をクリックしても閉じず、明示的な閉じるボタンが必要になります。

**ポイント**

- `popover="manual"`を指定すると、自動で閉じる機能が無効になります。
- `popovertargetaction="show"`や`popovertargetaction="hide"`で、表示・非表示を個別に制御できます。
- このデモでは、JavaScriptを使って表示位置をボタンの下に調整しています。

```html
<!-- "show"アクションで開く -->
<button popovertarget="manual-popover" popovertargetaction="show">開く</button>

<!-- "hide"アクションで閉じる -->
<button popovertarget="manual-popover" popovertargetaction="hide">閉じる</button>

<div id="manual-popover" popover="manual">...</div>
```

---

#### 3. CSSアンカーポジションを使った配置 (`3_anchor_position`)

[デモを見る: `3_anchor_position/index.html`](./3_anchor_position/index.html)

CSSの`anchor-position`を使い、JavaScriptなしでポップオーバーをボタンの隣に配置するデモです。

**注意**：`anchor-position`は非常に新しい技術で、ChromeやEdgeの最新版など、一部のブラウザでしか動作しません。

**ポイント**

- `anchor-name`プロパティで、基準となる要素（アンカー）に名前を付けます。
- `position-anchor`プロパティで、ポップオーバーをそのアンカーに紐付けます。
- `top: anchor(...)`や`left: anchor(...)`を使って、アンカーからの相対位置をCSSだけで指定できます。

```css
/* 基準となる要素（アンカー） */
#popover-anchor {
  anchor-name: --popover-anchor;
}

/* ポップオーバー本体 */
[popover] {
  position-anchor: --popover-anchor;
  top: anchor(top);
  left: calc(anchor(right) + 16px);
}
```

---

#### 4. 動的な通知バーの作成 (`4_notification`)

[デモを見る: `4_notification/index.html`](./4_notification/index.html)

JavaScriptを使って、ポップオーバーを動的に生成し、画面右上に通知バーとして表示する実践的なデモです。

**ポイント**

- `document.createElement('div')`で要素を作成した後、`.popover = "manual"`と設定するだけで、その要素をポップオーバーとして機能させることができます。
- 複数の通知が重ならないよう、表示されている通知の高さを計算し、JavaScriptで`top`の値を動的に設定しています。
- `setTimeout`を使い、一定時間後にアニメーション付きで消えるように実装しています。

```javascript
// JSでdiv要素を作成
const popover = document.createElement("div");
// popoverプロパティを設定して、ポップオーバー化する
popover.popover = "manual";
// 表示する
popover.showPopover();
```
