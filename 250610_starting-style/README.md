# `@starting-style` と `transition-behavior` 解説

このディレクトリのデモは、CSSの`@starting-style`と`transition-behavior: allow-discrete`を使用して、`display: none`の状態からでもスムーズなアニメーションを実現する方法を示しています。

## 1. `@starting-style`とは？

一言でいうと、「**要素が登場する、その一瞬だけに使われる特別なスタイル**」です。

### 従来の課題

従来、CSSだけで`display: none`で隠れている要素をアニメーションさせるのは困難でした。
`display: none`の状態では、ブラウザはその要素を**レンダリングツリーから完全に除外**します。そのため、`opacity`や`transform`といった他の視覚的なスタイルがブラウザによって**計算・適用されず**、ブラウザはその要素のスタイルを一切保持していません。そのため、JavaScriptでクラスを付与して`display: block`に切り替えても、アニメーションの「開始点（From）」が不明なため、`transition`が適用されずに一瞬で表示されてしまいました。

### `@starting-style`による解決策

`@starting-style`は、この問題を解決します。要素が表示される**最初の更新サイクル（最初の1フレーム）で適用されるスタイル**をブラウザに教えることで、アニメーションの「開始点」を明確に定義できます。これにより、`display: none`から表示可能な状態になった際に、ブラウザがアニメーションの開始スタイルを認識し、スムーズなトランジションが可能になります。

```mermaid
graph TD;
    subgraph "従来のCSS (アニメーションしない)";
        A(<b>display: none</b><br/>隠れている状態) -->|クラス付与| B(<b>display: block</b><br/>opacity: 1<br/><br><div style='text-align:center; font-weight: bold; color: red;'>一瞬で表示される</div>);
    end

    subgraph "<b>@starting-style</b> を使った場合 (アニメーションする)";
        C(<b>display: none</b><br/>隠れている状態) -->|クラス付与| D["<b>@starting-style が適用 (始点)</b><br/>opacity: 0<br/><br><div style='font-size: small;'>※この状態は一瞬なので目には見えない</div>"];
        D -->|transitionで滑らかに変化| E(<b>通常のスタイルが適用 (終点)</b><br/>opacity: 1);
    end
```

## 2. `transition-behavior: allow-discrete`とは？

これは`transition`プロパティに加える新しいキーワードで、「**`display`のような離散的なプロパティもアニメーションの対象に含める**」という許可を与えるものです。

- **離散的 (discrete) なプロパティ**: `display`のように、ON/OFFがはっきりしていて中間状態がないプロパティ（例: `display: none` と `display: block`）。
- **連続的 (continuous) なプロパティ**: `opacity`や`transform`のように、`0`から`1`までの滑らかな中間状態が存在するプロパティ。

通常、`transition`は連続的なプロパティしかアニメーションさせられません。`allow-discrete`を指定することで、`display`プロパティがアニメーションの開始時または終了時に切り替わるようになり、`@starting-style`と組み合わせることで完璧な表示・非表示アニメーションが実現できます。

**補足：`@starting-style`と`allow-discrete`の役割分担**

- **表示時のアニメーション**: `@starting-style`が、`display: none`から表示可能な状態になった際の「アニメーション開始点」を定義することで、`opacity`や`transform`といった連続的なプロパティの滑らかな表示アニメーションを可能にします。
- **非表示時のアニメーション**: `transition-behavior: allow-discrete`が、`display: block`から`display: none`に変わる際に、`opacity`や`transform`といった他のプロパティのトランジションが完了するまで`display`プロパティの切り替わりを「遅延」させることで、滑らかな非表示アニメーションを可能にします。

`transition`プロパティの中で、以下のように記述します。

```css
.box {
  transition:
    opacity 0.3s,
    transform 0.4s,
    /* displayプロパティのアニメーションを有効化 */ display 0.4s allow-discrete;
}
```

## 3. 実装パターン

これらの機能を組み合わせた、最も確実で推奨される実装パターンは以下の通りです。

```css
/* 1. 表示された後の「最終形」と「変化の仕方(transition)」を定義 */
.element {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.3s,
    transform 0.4s,
    display 0.4s allow-discrete;
}

/* 2. 表示される瞬間の「開始点」を特別に定義 */
@starting-style {
  .element.is-open {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* 3. デフォルトの「非表示状態」を定義 */
.element:not(.is-open) {
  display: none;
  opacity: 0;
  transform: translateY(-20px);
}
```

このパターンでは、各ルールが明確な役割（最終形、開始点、非表示状態）を持つため、ブラウザは混乱なくアニメーションを計算でき、開発者にとってもコードの意図が読みやすくなります。
