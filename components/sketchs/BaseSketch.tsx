import p5Types from "p5"; //Import this for typechecking and intellisense
import dynamic from 'next/dynamic'

const Sketch = dynamic(
  () => import('react-p5').then((mod) => mod.default),
  { ssr: false }
)

interface IBaseSketchProps {
  setup: ((p5: p5Types, canvasParentRef: Element) => void),
  draw?: ((p5: p5Types) => void)
}

const BaseSketch = ({setup, draw}: IBaseSketchProps) => {
  return <Sketch setup={setup} draw={draw} />
}

export default BaseSketch 