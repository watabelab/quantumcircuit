import React, { useState, useEffect } from "react";

const Circlecc = ({ imgx, imgy, img_name, circle_id, put_i, put_j }) => {
  const [flag1, setFlag1] = useState(0);
  const [flag2, setFlag2] = useState(0);
  var imgy1 = imgy,
    imgy2 = imgy;
  // idは、CXX_1D_1のような形式
  var id1 = circle_id + "D_1";
  var id2 = circle_id + "D_2";

  var isBottom = false;
  if (put_i == 3) {
    isBottom = true;
  }
  const [state1, setState1] = useState({
    circle_Y1: imgy,
    offsetY1: 0,
    isDrag1: false,
  });

  const [state2, setState2] = useState({
    circle_Y2: imgy,
    offsetY2: 0,
    isDrag2: false,
  });

  useEffect(() => {
    if (state1.isDrag1) document.body.style.cursor = "grabbing";
    else document.body.style.cursor = "default";
  }, [state1.isDrag1]);

  useEffect(() => {
    if (state2.isDrag2) document.body.style.cursor = "grabbing";
    else document.body.style.cursor = "default";
  }, [state2.isDrag2]);

  const handleDown1 = (e) => {
    //const x = e.pageX;
    const y = e.pageY;
    //const offsetX1 = x - imgx1;
    const offsetY1 = y - imgy1;
    setState1({ ...state1, offsetY1, isDrag1: true });
  };

  const handleDown2 = (e) => {
    //const x = e.pageX;
    const y = e.pageY;
    //const offsetX2 = x - imgx2;
    const offsetY2 = y - imgy2;
    setState2({ ...state2, offsetY2, isDrag2: true });
  };

  const handleMove1 = (e) => {
    var a = 30;
    for (let i = 0; i < 4; i++) {
      if (put_i == i) {
      } else {
        var y_def;
        y_def = isBottom ? 100 + 110 * i : 100 + 110 * i - 60;
        if (state1.circle_Y1 >= y_def - a && state1.circle_Y1 <= y_def + a) {
          console.log(i);
          var y = isBottom ? 100 + 110 * i + 37 : 100 + 110 * i - 61;
          // setState({ ...state, image_Y: 100 + 110 * i - 42.5, image_X: 110 + 120 * j - 42.5 });
          setState1((prevState) => ({
            ...prevState,
            circle_Y1: y,
          }));
        }
      }
    }
    if (state1.isDrag1) {
      e.preventDefault();
      //const x = e.pageX;
      const y = e.pageY;
      //const circle_X1 = x - state1.offsetX1;
      const circle_Y1 = y - state1.offsetY1;
      setState1({ ...state1, circle_Y1 });
      setFlag1(1);
    }
  };

  const handleMove2 = (e) => {
    if (state2.isDrag2) {
      e.preventDefault();
      //const x = e.pageX;
      const y = e.pageY;
      //const circle_X2 = x - state2.offsetX2;
      const circle_Y2 = y - state2.offsetY2;
      setState2({ ...state2, circle_Y2 });
      setFlag2(1);
    }
  };

  const handleUp1 = () => {
    setState1({ ...state1, isDrag1: false });
    setFlag1(0);
  };

  const handleUp2 = () => {
    setState2({ ...state2, isDrag2: false });
    setFlag2(0);
  };

  var circle_color1 = "#0f0";
  var circle_color2 = "#0f0";
  var stroke_color = "#0f0";

  const nodeRef = React.createRef();

  return (
    <div>
      <svg
        style={{
          position: "absolute",
          left: String(imgx - 18) + "px",
          top:
            String(isBottom ? state1.circle_Y1 - 60 : state1.circle_Y1 + 45) +
            "px",
          zIndex: state1.isDrag1 ? 9999 : 1,
        }}
        width="40"
        height="40"
      >
        <circle
          onMouseDown={handleDown1}
          onMouseMove={handleMove1}
          onMouseUp={handleUp1}
          onMouseLeave={handleUp1}
          cx={20}
          cy={20}
          r={20}
          fill={circle_color1}
          id={id1}
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          left: String(imgx - 18) + "px",
          top:
            String(isBottom ? state2.circle_Y2 - 60 : state2.circle_Y2 + 45) +
            "px",
          zIndex: state2.isDrag2 ? 9999 : 1,
        }}
        width="40"
        height="40"
      >
        <circle
          onMouseDown={handleDown2}
          onMouseMove={handleMove2}
          onMouseUp={handleUp2}
          onMouseLeave={handleUp2}
          cx={20}
          cy={20}
          r={20}
          fill={circle_color2}
          id={id2}
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
          x1={230 + 120 * put_j}
          y1={100 + 110 * put_i}
          x2={230 + 120 * put_j}
          y2={isBottom ? state1.circle_Y1 - 40 : state1.circle_Y1 + 50}
          stroke={stroke_color}
          strokeWidth="5"
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
          x1={230 + 120 * put_j}
          y1={100 + 110 * put_i}
          x2={230 + 120 * put_j}
          y2={isBottom ? state2.circle_Y2 - 40 : state2.circle_Y2 + 50}
          stroke={stroke_color}
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export default Circlecc;
