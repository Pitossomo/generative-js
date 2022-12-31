import { Component, RefObject, createRef } from "react";
import p5 from "p5"; 

export interface IBaseSketchProps {
  setup: (p: p5, parentRef: RefObject<HTMLDivElement>) => void
  draw: (p: p5) => void
}

export class BaseSketch extends Component<IBaseSketchProps> {
  parentRef: RefObject<HTMLDivElement>;
  sketch!: p5;

  constructor(props: IBaseSketchProps) {
    super(props);
    this.parentRef = createRef()
  }

  componentDidMount(): void {
    this.sketch = new p5((p) => {
      p.setup = () => { this.props.setup(p, this.parentRef) }
      p.draw = () => { this.props.draw(p) }
    })
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  componentWillUnmount(): void {
    this.sketch.remove();
  }
  
  render() {
    return <div ref={this.parentRef} />
  }
}