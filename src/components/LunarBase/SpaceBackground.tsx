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

      {/* Earth (partially visible, top-left) */}
      <defs>
        <radialGradient id="earthGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="60%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <clipPath id="earthClip">
          <rect x="0" y="0" width="90" height="120" />
        </clipPath>
      </defs>
      <circle cx="45" cy="55" r="80" fill="url(#earthGrad)" clipPath="url(#earthClip)" />
      {/* Earth cloud bands */}
      <ellipse cx="70" cy="20" rx="30" ry="6" fill="white" opacity="0.2" clipPath="url(#earthClip)" />
      <ellipse cx="50" cy="55" rx="40" ry="5" fill="white" opacity="0.15" clipPath="url(#earthClip)" />
      {/* Earth glow */}
      <circle cx="45" cy="55" r="82" fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.3" clipPath="url(#earthClip)" />

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
