"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  Download,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Volume2,
  Zap,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export type PictureFrameStyle = "black" | "oak" | "white";

export interface PictureRailItem {
  id: string;
  /** Accessible name, caption and detail title. */
  title: string;
  artist?: string;
  year?: string;
  /** Screenshot shown on the physical phone screen. */
  image: string;
  /** Width ÷ height of the phone. Defaults to 0.48 (approx 9:18.75 smartphone aspect). */
  aspect?: number;
  /** Frame moulding style (kept for compatibility). */
  frame?: PictureFrameStyle;
  /** Adds a bevel-cut mat board (kept for compatibility). */
  mat?: boolean;
  /** Extra wire length in frame units (about -0.05 to 0.05). */
  drop?: number;
  /** Short wall-label text such as a price or version. */
  tag?: string;
  /** Technical specifications printed on the back of the physical device. */
  details?: string[];
  /** Optional direct APK download path */
  apkUrl?: string;
}

export interface PictureRailGalleryLabels {
  front: string;
  back: string;
  close: string;
  /** Hint printed on the lit print's wall label. */
  open: string;
}

export interface PictureRailGalleryProps extends React.ComponentProps<"section"> {
  items: PictureRailItem[];
  eyebrow?: string;
  heading?: string;
  /** Shown under the wall while no print is lit. */
  caption?: string;
  /** Call to action rendered under the caption. */
  action?: React.ReactNode;
  /** Lights the prints one by one until the visitor interacts. */
  autoplay?: boolean;
  /** Milliseconds each print stays lit during autoplay. */
  interval?: number;
  /** Lit print. Pass a number or null to control it; leave it undefined to let the gallery manage it. */
  active?: number | null;
  onActiveChange?: (index: number | null) => void;
  onOpenChange?: (index: number | null) => void;
  labels?: PictureRailGalleryLabels;
}

const DEFAULT_LABELS: PictureRailGalleryLabels = {
  front: "Device Front",
  back: "Device Chassis & Specs",
  close: "Close",
  open: "Lift to Inspect 3D"
};

const PERSPECTIVE = 1200;
const GAP = 0.24;
const BREATH = 0.08;
const EDGE = 36;
const SUPERSAMPLE = 2;
const LIFT_GROW = 1.08;
const LIFT_SCALE = 0.05;
const LIFT_Z = 24;
const TILT_X = -5;
const TILT_Y = 3.5;
const SWING_MAX = 13;
const SWING_DAMP = 2.4;
const SWING_G = 3800;
const SWING_COUPLING = 0.08;
const DRAG_COUPLING = 0.16;
const NEIGHBOUR_KICK = 10;
const DEG = 180 / Math.PI;

const BRASS = "linear-gradient(to bottom, #fef08a 0%, #eab308 32%, #854d0e 72%, #422006 100%)";
const BRASS_DIM = "linear-gradient(to bottom, #eab308 0%, #a16207 38%, #422006 100%)";
const BRASS_SIDE = "linear-gradient(to right, #fde047, #a16207 70%, #422006)";
const WARM = "color-mix(in oklab, white 55%, #00ff87)";

function stamp(event: { timeStamp: number }) {
  const now = performance.now();
  return event.timeStamp > 0 && event.timeStamp <= now + 1 ? event.timeStamp : now;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/** Real hanging devices have subtle organic resting variations (±1.2°). */
function restTilt(i: number) {
  return (((i * 37 + 11) % 7) - 3) * 0.35;
}

type Shape = { frame: PictureFrameStyle; mold: number; mat: number; matB: number; w: number; h: number };

function shapeOf(item: PictureRailItem): Shape {
  // Realistic smartphone aspect ratio (9:18.75 ~ 0.48)
  const aspect = clamp(item.aspect ?? 0.48, 0.42, 0.55);
  const iw = Math.sqrt(aspect);
  return { frame: item.frame ?? "black", mold: 0.03, mat: 0, matB: 0, w: iw, h: 1 / iw };
}

type Layout = {
  width: number;
  unit: number;
  carousel: boolean;
  railTop: number;
  railT: number;
  pivotY: number;
  tops: number[];
  stageH: number;
};

function layoutFor(shapes: Shape[], drops: number[], width: number): Layout {
  // ALWAYS run in carousel mode so smartphones keep true physical dimensions (~270px width)
  const carousel = true;

  // On desktop: target phone width ~265px. On mobile: ~215px.
  const targetW = width < 500 ? 215 : width < 768 ? 245 : 272;
  const avgW = shapes.length ? shapes.reduce((sum, s) => sum + s.w, 0) / shapes.length : 0.6928;
  const unit = Math.round(targetW / (avgW || 0.6928));

  const railTop = 14;
  const railT = 16;
  const pivotY = railTop + railT + 12; // ~42px
  const wireLength = Math.round(unit * 0.16); // ~62px drop from hook to phone top loops

  const tops = shapes.map((s, i) =>
    Math.round(pivotY + wireLength + clamp(drops[i] ?? 0, -0.05, 0.05) * unit)
  );

  const bottom = shapes.reduce((m, s, i) => Math.max(m, (tops[i] ?? 0) + s.h * unit), 0);
  const stageH = Math.round(bottom + 48);

  return { width, unit, carousel, railTop, railT, pivotY, tops, stageH };
}

type Sim = {
  x: number[];
  vx: number[];
  tx: number[];
  sw: number[];
  vsw: number[];
  e: number[];
  ve: number[];
  te: number[];
  ty: number[];
  vty: number[];
  tty: number[];
  drag: number;
  grab: number;
  free: number;
  last: number;
  raf: number;
  hx: number[];
  hv: number[];
};

function emptySim(): Sim {
  return {
    x: [],
    vx: [],
    tx: [],
    sw: [],
    vsw: [],
    e: [],
    ve: [],
    te: [],
    ty: [],
    vty: [],
    tty: [],
    drag: -1,
    grab: 0,
    free: 0,
    last: 0,
    raf: 0,
    hx: [],
    hv: []
  };
}

function pendulum(lay: Layout, shape: Shape, i: number) {
  return Math.max(30, (lay.tops[i] ?? 0) - lay.pivotY + (shape.h * lay.unit) / 2);
}

function reach(s: Sim, lay: Layout, shape: Shape, i: number) {
  const e = clamp(s.e[i] ?? 0, 0, 1);
  const half = (shape.w * lay.unit * (1 + (LIFT_GROW - 1) * e)) / 2;
  const top = (lay.tops[i] ?? 0) - lay.pivotY;
  const bottom = top + shape.h * lay.unit;
  const r = (s.sw[i] ?? 0) / DEG;
  const c = Math.cos(r);
  const sn = Math.sin(r);
  return [Math.min(-half * c - top * sn, -half * c - bottom * sn), Math.max(half * c - top * sn, half * c - bottom * sn)] as const;
}

function resolveContacts(s: Sim, lay: Layout, list: Shape[], margin: number) {
  const n = list.length;
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < n - 1; i++) {
      const a = list[i];
      const b = list[i + 1];
      if (!a || !b) continue;
      const overlap = (s.x[i] ?? 0) + reach(s, lay, a, i)[1] - ((s.x[i + 1] ?? 0) + reach(s, lay, b, i + 1)[0]) + margin;
      if (overlap <= 0) continue;
      if (i === s.drag) s.x[i + 1] = (s.x[i + 1] ?? 0) + overlap;
      else if (i + 1 === s.drag) s.x[i] = (s.x[i] ?? 0) - overlap;
      else {
        s.x[i] = (s.x[i] ?? 0) - overlap / 2;
        s.x[i + 1] = (s.x[i + 1] ?? 0) + overlap / 2;
      }
      const va = s.vx[i] ?? 0;
      const vb = s.vx[i + 1] ?? 0;
      if (va > vb) {
        const shared = (va + vb) / 2;
        if (i !== s.drag) s.vx[i] = shared;
        if (i + 1 !== s.drag) s.vx[i + 1] = shared;
      }
    }
  }
}

