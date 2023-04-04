export interface iColor {
  r: number;
  g: number;
  b: number;
}

export interface iRandomPhysics {
  angle: number;
  color: iColor;
  decay: number;
  drift: number;
  gravity: number;
  i: number;
  scalar: number;
  shape: string;
  spread: number;
  startVelocity: number;
  ticks: number;
  x: number;
  y: number;
}

export interface iFetti {
  angle2D: number;
  color: iColor;
  decay: number;
  drift: number;
  gravity: number;
  ovalScalar: number;
  random: number;
  scalar: number;
  shape: string;
  tick: number;
  tiltAngle: number;
  tiltCos: number;
  tiltSin: number;
  totalTicks: number;
  velocity: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleX: number;
  wobbleY: number;
  x: number;
  y: number;
}

export interface IConfettiOptions {
  angle?: number;
  colors?: string[];
  decay?: number;
  drift?: number;
  gravity?: number;
  height: number;
  particleCount?: number;
  scalar?: number;
  shapes?: string[];
  spread?: number;
  startVelocity?: number;
  ticks?: number;
  width: number;
  x: number;
  y: number;
}
