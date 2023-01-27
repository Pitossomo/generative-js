import { IInput } from "./src/utils/p5Inputs" 

interface ISketchMetadata {
  url: string,
  title: string,
  componentName: string,
  description: string,
  inputs: IInput[]
}

export const SKETCHES: ISketchMetadata[] = [
  {
    url: 'fibonacciTree',
    title: 'Árvore de Fibonacci',
    componentName: 'FibonacciTree',
    description: 'Ramificações crescentes e sucessivas partindo de um único ponto',
    inputs: [
      {
        name: 'generations',
        min: 2, max: 20, default: 10, step: 1, 
        label: 'Number of generations',
        type: 'SLIDER'
      },
      {
        name: 'showPoints',
        label: 'Show points',
        type: 'CHECKBOX'
      }
    ]
  },
  {
    url: 'polygons',
    title: 'Polígonos Inscritos',
    componentName: 'InscribedPolygons',
    description: 'Polígonos cada vez menores inscritos um dentro do outro',
    inputs: [
      {
        name: 'vertices',
        type: 'SLIDER',
        min: 3, max: 15, step: 1, default: 6,
        label: 'Number of Vertices'
      },
      {
        name: 'polygons',
        type: 'SLIDER',
        min: 1, max: 50, step: 1, default: 10,
        label: 'Number of Polygons'
      },
      {
        name: 'rotation',
        type: 'SLIDER',
        min: -180, max: 180, step: 1, default: 0,
        label: 'Initial Rotation'
      },
      {
        name: 'proportion',
        type: 'SLIDER',
        min: 0, max: 1, step: 0.01, default: 0.5,
        label: 'Segment division'
      }
    ]
  },
  {
    url: 'lines',
    title: 'Linhas em Movimento',
    componentName: 'LinesMovement',
    description: 'Segmentos de reta em movimentos aleatórios',
    inputs: []  
  },
  {
    url: 'spiral',
    title: 'Espiral',
    componentName: 'Spiral',
    description: 'Lugar geométrico dos pontos com ângulo e distância crescentes em relação à origem',
    inputs: [
      {
        name: 'numPoints',
        type: 'SLIDER',
        min: 3, max: 400, step: 1, default: 200,
        label: 'Number of Points'
      },
      {
        name: 'rounds',
        type: 'SLIDER',
        min: 1, max: 20, step: 1, default: 5,
        label: 'Number of Rounds'
      },
    ]
  }
]
