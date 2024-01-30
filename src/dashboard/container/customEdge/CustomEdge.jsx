import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useEffect } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  useReactFlow,
} from "reactflow";

// import "./buttonedge.css";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  position,
}) {
  const [toogle, setToogle] = useState(false);
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (e) => {
    setEdges((edges) => {
      return edges.map((edge) => {
        if (edge.id === id) {
          return (edge = {
            ...edge,
            label: e.target.value,
          });
        }
        return edge;
      });
    });
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} id={id} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,

            // zIndex: 4,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {toogle && (
            <div style={{ display: "flex", gap: "1px", alignItems: "center" }}>
              <InputText
                placeholder={"Type here..."}
                value={label}
                onChange={(e) => {
                  onEdgeClick(e);
                }}
                style={{ width: "100px" }}
              />
              <button
                className="edgebutton"
                title="click save"
                onClick={() => setToogle(!toogle)}
              >
                x
              </button>
            </div>
          )}
          {toogle === false && (
            <p style={{zIndex: 10 ,fontSize: 8, backgroundColor: "#F3F8FF" }} onClick={() => setToogle(!toogle)}>
              {label || "Add Conditional Edge"}
            </p>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
