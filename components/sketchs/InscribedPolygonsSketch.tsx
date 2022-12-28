import { toCartesian } from "../../utils/polarCoordinates";
import BaseSketch from "./BaseSketch"
import p5Types from "p5"; //Import this for typechecking and intellisense

const InscribedPolygonsSketch = () => {
  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background('black')

    const NUM_VERTEX = 15
    const NUM_POLYGONS = NUM_VERTEX
    const INITIAL_ROTATION = Math.PI/2
    const INITIAL_MARGIN = Math.max(Math.min(p5.windowHeight,p5.windowHeight)*0.10, 100)
    const VERTEX_ROTATION = 2*Math.PI/NUM_VERTEX
    const VERTEX_STEP = 3
    const AVERAGE_PROPORTION = 0.5

    const averagePoint = ([point1X, point1Y]: number[], [point2X, point2Y]: number[]) => (
      [
        point1X*AVERAGE_PROPORTION + point2X*(1-AVERAGE_PROPORTION),
        point1Y*AVERAGE_PROPORTION + point2Y*(1-AVERAGE_PROPORTION)
      ]
    )

    p5.stroke('white')
    p5.strokeWeight(3)

    let points: number[][][] = [[]]
    const ro = Math.min(p5.windowHeight, p5.windowWidth)/2 - INITIAL_MARGIN
    for (let i = 0; i < NUM_VERTEX; i++) {
      const point = toCartesian(ro, VERTEX_ROTATION*i - INITIAL_ROTATION) 
      points[0].push([point[0] + p5.windowWidth/2, point[1] + p5.windowHeight/2])
    }

    for (let j = 0; j < NUM_POLYGONS; j++) {
      let newPoints: number[][] = []
      let prevPoints = points[j]
      prevPoints.forEach((point, k) => {
        const previousIndex = (prevPoints.length + k - VERTEX_STEP)%NUM_VERTEX 
        const previousPoint = prevPoints[previousIndex]
        p5.line(previousPoint[0], previousPoint[1], point[0], point[1])
        newPoints.push(averagePoint(previousPoint, point))
      })
      points.push(newPoints)
    }

    p5.noLoop()
  }

  return <BaseSketch setup={setup} />
}

export default InscribedPolygonsSketch