import { random } from "remotion";
import type { iRandomPhysics, iFetti, IConfettiOptions } from "./interfaces";
import { prop, onlyPositiveInt, randomInt, colorsToRgb } from "./utils";

const RAD = Math.PI / 180;

const randomPhysics = (opts: iRandomPhysics): iFetti => {
  const radAngle = opts.angle * RAD;
  const radSpread = opts.spread * RAD;

  return {
    x: opts.x,
    y: opts.y,
    wobble: random("wobble" + opts.i) * 10,
    wobbleSpeed: Math.min(0.11, random("wobbleSpeed" + opts.i) * 0.1 + 0.05),
    velocity:
      opts.startVelocity * 0.5 +
      random("velocity" + opts.i) * opts.startVelocity,
    angle2D:
      -radAngle + (0.5 * radSpread - random("angle2D" + opts.i) * radSpread),
    tiltAngle: (random("tiltAngle" + opts.i) * (0.75 - 0.25) + 0.25) * Math.PI,
    color: opts.color,
    shape: opts.shape,
    tick: 0,
    totalTicks: opts.ticks,
    decay: opts.decay,
    drift: opts.drift,
    random: random("random" + opts.i) + 2,
    tiltSin: 0,
    tiltCos: 0,
    wobbleX: 0,
    wobbleY: 0,
    gravity: opts.gravity * 3,
    ovalScalar: 0.6,
    scalar: opts.scalar,
  };
};

const updateFetti = (
  context: CanvasRenderingContext2D,
  fetti: iFetti,
  frame: number
) => {
  const w = fetti.wobble + fetti.wobbleSpeed * frame;

  let v = fetti.velocity;
  let { x } = fetti;
  let { y } = fetti;

  for (let i = 0; i < frame; i++) {
    v *= fetti.decay;
    x += Math.cos(fetti.angle2D) * v + fetti.drift;
    y += Math.sin(fetti.angle2D) * v + fetti.gravity;
  }

  fetti.tiltAngle = 0.1 * frame;
  fetti.tiltSin = Math.sin(fetti.tiltAngle);
  fetti.tiltCos = Math.cos(fetti.tiltAngle);
  fetti.random = random(frame) + 2;
  fetti.wobbleX = x + 10 * fetti.scalar * Math.cos(w);
  fetti.wobbleY = y + 10 * fetti.scalar * Math.sin(w);

  const progress = frame / fetti.totalTicks;

  const x1 = x + fetti.random * fetti.tiltCos;
  const y1 = y + fetti.random * fetti.tiltSin;
  const x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
  const y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;

  context.fillStyle =
    "rgba(" +
    fetti.color.r +
    ", " +
    fetti.color.g +
    ", " +
    fetti.color.b +
    ", " +
    (1 - progress) +
    ")";
  context.beginPath();

  // Console.log(fetti.shape)

  if (fetti.shape === "circle") {
    context.ellipse(
      x,
      y,
      Math.abs(x2 - x1) * fetti.ovalScalar,
      Math.abs(y2 - y1) * fetti.ovalScalar,
      (Math.PI / 10) * w,
      0,
      2 * Math.PI
    );
  } else {
    context.moveTo(Math.floor(x), Math.floor(y));
    context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
    context.lineTo(Math.floor(x2), Math.floor(y2));
    context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
  }

  context.closePath();
  context.fill();

  return true;
};

const animate = (
  canvas: HTMLCanvasElement,
  fettis: iFetti[],
  size: { width: number; height: number }
) => {
  const context = canvas.getContext("2d");

  let animatingFettis = fettis.slice();

  function onDone() {
    if (!context) return;
    context.clearRect(0, 0, size.width, size.height);
  }

  /*
  The animation bit
  */
  function update(frame: number) {
    if (!context) return;

    if (!size.width && !size.height) {
      size.width = canvas.width;
      size.height = canvas.height;
    }

    context.clearRect(0, 0, size.width, size.height);

    animatingFettis = animatingFettis.filter((fetti) => {
      return updateFetti(context, fetti, frame);
    });

    if (!animatingFettis.length) {
      onDone();
    }
  }

  return {
    canvas,
    update,
  };
};

export const confettiCannon = (canvas: HTMLCanvasElement) => {
  let animationObj: any;

  function fireLocal(
    options: IConfettiOptions,
    size: { width: number; height: number }
  ) {
    const particleCount = prop(options, "particleCount", onlyPositiveInt);
    const angle = prop(options, "angle", Number);
    const spread = prop(options, "spread", Number);
    const startVelocity = prop(options, "startVelocity", Number);
    const decay = prop(options, "decay", Number);
    const gravity = prop(options, "gravity", Number);
    const drift = prop(options, "drift", Number);
    const colors = prop(options, "colors", colorsToRgb);
    const ticks = prop(options, "ticks", Number);
    const shapes = prop(options, "shapes");
    const scalar = prop(options, "scalar");
    const origin = { x: options.x, y: options.y };

    let temp = particleCount;
    const fettis = [];

    const startX = origin.x;
    const startY = origin.y;

    while (temp--) {
      fettis.push(
        randomPhysics({
          x: startX,
          y: startY,
          angle,
          spread,
          startVelocity,
          color: colors[temp % colors.length],
          shape: shapes[randomInt(0, shapes.length)],
          ticks,
          decay,
          gravity,
          drift,
          scalar,
          i: temp,
        })
      );
    }

    // If we have a previous canvas already animating,
    // add to it
    if (animationObj) {
      return animationObj.addFettis(fettis);
    }

    animationObj = animate(canvas, fettis, size);
  }

  function fire(options: IConfettiOptions) {
    const size = {
      width: options.width,
      height: options.height,
    };

    return fireLocal(options, size);
  }

  const frame = (currentFrame: number) => {
    if (animationObj) animationObj.update(currentFrame);
  };

  return { fire, frame };
};
