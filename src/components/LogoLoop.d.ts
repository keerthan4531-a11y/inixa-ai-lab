import React from 'react';

export type LogoItem =
  | {
      node: React.ReactNode;
      title?: string;
      href?: string;
      hoverColor?: string;
    }
  | {
      src: string;
      alt?: string;
      title?: string;
      href?: string;
      hoverColor?: string;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  ariaLabel?: string;
  layout?: 'linear' | 'orbit';
  bend?: number;
  magnify?: number;
  labels?: 'hover' | 'below';
  muted?: number | boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const LogoLoop: React.FC<LogoLoopProps>;
export default LogoLoop;

