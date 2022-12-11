// fibonacciTree.js
function setup() {
  createCanvas(windowWidth, windowHeight)
  background('black')
  stroke('white')

  const MAX_GENERATIONS = 15
  const DX = windowWidth/(MAX_GENERATIONS+1)

  class FibPoint {
    constructor(age, root, generation, y) {
      this.age = age
      this.root = root
      this.x = (generation+1)*DX
      this.y = y

      this.draw = () => {
        if (!this.root) return; 
        strokeWeight(this.age+1)
        point(this.x, this.y)
        strokeWeight(1)
        line(this.root.x, this.root.y, this.x, this.y)
      }
    }
  }

  const initialRoot = new FibPoint(
    age = 0,
    root = null,
    generation = 0,
    y = 1*windowHeight/2
  )
  initialRoot.draw()
  let generations = [[initialRoot]]

  for (let generation = 1; generation < MAX_GENERATIONS; generation++) {
    let newGeneration = []
    const totalParallels = (generation < 2) 
      ? 1
      : generations[generation-1].length + generations[generation-2].length

    const dy = windowHeight/(totalParallels + 1)

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