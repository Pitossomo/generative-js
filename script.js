function setup() {
  createCanvas(windowWidth, windowHeight)
  noLoop()
}

function draw() {
  const maxWidth = windowWidth
  for (let i = 0; i < 100; i++) {
    randomNumber = random(maxWidth)
    line(Math.random(), i*30, 10 + randomNumber, 0)
  }
}

