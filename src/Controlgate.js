import React, { useState, useEffect } from "react";
import CircleM from "./circle";

var put_i = 0;
var put_j = 0;

const Controlgate = ({ image }) => {
  const id = image.id;
  const name = image.name;

  var imgx, imgy;

  const init_x = 1000;
  const init_y = 150;
  switch (name) {
    case "CX":
      imgx = init_x;
      imgy = init_y;
      break;
    case "CH":
      imgx = init_x + 130 * 1;
      imgy = init_y;
      break;
    case "CZ":
      imgx = init_x + 130 * 2;
      imgy = init_y;
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

  useEffect(() => {
    if (state.isDrag) document.body.style.cursor = "grabbing";
    else document.body.style.cursor = "default";
  }, [state.isDrag]);

  // 以下，マウスイベントの関数の処理
  const handleDown = (e) => {
    const item = nodeRef.current;
    const x = e.pageX - item.offsetLeft;
    const y = e.pageY - item.offsetTop;
    setState({ ...state, isDrag: true, x, y });
  };

  // 左上の判定点の座標．ここをずらせば全体もずれる．
  // x方向は幅120．y方向は幅110．これはあまり変わらなそう．
  const init_x_position = 230;
  const init_y_position = 100;
  const handleMove = (e) => {
    var a = 30;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          state.image_X + 40 >= init_x_position + 120 * j - a &&
          state.image_X + 40 <= init_x_position + 120 * j + a &&
          state.image_Y + 40 >= init_y_position + 110 * i - a &&
          state.image_Y + 40 <= init_y_position + 110 * i + a
        ) {
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
      setState({
        ...state,
        image_Y: e.pageY - state.y,
        image_X: e.pageX - state.x,
      });
    }
    var image_center_x = state.image_X + 42.5;
    var image_center_y = state.image_Y + 42.5;
    var a = 20; // 当たり判定の幅

    var count = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          image_center_x >= init_x_position + 120 * j - a &&
          image_center_x <= init_x_position + 120 * j + a &&
          image_center_y >= init_y_position + 110 * i - a &&
          image_center_y <= init_y_position + 110 * i + a
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
  };

  const handleUp = () => {
    //console.log("handleup");
    setState({ ...state, isDrag: false });
  };

  const { image_X, image_Y } = state;
  const nodeRef = React.createRef();

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
        <CircleM
          imgx={init_x_position + 120 * put_j}
          imgy={init_y_position + 110 * put_i}
          img_name={name}
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

export default Controlgate;
