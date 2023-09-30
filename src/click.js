import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import InputRadio from "./RadioButtonList";

const Click = () => {
  const [receiveData, setReceiveData] = useState({ 0: 1.0, 1: 0.0 });
  const chartReference = useRef(null);

  // 用いるゲートを管理．これでゲートを追加する際にも記述が楽．
  const gate_labels = ["X", "Y", "H", "Z", "CX", "CH", "CZ", "CCX"];

  // グラフを破棄する関数
  const destroyChart = () => {
    if (chartReference.current && chartReference.current.chartInstance) {
      chartReference.current.chartInstance.destroy();
    }
  };

  useEffect(() => {
    // 初回レンダリング時にグラフを描画
    Clickbutton();
  }, []);

  // ボタンのクリックイベント
  const Clickbutton = () => {
    destroyChart(); // グラフを破棄

    var image_info_list = [];
    var dot_info_list = [];
    // 各々のゲートについて，ゲート画像を5個ずつ用意．
    for (const label of gate_labels) {
      for (let i = 0; i < 5; i++) {
        var image_info = [3];
        // 各ゲート1~5のidを定義. ex)H_0,H_1,...H_4
        const element_img = document.getElementById(label + "_" + String(i));
        if (element_img) {
          const rect = element_img.getBoundingClientRect();
          image_info[0] = element_img.alt + "_" + String(i); // alt属性にゲートの情報を保存．
          image_info[1] = (rect.left + rect.right) / 2; // 中心のx座標
          image_info[2] = (rect.top + rect.bottom) / 2; // 中心のy座標
        }
        image_info_list.push(image_info);
        // 各々のコントロールゲートについて、コントロールビットのための点を用意する
        var dot_id = label + "_" + String(i) + "D";
        const element_dot = document.getElementById(dot_id);
        var dot_info = [2];
        if (element_dot) {
          const dotplace = element_dot.getBoundingClientRect();
          dot_info[0] = dot_id;
          var dot_y = (dotplace.top + dotplace.bottom) / 2;
          for (let i = 0; i < 4; i++) {
            if (dot_y >= 100 + 110 * i - 30 && dot_y <= 100 + 110 * i + 30) {
              dot_info[1] = i;
            }
          }
          dot_info_list.push(dot_info);
        }

        // CCX
        var dot_id2_1 = label + "_" + String(i) + "D_1";
        var dot_id2_2 = label + "_" + String(i) + "D_2";
        const element_dot2_1 = document.getElementById(dot_id2_1);
        const element_dot2_2 = document.getElementById(dot_id2_2);
        var dot_info2 = [4];
        if (element_dot2_1 && element_dot2_2) {
          const dotplace1 = element_dot2_1.getBoundingClientRect();
          const dotplace2 = element_dot2_2.getBoundingClientRect();
          dot_info2[0] = dot_id2_1;
          dot_info2[1] = dot_id2_2;
          var dot_y_1 = (dotplace1.top + dotplace1.bottom) / 2;
          var dot_y_2 = (dotplace2.top + dotplace2.bottom) / 2;
          for (let i = 0; i < 4; i++) {
            if (
              dot_y_1 >= 100 + 110 * i - 30 &&
              dot_y_1 <= 100 + 110 * i + 30
            ) {
              dot_info2[2] = i;
            }
            if (
              dot_y_2 >= 100 + 110 * i - 30 &&
              dot_y_2 <= 100 + 110 * i + 30
            ) {
              dot_info2[3] = i;
            }
          }
          dot_info_list.push(dot_info2);
        }
      }

      // console.log("dot_info_list", dot_info_list);
    }
    // DjangoのAPIへリクエストを送る．ゲート情報から量子計算を行う．

    var url = "https://django-render-aumu.onrender.com/execute_python_code/";
    // var url = "http://127.0.0.1:8000/execute_python_code/";
    axios
      .post(url, {
        img_data: image_info_list,
        dot_data: dot_info_list,
      })
      .then((response) => {
        const Data = response.data;
        setReceiveData(Data["result"]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ラジオボタンによる表示形式のセレクタ
  const items = [
    { id: 1, value: "A" },
    { id: 2, value: "B" },
  ];

  const [checkedValue, setCheckedValue] = useState(items[0].value);
  const handleChange = (e) => setCheckedValue(e.target.value);
  // 0000～1111までの16個のラベルを含むallLabels
  const allLabels = [];
  for (let i = 0; i < 16; i++) {
    allLabels.push(i.toString(2).padStart(4, "0"));
  }

  var labels = [];
  var values = [];

  if (checkedValue == "A") {
    // APIからのresponse(receivedData)に含まれるラベルをlabelsとして用意
    labels = [];
    for (const label of allLabels) {
      for (const key of Object.keys(receiveData)) {
        if (key == label) {
          labels.push(key);
        }
      }
    }
    // labelsに対応するvalueをリストとして用意
    values = [];
    for (const label of labels) {
      values.push(receiveData[label]);
    }
  } else {
    labels = allLabels;
    for (let i = 0; i < allLabels.length; i++) {
      values[i] = 0.0;
      for (const key of Object.keys(receiveData)) {
        if (allLabels[i] == key) {
          values[i] = receiveData[key];
        }
      }
    }
  }

  // 確率分布のグラフの設定
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Probablity Distribution",
        data: values,
        backgroundColor: "rgba(75, 192, 252, 1.0)",
        borderWidth: 3,
      },
    ],
  };

  // グラフのオプションの設定
  const options = {
    response: false,
    borderColor: "#fff",
    backgroundColor: "#fff",
    scales: {
      y: {
        min: 0, // 最小値を0に設定
        max: 1, // 最大値を1に設定
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Probability Distribution :)",
      },
    },
  };

  const handleClick = () => {
    Clickbutton();
  };

  return (
    <div>
      <div style={{ position: "absolute", left: "200px", bottom: "250px" }}>
        <button
          onClick={handleClick}
          style={{
            width: "200px",
            height: "70px",
            // backgroundColor: "#fff",
            borderRadius: "8px",
            transition: ".3s",
          }}
        >
          <i class="fa-solid fa-chart-column" style={{ fontSize: "28px" }}></i>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            &nbsp;計算する
          </span>
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          width: "45%",
          height: "45%",
          backgroundColor: "#fff",
          border: "2px solid",
        }}
      >
        <Bar data={data} options={options} ref={chartReference} />
      </div>
      <div
        style={{
          position: "absolute",
          right: "350px",
          bottom: "420px",
          display: "flex",
        }}
      >
        表示切替
        <InputRadio
          items={items}
          handleChange={handleChange}
          checkedValue={checkedValue}
        />
      </div>
    </div>
  );
};

export default Click;
