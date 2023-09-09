import React, { RefObject } from "react";
import p5 from "p5"; //Import this for typechecking and intellisense
import { BaseSketch } from "../BaseSketch";
import { createInputs } from "../../../utils/p5Inputs";
import { ISketchProps } from "../SketchSwitch";
import { P5Input } from "../../../types/P5Input";

const Anatomy = ({ inputs }: ISketchProps) => {
  var headSizeSlider: P5Input;
  var armsAngleSlider: P5Input;

  function setup(p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    if (parentRef.current) cnv.parent(parentRef.current);

    const xForm = p.windowWidth - 250;
    const yForm = 50;

    const savedInputs = createInputs(xForm, yForm, p, inputs);
    headSizeSlider = savedInputs["headSize"];
    armsAngleSlider = savedInputs["armsAngle"];
  }

  function draw(p: p5) {
    p.stroke("red");
    p.fill("black");
    p.strokeJoin(p.ROUND);
    p.strokeWeight(5);
    let headSize = Number(headSizeSlider.value());
    let x0 = p.windowWidth / 2;
    let y0 = p.windowHeight / 2 - headSize * 3;
    let offset = headSize * 0.2;
    let armsWidth = headSize / 3;
    let armsLength = headSize * 2.5;
    let armsAngle = Number(armsAngleSlider.value());
    let upperBodyHeight = 2 * headSize - offset;
    let upperBodyWidth = 2 * headSize;
    let lowerBodyWidth = headSize;
    let hipsHeight = headSize - offset;
    let hipsWidth = headSize * 1.5;
    let legsHeight = 3 * headSize;
    let legsWidth = headSize / 4;

    p.background(0);

    // draw head
    p.circle(x0, y0 - headSize / 2, headSize);

    // draw arms
    let y = y0 + offset;
    let dx =
      ((upperBodyWidth - lowerBodyWidth) * 2 * armsWidth) / 2 / upperBodyHeight;
    let ang = (armsAngle / 180) * Math.PI;
    let sin = Math.sin(ang);
    let cos = Math.cos(ang);

    // left arm
    p.quad(
      // wrist left point
      x0 - upperBodyWidth / 2 - armsLength * sin - offset,
      y - armsLength * cos,
      // elbow left point
      x0 - upperBodyWidth / 2 - offset,
      y,
      // elbow right point
      x0 - upperBodyWidth / 2 + dx - offset - Math.max(2 * armsWidth * cos, 0),
      y + 2 * armsWidth * (armsAngle >= 90 ? 1 : sin),
      // wrist right point
      x0 - upperBodyWidth / 2 - armsLength * sin - armsWidth * cos - offset,
      y - armsLength * cos + armsWidth * sin
    );

    // right arm
    p.quad(
      // wrist left point
      x0 + upperBodyWidth / 2 + armsLength * sin + offset,
      y - armsLength * cos,
      // elbow left point
      x0 + upperBodyWidth / 2 + offset,
      y,
      // elbow right point
      x0 + upperBodyWidth / 2 - dx + offset + Math.max(2 * armsWidth * cos, 0),
      y + 2 * armsWidth * (armsAngle >= 90 ? 1 : sin),
      // wrist right point
      x0 + upperBodyWidth / 2 + armsLength * sin + armsWidth * cos + offset,
      y - armsLength * cos + armsWidth * sin
    );

    // draw upper body
    p.quad(
      x0 - upperBodyWidth / 2,
      y,
      x0 + upperBodyWidth / 2,
      y,
      x0 + lowerBodyWidth / 2,
      (y += upperBodyHeight),
      x0 - lowerBodyWidth / 2,
      y
    );

    // draw hips
    y += offset;
    p.quad(
      x0 - lowerBodyWidth / 2,
      y,
      x0 + lowerBodyWidth / 2,
      y,
      x0 + hipsWidth / 2,
      (y += hipsHeight),
      x0 - hipsWidth / 2,
      y
    );

    // draw legs
    y += offset;
    p.quad(
      x0 - hipsWidth / 2,
      y,
      x0,
      y,
      x0 - hipsWidth / 2 + legsWidth,
      y + legsHeight,
      x0 - hipsWidth / 2,
      y + legsHeight
    );
    p.quad(
      x0 + hipsWidth / 2,
      y,
      x0,
      y,
      x0 + hipsWidth / 2,
      y + legsHeight,
      x0 + hipsWidth / 2 + legsWidth,
      y + legsHeight
    );
    y += legsHeight;
  }

  return <BaseSketch setup={setup} draw={draw} />;
};

export default Anatomy;
