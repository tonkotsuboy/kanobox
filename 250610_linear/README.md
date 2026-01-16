# CSS `linear()`関数で作るモダンなバウンスアニメーション

このデモは、CSSの`linear()`イージング関数を使って、バウンスのような複雑なアニメーションを実装する方法を探るものです。
`transition`と`animation`、そして`linear()`関数を使う場合と使わない場合を比較することで、それぞれの特性と最適な使い分けを理解することを目的とします。

## `linear()`イージング関数とは？

`linear()`は、アニメーションの進行度を複数の点で定義することで、直線的な補間を行うイージング関数です。これにより、従来は複雑な`@keyframes`が必要だった動きを、よりシンプルに記述できます。

とくにバウンス効果を表現する場合に強力です。

- アニメーションの進行度の値に`1`（終点）を超える値を指定すると、**「行き過ぎて戻る」**動きを簡単に作れます。
- `linear(0, 1.3 80%, 1)` のような指定は、「80%の時間で最終地点を30%通り過ぎ、残りの時間で最終地点に戻る」というバウンスを表現します。

## `transition` vs `animation`

ホバー時のインタラクションを実装する上で、両者には明確な使い分けがあります。

### 1. `transition` を使う方法（推奨）

ホバーのような単純な状態変化には`transition`が最適です。

- **実装が直感的**: 通常時と`:hover`時で異なる`transition`プロパティを定義するだけで、**行きと帰りで別のアニメーション**を簡単に実装できます。
- **コードがシンプル**: `@keyframes`を定義する必要がありません。

```css
/* --- Transition Version --- */
.new-badge.transition {
  /* 戻る時のアニメーション */
  transition: transform 0.25s ease-out;
}

.new-badge.transition:hover {
  /* 行く時のアニメーション（バウンス） */
  transition: transform 0.5s linear(0, 1.3 80%, 1);
  transform: scale(1.2);
}
```

### 2. `animation` を使う方法

ループ再生や複雑なシーケンスには`animation`が強力ですが、ホバーエフェクトには少し工夫が必要です。

- **帰りのアニメーション**: デフォルトでは、ホバーを外すと瞬時に元の状態に戻ります。帰りのアニメーションを実装するには、通常時とホバー時で別々の`@keyframes`（`bounce-in`と`bounce-out`など）を適用する必要があります。
- **初回再生の問題**: 通常時に帰りのアニメーションを指定すると、ページ読み込み時に再生されてしまいます。これを回避するには、親要素のホバーをトリガーにするなど、CSSのセレクターを工夫する必要があります。

## `linear()` vs 手動`@keyframes`

`animation`でバウンスを実装する場合でも、`linear()`を使うことで記述を大幅に簡略化できます。

- **`linear()`利用**: `@keyframes`は始点と終点を定義するだけで済み、複雑な動きは`animation-timing-function`の`linear()`に集約できます。

  ```css
  /* animation + linear() */
  @keyframes bounce-in {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }
  .new-badge.animation:hover {
    animation: bounce-in 0.5s linear(0, 1.3 80%, 1) forwards;
  }
  ```

- **手動`@keyframes`**: `linear()`が内部的に行っている補間を、すべて手動でキーフレームに落とし込む必要があります。

  ```css
  /* 手動キーフレーム */
  @keyframes bounce-in-manual {
    0% {
      transform: scale(1);
    }
    80% {
      transform: scale(1.26);
    } /* 1.2 * 1.3 ではないことに注意 */
    100% {
      transform: scale(1.2);
    }
  }
  .new-badge.keyframes-only:hover {
    animation: bounce-in-manual 0.5s linear forwards;
  }
  ```

## まとめ

- ホバーのようなインタラクションには、**`transition`がもっともシンプルで適切**です。
- `linear()`関数は、バウンスのような複雑なイージングをCSSで実現するための強力なツールです。
- `animation`は`transition`より高機能ですが、ホバーエフェクトに使う場合は挙動を理解した上で工夫が必要です。

---

このデモの最終的なコードは `demo/transition-bounce/` ディレクトリにあります。
