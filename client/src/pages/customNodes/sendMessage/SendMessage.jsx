import React, { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { FiSend } from "react-icons/fi";
import SelectOptions from "../components/SelectOptions";
import "./sendMessage.css";
import { Handle, Position } from "reactflow";

export default function SendMessage({ id }) {
  const [openOption, setOpenOption] = useState(false);
  const [message, setMessage] = useState("");

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const updateNode = (data) => {
    const nodeArray = data.map((node) => {
      if (node.id === id) {
        node.message = message;
      }
      return node;
    });
    return nodeArray;
  };
  const saveMessage = () => {
    const nodes = JSON.parse(localStorage.getItem("nodeInfo"));
    const nodeInfo = updateNode(nodes);
    localStorage.setItem("nodeInfo", JSON.stringify(nodeInfo));
    setMessage("");
  };
  const isValidConnectionDelay = (connection) => {
    if (connection.targetHandle === "DelayIn") return true;
  };
  return (
    <div className="greeting_node">
      <Handle
        className="circle_handle_input"
        type="target"
        position={Position.Left}
        id="SendMessageIn"
      />
      <div className="greeting_node_header">
        <div className="greeting_node_header_text">
          <AiFillMessage color="#2f89ff" className="heading_icon" size={18} />
          <h4>Send Message</h4>
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
      <div className="send_message_body">
        <div>
          <FiSend />
          <span style={{ marginLeft: "20px" }}>
            Send Message To: 0174856268
          </span>
        </div>
        <textarea
          id="story"
          name="story"
          rows="4"
          placeholder="Start writing from here..."
          value={message}
          onChange={onMessageChange}
        />
        <footer className="save_btn_container">
          <button
            className={message ? "unsaved" : "saved"}
            onClick={saveMessage}
          >
            Save
          </button>
        </footer>
      </div>
      <Handle
        className="circle_handle_output"
        type="source"
        position={Position.Right}
        id="SendMessageOut"
        isValidConnection={isValidConnectionDelay}
      />
    </div>
  );
}
