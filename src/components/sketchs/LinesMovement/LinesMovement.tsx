import React, { RefObject } from "react";
import p5 from "p5"; //Import this for typechecking and intellisense
import { BaseSketch } from "../BaseSketch";
import { createInputs } from "../../../utils/p5Inputs";
import { ISketchProps } from "../SketchSwitch";
import { P5Input } from "../../../types/P5Input";

type Line = {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  hue: number
}

const LinesMovement = ({inputs}: ISketchProps) => {

  var numEntitiesSlider: P5Input
  var maxDistanceVariationSlider: P5Input 
  var maxHueVariationSlider: P5Input
  var baseSaturationSlider: P5Input
  var baseLightSlider: P5Input
  var maxSizeSlider: P5Input

  const entities: Line[] = []

  const createNewEntity = (p: p5, maxSize: number = p.windowHeight) => {
    const x1 = p.random(p.windowWidth)
    const y1 = p.random(p.windowHeight)
    entities.push({
      x1: x1,
      y1: y1,
      x2: x1 + ((x1 > p.windowWidth/2) ? -1 : 1)*p.random(maxSize),
      y2: y1 + ((y1 > p.windowHeight/2) ? -1 : 1)*p.random(maxSize),
      hue: p.random(100)
    })
    p.colorMode(p.HSB, 100)
  }

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    
    const xForm = p.windowWidth-250
    const yForm = 50
    
    const savedInputs = createInputs(xForm, yForm, p, inputs)
    numEntitiesSlider = savedInputs["entities"]
    maxDistanceVariationSlider = savedInputs["moveAmplitude"]
    maxHueVariationSlider = savedInputs["hueVariation"]
    baseSaturationSlider = savedInputs["baseSaturation"]
    baseLightSlider = savedInputs["baseLight"]
    maxSizeSlider = savedInputs["maxSize"]

    let NUM_ENTITIES = Number(numEntitiesSlider.value())
    let MAX_SIZE = Number(maxSizeSlider.value())

    for (let i = 0; i < NUM_ENTITIES; i++) createNewEntity(p, MAX_SIZE)
  }

  function draw(p: p5) {
    let NUM_ENTITIES = Number(numEntitiesSlider.value())
    let MAX_DISTANCE_VARIATION = Number(maxDistanceVariationSlider.value())
    let MAX_HUE_VARIATION = Number(maxHueVariationSlider.value())
    let BASE_SATURATION = Number(baseSaturationSlider.value())
    let BASE_LIGHT = Number(baseLightSlider.value())
    let MAX_SIZE = Number(maxSizeSlider.value())

    if (NUM_ENTITIES > entities.length) createNewEntity(p, MAX_SIZE)
    else if (NUM_ENTITIES < entities.length) entities.shift()

    p.background(0)
    const translationX = p.random(-1, 1)*MAX_DISTANCE_VARIATION
    const translationY = p.random(-1, 1)*MAX_DISTANCE_VARIATION
    entities.forEach((entity, i) => {
      entities[i] = {
        x1: entity.x1 + p.random(-1, 1)*translationX,
        y1: entity.y1 + p.random(-1, 1)*translationY,
        x2: entity.x2 + p.random(-1, 1)*translationX,
        y2: entity.y2 + p.random(-1, 1)*translationY,
        hue: entity.hue + p.random(-1, 1)*MAX_HUE_VARIATION
      }
      
      p.line(entity.x1, entity.y1, entity.x2, entity.y2)
      p.stroke(entity.hue, BASE_SATURATION, BASE_LIGHT)
    })
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default LinesMovement