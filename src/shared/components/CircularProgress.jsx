const CircularProgress = ({
  size = 40,
  radius = 10,
  strokeWidth = 3,
  percent = 100, // 👈 0–100
  bgColor = "#eee",
  progressColor = "#ff7a00",
}) => {
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
 
  // ✅ MAIN FIX
  const strokeDashoffset =
    circumference - (percent / 100) * circumference;
 
  return (
    <svg width={size} height={size}>
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
 
      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s linear" }}
      />
    </svg>
  );
};
 
export default CircularProgress;