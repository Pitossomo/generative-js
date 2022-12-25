// fibonacciTree.js
import dynamic from 'next/dynamic'
import p5Types from "p5";

const Sketch = dynamic(
  () => import('react-p5').then((mod) => mod.default),
  { ssr: false }
)


const FibonacciSketch = () => {
  const WIDTH = 1000
  const HEIGHT = 800
  function setup(p5: p5Types, canvasParentRef: Element) {
    const canvasWrapper = document.querySelector('.canvasWrapper')
    console.log(canvasWrapper)
    p5.createCanvas(WIDTH,HEIGHT)
    p5.background('black')
    p5.stroke('white')
  
    const MAX_GENERATIONS = 15
    const DX = WIDTH/(MAX_GENERATIONS+1)
  
    class FibPoint {
      age: number;
      root: FibPoint;
      x: number;
      y: number;
      draw: () => void;
      constructor(age: number, root: FibPoint, generation: number, y: number) {
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
  
    const initialRoot = new FibPoint(
      age = 0,
      root = null,
      generation = 0,
      y = 1*canvasWrapper.offsetHeight/2
    )
    initialRoot.draw()
    let generations = [[initialRoot]]
  
    for (let generation = 1; generation < MAX_GENERATIONS; generation++) {
      let newGeneration = []
      const totalParallels = (generation < 2) 
        ? 1
        : generations[generation-1].length + generations[generation-2].length
  
      const dy = canvasWrapper.offsetHeight/(totalParallels + 1)
  
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
  
    noLoop()
  }
  return <Sketch setup={setup} draw={draw} />
}

export default FibonacciSketch