import React, { useEffect, useRef } from 'react';
import './CursorGrid.css';

export const CursorGrid = ({
  cellSize = 60,
  color = '#00f2fe',
  gridColor = '#1e293b',
  radius = 140,
  highlight = 'area',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1,
  fillOpacity = 0.05,
  gridOpacity = 0.08,
  gridStyle = 'lines',
  spotlight = 0.35,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
  style,
  children,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let cols = 0;
    let rows = 0;
    let cellLevels = new Float32Array(0);
    let cellTouched = new Float32Array(0);

    const mouse = { x: -1000, y: -1000, active: false };
    const pulses = [];

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;

      cellLevels = new Float32Array(cols * rows);
      cellTouched = new Float32Array(cols * rows).fill(-1e9);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const energize = (mx, my) => {
      const now = performance.now();
      if (highlight === 'cell') {
        const col = Math.floor(mx / cellSize);
        const row = Math.floor(my / cellSize);
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          const idx = row * cols + col;
          cellLevels[idx] = 1.0;
          cellTouched[idx] = now;
        }
        return;
      }

      const minCol = Math.max(0, Math.floor((mx - radius) / cellSize));
      const maxCol = Math.min(cols - 1, Math.floor((mx + radius) / cellSize));
      const minRow = Math.max(0, Math.floor((my - radius) / cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((my + radius) / cellSize));

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;
          const dist = Math.hypot(cx - mx, cy - my);
          if (dist <= radius) {
            const val = 1.0 - dist / radius;
            const idx = r * cols + c;
            if (val > cellLevels[idx]) {
              cellLevels[idx] = val;
            }
            cellTouched[idx] = now;
          }
        }
      }
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      energize(mouse.x, mouse.y);
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handlePointerDown = (e) => {
      if (!clickPulse) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      pulses.push({
        x: px,
        y: py,
        startTime: performance.now(),
        strength: 1.0,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Draw base cybernetic grid lines
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = gridOpacity;

      if (gridStyle === 'dashed') {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      // Vertical lines
      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw energized highlighted cells
      const holdMs = holdTime;
      const fadeMs = fadeDuration;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const elapsed = now - cellTouched[idx];
          if (elapsed > holdMs) {
            const fadeProgress = (elapsed - holdMs) / fadeMs;
            cellLevels[idx] = Math.max(0, cellLevels[idx] - fadeProgress * 0.05);
          }

          const lvl = cellLevels[idx];
          if (lvl > 0.01) {
            const x = c * cellSize;
            const y = r * cellSize;
            ctx.fillStyle = color;
            ctx.globalAlpha = lvl * fillOpacity;
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            // Subtle cell border glow
            ctx.strokeStyle = color;
            ctx.globalAlpha = lvl * fillOpacity * 2.5;
            ctx.strokeRect(x, y, cellSize, cellSize);
          }
        }
      }

      // 3. Draw click pulses
      const maxPulseDist = Math.hypot(width, height);
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const dt = (now - p.startTime) / 1000;
        const currentRadius = dt * pulseSpeed;

        if (currentRadius > maxPulseDist) {
          pulses.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, 1 - currentRadius / (maxPulseDist * 0.7)) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      // 4. Subtle mouse cursor spotlight
      if (mouse.active && spotlight > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = spotlight * 0.15;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [
    cellSize,
    color,
    gridColor,
    radius,
    highlight,
    holdTime,
    fadeDuration,
    lineWidth,
    fillOpacity,
    gridOpacity,
    gridStyle,
    spotlight,
    clickPulse,
    pulseSpeed,
  ]);

  return (
    <div
      ref={containerRef}
      className={`cursor-grid ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="cursor-grid__canvas" aria-hidden="true" />
      {children ? <div className="cursor-grid__content">{children}</div> : null}
    </div>
  );
};

export default CursorGrid;
