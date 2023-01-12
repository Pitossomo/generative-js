import { RefObject } from "react";
import { toCartesian } from "../../../utils/polarCoordinates";
import { BaseSketch } from "../BaseSketch"
import p5 from "p5";
import { P5Input } from "../../../types/P5Input";

const InscribedPolygons = () => {
  var numVertexSlider: P5Input 
  const INITIAL_NUM_VERTEX = 15
  const INITIAL_ROTATION= Math.PI/2
  const INITIAL_MARGIN = 100
  const VERTEX_ROTATION = 2*Math.PI/INITIAL_NUM_VERTEX
  const VERTEX_STEP = 3
  const AVERAGE_PROPORTION = 0.5

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    p.noLoop()
    
    const xForm = p.windowWidth-250
    
    const numVertexSliderLabel = p.createP('Number of vertex')
    numVertexSliderLabel.position(xForm,50)
    numVertexSlider = p.createSlider(3,20,10,1)
    numVertexSlider.position(xForm, 70)
    if (numVertexSlider.input) numVertexSlider.input(() => { p.redraw() })
  }

  function draw(p: p5) {
    p.background('black')

    const NUM_POLYGONS = numVertexSlider.value()
  
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
    for (let i = 0; i < 15; i++) {
      const point = toCartesian(ro, VERTEX_ROTATION*i - INITIAL_ROTATION) 
      points[0].push([point[0] + p.windowWidth/2, point[1] + p.windowHeight/2])
    }

    for (let j = 0; j < NUM_POLYGONS; j++) {
      const numVertex: number = Number(numVertexSlider.value())
      let newPoints: number[][] = []
      let prevPoints = points[j]
      prevPoints.forEach((point, k) => {
        const previousIndex = (prevPoints.length + k - VERTEX_STEP)%numVertex 
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