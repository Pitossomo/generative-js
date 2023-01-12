import { RefObject } from "react";
import { BaseSketch } from "../BaseSketch";
import p5 from "p5";
import { FibPoint } from "./FibPoint";
import { P5Input } from "../../../types/P5Input";

const FibonacciTree = () => {
  var generationsSlider: P5Input
  var pointsCheckBox: P5Input

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>): void {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)

    const xForm = p.windowWidth-250
    
    const generationsSliderLabel = p.createP('Number of generations')
    generationsSliderLabel.position(xForm,50)
    generationsSlider = p.createSlider(1,20,10,1)
    generationsSlider.position(xForm, 70)
    if (generationsSlider.input) generationsSlider.input(() => { p.redraw() })

    pointsCheckBox = p.createCheckbox('Show points', true)
    pointsCheckBox.position(xForm, 110)
    if (pointsCheckBox.changed) pointsCheckBox.changed(() => { p.redraw() })
    p.noLoop()
  }

  function draw (p: p5) {
    const MAX_GENERATIONS = Number(generationsSlider.value())
    const SHOW_POINTS = (pointsCheckBox.checked) ? pointsCheckBox.checked() : false
    const DX = p.windowWidth/(MAX_GENERATIONS+1)
  
    p.background('black')
    p.stroke('white')
  
    const initialRoot = new FibPoint(0, null, 0, p.windowHeight/2, p, DX)
    initialRoot.draw(SHOW_POINTS)
    let generations = [[initialRoot]]
  
    for (let generation = 1; generation < MAX_GENERATIONS; generation++) {
      let newGeneration: FibPoint[] = []
      const totalParallels = (generation < 2) 
        ? 1
        : generations[generation-1].length + generations[generation-2].length
  
      const dy = p.windowHeight/(totalParallels + 1)
  
      generations[generation-1].forEach((root, j) => {
        const parallelIndex = newGeneration.length + 1
        const updatedPoint = new FibPoint(root.age + 1, root, generation, parallelIndex*dy, p, DX)
        newGeneration.push(updatedPoint)
        updatedPoint.draw(SHOW_POINTS)
  
        if (root.age > 0) {
          const offspring = new FibPoint(0, root, generation, (parallelIndex+1)*dy, p, DX)
          newGeneration.push(offspring)
          offspring.draw(SHOW_POINTS)
        }
      })
      generations.push(newGeneration)      
    }
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default FibonacciTree