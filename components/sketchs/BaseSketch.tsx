import { Component, createRef } from "react";
import p5 from "p5"; 

export interface IBaseSketchProps {
  setup: (p: p5) => void
  draw: (p: p5) => void
}

export class BaseSketch extends Component<IBaseSketchProps> {
  myRef: any;
  myP5?: p5;
  setup?: any;
  draw?: any;
  
  constructor(props: IBaseSketchProps) {
    super(props);
    this.myRef = createRef()
  }

  sketch = (p: p5) => {
    p.setup = this.setup
    p.draw = this.draw
  }

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current)
  }

  render() {
    return <div ref={this.myRef}></div>
  }
}