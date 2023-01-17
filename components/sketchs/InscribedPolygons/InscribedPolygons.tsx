import { RefObject } from "react";
import { toCartesian } from "../../../utils/polarCoordinates";
import { BaseSketch } from "../BaseSketch"
import p5 from "p5";
import { P5Input } from "../../../types/P5Input";
import { createInput } from "../../../utils/createInputs";

const InscribedPolygons = () => {
  var numVerticesSlider: P5Input
  var numPolygonsSlider: P5Input
  var initialRotationSlider: P5Input
  const INITIAL_MARGIN = 100
  const VERTEX_ROTATION = 2*Math.PI/4
  const VERTEX_STEP = 1
  const AVERAGE_PROPORTION = 0.5

  function setup (p: p5, parentRef: RefObject<HTMLDivElement>) {
    const cnv = p.createCanvas(p.windowWidth,p.windowHeight)
    if (parentRef.current) cnv.parent(parentRef.current)
    p.noLoop()
    
    const xForm = p.windowWidth-250
    numVerticesSlider = createInput(xForm, 50, p, {
      name: 'vertices',
      type: 'SLIDER',
      min: 2, max: 20, step: 1, default: 15,
      label: 'Number of Vertices'
    })

    numPolygonsSlider = createInput(xForm, 110, p, {
      name: 'polygons',
      type: 'SLIDER',
      min: 1, max: 20, step: 1, default: 5,
      label: 'Number of Polygons'
    })

    initialRotationSlider = createInput(xForm, 170, p, {
      name: 'rotation',
      type: 'SLIDER',
      min: 0, max: 360, step: 1, default: 45,
      label: 'Initial Rotation'
    })
  }

  function draw(p: p5) {
    p.background('black')

    const NUM_POLYGONS = Number(numPolygonsSlider.value())
    const NUM_VERTICES = Number(numVerticesSlider.value())
    const INITIAL_ROTATION = Number(initialRotationSlider.value())*Math.PI/180
  
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
      let newPoints: number[][] = []
      let prevPoints = points[j]
      prevPoints.forEach((point, k) => {
        const previousIndex = (prevPoints.length + k - VERTEX_STEP)%NUM_VERTICES
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