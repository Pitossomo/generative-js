import Head from "next/head"
import { useRouter } from "next/router"
import HomeLink from "../../components/HomeLink"
import SketchSwitch from "../../components/sketchs/SketchSwitch";

const Arts = () => {
  const router = useRouter()
  const { art } = router.query
  if (typeof art != 'string') return null

  const title = 'GenArt' + (!art ? '' : ' | ' 
    + art.split(/(?=[A-Z])/)
    .map((word: string): string => (word.length > 1)
      ? word[0].toUpperCase() + word.slice(1)
      : word.toUpperCase()
    ).join(' ')
  )
  
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content="Galeria de artes generativas com p5.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLink />
      { art ? <SketchSwitch art={art} /> : null }
    </>
  )
}

export default Arts

