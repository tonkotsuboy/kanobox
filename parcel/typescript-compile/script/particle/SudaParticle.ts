import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";

/**
 * パーティクルのクラス
 */

export default class SudaParticle {
  public view: SVGUseElement;
  private linePath: SVGPathElement;

  private pathTotalLength: number;

  public time: number = 0;

  public constructor(linkId: string, linePath: SVGPathElement, startTime: number = 0) {
    this.view = document.createElementNS(SVGNameSpace.SVG, "use");
    this.view.setAttributeNS(SVGNameSpace.LINK, "href", linkId);
    this.linePath = linePath;
    this.pathTotalLength = linePath.getTotalLength();
    this.time = startTime;
    this.setSudaPosition(this.time);
  }

  public update(): void {
    this.time += 10;

    if (this.time >= this.pathTotalLength) {
      this.time = 0;
    }

    this.setSudaPosition(this.time);

  }

  private setSudaPosition(targetTime: number) {
    const targetPoint = this.linePath.getPointAtLength(targetTime);

    let prevTime = targetTime - 1;
    if (prevTime < 0) {
      prevTime = this.pathTotalLength - 1;
    }

    const prevPoint = this.linePath.getPointAtLength(prevTime);

    const vx = prevPoint.x - targetPoint.x;
    const vy = prevPoint.y - targetPoint.y;
    const angle = Math.atan2(vy, vx) * (180 / Math.PI) - 180;

    this.view.setAttribute("transform", `translate(${targetPoint.x}, ${targetPoint.y}) rotate(${angle})`);
  }
}