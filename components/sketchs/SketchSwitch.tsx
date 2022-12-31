import BaseSketch from "./BaseSketch"

type ISketchSwitch = { art: string}

const SketchSwitch = ({art}: ISketchSwitch) => {
  /*switch (art) {
    case 'fibonacciTree': return <FibonacciSketch />
    case 'inscribedPolygons': return <InscribedPolygonsSketch />
    case 'spiral': return <SpiralSketch />
    case 'linesMovement': return <LinesMovement />
    default: return null;
  }*/
  return <BaseSketch />
}

export default SketchSwitch