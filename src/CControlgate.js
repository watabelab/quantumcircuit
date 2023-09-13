import React, { useState } from "react";
import Circlecc from "./circlecc";

var put_i = 0;
var put_j = 0;

const CControlgate = ({ image }) => {
  const id = image.id;
  const name = image.name;

  var imgx, imgy;

  switch (name) {
    case "CCX":
      imgx = 820;
      imgy = 250;
      break;
  }


  const id_image = name + "_" + String(id);
  // flag=0：移動中 flag=1：配置後
  const [flag, setFlag] = useState(0);

  // 座標の情報などをuseStateで管理．
  // stateのimage_X,image_Yは，どちらも画像の左上の点の座標を示す．

  const [state, setState] = useState({
    image_X: imgx,
    image_Y: imgy,
    x: 0,
    y: 0,
    isDrag: false,
  });

  // 以下，マウスイベントの関数の処理
  const handleDown = (e) => {
    const item = nodeRef.current;
    const x = e.pageX - item.offsetLeft;
    const y = e.pageY - item.offsetTop;
    // console.log("x:", x, "y:", y);
    // // console.log(state.image_X, state.image_Y);
    // // console.log("mouseX:", e.pageX, "mouseY:", e.pageY);
    setState({ ...state, isDrag: true, x, y });
    // console.log(state.isDrag);
  };

  const handleMove = (e) => {
    // console.log("move" + state.isDrag);
    if (state.isDrag) {
      e.preventDefault();
      setState({
        ...state,
        image_Y: e.pageY - state.y,
        image_X: e.pageX - state.x,
      });
      //  テスト用．左上の場所に当たり判定
      var image_center_x = state.image_X + 42.5;
      var image_center_y = state.image_Y + 42.5;
      var a = 20; // 当たり判定の幅

      var count = 0;

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
          if (
            image_center_x >= 110 + 120 * j - a &&
            image_center_x <= 110 + 120 * j + a &&
            image_center_y >= 100 + 110 * i - a &&
            image_center_y <= 100 + 110 * i + a
          ) {
            put_i = i;
            put_j = j;
            count++;
          }
        }
      }
      if (count > 0) {
        setFlag(1);
      } else {
        setFlag(0);
      }
    }
  };

  const handleUp = () => {
    //console.log("handleup");
    setState({ ...state, isDrag: false });
  };

  const { image_X, image_Y } = state;
  const nodeRef = React.createRef();
  var dot_list = [1, 2];
  if (flag == 0) {
    // 移動中
    return (
      <div>
        <img
          style={{
            position: "absolute",
            left: `${image_X}px`,
            top: `${image_Y}px`,
            zIndex: state.isDrag ? 9999 : 1,
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
    );
  } else if (flag == 1) {
    // 配置後
    return (
      <div>
        <Circlecc
          imgx={110 + 120 * put_j}
          imgy={100 + 110 * put_i}
          circle_id={id_image}
          put_i={put_i}
          put_j={put_j}
        />
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
    );
  }
};

export default CControlgate;