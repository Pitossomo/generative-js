import dynamic from "next/dynamic"
import { SKETCHES } from "../../sketchesMetadata"

type ISketchSwitch = { url: string}


const SketchSwitch = ({url}: ISketchSwitch) => {
  const sketchData = SKETCHES.find(s => s.url === url)
  
  if (!sketchData?.componentName) return null

  const Sketch = dynamic(
    () => import(`./${sketchData?.componentName}`).then(mod => mod.default),
    {
      ssr: false,
      loading: () => <h1>Loading...</h1>
    }
  )

  return <Sketch />
}

export default SketchSwitch