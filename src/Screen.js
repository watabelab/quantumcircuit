import React from "react";
/*
画面のラインやラベルの描画
react-shapesを使用していたが，なぜかうまくいかず．．．
*/

const Screen = () => {
  const svg_width = 650;
  const svg_height = 480;

  const n = 4;
  const lines = [];
  const labels = [];
  const rects = [];

  for (let i = 0; i < n; i++) {
    lines.push(
      <line
        x1={10}
        y1={100 + 110 * i}
        x2={700}
        y2={100 + 110 * i}
        stroke="#000"
        strokeWidth={3}
      />
    );
    labels.push(
      <div style={{ height: "110px", fontSize: "30px", lineHeight: "120px" }}>
        q{i}
      </div>
    );
  }

  for (let i = 0; i < 4; i++) {
    let rects_low = [];
    for (let j = 0; j < 5; j++) {
      rects_low.push(
        <rect
          x={50 + 120 * j}
          y={90 + 110 * i}
          width={20}
          height={20}
          fill="gray"
        />
      );
    }
    rects.push(rects_low);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginTop: "35px", marginLeft: "20px" }}>{labels}</div>
      <svg
        width={svg_width}
        height={svg_height}
        style={{ position: "relative" }}
      >
        {rects}
        {lines}
      </svg>
    </div>
  );
};
export default Screen;

// if(image_info[1]>=120 + 120*i - a and image_info[1]<=120 + 120 * i+a and image_info[2]>=100 + 110*j- a and image_info[2] <= 100 + 110*j + a):
//                     #print('fuck')
//                     if(image_info[0] == 'H'):
//                         qc.h(j)
//                     elif(image_info[0] == 'Z'):
//                         qc.z(j)
