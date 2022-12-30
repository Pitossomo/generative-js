import BaseSketch from "./BaseSketch"
import p5Types from "p5"; //Import this for typechecking and intellisense

const FibonacciSketch = () => {
  function setup(p5: p5Types, canvasParentRef: Element) {
    const canvasWrapper = document.querySelector('.canvasWrapper')
    console.log(canvasWrapper)
    p5.createCanvas(p5.windowWidth,p5.windowHeight)
    p5.background('black')
    p5.stroke('white')
  
    const MAX_GENERATIONS = 15
    const DX = p5.windowWidth/(MAX_GENERATIONS+1)
  
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
          p5.strokeWeight(this.age+1)
          p5.point(this.x, this.y)
          p5.strokeWeight(1)
          p5.line(this.root.x, this.root.y, this.x, this.y)
        }
      }
    }
  
    const initialRoot = new FibPoint(0, null, 0, p5.windowHeight
      /2)
    initialRoot.draw()
    let generations = [[initialRoot]]
  
    for (let generation = 1; generation < MAX_GENERATIONS; generation++) {
      let newGeneration: FibPoint[] = []
      const totalParallels = (generation < 2) 
        ? 1
        : generations[generation-1].length + generations[generation-2].length
  
      const dy = p5.windowHeight
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
  
    p5.noLoop()
  }
  return <BaseSketch setup={setup} />
}

export default FibonacciSketch