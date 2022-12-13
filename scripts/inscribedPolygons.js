const toRadialCoordinates = (x,y) => [dist(x,y,0,0), Math.atan(y/x)]
const toCartesianCoordinates = (r,angle) => [r*Math.cos(angle), r*Math.sin(angle)]

// inscribedPolygons.js
function setup() {
  createCanvas(windowWidth, windowHeight)
  background('black')

  const NUM_VERTEX = 15
  const NUM_POLYGONS = NUM_VERTEX
  const INITIAL_ROTATION = Math.PI/2
  const INITIAL_MARGIN = Math.max(Math.min(windowHeight,windowHeight)*0.10, 100)
  const VERTEX_ROTATION = 2*Math.PI/NUM_VERTEX
  const VERTEX_STEP = 3
  const AVERAGE_PROPORTION = 0.5

  const averagePoint = ([point1X, point1Y], [point2X, point2Y]) => (
    [
      point1X*AVERAGE_PROPORTION + point2X*(1-AVERAGE_PROPORTION),
      point1Y*AVERAGE_PROPORTION + point2Y*(1-AVERAGE_PROPORTION)
    ]
  )

  stroke('white')
  strokeWeight(3)

  let points = [[]]
  const ro = Math.min(windowHeight, windowWidth)/2 - INITIAL_MARGIN
  for (let i = 0; i < NUM_VERTEX; i++) {
    const point = toCartesianCoordinates(ro, VERTEX_ROTATION*i - INITIAL_ROTATION) 
    points[0].push([point[0] + windowWidth/2, point[1] + windowHeight/2])
  }

  for (let j = 0; j < NUM_POLYGONS; j++) {
    let newPoints = []
    let prevPoints = points[j]
    prevPoints.forEach((point, k) => {
      const previousIndex = (prevPoints.length + k - VERTEX_STEP)%NUM_VERTEX 
      const previousPoint = prevPoints[previousIndex]
      line(previousPoint[0], previousPoint[1], point[0], point[1])
      newPoints.push(averagePoint(previousPoint, point))
    })
    points.push(newPoints)
  }

  noLoop()
}