import React from "react";

import { Button } from "primereact/button";
import { CiViewTable } from "react-icons/ci";
const data = [
  {
    label: "Table",
    nodeType: "customTable",
  },
];
export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        top: 50,
        left: 10,
        position: "absolute",
        zIndex: 100,
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            title={item.label}
            key={index}
            onDragStart={(event) => onDragStart(event, item?.nodeType)}
            draggable
            style={{ cursor: "pointer" }}
          >
            <CiViewTable size={30} />
          </div>
        );
      })}
    </div>
  );
}
