import { RefObject } from "react";
import { toCartesian } from "../../utils/polarCoordinates";
import { BaseSketch } from "./BaseSketch"
import p5 from "p5";

const InscribedPolygons = () => {
  const NUM_VERTEX = 15
  const NUM_POLYGONS = NUM_VERTEX
  const INITIAL_ROTATION= Math.PI/2
  const INITIAL_MARGIN = 100
  const VERTEX_ROTATION = 2*Math.PI/NUM_VERTEX
  const VERTEX_STEP = 3
  const AVERAGE_PROPORTION = 0.5

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    console.log('setup')
  }

  function draw(p: p5) {
    p.background('black')

    const averagePoint = ([point1X, point1Y]: number[], [point2X, point2Y]: number[]) => (
      [
        point1X*AVERAGE_PROPORTION + point2X*(1-AVERAGE_PROPORTION),
        point1Y*AVERAGE_PROPORTION + point2Y*(1-AVERAGE_PROPORTION)
      ]
    )

    p.stroke('white')
    p.strokeWeight(3)

    let points: number[][][] = [[]]
    const ro = Math.min(p.windowHeight, p.windowWidth)/2 - INITIAL_MARGIN
    for (let i = 0; i < NUM_VERTEX; i++) {
      const point = toCartesian(ro, VERTEX_ROTATION*i - INITIAL_ROTATION) 
      points[0].push([point[0] + p.windowWidth/2, point[1] + p.windowHeight/2])
    }

    for (let j = 0; j < NUM_POLYGONS; j++) {
      let newPoints: number[][] = []
      let prevPoints = points[j]
      prevPoints.forEach((point, k) => {
        const previousIndex = (prevPoints.length + k - VERTEX_STEP)%NUM_VERTEX 
        const previousPoint = prevPoints[previousIndex]
        p.line(previousPoint[0], previousPoint[1], point[0], point[1])
        newPoints.push(averagePoint(previousPoint, point))
      })
      points.push(newPoints)
    }
  }

  return <BaseSketch setup={setup} draw={draw} />
}

export default InscribedPolygons