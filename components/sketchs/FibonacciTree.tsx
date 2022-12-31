import { RefObject } from "react";
import { BaseSketch } from "./BaseSketch";
import p5 from "p5";

const FibonacciTree = () => {
  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    p.noLoop()
  }

  function draw (p: p5) {
    p.background('black')
    p.stroke('white')
  
    const MAX_GENERATIONS = 15
    const DX = p.windowWidth/(MAX_GENERATIONS+1)
  
    class FibPoint {
      age: number;
      root: FibPoint | null;
      x: number;
      y: number;
      draw: () => void;

      constructor(age: number, root: FibPoint | null, generation: number, y: number) {
        this.age = age
        this.root = root 
        this.x = (generation+1)*DX
        this.y = y
  
        this.draw = () => {
          if (!this.root) return; 
          p.strokeWeight(this.age+1)
          p.point(this.x, this.y)
          p.strokeWeight(1)
          p.line(this.root.x, this.root.y, this.x, this.y)
        }
      }
    }
  
    const initialRoot = new FibPoint(0, null, 0, p.windowHeight
      /2)
    initialRoot.draw()
    let generations = [[initialRoot]]
  
    for (let generation = 1; generation < MAX_GENERATIONS; generation++) {
      let newGeneration: FibPoint[] = []
      const totalParallels = (generation < 2) 
        ? 1
        : generations[generation-1].length + generations[generation-2].length
  
      const dy = p.windowHeight
      /(totalParallels + 1)
  
      generations[generation-1].forEach((root, j) => {
        const parallelIndex = newGeneration.length + 1
        const updatedPoint = new FibPoint(root.age + 1, root, generation, parallelIndex*dy)
        newGeneration.push(updatedPoint)
        updatedPoint.draw()
  
        if (root.age > 0) {
          const offspring = new FibPoint(0, root, generation, (parallelIndex+1)*dy)
          newGeneration.push(offspring)
          offspring.draw()
        }
      })
      generations.push(newGeneration)      
    }
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default FibonacciTree