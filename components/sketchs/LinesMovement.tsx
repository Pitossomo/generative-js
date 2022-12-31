import React, { RefObject } from "react";
import p5 from "p5"; //Import this for typechecking and intellisense
import { BaseSketch } from "./BaseSketch";

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

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    console.log('setup')
  }

  function draw(p: p5) {
    num_entities = Math.floor(p.random(10, 30))
    max_dist_variation = 5
    max_hue_variation = 1
    baseSaturation = 80
    baseLight = 80

    p.createCanvas(p.windowWidth, p.windowHeight)

    for (let i = 0; i < num_entities; i++) {
      entities.push({
        x1: p.random(p.windowWidth),
        y1: p.random(p.windowHeight),
        x2: p.random(p.windowWidth),
        y2: p.random(p.windowHeight),
        hue: p.random(100)
      })
      p.colorMode(p.HSB, 100)
    }
    
    p.background(255)
    entities.forEach((entity, i) => {
    
      entities[i] = {
        x1: entity.x1 + p.random(-1, 1)*max_dist_variation,
        y1: entity.y1 + p.random(-1, 1)*max_dist_variation,
        x2: entity.x2 + p.random(-1, 1)*max_dist_variation,
        y2: entity.y2 + p.random(-1, 1)*max_dist_variation,
        hue: entity.hue + p.random(-1, 1)*max_hue_variation
      }
      
      p.line(entity.x1, entity.y1, entity.x2, entity.y2)
      p.stroke(entity.hue, baseSaturation, baseLight)
    })
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default LinesMovement