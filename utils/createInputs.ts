import p5 from "p5";
import { P5Input } from "../types/P5Input"

export interface IInput {
  type: string,
  name: string,
  min?: number,
  max?: number,
  step?: number,
  default?: number,
  label: string
}

const create = (p: p5, input: IInput): P5Input => {
  switch (input.type) {
    case 'SLIDER': return p.createSlider(input.min || 0, input.max || 100, input.default, input.step || 1)
    case 'CHECKBOX': return p.createCheckbox(input.label, input.default ? true : false)
    default: return p.createInput(input.default?.toString())
  }
} 

const findStep = (variation: number, step: number): number => {
  step = Math.max(step, Math.ceil(variation/5))
  let numSteps = variation/step
  while (numSteps%1) {
    step--
    numSteps = variation/step
  }
  return step
}

export const createInput = (x: number, y: number, p: p5, inputProps: IInput): P5Input => {
  if (inputProps.type !== 'CHECKBOX') {
    p.createP(inputProps.label).position(x, y)
  }

  const element = create(p, inputProps)
  element.position(x, y + 20).attribute('list', inputProps.name)
  if (element.input) element.input(() => { p.redraw() })

  if (inputProps.type === 'SLIDER') {
    const datalist = p.createElement('ul').position(x,y+40).class('datalist')
    const [min, max] = [inputProps.min || 0, inputProps.max || 100]

    for (let i = min; i <= max; i+= findStep(max - min, inputProps.step || 1)) {
      datalist.child(p.createElement('li',i.toString()).addClass('datalist-item'))
    }
  } 

  return element
}