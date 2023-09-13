/*
コントロールの入っていないH，Z，Yゲートなどの処理を行うコンポーネント
*/
import React, { useState } from "react";

const Image = ({ image }) => {
  const id = image.id;
  const name = image.name;
  var imgx, imgy;

  // imageのnameによってswitch．初期配置の決定
  switch (name) {
    case "X":
      imgx = 820;
      imgy = 50;
      break;
    case "H":
      imgx = 950;
      imgy = 50;
      break;
    case "Y":
      imgx = 1080;
      imgy = 50;
      break;
    case "Z":
      imgx = 1210;
      imgy = 50;
      break;
  }

  const id_image = name + "_" + String(id);

  const [state, setState] = useState({
    image_X: imgx,
    image_Y: imgy,
    x: 0,
    y: 0,
    isDrag: false,
  });

  const handleDown = (e) => {
    const item = nodeRef.current;
    const x = e.pageX - item.offsetLeft;
    const y = e.pageY - item.offsetTop;
    console.log("x:", x, "y:", y);
    console.log(state.image_X, state.image_Y);
    setState({ ...state, isDrag: true, x, y });
    console.log(state.isDrag);
  };

  const handleMove = (e) => {
    console.log("move" + state.isDrag);
    if (state.isDrag) {
      e.preventDefault();
      setState({
        ...state,
        image_Y: e.pageY - state.y,
        image_X: e.pageX - state.x,
      });
      console.log(state.image_X, state.image_Y);
    }
  };

  const handleUp = () => {
    console.log("handleup");
    setState({ ...state, isDrag: false });
  };

  const { image_X, image_Y } = state;
  const nodeRef = React.createRef();

  return (
    <div>
      <div>
        <img
          style={{
            position: "absolute",
            left: `${image_X}px`,
            top: `${image_Y}px`,
            zIndex: state.isDrag ? 9999 : 2,
          }}
          src={image.path}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          id={id_image}
          alt={image.name}
          ref={nodeRef}
        />
      </div>
    </div>
  );
};

export default Image;
