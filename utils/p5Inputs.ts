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
  let suggestedStep = Math.max(step, Math.ceil(variation/5))
  let numSteps = variation/suggestedStep
  while (numSteps%1) {
    suggestedStep++
    numSteps = variation/suggestedStep
  }
  return suggestedStep
}

const createInput = (x: number, y: number, p: p5, inputProps: IInput): P5Input => {
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

export const createInputs = (x0: number, y0: number, p: p5, inputs: IInput[]): Record<string,P5Input> => {
  const inputsByName: Record<string, P5Input> = {}
  inputs.forEach((input, j) => inputsByName[input.name] = createInput(x0, y0 + j*30, p, input))
  return inputsByName
}