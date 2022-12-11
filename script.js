const toRadialCoordinates = (x,y) => [Math.sqrt(x**2 + y**2), Math.atan(y/x)]
const toCartesianCoordinates = (r,angle) => [r*Math.cos(angle), r*Math.sin(angle)]

function setup() {
  createCanvas(windowWidth, windowHeight)
  background('black')
  stroke('white')

  const NUM_POINTS = 100
  const NUM_ROUNDS = 5

  let point1 = [windowWidth/2, windowHeight/2]
  for (let i = 0; i < NUM_POINTS; i++) {
    point2 = toCartesianCoordinates(
      Math.min(windowWidth,windowHeight)/2/100*i + windowWidth/2,
      2*Math.PI*NUM_ROUNDS/NUM_POINTS + windowHeight/2
    )
    point(point1[0], point1[1], point2[0], point2[1])
    point1 = [...point2]
  }
  noLoop()
}