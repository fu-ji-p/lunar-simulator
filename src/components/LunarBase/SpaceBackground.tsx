import { useMemo } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

export function SpaceBackground() {
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    // Use seeded pseudo-random to avoid re-render changes
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: rand() * 1000,
        y: rand() * 300,
        r: rand() * 1.5 + 0.5,
        opacity: rand() * 0.6 + 0.4,
      });
    }
    return arr;
  }, []);

  return (
    <g>
      {/* Deep space background */}
      <defs>
        <linearGradient id="spaceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0E1A" />
          <stop offset="60%" stopColor="#0d1420" />
          <stop offset="100%" stopColor="#1a2035" />
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#spaceGrad)" />

      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity} />
      ))}

      {/* Sun rays (top-right area) */}
      <defs>
        <radialGradient id="sunGlow" cx="100%" cy="0%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="700" y="0" width="300" height="200" fill="url(#sunGlow)" />
    </g>
  );
}
