import dynamic from 'next/dynamic'

const Sketch = dynamic(
  () => import('react-p5').then((mod) => mod.default),
  { ssr: false }
)

interface IBaseSketchProps {
  setup: Function,
  draw: Function
}

const BaseSketch = ({setup, draw}: IBaseSketchProps) => {
  return <Sketch setup={setup} draw={draw} />
}

export default Sketch 