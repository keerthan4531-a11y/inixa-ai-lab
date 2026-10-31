import React from 'react';

export interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts?: React.ReactNode[];
  velocity?: number;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  skewWithVelocity?: number;
  scaleWithVelocity?: number;
  draggable?: boolean;
  outlineAlternate?: boolean;
  gap?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  separator?: React.ReactNode;
  fadeEdges?: boolean;
  pauseOnHover?: boolean;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

declare const ScrollVelocity: React.FC<ScrollVelocityProps>;
export default ScrollVelocity;

