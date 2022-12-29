import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  updateEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import StartFlow from "./customNodes/startFlow/StartFlow";
import Sidebar from "./components/Sidebar";
import GreetingNode from "./customNodes/greetingNode/GreetingNode";
import "./index.css";
import Catalogue from "./customNodes/catalogue/Catalogue";
import PackageTracking from "./customNodes/package_tracking/PackageTracking";
import Contact from "./customNodes/contact/Contact";
import ResultNode from "./customNodes/resultNode/ResultNode";
import SendMessage from "./customNodes/sendMessage/SendMessage";
import DelayTime from "./customNodes/delayTime/DelayTime";
import { updateData } from "../redux/slice/mapSlice";
import { useDispatch, useSelector } from "react-redux";

const initialNodes = [
  {
    id: "0",
    type: "startFlow",
    data: { label: "input node", node_id: "0" },
    position: { x: 250, y: 5 },
  },
];
const nodeTypes = {
  startFlow: StartFlow,
  greetingNode: GreetingNode,
  catalogue: Catalogue,
  packageTracking: PackageTracking,
  contact: Contact,
  result: ResultNode,
  sendMessage: SendMessage,
  delayTime: DelayTime,
};

let id = 1;
const getId = () => `${id++}`;

const DnDFlow = ({ nodeInfo, setNodeInfo }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const edgeUpdateSuccessful = useRef(true);

  useEffect(() => {
    if (reactFlowInstance) {
      const { edges: flowEdges } = reactFlowInstance?.toObject();
      const { nodes: flowNodes } = reactFlowInstance?.toObject();

      // console.log(flowEdges, flowNodes);
      const findNode = (id) => {
        let nodeInfo;
        flowNodes.forEach((nData) => {
          if (id === nData.id) nodeInfo = nData;
        });
        return nodeInfo;
      };
      const addNode = () => {
        flowEdges.forEach((edgeData) => {
          const sourceNode = findNode(edgeData.source);
          const snData = {
            id: sourceNode.id,
            nodeType: sourceNode.type,
            message: "Message to be sent",
          };
          const targetNode = findNode(edgeData.target);
          const tnData = {
            id: targetNode.id,
            nodeType: targetNode.type,
            time: 0,
          };
          // console.log(nodeInfo, sourceNode, targetNode);
          setNodeInfo([...nodeInfo, snData, tnData]);
        });
      };
      addNode();
    }
  }, [edges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, node_id: getId(), nodeInfo: nodeInfo },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow_wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