export function PictureRailGallery({
  items,
  eyebrow,
  heading,
  caption,
  action,
  autoplay = false,
  interval = 3200,
  active: activeProp,
  onActiveChange,
  onOpenChange,
  labels = DEFAULT_LABELS,
  className,
  ...rest
}: PictureRailGalleryProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const count = items.length;
  const controlled = activeProp !== undefined;
  const stageRef = React.useRef(null as HTMLDivElement | null);
  const hangs = React.useRef([] as (HTMLDivElement | null)[]);
  const backs = React.useRef([] as (HTMLDivElement | null)[]);
  const swings = React.useRef([] as (HTMLSpanElement | null)[]);
  const slots = React.useRef([] as (HTMLButtonElement | null)[]);
  const tilts = React.useRef([] as (HTMLSpanElement | null)[]);
  const lights = React.useRef([] as (HTMLSpanElement | null)[]);
  const glares = React.useRef([] as (HTMLSpanElement | null)[]);
  const dims = React.useRef([] as (HTMLSpanElement | null)[]);
  const shadows = React.useRef([] as (HTMLSpanElement | null)[]);
  const washes = React.useRef([] as (HTMLSpanElement | null)[]);
  const sim = React.useRef(emptySim());
  const shapes = React.useMemo(() => items.map(shapeOf), [items]);
  const drops = React.useMemo(() => items.map((item) => item.drop ?? 0), [items]);
  const [width, setWidth] = React.useState(0);
  const layout = React.useMemo(() => layoutFor(shapes, drops, width), [shapes, drops, width]);
  const [activeState, setActiveState] = React.useState(null as number | null);
  const requested = React.useRef(undefined as number | null | undefined);
  const raw = controlled ? (activeProp ?? null) : activeState;
  const current = raw !== null && raw >= 0 && raw < count ? raw : null;
  const [focusIndex, setFocusIndex] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState(null as number | null);
  const [reduced, setReduced] = React.useState(false);
  const [playing, setPlaying] = React.useState(autoplay);
  const [lifted, setLifted] = React.useState(null as number | null);
  const returnFocus = React.useRef(null as number | null);
  const pendingOpen = React.useRef(-1);
  const pointer = React.useRef({ id: -1, index: -1, x: 0, y: 0, moved: false, kind: "", swipe: 0, lastX: 0, lastT: 0, v: 0 });
  const live = React.useRef({
    active: null as number | null,
    layout,
    shapes,
    reduced,
    count,
    openIndex: null as number | null,
    carouselIndex: 0
  });
  live.current = { ...live.current, active: current, layout, shapes, reduced, count, openIndex };

  const host = React.useRef({ controlled, onActiveChange, onOpenChange });
  host.current = { controlled, onActiveChange, onOpenChange };

  const carouselIndex = current ?? live.current.carouselIndex;

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    setPlaying(autoplay);
  }, [autoplay]);

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = (next: number) => setWidth((old) => (Math.abs(old - next) < 0.5 ? old : Math.round(next * 100) / 100));
    measure(stage.clientWidth);
    const observer = new ResizeObserver((entries) => {
      const box = entries[0];
      if (box) measure(box.contentRect.width);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const targetsFor = React.useCallback(
    (lay: Layout, front: number | null, centreIndex: number) => {
      const n = shapes.length;
      const feet = shapes.map((s, i) => s.w * lay.unit * (i === front ? LIFT_GROW : 1));
      const gapAfter = (a: number) => lay.unit * (GAP + (front !== null && (a === front || a + 1 === front) ? BREATH : 0));
      const xs = feet.map(() => 0);

      // Centered carousel gliding
      const c = clamp(front ?? centreIndex, 0, Math.max(0, n - 1));
      xs[c] = lay.width / 2;
      for (let i = c + 1; i < n; i++) xs[i] = (xs[i - 1] ?? 0) + ((feet[i - 1] ?? 0) + (feet[i] ?? 0)) / 2 + gapAfter(i - 1);
      for (let i = c - 1; i >= 0; i--) xs[i] = (xs[i + 1] ?? 0) - ((feet[i + 1] ?? 0) + (feet[i] ?? 0)) / 2 - gapAfter(i);
      return xs;
    },
    [shapes]
  );

  const paint = React.useCallback((i: number) => {
    const s = sim.current;
    const { layout: lay, shapes: list, count: n } = live.current;
    const shape = list[i];
    if (!shape) return;
    const w = shape.w * lay.unit;
    const x = s.x[i] ?? 0;
    const theta = s.sw[i] ?? 0;
    const e = clamp(s.e[i] ?? 0, 0, 1.2);
    const lit = clamp(e, 0, 1);
    const ty = (s.ty[i] ?? 0) * lit;
    const left = `translate3d(${(x - w / 2).toFixed(2)}px,0,0)`;

    const hang = hangs.current[i];
    if (hang) hang.style.transform = left;
    const back = backs.current[i];
    if (back) back.style.transform = `${left} rotate(${theta.toFixed(3)}deg)`;
    const swing = swings.current[i];
    if (swing) swing.style.transform = `rotate(${theta.toFixed(3)}deg)`;
    const tilt = tilts.current[i];
    if (tilt) {
      tilt.style.transform = `perspective(${PERSPECTIVE}px) translateZ(${(LIFT_Z * e).toFixed(2)}px) rotateX(${(TILT_X * e).toFixed(3)}deg) rotateY(${ty.toFixed(3)}deg) scale(${((1 + LIFT_SCALE * e) / SUPERSAMPLE).toFixed(4)})`;
    }
    const light = lights.current[i];
    if (light) light.style.opacity = lit.toFixed(3);
    const wash = washes.current[i];
    if (wash) wash.style.opacity = lit.toFixed(3);
    const glare = glares.current[i];
    if (glare) glare.style.transform = `translate3d(${(-ty * 3 - theta * 1.6).toFixed(2)}%,0,0)`;
    const shadow = shadows.current[i];
    if (shadow) {
      shadow.style.transform = `translate3d(${(-ty * 1.4).toFixed(2)}px,${(lay.unit * 0.04 + 10 * e).toFixed(2)}px,0) scale(${(1 + 0.035 * e).toFixed(4)},${(1 + 0.07 * e).toFixed(4)})`;
      shadow.style.opacity = (1 - 0.3 * lit).toFixed(3);
    }
    let others = 0;
    for (let k = 0; k < n; k++) if (k !== i) others = Math.max(others, s.e[k] ?? 0);
    const dim = dims.current[i];
    if (dim) dim.style.opacity = (0.12 * clamp(others, 0, 1) * (1 - lit)).toFixed(4);
  }, []);

  const step = React.useCallback(
    (now: number) => {
      const s = sim.current;
      const { layout: lay, shapes: list, count: n } = live.current;
      const dt = s.last ? Math.min(0.1, (now - s.last) / 1000) : 1 / 60;
      s.last = now;
      const sub = Math.max(3, Math.ceil(dt / 0.0115));
      const h = dt / sub;
      const margin = 0.05 * lay.unit;
      const restoring = now > s.free;

      for (let k = 0; k < sub; k++) {
        for (let i = 0; i < n; i++) {
          const shape = list[i];
          if (!shape) continue;
          const len = pendulum(lay, shape, i);
          if (i !== s.drag) {
            const before = s.vx[i] ?? 0;
            const stiff = restoring ? 130 : 0;
            const damp = restoring ? 2 * Math.sqrt(130) * 0.86 : 3.2;
            const ax = -stiff * ((s.x[i] ?? 0) - (s.tx[i] ?? 0)) - damp * before;
            s.vx[i] = before + ax * h;
            s.x[i] = (s.x[i] ?? 0) + (s.vx[i] ?? 0) * h;
          }
          const ae = -150 * ((s.e[i] ?? 0) - (s.te[i] ?? 0)) - 2 * Math.sqrt(150) * 0.78 * (s.ve[i] ?? 0);
          s.ve[i] = (s.ve[i] ?? 0) + ae * h;
          s.e[i] = (s.e[i] ?? 0) + (s.ve[i] ?? 0) * h;
          const at = -110 * ((s.ty[i] ?? 0) - (s.tty[i] ?? 0)) - 2 * Math.sqrt(110) * 0.72 * (s.vty[i] ?? 0);
          s.vty[i] = (s.vty[i] ?? 0) + at * h;
          s.ty[i] = (s.ty[i] ?? 0) + (s.vty[i] ?? 0) * h;
          const rest = restTilt(i) * (1 - clamp(s.e[i] ?? 0, 0, 1));
          const as = -(SWING_G / len) * ((s.sw[i] ?? 0) - rest) - SWING_DAMP * (s.vsw[i] ?? 0);
          s.vsw[i] = (s.vsw[i] ?? 0) + as * h;
          s.sw[i] = clamp((s.sw[i] ?? 0) + (s.vsw[i] ?? 0) * h, -SWING_MAX, SWING_MAX);
        }
        resolveContacts(s, lay, list, margin);
      }

      const follow = 1 - Math.exp(-dt / 0.035);
      for (let i = 0; i < n; i++) {
        const shape = list[i];
        const x = s.x[i] ?? 0;
        const was = s.hv[i] ?? 0;
        const hv = was + ((x - (s.hx[i] ?? x)) / dt - was) * follow;
        s.hx[i] = x;
        s.hv[i] = hv;
        if (shape) s.vsw[i] = (s.vsw[i] ?? 0) + clamp((hv - was) * (DEG / pendulum(lay, shape, i)) * (i === s.drag ? DRAG_COUPLING : SWING_COUPLING), -40, 40);
      }
      if (s.drag >= 0) s.vx[s.drag] = s.hv[s.drag] ?? 0;

      let busy = s.drag >= 0 || now < s.free;
      for (let i = 0; i < n; i++) {
        paint(i);
        const rest = restTilt(i) * (1 - clamp(s.e[i] ?? 0, 0, 1));
        if (
          Math.abs(s.vx[i] ?? 0) > 0.4 ||
          (restoring && Math.abs((s.x[i] ?? 0) - (s.tx[i] ?? 0)) > 0.25) ||
          Math.abs((s.e[i] ?? 0) - (s.te[i] ?? 0)) > 0.002 ||
          Math.abs(s.ve[i] ?? 0) > 0.01 ||
          Math.abs((s.ty[i] ?? 0) - (s.tty[i] ?? 0)) > 0.02 ||
          Math.abs(s.vty[i] ?? 0) > 0.05 ||
          Math.abs((s.sw[i] ?? 0) - rest) > 0.02 ||
          Math.abs(s.vsw[i] ?? 0) > 0.05
        ) {
          busy = true;
        }
      }
      if (busy) s.raf = requestAnimationFrame(step);
      else {
        s.raf = 0;
        s.last = 0;
        for (let i = 0; i < n; i++) {
          if (restoring) s.x[i] = s.tx[i] ?? 0;
          s.hx[i] = s.x[i] ?? 0;
          s.hv[i] = 0;
          s.vx[i] = 0;
          s.e[i] = s.te[i] ?? 0;
          s.ve[i] = 0;
          s.ty[i] = s.tty[i] ?? 0;
          s.vty[i] = 0;
          s.sw[i] = restTilt(i) * (1 - clamp(s.e[i] ?? 0, 0, 1));
          s.vsw[i] = 0;
          paint(i);
        }
      }
    },
    [paint]
  );

  const kick = React.useCallback(() => {
    const s = sim.current;
    if (live.current.reduced) {
      for (let i = 0; i < live.current.count; i++) {
        s.x[i] = s.tx[i] ?? 0;
        s.vx[i] = 0;
        s.hx[i] = s.x[i] ?? 0;
        s.hv[i] = 0;
        s.e[i] = s.te[i] ?? 0;
        s.ve[i] = 0;
        s.ty[i] = s.tty[i] ?? 0;
        s.vty[i] = 0;
        s.sw[i] = restTilt(i) * (1 - clamp(s.e[i] ?? 0, 0, 1));
        s.vsw[i] = 0;
        paint(i);
      }
      return;
    }
    if (!s.raf) {
      s.last = 0;
      s.raf = requestAnimationFrame(step);
    }
  }, [paint, step]);

  const impulse = React.useCallback(
    (i: number, amount: number) => {
      const s = sim.current;
      if (live.current.reduced || i < 0 || i >= live.current.count) return;
      s.vsw[i] = (s.vsw[i] ?? 0) + amount;
      kick();
    },
    [kick]
  );

  React.useLayoutEffect(() => {
    if (!layout.width) return;
    const s = sim.current;
    const xs = targetsFor(layout, current, live.current.carouselIndex);
    const fresh = s.x.length !== count;
    for (let i = 0; i < count; i++) {
      s.tx[i] = (xs[i] ?? 0) + pointer.current.swipe;
      s.te[i] = i === current ? 1 : 0;
      if (i !== current) s.tty[i] = 0;
      if (fresh || reduced) {
        s.x[i] = s.tx[i] ?? 0;
        s.vx[i] = 0;
        s.hx[i] = s.x[i] ?? 0;
        s.hv[i] = 0;
        s.e[i] = s.te[i] ?? 0;
        s.ve[i] = 0;
        s.ty[i] = s.tty[i] ?? 0;
        s.vty[i] = 0;
        s.sw[i] = restTilt(i) * (1 - (s.e[i] ?? 0));
        s.vsw[i] = 0;
      }
    }
    if (fresh) {
      for (const list of [s.x, s.vx, s.tx, s.sw, s.vsw, s.e, s.ve, s.te, s.ty, s.vty, s.tty, s.hx, s.hv]) {
        list.length = count;
      }
    }
    for (let i = 0; i < count; i++) paint(i);
    kick();
  }, [layout, current, count, reduced, targetsFor, paint, kick]);

  const previous = React.useRef(null as number | null);
  React.useEffect(() => {
    const old = previous.current;
    previous.current = current;
    requested.current = undefined;
    if (old === current) return;
    if (current !== null) {
      live.current.carouselIndex = current;
      impulse(current - 1, NEIGHBOUR_KICK);
      impulse(current + 1, -NEIGHBOUR_KICK);
    }
    if (old !== null) {
      impulse(old - 1, -NEIGHBOUR_KICK * 0.5);
      impulse(old + 1, NEIGHBOUR_KICK * 0.5);
    }
  }, [current, impulse]);

  const brushed = React.useRef({ done: false, timers: [] as number[] });
  React.useEffect(() => {
    const b = brushed.current;
    if (!layout.width || b.done || reduced) return;
    b.done = true;
    for (let i = 0; i < count; i++) {
      b.timers.push(window.setTimeout(() => impulse(i, 16 - i * 1.2), 120 + i * 50));
    }
  }, [layout.width, reduced, count, impulse]);

  React.useEffect(
    () => () => {
      const b = brushed.current;
      b.timers.forEach((t) => window.clearTimeout(t));
      b.timers = [];
      b.done = false;
    },
    []
  );

  React.useEffect(() => () => {
    cancelAnimationFrame(sim.current.raf);
    sim.current.raf = 0;
  }, []);

  React.useLayoutEffect(() => {
    if (openIndex !== null || lifted !== null || returnFocus.current === null) return;
    const index = returnFocus.current;
    returnFocus.current = null;
    slots.current[index]?.focus({ preventScroll: true });
  }, [openIndex, lifted]);

  const choose = React.useCallback((index: number | null) => {
    if (index === live.current.active || index === requested.current) return;
    requested.current = index;
    if (!host.current.controlled) setActiveState(index);
    host.current.onActiveChange?.(index);
  }, []);

  const stop = React.useCallback(() => setPlaying(false), []);

  const beat = React.useRef(0);
  React.useEffect(() => {
    if (!playing || reduced || openIndex !== null || count === 0 || !layout.width) {
      beat.current = 0;
      return;
    }
    const start = performance.now();
    if (!beat.current || beat.current < start - interval) beat.current = start + (current === null ? 1200 : interval);
    let timer = window.setTimeout(function advance() {
      const now = live.current.active;
      beat.current += interval;
      choose(now === null ? live.current.carouselIndex : (now + 1) % live.current.count);
      timer = window.setTimeout(advance, Math.max(0, beat.current - performance.now()));
    }, Math.max(0, beat.current - start));
    return () => window.clearTimeout(timer);
  }, [playing, reduced, openIndex, count, interval, layout.width, choose, current]);

  const open = React.useCallback((index: number) => {
    stop();
    returnFocus.current = index;
    setOpenIndex(index);
    host.current.onOpenChange?.(index);
  }, [stop]);

  const sourceRect = React.useCallback(() => {
    if (openIndex === null) return null;
    const node = slots.current[openIndex];
    return node ? node.getBoundingClientRect() : null;
  }, [openIndex]);

  const onLift = React.useCallback((next: boolean) => {
    setLifted(next ? openIndex : null);
  }, [openIndex]);

  const onDetailClose = React.useCallback(() => {
    setOpenIndex(null);
    host.current.onOpenChange?.(null);
  }, []);

  // Pointer swipe / drag handlers
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    const target = (event.target as HTMLElement).closest("[data-frame]") as HTMLElement | null;
    const index = target ? Number(target.dataset.frame) : -1;
    pointer.current = {
      id: event.pointerId,
      index,
      x: event.clientX,
      y: event.clientY,
      moved: false,
      kind: "",
      swipe: 0,
      lastX: event.clientX,
      lastT: stamp(event),
      v: 0
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (p.id !== event.pointerId) return;
    const dx = event.clientX - p.x;
    const dy = event.clientY - p.y;
    const now = stamp(event);
    const dt = Math.max(1, now - p.lastT);
    p.v = ((event.clientX - p.lastX) / dt) * 1000;
    p.lastX = event.clientX;
    p.lastT = now;

    if (!p.kind && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      p.kind = "swipe";
      p.moved = true;
      stop();
    }

    if (p.kind === "swipe") {
      p.swipe = dx;
      const s = sim.current;
      const xs = targetsFor(layout, current, live.current.carouselIndex);
      for (let i = 0; i < count; i++) {
        s.tx[i] = (xs[i] ?? 0) + dx;
      }
      kick();
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (p.id !== event.pointerId) return;
    pointer.current = { id: -1, index: -1, x: 0, y: 0, moved: false, kind: "", swipe: 0, lastX: 0, lastT: 0, v: 0 };

    if (p.moved) {
      const stepDist = layout.unit * (0.8 + GAP);
      const shift = -Math.round((p.swipe + p.v * 0.18) / stepDist);
      const next = clamp(live.current.carouselIndex + shift, 0, count - 1);
      choose(next);
      const s = sim.current;
      const xs = targetsFor(layout, next, next);
      for (let i = 0; i < count; i++) s.tx[i] = xs[i] ?? 0;
      kick();
    } else if (p.index >= 0) {
      if (p.index === current) {
        open(p.index);
      } else {
        choose(p.index);
      }
    }
  };

  const onPointerCancel = () => {
    pointer.current = { id: -1, index: -1, x: 0, y: 0, moved: false, kind: "", swipe: 0, lastX: 0, lastT: 0, v: 0 };
    const s = sim.current;
    const xs = targetsFor(layout, current, live.current.carouselIndex);
    for (let i = 0; i < count; i++) s.tx[i] = xs[i] ?? 0;
    kick();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stop();
      choose(Math.max(0, (current ?? focusIndex) - 1));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stop();
      choose(Math.min(count - 1, (current ?? focusIndex) + 1));
    } else if (event.key === "Enter" || event.key === " ") {
      if (current !== null) {
        event.preventDefault();
        open(current);
      }
    }
  };

  const currentItem = current !== null ? items[current] : null;
  const U = layout.unit;

  return (
    <section
      className={`relative select-none text-white ${className ?? ""}`}
      style={{ minHeight: layout.stageH + 160 }}
      {...rest}
    >
      {/* Eyebrow & Main Section Title */}
      {(eyebrow || heading) && (
        <div className="relative z-10 px-6 pt-2 pb-5 text-center">
          {eyebrow && (
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00ff87]">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl text-white">
              {heading}
            </h3>
          )}
        </div>
      )}

      {/* Main Hanging Rail Stage */}
      <div
        ref={stageRef}
        data-stage
        className="relative mx-auto w-full touch-pan-y overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: layout.stageH, perspective: `${PERSPECTIVE}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={onKeyDown}
      >
        {/* Top Heavy Steel / Titanium Picture Rail Bar */}
        <div
          aria-hidden="true"
          data-rail
          className="pointer-events-none absolute inset-x-0 z-[1]"
          style={{ top: layout.railTop, height: layout.railT }}
        >
          <div className="absolute inset-x-0 top-full h-4 bg-black/60 blur-[6px]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #334155 0%, #1e293b 22%, #020612 40%, #1e293b 55%, #0f172a 75%, #000000 100%)",
              boxShadow: "0 1px 0 rgba(0,255,135,0.3), 0 -1px 0 rgba(255,255,255,0.15)"
            }}
          />
          <div className="absolute inset-x-0 top-[30%] h-px bg-black opacity-60" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
        </div>

        {/* Ambient Backlight Washes & Drop Shadows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
          {items.map((item, i) => {
            const shape = shapes[i];
            if (!shape) return null;
            const w = shape.w * U;
            const h = shape.h * U;
            const top = layout.tops[i] ?? 0;
            return (
              <div
                key={item.id}
                ref={(node) => {
                  backs.current[i] = node;
                }}
                className="absolute left-0 top-0"
                style={{
                  width: w,
                  height: 0,
                  transformOrigin: `${w / 2}px ${layout.pivotY + 1}px`,
                  visibility: lifted === i ? "hidden" : undefined
                }}
              >
                {/* Neon Backdrop Glow when illuminated */}
                <span
                  ref={(node) => {
                    washes.current[i] = node;
                  }}
                  data-wash
                  className="absolute opacity-0 transition-opacity duration-300"
                  style={{
                    left: -w * 0.4,
                    width: w * 1.8,
                    top: top - h * 0.2,
                    height: h * 1.4,
                    background:
                      "radial-gradient(ellipse at center, rgba(0,255,135,0.22) 0%, rgba(236,72,153,0.12) 40%, transparent 70%)"
                  }}
                />
                <span
                  className="absolute opacity-80"
                  style={{ left: 0, top, width: w, height: h, filter: "blur(14px)" }}
                >
                  <span
                    ref={(node) => {
                      shadows.current[i] = node;
                    }}
                    className="absolute inset-0 rounded-[38px] bg-black/90 shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                  />
                </span>
              </div>
            );
          })}
        </div>

        {/* Hanging Smartphone Units */}
        {items.map((item, i) => {
          const shape = shapes[i];
          if (!shape) return null;
          const w = shape.w * U;
          const h = shape.h * U;
          const top = layout.tops[i] ?? 0;
          const lit = current === i;
          const eyeletY = top + 2; // Sleek metallic mounting eyelet right at top rim

          return (
            <div
              key={item.id}
              ref={(node) => {
                hangs.current[i] = node;
              }}
              data-hang={i}
              className="pointer-events-none absolute left-0 top-0"
              style={{ width: w, height: 0, zIndex: lit ? 30 : 10 + i }}
            >
              {/* Rail Hook Clamped Over Steel Picture Rail */}
              <Hook x={w / 2} railTop={layout.railTop} railT={layout.railT} pivotY={layout.pivotY} />

              {/* Version & Size Tag Badge */}
              {item.tag && (
                <span
                  data-label
                  className={`absolute whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-mono font-bold leading-none tabular-nums shadow-xl backdrop-blur-xl transition-all duration-300 ${
                    lit
                      ? "text-[#00ff87] border-emerald-400/50 bg-[#040a18]/95 shadow-[0_0_15px_rgba(0,255,135,0.25)] scale-105"
                      : "text-white/60 border-white/10 bg-[#040a18]/80"
                  }`}
                  style={{ top: top + h + 12, left: "50%", transform: "translateX(-50%)" }}
                >
                  {lit && (
                    <span
                      aria-hidden="true"
                      className="mr-1.5 inline-block size-1.5 rounded-full bg-[#00ff87] align-middle shadow-[0_0_8px_#00ff87] animate-pulse"
                    />
                  )}
                  {item.tag}
                </span>
              )}

              {/* Swinging Mechanism: Wires & Physical Smartphone Body */}
              <span
                ref={(node) => {
                  swings.current[i] = node;
                }}
                data-swing
                className="absolute left-0 top-0"
                style={{
                  width: w,
                  height: 0,
                  transformOrigin: `${w / 2}px ${layout.pivotY + 1}px`,
                  visibility: lifted === i ? "hidden" : undefined
                }}
              >
                {/* Hanging Steel Wire Cables */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 overflow-visible text-white/80"
                  width={Math.max(1, w)}
                  height={Math.max(1, eyeletY)}
                >
                  {[w * 0.22, w * 0.78].map((rx) => (
                    <g key={rx}>
                      <line
                        x1={w / 2 + 0.6}
                        y1={layout.pivotY + 1.8}
                        x2={rx + 0.6}
                        y2={eyeletY + 0.8}
                        stroke="black"
                        strokeOpacity="0.4"
                        strokeWidth="1.8"
                      />
                      <line
                        x1={w / 2}
                        y1={layout.pivotY + 1}
                        x2={rx}
                        y2={eyeletY}
                        stroke="#cbd5e1"
                        strokeOpacity="0.8"
                        strokeWidth="1.2"
                      />
                      <line
                        x1={w / 2 - 0.3}
                        y1={layout.pivotY + 1}
                        x2={rx - 0.3}
                        y2={eyeletY}
                        stroke="#00ff87"
                        strokeOpacity="0.4"
                        strokeWidth="0.6"
                      />
                    </g>
                  ))}
                </svg>

                {/* Interactive Phone Button Target */}
                <button
                  ref={(node) => {
                    slots.current[i] = node;
                  }}
                  type="button"
                  data-frame={i}
                  data-lit={lit || undefined}
                  tabIndex={i === (current ?? focusIndex) ? 0 : -1}
                  aria-label={item.title}
                  aria-describedby={`${uid}-caption`}
                  aria-pressed={lit}
                  className="pointer-events-auto absolute cursor-pointer rounded-[38px] outline-none bg-transparent border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-emerald-400"
                  style={{ left: 0, top, width: w, height: h }}
                  onFocus={() => {
                    setFocusIndex(i);
                    if (pointer.current.id < 0) {
                      stop();
                      choose(i);
                    }
                  }}
                  onClick={(event) => {
                    const pending = pendingOpen.current;
                    pendingOpen.current = -1;
                    if (event.detail === 0 || pending === i) open(i);
                  }}
                >
                  <span
                    ref={(node) => {
                      tilts.current[i] = node;
                    }}
                    data-tilt
                    className="absolute block"
                    style={{
                      left: (-(SUPERSAMPLE - 1) * w) / 2,
                      top: (-(SUPERSAMPLE - 1) * h) / 2,
                      width: w * SUPERSAMPLE,
                      height: h * SUPERSAMPLE,
                      transform: `scale(${1 / SUPERSAMPLE})`
                    }}
                  >
                    <span className="absolute inset-0 block" style={{ zoom: SUPERSAMPLE }}>
                      <PhoneChassis
                        item={item}
                        shape={shape}
                        unit={U}
                        lit={lit ? 1 : 0}
                        glareRef={(node) => {
                          glares.current[i] = node;
                        }}
                        dimRef={(node) => {
                          dims.current[i] = node;
                        }}
                      />
                    </span>
                  </span>
                </button>
              </span>
            </div>
          );
        })}

        {/* Carousel Floating Nav Arrows */}
        <button
          type="button"
          aria-label="Previous flagship phone"
          onClick={(e) => {
            e.stopPropagation();
            stop();
            choose((carouselIndex - 1 + count) % count);
          }}
          className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 z-40 flex size-12 items-center justify-center rounded-full border border-white/15 bg-[#040a18]/85 text-white/80 shadow-2xl backdrop-blur-xl transition-all hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="size-6 text-[#00ff87]" />
        </button>

        <button
          type="button"
          aria-label="Next flagship phone"
          onClick={(e) => {
            e.stopPropagation();
            stop();
            choose((carouselIndex + 1) % count);
          }}
          className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 z-40 flex size-12 items-center justify-center rounded-full border border-white/15 bg-[#040a18]/85 text-white/80 shadow-2xl backdrop-blur-xl transition-all hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="size-6 text-[#00ff87]" />
        </button>
      </div>

      {/* Pagination Pill Dots */}
      {count > 1 && (
        <div
          className="relative z-10 mt-2 flex items-center justify-center gap-2"
          role="group"
          aria-label={heading ?? "Flagships"}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.title}
              aria-current={carouselIndex === i}
              onClick={() => {
                stop();
                choose(i);
              }}
              className={`h-2 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                carouselIndex === i
                  ? "w-8 bg-gradient-to-r from-[#00ff87] to-emerald-400 shadow-[0_0_12px_#00ff87]"
                  : "w-2 bg-white/20 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      )}

      {/* Active Device Caption & 1-Click Action */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-6 pt-5 text-center">
        <div id={`${uid}-caption`} aria-live="polite" className="min-h-[3.25rem]">
          <p className="text-xl font-black text-white sm:text-2xl">
            {currentItem ? currentItem.title : caption}
          </p>
          {currentItem && (
            <p className="mt-1 text-xs text-white/70">
              <span className="text-pink-400 font-semibold">{currentItem.artist}</span>
              {" · "}
              <button
                type="button"
                onClick={() => open(carouselIndex)}
                className="font-bold text-[#00ff87] underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-400 cursor-pointer"
              >
                {labels.open}
              </button>
            </p>
          )}
        </div>
        {action}
      </div>

      {/* 3D Inspect & Specs Flip Modal */}
      {openIndex !== null && items[openIndex] && shapes[openIndex] && (
        <Detail
          uid={uid}
          item={items[openIndex]}
          shape={shapes[openIndex]}
          index={openIndex}
          total={count}
          labels={labels}
          reduced={reduced}
          source={sourceRect}
          onLift={onLift}
          onClose={onDetailClose}
        />
      )}
    </section>
  );
}

/** Hanging Rail Hook */
function Hook({ x, railTop, railT, pivotY }: { x: number; railTop: number; railT: number; pivotY: number }) {
  const plate = clamp(railT * 0.4, 4, 7);
  const height = pivotY - railTop + 6;
  return (
    <span
      aria-hidden="true"
      className="absolute"
      style={{ left: x - plate, top: railTop - 3, width: plate * 2, height }}
    >
      <span
        className="absolute inset-x-0 top-0 rounded-full"
        style={{ height: 4, background: BRASS, boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
      />
      <span
        className="absolute top-[3px] rounded-b-[1px]"
        style={{
          left: plate * 0.5,
          width: plate,
          bottom: 5,
          background: BRASS_SIDE,
          boxShadow: "1px 1px 2px rgba(0,0,0,0.4)"
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 overflow-visible text-[#854d0e]"
        width={plate * 2}
        height={7}
      >
        <path
          d={`M${plate * 0.62},0 Q${plate * 0.62},6.2 ${plate},6.2 Q${plate * 1.38},6.2 ${plate * 1.38},2.4`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Overhead Brass / Titanium Picture Light Fixture */
function Fixture({ width, hood, arm }: { width: number; hood: number; arm: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ bottom: "100%", width, height: arm + hood }}
    >
      {[0.24, 0.76].map((p) => (
        <span
          key={p}
          className="absolute bottom-0"
          style={{
            left: `calc(${p * 100}% - 0.75px)`,
            width: 1.5,
            height: arm + hood * 0.5,
            background: "linear-gradient(to right, #fde047, #a16207 70%, #422006)"
          }}
        />
      ))}
      <span
        className="absolute inset-x-0 top-0 rounded-full"
        style={{ height: hood, background: BRASS_DIM, boxShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
      />
      <span
        className="absolute top-0 rounded-full bg-white opacity-40"
        style={{ left: "10%", right: "10%", height: Math.max(1, hood * 0.25), marginTop: hood * 0.12 }}
      />
    </span>
  );
}

/**
 * Realistic Smartphone Device Component (Screenshot 3 anatomy)
 * Rendered with Dynamic Island, metallic rim bevel, side physical buttons,
 * edge-to-edge app UI screen, glass gloss, and overhead gallery lamp.
 */
function PhoneChassis({
  item,
  shape,
  unit,
  lit = 0,
  glareRef,
  dimRef
}: {
  item: PictureRailItem;
  shape: Shape;
  unit: number;
  lit?: number;
  glareRef?: (node: HTMLSpanElement | null) => void;
  dimRef?: (node: HTMLSpanElement | null) => void;
}) {
  return (
    <>
      {/* Top Titanium Wire Eyelets */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[22%] top-0 -translate-x-1/2 -translate-y-full size-2.5 rounded-full border border-slate-400 bg-slate-800 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[78%] top-0 -translate-x-1/2 -translate-y-full size-2.5 rounded-full border border-slate-400 bg-slate-800 shadow-sm"
      />

      {/* Physical Smartphone Outer Chassis */}
      <span
        className="absolute inset-0 block rounded-[36px] sm:rounded-[40px] transition-all duration-300"
        style={{
          background: "linear-gradient(155deg, #1e293b 0%, #0d1522 35%, #050a14 70%, #020612 100%)",
          boxShadow:
            lit > 0
              ? "0 0 0 1px rgba(255,255,255,0.22), 0 0 0 3px #0b111a, 0 0 35px -5px rgba(0,255,135,0.3), 0 25px 50px -10px rgba(0,0,0,0.95)"
              : "0 0 0 1px rgba(255,255,255,0.12), 0 0 0 3px #070c14, 0 18px 40px -10px rgba(0,0,0,0.85)"
        }}
      >
        {/* Left Physical Buttons (Action button, Volume Up, Volume Down) */}
        <span
          aria-hidden="true"
          className="absolute -left-[3px] top-[48px] w-[3px] h-[20px] rounded-l-[2px] bg-slate-600/90 shadow-sm"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[3px] top-[80px] w-[3px] h-[34px] rounded-l-[2px] bg-slate-600/90 shadow-sm"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[3px] top-[124px] w-[3px] h-[34px] rounded-l-[2px] bg-slate-600/90 shadow-sm"
        />

        {/* Right Physical Button (Power / Lock) */}
        <span
          aria-hidden="true"
          className="absolute -right-[3px] top-[90px] w-[3px] h-[48px] rounded-r-[2px] bg-slate-600/90 shadow-sm"
        />

        {/* Inner Uniform Screen Bezel */}
        <span className="absolute inset-[6px] sm:inset-[7px] block overflow-hidden rounded-[30px] sm:rounded-[34px] bg-black">
          {/* Real On-Device App Screenshot */}
          <img
            src={item.image}
            alt={item.title}
            draggable={false}
            decoding="async"
            ref={(node) => {
              if (node?.complete && node.naturalWidth > 0) node.dataset.loaded = "true";
            }}
            onLoad={(event) => {
              event.currentTarget.dataset.loaded = "true";
            }}
            onError={(event) => {
              event.currentTarget.dataset.failed = "true";
            }}
            className="pointer-events-none absolute inset-0 size-full select-none object-cover object-top opacity-0 transition-opacity duration-500 data-[failed]:hidden data-[loaded]:opacity-100"
          />

          {/* Top Dynamic Island Notch (Clean, NO light overlay) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-2 z-30 flex h-[20px] w-[74px] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-black px-2 shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            {/* Front Camera Lens with Blue AR coating reflection */}
            <span className="flex size-2.5 items-center justify-center rounded-full bg-[#050811] ring-1 ring-white/20">
              <span className="size-1 rounded-full bg-indigo-500/70" />
            </span>

            {/* Live Status indicator in Dynamic Island */}
            {lit > 0 ? (
              <span className="flex items-center gap-0.5">
                <span className="size-1 rounded-full bg-[#00ff87] shadow-[0_0_6px_#00ff87] animate-pulse" />
                <span className="text-[7px] font-mono font-bold text-[#00ff87] uppercase tracking-tighter">
                  AIR
                </span>
              </span>
            ) : (
              <span className="size-1 rounded-full bg-white/25" />
            )}
          </span>

          {/* Bottom Home Indicator Bar */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/40 backdrop-blur-sm"
          />

          {/* Realistic Curved OLED Edge Shading */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block rounded-[30px] sm:rounded-[34px]"
            style={{
              boxShadow:
                "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.8)"
            }}
          />

          {/* OLED Glass Reflection Sheen */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 block overflow-hidden">
            <span
              className="absolute inset-0 block"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 25%)"
              }}
            />
            <span
              ref={glareRef}
              data-glare
              className="absolute inset-y-0 -left-1/2 block w-[200%]"
              style={{
                background:
                  "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.06) 44%, rgba(255,255,255,0.015) 50%, transparent 56%)"
              }}
            />
          </span>
        </span>

        <span
          ref={dimRef}
          data-dim
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block rounded-[36px] sm:rounded-[40px] bg-black opacity-0"
        />
      </span>
    </>
  );
}

/**
 * Realistic Smartphone Rear Chassis Component
 * Shown when flipped in 3D modal: frosted matte glass finish, triple sapphire camera bump,
 * laser-etched INIXA Labs logo, and verified architecture specs plate with 1-click APK download.
 */
function PhoneBack({ item, shape, unit }: { item: PictureRailItem; shape: Shape; unit: number }) {
  const w = shape.w * unit;
  const h = shape.h * unit;

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[36px] sm:rounded-[40px] p-6 text-white"
      style={{
        background: "linear-gradient(160deg, #172033 0%, #0a0f18 45%, #03060d 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15), 0 20px 45px rgba(0,0,0,0.8)"
      }}
    >
      {/* Top-Left Triple Sapphire Camera Module Bump */}
      <div className="absolute left-5 top-5 w-24 h-24 rounded-[22px] bg-black/60 border border-white/10 p-2 shadow-2xl flex flex-col justify-between backdrop-blur-md">
        <div className="flex justify-between items-center px-1">
          <span className="size-7 rounded-full bg-[#050811] ring-2 ring-slate-700/80 flex items-center justify-center">
            <span className="size-3.5 rounded-full bg-slate-900 ring-1 ring-emerald-400/40" />
          </span>
          <span className="size-7 rounded-full bg-[#050811] ring-2 ring-slate-700/80 flex items-center justify-center">
            <span className="size-3.5 rounded-full bg-slate-900 ring-1 ring-pink-400/40" />
          </span>
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="size-7 rounded-full bg-[#050811] ring-2 ring-slate-700/80 flex items-center justify-center">
            <span className="size-3.5 rounded-full bg-slate-900 ring-1 ring-sky-400/40" />
          </span>
          <div className="flex flex-col items-center justify-center size-7">
            <span className="size-2 rounded-full bg-amber-200/90 shadow-[0_0_6px_#fef08a]" />
            <span className="text-[6px] font-mono text-white/40 mt-0.5">LED</span>
          </div>
        </div>
      </div>

      {/* Laser-Etched INIXA Labs Emblem */}
      <div className="absolute right-6 top-7 text-right">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#00ff87]">
          INIXA ARCHITECTURE
        </p>
        <p className="text-sm font-black tracking-tight text-white/80">KOTLIN 2.1 • NATIVE</p>
      </div>

      {/* Center Laser-Etched Watermark */}
      <div className="absolute inset-x-0 top-[38%] text-center pointer-events-none opacity-20">
        <span className="text-6xl font-black tracking-tighter text-white">IX</span>
      </div>

      {/* Technical Specification Plate */}
      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#00ff87]">
            <CheckCircle2 className="size-3" /> VERIFIED BINARY
          </span>
          <span className="text-[10px] font-mono text-white/50">{item.tag}</span>
        </div>

        <p className="font-bold text-base text-white">{item.title}</p>
        <p className="text-xs text-white/60 mb-3">{item.artist}</p>

        {item.details && item.details.length > 0 && (
          <ul className="mb-4 space-y-1 border-t border-white/10 pt-2.5 text-[11px] font-mono text-white/75">
            {item.details.map((line) => (
              <li key={line} className="flex items-center gap-1.5 truncate">
                <span className="size-1 rounded-full bg-[#00ff87]" />
                <span className="truncate">{line}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 1-Click APK Download Button */}
        <a
          href={item.apkUrl || "/downloads"}
          download
          onClick={(e) => e.stopPropagation()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00ff87] to-emerald-400 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/20 transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Download className="size-3.5" />
          <span>Download Verified APK</span>
        </a>
      </div>
    </div>
  );
}

function fitUnit(shape: Shape) {
  if (typeof window === "undefined") return 360;
  const wide = window.innerWidth >= 768;
  const maxW = wide ? Math.min(480, window.innerWidth * 0.42) : window.innerWidth * 0.78;
  const maxH = wide ? Math.min(580, window.innerHeight * 0.7) : window.innerHeight * 0.55;
  return Math.max(120, Math.min(maxW / shape.w, maxH / shape.h));
}

/** 3D Interactive Detail Modal with Device Rotation */
function Detail({
  uid,
  item,
  shape,
  index,
  total,
  labels,
  reduced,
  source,
  onLift,
  onClose
}: {
  uid: string;
  item: PictureRailItem;
  shape: Shape;
  index: number;
  total: number;
  labels: PictureRailGalleryLabels;
  reduced: boolean;
  source: () => DOMRect | null;
  onLift: (lifted: boolean) => void;
  onClose: () => void;
}) {
  const dialogRef = React.useRef(null as HTMLDivElement | null);
  const figureRef = React.useRef(null as HTMLDivElement | null);
  const spinRef = React.useRef(null as HTMLDivElement | null);
  const closeRef = React.useRef(null as HTMLButtonElement | null);
  const [side, setSide] = React.useState("front" as "front" | "back");
  const [shown, setShown] = React.useState(false);
  const [unit, setUnit] = React.useState(() => fitUnit(shape));
  const angle = React.useRef({
    value: 0,
    target: 0,
    velocity: 0,
    raf: 0,
    last: 0,
    dragging: false,
    startX: 0,
    startAngle: 0
  });
  const closing = React.useRef(false);
  const titleId = `${uid}-detail-title`;

  React.useEffect(() => {
    const onResize = () => setUnit(fitUnit(shape));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [shape]);

  const spin = React.useCallback(() => {
    const a = angle.current;
    const node = spinRef.current;
    const loop = (now: number) => {
      const dt = a.last ? Math.min(0.1, (now - a.last) / 1000) : 1 / 60;
      a.last = now;
      const sub = Math.ceil(dt / 0.012);
      for (let k = 0; k < sub; k++) {
        const accel = -90 * (a.value - a.target) - 2 * Math.sqrt(90) * 0.82 * a.velocity;
        a.velocity += (accel * dt) / sub;
        a.value += (a.velocity * dt) / sub;
      }
      if (node) node.style.transform = `rotateY(${a.value.toFixed(2)}deg)`;
      if (Math.abs(a.value - a.target) < 0.05 && Math.abs(a.velocity) < 0.05) {
        a.value = a.target;
        if (node) node.style.transform = `rotateY(${a.value}deg)`;
        a.raf = 0;
        a.last = 0;
        return;
      }
      a.raf = requestAnimationFrame(loop);
    };
    if (reduced) {
      a.value = a.target;
      if (node) node.style.transform = `rotateY(${a.value}deg)`;
      return;
    }
    if (!a.raf) a.raf = requestAnimationFrame(loop);
  }, [reduced]);

  const turnTo = React.useCallback(
    (next: "front" | "back") => {
      const a = angle.current;
      const base = Math.round(a.value / 360) * 360;
      a.target = base + (next === "back" ? 180 : 0);
      if (Math.abs(a.target - a.value) > 180) a.target -= 360 * Math.sign(a.target - a.value);
      setSide(next);
      spin();
    },
    [spin]
  );

  React.useLayoutEffect(() => {
    const figure = figureRef.current;
    const from = source();
    closeRef.current?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let animation = null as Animation | null;
    if (figure && from && !reduced && from.width > 0) {
      const to = figure.getBoundingClientRect();
      const scale = from.width / to.width;
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const lift = Math.min(90, Math.abs(dy) * 0.25 + 30);
      onLift(true);
      animation = figure.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
          {
            transform: `translate(${dx * 0.4}px, ${dy * 0.4 - lift}px) scale(${((scale + 1) / 2) * 1.03}) rotate(${
              dx > 0 ? -2.5 : 2.5
            }deg)`,
            offset: 0.5
          },
          { transform: "none" }
        ],
        { duration: 680, easing: "cubic-bezier(.22,.85,.3,1)" }
      );
    } else onLift(true);
    const raf = requestAnimationFrame(() => setShown(true));
    const spinState = angle.current;
    return () => {
      cancelAnimationFrame(raf);
      animation?.cancel();
      document.body.style.overflow = overflow;
      cancelAnimationFrame(spinState.raf);
      spinState.raf = 0;
      onLift(false);
    };
  }, [source, reduced, onLift]);

  const dismiss = React.useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    const figure = figureRef.current;
    const to = source();
    if (!figure || !to || reduced || to.width === 0) {
      onClose();
      return;
    }
    const from = figure.getBoundingClientRect();
    const scale = to.width / from.width;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const animation = figure.animate(
      [
        { transform: "none" },
        { transform: `translate(${dx * 0.6}px, ${dy * 0.6 - 30}px) scale(${(scale + 1) / 2})`, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})` }
      ],
      { duration: 560, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" }
    );
    animation.onfinish = () => onClose();
  }, [source, reduced, onClose]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dismiss();
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      turnTo(side === "front" ? "back" : "front");
    }
  };

  const w = shape.w * unit;
  const h = shape.h * unit;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 text-white"
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[#020612]/92 backdrop-blur-2xl transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        onClick={dismiss}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={dismiss}
        className={`absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#040a18]/85 px-4 py-2 text-xs font-mono font-medium text-white/90 outline-none backdrop-blur-md transition-all hover:border-emerald-400 hover:text-white cursor-pointer ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        {labels.close}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>

      <div className="relative grid w-full max-w-5xl items-center justify-items-center gap-8 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-12">
        {/* 3D Physical Phone Flip Container */}
        <div ref={figureRef} data-figure className="relative" style={{ width: w, height: h }}>
          <div
            aria-hidden="true"
            className="absolute inset-x-[10%] -bottom-[8%] h-[16%] rounded-[50%] bg-black/80 opacity-70 blur-2xl"
          />
          <div
            data-spin-area
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ perspective: "1600px" }}
            onPointerDown={(event) => {
              const a = angle.current;
              a.dragging = true;
              a.startX = event.clientX;
              a.startAngle = a.value;
              cancelAnimationFrame(a.raf);
              a.raf = 0;
              a.last = 0;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const a = angle.current;
              if (!a.dragging) return;
              a.value = clamp(a.startAngle + (event.clientX - a.startX) * 0.45, a.startAngle - 220, a.startAngle + 220);
              if (spinRef.current) spinRef.current.style.transform = `rotateY(${a.value.toFixed(2)}deg)`;
            }}
            onPointerUp={() => {
              const a = angle.current;
              if (!a.dragging) return;
              a.dragging = false;
              const facing = ((a.value % 360) + 360) % 360;
              turnTo(facing > 90 && facing < 270 ? "back" : "front");
            }}
            onPointerCancel={() => {
              angle.current.dragging = false;
              turnTo(side);
            }}
          >
            <div ref={spinRef} className="absolute inset-0 [transform-style:preserve-3d]">
              {/* FRONT: High-Res Physical Smartphone Screen */}
              <div data-face="front" className="absolute inset-0 [backface-visibility:hidden]">
                <PhoneChassis item={item} shape={shape} unit={unit} lit={0} />
              </div>

              {/* BACK: Physical Chassis Rear with Specs & APK Download */}
              <div
                data-face="back"
                className="absolute inset-0 [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <PhoneBack item={item} shape={shape} unit={unit} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Info & Actions Panel */}
        <div
          className={`flex flex-col gap-3 text-center transition-[opacity,transform] delay-150 duration-500 md:text-left ${
            shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-[#00ff87] font-bold">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} • PHYSICAL ARCHITECTURE
          </p>

          <h3 id={titleId} className="text-3xl font-black tracking-tight sm:text-4xl text-white">
            {item.title}
          </h3>

          {item.artist && <p className="text-sm font-semibold text-pink-400">{item.artist}</p>}

          {item.tag && (
            <p className="inline-block w-fit font-mono text-sm font-bold text-white bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
              {item.tag}
            </p>
          )}

          {item.details && item.details.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2 md:justify-start my-2">
              {item.details.map((detail) => (
                <li
                  key={detail}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 font-mono"
                >
                  {detail}
                </li>
              ))}
            </ul>
          )}

          {/* Front / Back 3D Rotate Tabs */}
          <div
            role="group"
            aria-label={`${labels.front} / ${labels.back}`}
            className="mt-3 inline-flex items-center p-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md self-center md:self-start shadow-inner"
          >
            {(["front", "back"] as const).map((face) => (
              <button
                key={face}
                type="button"
                aria-pressed={side === face}
                onClick={() => turnTo(face)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  side === face
                    ? "bg-[#00ff87] text-black shadow-[0_0_14px_rgba(0,255,135,0.4)] scale-[1.02]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {face === "front" ? labels.front : labels.back}
              </button>
            ))}
          </div>

          {/* Direct Actions */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={item.apkUrl || "/downloads"}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00ff87] to-emerald-400 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="size-4" />
              <span>Download Verified APK</span>
            </a>
            <a
              href={`/product/${item.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold text-white transition-all hover:border-emerald-400 hover:text-[#00ff87] cursor-pointer"
            >
              <span>Explore Engine Docs</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PictureRailGallery;
