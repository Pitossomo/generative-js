import FibonacciSketch from "./FibonacciSketch"
import InscribedPolygonsSketch from "./InscribedPolygonsSketch"
import SpiralSketch from "./SpiralSketch"

type ISketchSwitch = { art: string}

const SketchSwitch = ({art}: ISketchSwitch) => {
  switch (art) {
    case 'fibonacciTree': return <FibonacciSketch />
    case 'inscribedPolygons': return <InscribedPolygonsSketch />
    case 'spiral': return <SpiralSketch />
    default: return null;
  }
}

export default SketchSwitch