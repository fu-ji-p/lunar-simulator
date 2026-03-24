export function SpaceBackground() {
  return (
    <g>
      {/* CG lunar surface background */}
      <image
        href="/Gemini_Generated_Image_bctzr8bctzr8bctz.png"
        x="0"
        y="0"
        width="1000"
        height="600"
        preserveAspectRatio="xMidYMid slice"
      />
      {/* Dark overlay for readability of UI elements */}
      <rect width="1000" height="600" fill="rgba(0,5,20,0.42)" />
    </g>
  );
}
