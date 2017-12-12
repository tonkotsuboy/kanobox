import {EventName} from "./eventname/EventName";
import SudaParticleEmitter from "./particle/SudaParticleEmitter";

class Main3 {
  private sudaEmitter:SudaParticleEmitter;

  constructor() {
    const svgField = <SVGGElement> document.querySelector("#tonkotuField");
    this.sudaEmitter = new SudaParticleEmitter();
    svgField.appendChild(this.sudaEmitter.view);

    document.getElementById("syringe").addEventListener(EventName.CLICK, (event) => this.onFieldClick(event))

    this.render();
  }

  private render() {
    if (!this.sudaEmitter) {
      return;
    }
    this.sudaEmitter.update();
    requestAnimationFrame(() => this.render());
  }

  private onFieldClick(event:MouseEvent) {
    if (!this.sudaEmitter) {
      return;
    }

    this.sudaEmitter.increseSuda();

  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main3());
