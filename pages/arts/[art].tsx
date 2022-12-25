import Head from "next/head"
import { useRouter } from "next/router"
import HomeLink from "../../components/HomeLink"
import p5Types from "p5"; //Import this for typechecking and intellisense

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

  let [x, y] = [50, 50]; 

  const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background(0);
		p5.ellipse(x, y, 70, 70);
		x++;
	};

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content="Galeria de artes generativas com p5.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLink />
    </>
  )
}

export default Arts

