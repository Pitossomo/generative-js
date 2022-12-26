export const toPolar = (x: number, y: number): number[] => [x**2+y**2, Math.atan(y/x)]
export const toCartesian = (r :number, angle: number): number[] => [r*Math.cos(angle), r*Math.sin(angle)]
