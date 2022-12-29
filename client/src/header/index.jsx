import "./index.css";
import { BsArrowLeft } from "react-icons/bs";
import { GrPlayFill } from "react-icons/gr";
import axios from "axios";

export default function Header() {
  // const keys = ["id"];
  // const filteredData = nodeInfo.filter(
  //   (value, index, self) =>
  //     self.findIndex((v) => keys.every((k) => v[k] === value[k])) === index
  // );
  const sendData = () => {
    const nodeInfo = JSON.parse(localStorage.getItem("nodeInfo"));
    console.log(nodeInfo);
    axios.post("http://localhost:8000/api/v1/message", nodeInfo);
  };

  return (
    <div className="header_container">
      <div className="header text">
        <BsArrowLeft
          color="gray"
          style={{ fontWeight: "900", marginRight: "10px" }}
          size={20}
        />
        <p style={{ margin: "0 5px", color: "gray" }}>Flows /</p>
        <p>Store Assistant</p>
      </div>
      <div className="header button">
        <button id="previewBtn">
          <GrPlayFill style={{ marginRight: "10px" }} />
          Preview Demo
        </button>
        <button id="publishBtn" onClick={sendData}>
          Publish Now
        </button>
      </div>
    </div>
  );
}
