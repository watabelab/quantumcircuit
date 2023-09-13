//import logo from './logo.svg';
import "./App.css";
import Images from "./image_List";
import Screen from "./Screen";
import Click from "./click";
import Reload from "./reload";
import Images_ctrl from "./image_ctrl_List";
import Images_ctrl_ctrl from "./image_ctrl_ctrl_List";

function App() {
  var images = [];
  var ctrl_images = [];
  var ctrl_ctrl_images = [];
  const n = 5;

  /* この処理の方がスマートにかける気がする
  他のjsでの処理では，gateの情報をラベルをもとに引っ張ってくる．
  idは各々のgateにおいて個々を識別する値．*/
  const gate_labels = ["X", "Y", "H", "Z", "CX", "CH", "CZ", "CCX"];

  for (const label of gate_labels) {
    for (let j = 0; j < n; j++) {
      if (!label.indexOf("CC")) {
        ctrl_ctrl_images.push({ id: j, name: label, path: "./" + label + ".png" });
      }
      else {
        if (label.includes("C")) {
          ctrl_images.push({ id: j, name: label, path: "./" + label + ".png" });
        } else {
          images.push({ id: j, name: label, path: "./" + label + ".png" });
        }
      }
    }
  }

  console.log("images", images);
  console.log("ctrl_images", ctrl_images);
  console.log("ctrl_ctrl_images", ctrl_ctrl_images);


  return (
    <div>
      <Images images={images} />
      <Images_ctrl images={ctrl_images} />
      <Images_ctrl_ctrl images={ctrl_ctrl_images} />
      <Screen />
      <Click />
      <Reload />
    </div>
  );
}

export default App;
