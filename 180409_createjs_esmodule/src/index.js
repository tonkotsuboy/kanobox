// EaselJS系の読み込み
import { Shape, Stage } from '@createjs/easeljs/dist/easeljs.module';
// TweenJS系の読み込み
import { Tween } from '@createjs/tweenjs/dist/tweenjs.module';

const stage = new Stage('myCanvas');

const circle = new Shape();
circle.graphics.beginFill('DarkRed').drawCircle(0, 0, 50);
stage.addChild(circle);

circle.x = 300;
circle.y = 200;

Tween.get(circle, {loop: true})
  .wait(300)
  .to({x: 740, y: 400, scale: 2}, 700)
  .to({x: 400, y: 0, scale: 1.4}, 1200)
  .to({x: 500, y: 300, scale: 3}, 1200)
  .to({x: 300, y: 200, scale: 1}, 700);

update();

// 毎フレームステージを自動更新する
function update() {
  stage.update();
  requestAnimationFrame(() => update());

}

