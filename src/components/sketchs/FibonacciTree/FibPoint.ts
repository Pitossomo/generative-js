import p5 from "p5";

export class FibPoint {
  age: number;
  root: FibPoint | null;
  x: number;
  y: number;
  draw: (showPoint: boolean) => void;

  constructor(age: number, root: FibPoint | null, generation: number, y: number, p: p5, DX: number) {
    this.age = age
    this.root = root 
    this.x = (generation+1)*DX
    this.y = y

    this.draw = (showPoint: boolean) => {
      if (!this.root) return; 
      if (showPoint) {
        p.strokeWeight(this.age+1)
        p.point(this.x, this.y)
      } 
      p.strokeWeight(1)
      p.line(this.root.x, this.root.y, this.x, this.y)
    }
  }
}