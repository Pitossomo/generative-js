import dynamic from "next/dynamic";
import { Component, createRef } from "react";
import p5 from "p5"; 

interface IBaseSketchProps {
  setup: (p: p5) => void
  draw: (p: p5) => void
}

class BaseSketch extends Component {
  myRef: any;
  myP5?: p5;
  setup?: any;
  draw?: any;
  
  constructor(props: IBaseSketchProps) {
    super(props);
    this.myRef = createRef()
  }

  sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(400,400);
    }
  
    p.draw = () => {
      p.background(220);
      p.ellipse(50,50,80,80)
    }
  }

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current)
  }

  render() {
    return <div ref={this.myRef}></div>
  }
}

export default BaseSketch