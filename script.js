// fibonacciTree.js
function setup() {
  const numSteps = 10
  const xSpace = windowWidth/(numSteps+1)

  createCanvas(windowWidth, windowHeight)

  strokeWeight(3)
  stroke('white')
  background('black')

  let fibonacci = [1, 1]
  for (let i = 2; i < numSteps; i++) {
    fibonacci.push(fibonacci[i-2] + fibonacci[i-1])

    for (let j = 0; j < fibonacci[i]; j++) {
      const ySpace = windowHeight/(fibonacci[i]+1)

      point(xSpace*(i+1), ySpace*(j+1))
    }
  }
} 