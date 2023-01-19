import dynamic from "next/dynamic"
import { ComponentType } from "react"
import { SKETCHES } from "../../../sketchesMetadata"
import { IInput } from "../../utils/p5Inputs"

type ISketchSwitch = { url: string }
export type ISketchProps = { inputs: IInput[] }
type ISketch = ComponentType<ISketchProps>

const SketchSwitch = ({url}: ISketchSwitch) => {
  const sketchData = SKETCHES.find(s => s.url === url)
  
  if (!sketchData?.componentName) return null

  const Sketch: ISketch = dynamic(
    () => import(`./${sketchData?.componentName}/${sketchData?.componentName}`)
      .then(mod => mod.default),
    {
      ssr: false,
      loading: () => <h1>Loading...</h1>
    }
  )

  return <Sketch inputs={sketchData.inputs} />
}

export default SketchSwitch