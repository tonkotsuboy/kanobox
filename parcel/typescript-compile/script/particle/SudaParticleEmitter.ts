import SudaParticle from "./SudaParticle";
import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";
export default class SudaParticleEmitter {

  private particles:SudaParticle[];

  public view:SVGGElement;
  private linePath:SVGPathElement;

  public constructor() {
    this.view = document.createElementNS(SVGNameSpace.SVG, "g");
    this.particles = [];

    // メインのレイヤーを配置
    this.linePath = <SVGPathElement> <any> document.getElementById("linePath");

    if (!this.linePath) {
      return;
    }

    for (let i = 0; i < 1; i++) {
      this.increseSuda(i);
    }
  }

  public update() {
    if (!this.particles || this.particles.length <= 0) {
      return;
    }

    for (let particle of this.particles) {
      particle.update();
    }
  }

  public increseSuda(startTime:number = 0) {
    const particle = new SudaParticle("#suda", this.linePath, startTime);
    this.particles.push(particle);
    this.view.appendChild(particle.view);
  }
}
