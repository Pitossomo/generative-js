import BaseSketch from "./BaseSketch"
import p5Types from "p5"; //Import this for typechecking and intellisense

type Line = {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  hue: number
}

const LinesMovement = () => {

  const entities: Line[] = []

  var num_entities: number
  var max_dist_variation: number 
  var max_hue_variation: number 
  var baseSaturation: number
  var baseLight: number

  function setup(p5: p5Types, canvasParentRef: Element) {
    num_entities = Math.floor(p5.random(10, 30))
    max_dist_variation = 5
    max_hue_variation = 1
    baseSaturation = 80
    baseLight = 80

    p5.createCanvas(p5.windowWidth, p5.windowHeight)

    for (let i = 0; i < num_entities; i++) {
      entities.push({
        x1: p5.random(p5.windowWidth),
        y1: p5.random(p5.windowHeight),
        x2: p5.random(p5.windowWidth),
        y2: p5.random(p5.windowHeight),
        hue: p5.random(100)
      })
      p5.colorMode(p5.HSB, 100)
    }

    p5.frameRate(3)
  }

  function draw(p5: p5Types) {
    p5.background(255)
    entities.forEach((entity, i) => {
    
      entities[i] = {
        x1: entity.x1 + p5.random(-1, 1)*max_dist_variation,
        y1: entity.y1 + p5.random(-1, 1)*max_dist_variation,
        x2: entity.x2 + p5.random(-1, 1)*max_dist_variation,
        y2: entity.y2 + p5.random(-1, 1)*max_dist_variation,
        hue: entity.hue + p5.random(-1, 1)*max_hue_variation
      }
      
      p5.line(entity.x1, entity.y1, entity.x2, entity.y2)
      p5.stroke(entity.hue, baseSaturation, baseLight)
    })
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default LinesMovement