import React from "react";
/*
画面のラインやラベルの描画
react-shapesを使用していたが，なぜかうまくいかず．．．
*/

const Screen = () => {
  const svg_width = 850;
  const svg_height = 480;

  const n = 4;
  const lines = [];
  const labels = [];
  const rects = [];
  const init_qbits = [];

  for (let i = 0; i < n; i++) {
    lines.push(
      <line
        x1={100}
        y1={100 + 110 * i}
        x2={850}
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
    for (let j = 0; j < 6; j++) {
      rects_low.push(
        <rect
          x={155 + 120 * j}
          y={90 + 110 * i}
          width={20}
          height={20}
          fill="gray"
        />
      );
    }
    rects.push(rects_low);
  }

  for (let i = 0; i < 4; i++) {
    init_qbits.push(
      <div style={{ fontSize: "25px", marginTop: "75px" }}>|0⟩</div>
    );
  }

  return (
    <div>
      <span style={{ position: "absolute", top: "5px", left: "100px" }}>
        {init_qbits}
      </span>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "35px", marginLeft: "30px" }}>{labels}</div>
        <svg
          width={svg_width}
          height={svg_height}
          style={{ position: "relative" }}
        >
          {rects}
          {lines}
        </svg>
      </div>
    </div>
  );
};
export default Screen;
