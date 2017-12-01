/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var project;
(function (project) {
  /*
   * パーティクルモーションのクラス
   * */
  var ParticleCreator = (function () {
    function ParticleCreator() {
      var _this = this;
      // ステージを準備
      this._canvas = document.getElementById("myCanvas");
      this._stage = new createjs.Stage(this._canvas);
      // タッチ対応
      if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(this._stage);
      }
      // Tickerを作成
      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", function (event) { return _this.tickeHandler(event); });
      // メインのレイヤーを配置
      this._mainLayer = new MainLayer();
      this._stage.addChild(this._mainLayer);
      // リサイズイベント
      this.resizeHandler();
      window.addEventListener("resize", function () { return _this.resizeHandler(); });
    }
    /*
     * Tick Handler
     * */
    ParticleCreator.prototype.tickeHandler = function (event) {
      if (!event.paused) {
        this._stage.update();
      }
    };
    /*
     * リサイズのイベント処理
     * */
    ParticleCreator.prototype.resizeHandler = function () {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      // ステージのサイズをwindowのサイズに変更
      this._canvas.width = windowWidth;
      this._canvas.height = windowHeight;
      // メインレイヤーにリサイズイベントを通知
      this._mainLayer.resizeHandler(windowWidth, windowHeight);
    };
    return ParticleCreator;
  })();
  project.ParticleCreator = ParticleCreator;
  /*
   * メインのレイヤー
   * */
  var MainLayer = (function (_super) {
    __extends(MainLayer, _super);
    function MainLayer() {
      var _this = this;
      _super.call(this);
      this._tickCount = 0;
      this._bg = new createjs.Shape();
      this.drawBG(800, 600);
      this.addChild(this._bg);
      this._particleEmitter = new ParticleEmitter(); // パーティクル発生装置のインスタンスを作成
      this.addChild(this._particleEmitter);
      this.addEventListener("tick", function (event) { return _this.tickHandler(event); });
      this.addEventListener("mousedown", function (event) { return _this.mouseDownHandler(event); });
      this.addEventListener("pressup", function (event) { return _this.mouseUpHandler(event); });
    }
    MainLayer.prototype.resizeHandler = function (windowWidth, windowHeight) {
      this.drawBG(windowWidth, windowHeight);
    };
    /*
     * 指定の大きさの背景を描画
     * */
    MainLayer.prototype.drawBG = function (bgWidth, bgHeight) {
      this._bg.graphics.clear();
      this._bg.graphics.beginLinearGradientFill(["#ebfaff", "#7fddfd"], [0, 1], 0, 0, 0, bgHeight)
        .drawRect(0, 0, bgWidth, bgHeight)
        .endFill();
    };
    /*
     * マウスを押した時の処理
     * */
    MainLayer.prototype.mouseDownHandler = function (event) {
      this._isMouseDown = true;
    };
    /*
     * マウスを離した時の処理
     * */
    MainLayer.prototype.mouseUpHandler = function (event) {
      this._isMouseDown = false;
    };
    /*
     * Tickイベントで実行される処理
     * */
    MainLayer.prototype.tickHandler = function (event) {
      // マウスの座標
      var mouseX = this.getStage().mouseX;
      var mouseY = this.getStage().mouseY;
      // パーティクル発生装置の座標を更新
      this._particleEmitter.update(mouseX, mouseY);
      if (this._isMouseDown) {
        if (this._tickCount % 2 == 0)
          this._particleEmitter.emitParticle();
        this._tickCount++;
        if (this._tickCount >= 1000)
          this._tickCount = 0;
      }
    };
    return MainLayer;
  })(createjs.Container);
  /*
   * パーティクル発生装置
   * */
  var ParticleEmitter = (function (_super) {
    __extends(ParticleEmitter, _super);
    function ParticleEmitter() {
      _super.call(this);
      // アニメーション中のパーティクルを格納する配列
      this._animationParticles = [];
      // パーティクルのオブジェクトプール。アニメーションがされていないパーティクルがここに待機している。
      this._particlePool = [];
      // ブラウザのユニコードうにうに(^^)
      this._browserUnicodes = [
        "f269",
        "f26b",
        "f268",
        "f26a",
        "f267"
      ];
      this._emitX = 0;
      this._emitY = 0;
      this._vx = 0;
      this._vy = 0;
      this._browserNum = this._browserUnicodes.length;
    }
    /*
     * MainLayerのtickイベント毎に実行される処理
     * */
    ParticleEmitter.prototype.update = function (goalX, goalY) {
      // 発生装置はgoalに徐々に近づいていく。
      var dx = goalX - this._emitX;
      var dy = goalY - this._emitY;
      var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)); // 斜め方向の移動距離
      var rad = Math.atan2(dy, dx); // 移動角度
      this._vx = Math.cos(rad) * d * 0.1; // 速度の更新
      this._vy = Math.sin(rad) * d * 0.1; // 速度の更新
      this._emitX += this._vx;
      this._emitY += this._vy;
      // アニメーション中のパーティクルの状態を更新
      this.updateParticles();
    };
    /*
     *　パーティクルを発生させる
     * */
    ParticleEmitter.prototype.emitParticle = function () {
      var particle = this.getParticle();
      particle.init(this._emitX, this._emitY, this._vx, this._vy);
      this.addChild(particle);
      // アニメーション中のパーティクルとして設定
      this._animationParticles.push(particle);
    };
    /*
     *　パーティクルのアニメーション
     * */
    ParticleEmitter.prototype.updateParticles = function () {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      for (var i = 0; i < this._animationParticles.length; i++) {
        var particle = this._animationParticles[i];
        if (!particle.isDead) {
          if (particle.y >= windowHeight) {
            particle.vy *= -0.9;
            particle.y = windowHeight;
          }
          if (particle.x >= windowWidth) {
            particle.vx *= -0.9;
            particle.x = windowWidth;
          }
          else if (particle.x <= 0) {
            particle.vx *= -0.9;
            particle.x = 0;
          }
          particle.update();
        }
        else {
          // particleを取り除く
          this.removeParticle(particle, i);
        }
      }
    };
    /*
     * オブジェクトプールからパーティクルを取得。
     * プールにパーティクルが無ければ新規作成
     */
    ParticleEmitter.prototype.getParticle = function () {
      if (this._particlePool.length > 0) {
        return this._particlePool.shift();
      }
      else {
        var iconStr = this.getIconStr();
        return new Particle(iconStr);
      }
    };
    /*
     * ブラウザアイコンの文字列ばゲットバッカーズゥ！
     */
    ParticleEmitter.prototype.getIconStr = function () {
      var browserIndex = Math.floor(this._browserNum * Math.random());
      var iconUniCode = this._browserUnicodes[browserIndex];
      // Unicode から文字コードに変換
      var iconInt = parseInt(iconUniCode, 16);
      // 文字コードから文字列に変換する
      var iconStr = String.fromCharCode(iconInt);
      // CreateJS のテキストを作成
      return iconStr;
    };
    /*
     * パーティクルを取り除く。
     * */
    ParticleEmitter.prototype.removeParticle = function (particle, animationIndex) {
      // Containerからパーティクルをremove
      this.removeChild(particle);
      // アニメーションのパーティクルから取り除く。
      this._animationParticles.splice(animationIndex, 1);
      if (this._particlePool.indexOf(particle) == -1) {
        // プールにパーティクルが無いことを確認して格納
        this._particlePool.push(particle);
      }
    };
    return ParticleEmitter;
  })(createjs.Container);
  /*
   * パーティクルのクラス
   * */
  var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle(text) {
      var fontSize = 12 + Math.floor(70 * Math.random());
      _super.call(this, text, fontSize + 'px "ten-mincho"');
      // 加算で重ねる
      //this.compositeOperation = "lighter";
      this.mouseEnabled = false;
    }
    /*
     * パーティクルの初期化
     * @param parentVX, parentVY :親コンテナの速度。パーティクルの速度に影響を与える。
     * */
    Particle.prototype.init = function (emitX, emitY, parentVX, parentVY) {
      this.x = emitX;
      this.y = emitY;
      this._life = 100 + Math.random() * 30;
      this._count = 0;
      this.vx = parentVX + (Math.random() - 0.5) * 4;
      this.vy = parentVY - 8 - Math.random() * 4;
      this.vr = (Math.random() - 0.5) * 2;
      this.isDead = false;
      this.alpha = 1;
      this.rotation = 20 * Math.PI * (Math.random() - 0.5);
      var colorHSL = createjs.Graphics.getHSL(new Date().getTime() / 20 + Math.random() * 5, 60, 20);
      this.color = colorHSL;
    };
    /*
     * パーティクルの時間経過処理。
     * _countがパーティクルの年齢。
     * _lifeを超えたら死亡する。
     *
     * */
    Particle.prototype.update = function () {
      this._count++;
      if (this._count <= this._life) {
        this.x += this.vx;
        this.vy += 0.5;
        this.y += this.vy;
        //this.rotation += this.vr;
        // 死にそうになったら点滅を開始
        if (this._count >= this._life / 2) {
          // this.alpha = 0.6 + Math.random() * 0.4;
          this.alpha = (1 - this._count / this._life);
        }
      }
      else {
        // 寿命が来たらフラグを立てる
        this.isDead = true;
      }
    };
    return Particle;
  })(createjs.Text);
})(project || (project = {}));
window.addEventListener("load", function (event) {
  var main = new project.ParticleCreator();
});
