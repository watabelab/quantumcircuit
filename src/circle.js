import React, { useState, useEffect } from "react";

const CircleM = ({ imgx, imgy, img_name, circle_id, put_i, put_j }) => {
  const [flag, setFlag] = useState(0);

  var puti = put_i;
  var putj = put_j;
  const [state, setState] = useState({
    circle_X: imgx,
    circle_Y: imgy,
    offsetX: 0,
    offsetY: 0,
    isDrag: false,
  });

  useEffect(() => {
    if (state.isDrag) document.body.style.cursor = "grabbing";
    else document.body.style.cursor = "default";
  }, [state.isDrag]);

  // ゲートが一番下の行にあるかを表すフラッグ
  var isBottom = false;
  if (put_i == 3) {
    isBottom = true;
  }

  // ドット，線の色の設定
  var circle_color, stroke_color;
  switch (img_name) {
    case "CX":
      circle_color = "blue";
      stroke_color = "blue";
      break;
    case "CH":
      circle_color = "orange";
      stroke_color = "orange";
      break;
    case "CZ":
      circle_color = "yellow";
      stroke_color = "yellow";
      break;
  }

  const handleDown = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    const offsetX = x - state.circle_X;
    const offsetY = y - state.circle_Y;
    setState({ ...state, offsetX, offsetY, isDrag: true });
  };

  const handleMove = (e) => {
    var a = 30;
    for (let i = 0; i < 4; i++) {
      if (put_i == i) {
      } else {
        var y_def;
        y_def = isBottom ? 100 + 110 * i : 100 + 110 * i - 60;
        if (state.circle_Y >= y_def - a && state.circle_Y <= y_def + a) {
          var y = isBottom ? 100 + 110 * i + 37 : 100 + 110 * i - 61;
          setState((prevState) => ({
            ...prevState,
            circle_Y: y,
          }));
        }
      }
    }

    if (state.isDrag) {
      e.preventDefault();
      //   const x = e.pageX;
      const y = e.pageY;
      //   const circle_X = x - state.offsetX;
      const circle_Y = y - state.offsetY;
      setState({ ...state, circle_Y });
      console.log(put_i, put_j);
    }
  };

  const handleUp = () => {
    setState({ ...state, isDrag: false });
  };

  const nodeRef = React.createRef();

  return (
    <div>
      <svg
        style={{
          position: "absolute",
          left: String(state.circle_X - 20) + "px",
          top:
            String(isBottom ? state.circle_Y - 60 : state.circle_Y + 45) + "px",
          zIndex: state.isDrag ? 9999 : 5,
        }}
        ref={nodeRef}
        width="40"
        height="40"
      >
        <circle
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          cx={20}
          cy={20}
          r={20}
          fill={circle_color}
          id={circle_id + "D"}
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          zIndex: 0,
        }}
        ref={nodeRef}
        width="900"
        height="900"
      >
        <line
          x1={230 + 120 * putj}
          y1={100 + 110 * puti}
          x2={state.circle_X}
          y2={isBottom ? state.circle_Y - 40 : state.circle_Y + 50}
          stroke={stroke_color}
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export default CircleM;
