/*
コントロールの入っていないH，Z，Yゲートなどの処理を行うコンポーネント
*/
import React, { useState, useEffect } from "react";

const Image = ({ image }) => {
  const id = image.id;
  const name = image.name;
  var imgx, imgy;

  // imageのnameによってswitch．初期配置の決定
  const init_x = 1000;
  const init_y = 50;
  switch (name) {
    case "X":
      imgx = init_x;
      imgy = init_y;
      break;
    case "H":
      imgx = init_x + 130;
      imgy = init_y;
      break;
    case "Y":
      imgx = init_x + 130 * 2;
      imgy = init_y;
      break;
    case "Z":
      imgx = init_x + 130 * 3;
      imgy = init_y;
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

  useEffect(() => {
    if (state.isDrag) document.body.style.cursor = "grabbing";
    else document.body.style.cursor = "default";
  }, [state.isDrag]);

  const handleDown = (e) => {
    const item = nodeRef.current;
    const x = e.pageX - item.offsetLeft;
    const y = e.pageY - item.offsetTop;
    console.log("x:", x, "y:", y);
    console.log(state.image_X, state.image_Y);
    setState({ ...state, isDrag: true, x, y });
    console.log(state.isDrag);
  };

  // 左上の判定点の座標．ここをずらせば全体もずれる．
  // x方向は幅120．y方向は幅110．これはあまり変わらなそう．
  const init_x_position = 230;
  const init_y_position = 100;
  const handleMove = (e) => {
    console.log("move" + state.isDrag);
    var a = 40;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          state.image_X + 40 >= init_x_position + 120 * j - a &&
          state.image_X + 40 <= init_x_position + 120 * j + a &&
          state.image_Y + 40 >= init_y_position + 110 * i - a &&
          state.image_Y + 40 <= init_y_position + 110 * i + a
        ) {
          // setState({ ...state, image_Y: 100 + 110 * i - 42.5, image_X: 110 + 120 * j - 42.5 });
          setState((prevState) => ({
            ...prevState,
            image_Y: init_y_position + 110 * i - 40,
            image_X: init_x_position + 120 * j - 40,
          }));
        }
      }
    }
    if (state.isDrag) {
      e.preventDefault();
      console.log(state.image_X, state.image_Y);
      // setState({
      //   ...state,
      //   image_Y: e.pageY - state.y,
      //   image_X: e.pageX - state.x,
      // });
      setState((prevState) => ({
        ...prevState,
        image_Y: e.pageY - state.y,
        image_X: e.pageX - state.x,
      }));
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
