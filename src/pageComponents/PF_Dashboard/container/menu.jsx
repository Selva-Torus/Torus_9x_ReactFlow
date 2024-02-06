import { useEffect, useState } from "react";
import menuIcon from "../img/menu.png";
import backIcon from "../img/arrows.png";
import start from "../img/start-button.png";
import apiIcon from "../img/api.png";
import decisionIcon from "../img/decision-tree.png";
import endIcon from "../img/end.png";
import Image from "next/image";
const Menu = ({ toside, setToside }) => {
  const [opa, setOpa] = useState(false);
  const onDragStart = (event, nodeType, nodeName = "start") => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/name", nodeName);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={toside ? "bigContainer" : "smallContainer"}>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="sidebarBtn">
          <button
            onClick={() => {
              setOpa(false);
            }}
          >
            {toside ? <Image src={backIcon} /> : <Image src={menuIcon} />}
          </button>
        </div>
        {toside && (
          <div className="description">
            You can drag these nodes to the pane on the right.
          </div>
        )}
        <div className="nodeContainer">
          <div
            className="nodeStyle"
            onDragStart={(event) => onDragStart(event, "startNode")}
            draggable
            name="start"
          >
            {toside ? "Start" : <Image src={start} />}
          </div>
          <div
            className="nodeStyle"
            onDragStart={(event) =>
              onDragStart(event, "decisionNode", "Decision")
            }
            draggable
          >
            {toside ? "Decision" : <Image src={decisionIcon} />}
          </div>

          <div
            className="nodeStyle"
            onDragStart={(event) => onDragStart(event, "apiNode", "Api")}
            draggable
          >
            {toside ? "Api" : <Image src={apiIcon} />}
          </div>
          <div
            className="nodeStyle"
            onDragStart={(event) => onDragStart(event, "endNode", "End")}
            draggable
          >
            {toside ? "End" : <Image src={endIcon} />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Menu;
