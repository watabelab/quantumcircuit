import React from 'react'

const CanvasComponent = ({ id }) => {
    var canvas = document.getElementById(id);
    var c = canvas.getContext('2d');

    // パスの開始
    c.beginPath();
    // 起点
    c.moveTo(50, 100);
    // 終点
    c.lineTo(250, 100);
    // 描画
    c.stroke();
    // return (
    //     <div></div>
    // )
}

export default CanvasComponent