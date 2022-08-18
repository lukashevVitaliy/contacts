export const Spinner = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            margin: 'auto',
            background: 'rgb(255, 255, 255)',
            display: 'block',
            shapeRendering: 'auto',
          }}
          width="48px"
          height="48px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#d97706"
            strokeWidth="7"
            r="27"
            strokeDasharray="127.23450247038662 44.411500823462205"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </div>
  );
};
