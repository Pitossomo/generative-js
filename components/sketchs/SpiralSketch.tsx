import { toCartesian } from "../../utils/polarCoordinates";
import BaseSketch from "./BaseSketch"
import p5Types from "p5"; //Import this for typechecking and intellisense

const SpiralSketch = () => {
  const [WIDTH, HEIGHT] = [1000, 800]
  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(WIDTH, HEIGHT)
    p5.background('black')
    p5.stroke('white')
    p5.strokeWeight(2)
  
    const NUM_POINTS = 200
    const NUM_ROUNDS = 5
  
    let point1 = [WIDTH/2, HEIGHT/2]
    for (let i = 0; i < NUM_POINTS; i++) {
      let point2: number[] = toCartesian(
        i/NUM_POINTS*Math.min(WIDTH,HEIGHT)/2,
        2*Math.PI*NUM_ROUNDS/NUM_POINTS*i
      )
      point2[0] += WIDTH/2
      point2[1] += HEIGHT/2
      p5.line(point1[0], point1[1], point2[0], point2[1])
      point1 = [...point2]
    }
    p5.noLoop()
  }

  return <BaseSketch setup={setup} />
}

export default SpiralSketch
