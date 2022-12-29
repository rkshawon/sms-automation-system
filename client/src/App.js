import "./App.css";
import Header from "./header";
import DnDFlow from "./pages";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";

function App() {
  const [nodeInfo, setNodeInfo] = useState([]);
  useEffect(() => {
    localStorage.setItem("nodeInfo", JSON.stringify(nodeInfo));
  }, [nodeInfo]);
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <DnDFlow nodeInfo={nodeInfo} setNodeInfo={setNodeInfo} />
        {/* <ProviderFlow /> */}
      </div>
    </Provider>
  );
}

export default App;
