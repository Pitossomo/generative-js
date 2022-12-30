import { useState } from "react";
import { toCartesian } from "../../utils/polarCoordinates";
import BaseSketch from "./BaseSketch"
import p5Types from "p5"; //Import this for typechecking and intellisense

const SpiralSketch = () => {
  const [numRounds, setNumRounds] = useState(20) 

  const handleChange = (e: Event) => { setNumRounds(Number(e?.target?.value || 5)) }

  function setup(p5: p5Types, canvasParentRef: Element) {
    
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background('black')
    p5.stroke('white')
    p5.strokeWeight(2)
  
    const NUM_POINTS = 200
    
    let point1 = [p5.windowWidth/2, p5.windowHeight/2]
    for (let i = 0; i < NUM_POINTS; i++) {
      let point2: number[] = toCartesian(
        i/NUM_POINTS*Math.min(p5.windowWidth,p5.windowHeight)/2,
        2*Math.PI*numRounds/NUM_POINTS*i
      )
      point2[0] += p5.windowWidth/2
      point2[1] += p5.windowHeight/2
      p5.line(point1[0], point1[1], point2[0], point2[1])
      point1 = [...point2]
    }
    p5.noLoop()
  }

  return <>
    <BaseSketch setup={setup} />
    <input type="range"
      min='1' max='100'
      value={numRounds}
      onChange={handleChange}
    />
  </>
}

export default SpiralSketch