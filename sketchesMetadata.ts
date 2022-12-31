interface ISketchMetadata {
  url: string,
  title: string,
  componentName: string,
  description: string
}

export const SKETCHES: ISketchMetadata[] = [
  {
    url: 'fibonacciTree',
    title: 'Árvore de Fibonacci',
    componentName: 'FibonacciTree',
    description: 'Ramificações crescentes e sucessivas partindo de um único ponto'  
  },
  {
    url: 'polygons',
    title: 'Polígonos Inscritos',
    componentName: 'InscribedPolygons',
    description: 'Polígonos cada vez menores inscritos um dentro do outro'  
  },
  {
    url: 'lines',
    title: 'Linhas em Movimento',
    componentName: 'LinesMovement',
    description: 'Segmentos de reta em movimentos aleatórios'  
  },
  {
    url: 'spiral',
    title: 'Espiral',
    componentName: 'Spiral',
    description: 'Lugar geométrico dos pontos com ângulo e distância crescentes em relação à origem'  
  }
]
