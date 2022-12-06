const entities = []

var num_entities, max_dist_variation, max_hue_variation, baseSaturation, baseLight

function setup() {
  num_entities = Math.floor(random(10, 30))
  max_dist_variation = 5
  max_hue_variation = 1
  baseSaturation = 80
  baseLight = 80

  createCanvas(windowWidth, windowHeight)

  for (let i = 0; i < num_entities; i++) {
    entities.push([
      random(windowWidth),
      random(windowHeight),
      random(windowWidth),
      random(windowHeight),
      random(100)
    ])
    colorMode(HSB, 100)
  }

  frameRate(3)
}

function draw() {
  background(255)
  entities.forEach((entityProps, i) => {

    // entityProps = [startX, startY, endX, endY, hue]
    // make coordinates move
    entities[i] = entityProps.map((prop, j) => (
      (j < 4)
        ? (prop + random(-1, 1)*max_dist_variation)
        : (prop + random(-1, 1)*max_hue_variation)
    ))

    // drawLine
    line(...entityProps.slice(0,4))
    stroke(entityProps[4], baseSaturation, baseLight)
  })
}