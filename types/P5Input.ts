import p5 from "p5";

export type P5Input = p5.Element & {input?: Function, changed?:Function, checked?: Function}