import { RefObject } from "react";
import { toCartesian } from "../../../utils/polarCoordinates";
import { BaseSketch } from "../BaseSketch"
import p5 from "p5"; //Import this for typechecking and intellisense
import { P5Input } from "../../../types/P5Input";
import { createInputs } from "../../../utils/p5Inputs";
import { ISketchProps } from "../SketchSwitch";

const SpiralSketch = ({inputs}: ISketchProps) => {
  var numPointsSlider: P5Input
  var roundsSlider: P5Input

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    p.noLoop()

    const xForm = p.windowWidth-250
    const yForm = 50

    const savedInputs = createInputs(xForm, yForm, p, inputs)
    numPointsSlider = savedInputs['numPoints']
    roundsSlider = savedInputs['rounds']
  }
  
  function draw(p: p5) {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background('black')
    p.stroke('white')
    p.strokeWeight(2)

    const NUM_POINTS = Number(numPointsSlider.value())
    const NUM_ROUNDS = Number(roundsSlider.value())
  
    let point1 = [p.windowWidth/2, p.windowHeight/2]
    for (let i = 0; i < NUM_POINTS; i++) {
      let point2: number[] = toCartesian(
        i/NUM_POINTS*Math.min(p.windowWidth,p.windowHeight)/2,
        2*Math.PI*NUM_ROUNDS/NUM_POINTS*i
      )
      point2[0] += p.windowWidth/2
      point2[1] += p.windowHeight/2
      p.line(point1[0], point1[1], point2[0], point2[1])
      point1 = [...point2]
    }
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default SpiralSketch