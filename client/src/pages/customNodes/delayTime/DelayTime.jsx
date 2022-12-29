import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaHourglassEnd } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { Handle, Position } from "reactflow";
import SelectOptions from "../components/SelectOptions";
import "./delayTime.css";

export default function DelayTime({ id }) {
  const [openOption, setOpenOption] = useState(false);
  const [time, setTime] = useState(0);

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };
  const updateNode = (data) => {
    const nodeArray = data.map((node) => {
      if (node.id === id) {
        node.time = time;
      }
      return node;
    });
    return nodeArray;
  };
  const saveTime = () => {
    const nodes = JSON.parse(localStorage.getItem("nodeInfo"));
    const nodeInfo = updateNode(nodes);
    localStorage.setItem("nodeInfo", JSON.stringify(nodeInfo));
    setTime("");
  };

  const isValidConnectionSendMessage = (connection) => {
    if (connection.targetHandle === "SendMessageIn") return true;
  };

  return (
    <div className="greeting_node">
      <Handle
        className="circle_handle_input"
        type="target"
        position={Position.Left}
        id="DelayIn"
      />
      <div className="greeting_node_header">
        <div className="greeting_node_header_text">
          <AiFillMessage color="#2f89ff" className="heading_icon" size={18} />
          <h4>Delay Time</h4>
        </div>
        <div
          style={{
            color: "gray",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => {
            setOpenOption(!openOption);
          }}
        >
          <SlOptions size={20} />
          {openOption && <SelectOptions id={id} />}
        </div>
      </div>
      <div className="delay_node_body">
        <div>
          <FaHourglassEnd />
          <span style={{ marginLeft: "20px" }}>
            Select Dalay Time in Minute
            <input type="number" onChange={onTimeChange} />
          </span>
        </div>
        <footer className="save_btn_container">
          <button className={time ? "unsaved" : "saved"} onClick={saveTime}>
            Save
          </button>
        </footer>
      </div>
      <Handle
        className="circle_handle_output"
        type="source"
        position={Position.Right}
        id="DelayOut"
        isValidConnection={isValidConnectionSendMessage}
      />
    </div>
  );
}
