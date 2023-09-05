import React, { RefObject } from "react";
import p5 from "p5"; //Import this for typechecking and intellisense
import { BaseSketch } from "../BaseSketch";
import { createInputs } from "../../../utils/p5Inputs";
import { ISketchProps } from "../SketchSwitch";
import { P5Input } from "../../../types/P5Input";

const Anatomy = ({ inputs }: ISketchProps) => {
  var headSizeSlider: P5Input;

  function setup(p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    if (parentRef.current) cnv.parent(parentRef.current);

    const xForm = p.windowWidth - 250;
    const yForm = 50;

    const savedInputs = createInputs(xForm, yForm, p, inputs);
    headSizeSlider = savedInputs["headSize"];
  }

  function draw(p: p5) {
    p.stroke("red");
    p.fill("black");
    p.strokeWeight(5);
    let x0 = p.windowWidth / 2;
    let y0 = p.windowHeight / 2;
    let headSize = Number(headSizeSlider.value());

    p.background(0);
    p.circle(x0, y0 - headSize / 2, headSize);
    p.line(x0, y0, x0, y0 + headSize);
    p.line(x0, y0, x0 - headSize / 2, y0 + headSize);
    p.line(x0, y0, x0 + headSize / 2, y0 + headSize);
    p.line(x0, y0 + headSize, x0 - headSize / 2, y0 + 2 * headSize);
    p.line(x0, y0 + headSize, x0 + headSize / 2, y0 + 2 * headSize);
  }

  return <BaseSketch setup={setup} draw={draw} />;
};

export default Anatomy;
