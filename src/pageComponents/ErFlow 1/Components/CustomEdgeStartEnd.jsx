import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  getBezierPath,
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
  markerEnd,
  markerStart,
  data,
}) {
  const [toogle, setToogle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (e, type) => {
    setEdges((edges) => {
      console.log(edges, "edges");
      return edges.map((edge) => {
        if (edge.id === id) {
          if (type === "start") {
            return (edge = {
              ...edge,
              data: {
                ...edge.data,
                startLabel: e.target.value,
              },
            });
          }
          if (type === "end") {
            return (edge = {
              ...edge,
              data: {
                ...edge.data,
                endLabel: e.target.value,
              },
            });
          }
        }
        return edge;
      });
    });
  };

  const Cardinalities = [
    { name: "One", value: "One" },
    { name: "Many", value: "Many" },
  ];

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerStart={markerStart}
        markerEnd={markerEnd}
        id={id}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-10%, -0%) translate(${
              sourceX + 15
            }px,${sourceY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {toogle && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Dropdown
                inputId="cardinality"
                value={data.endLabel}
                options={Cardinalities}
                optionLabel="name"
                className="w-full"
                placeholder="Cardinality"
                onChange={(e) => {
                  onEdgeClick(e, "start");
                }}
                style={{
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          )}
          {toogle === false && (
            <p
              style={{
                zIndex: 20,
                fontSize: 15,
                backgroundColor: "transparent",
              }}
              onClick={() => setToogle(!toogle)}
            >
              {data.startLabel || " "}
            </p>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            transform: `translate(-120%, -100%) translate(${
              targetX - 15
            }px,${targetY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {toggle && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <InputText
                placeholder="Type here..."
                value={data.endLabel || " "}
                onChange={(e) => {
                  e.stopPropagation();
                  onEdgeClick(e, "end");
                }}
                style={{
                  width: "100px",
                  fontSize: 2,
                  backgroundColor: "transparent",
                }}
              /> */}
              <Dropdown
                inputId="cardinality"
                value={data.endLabel}
                options={Cardinalities}
                optionLabel="name"
                className="w-full"
                placeholder="Cardinality"
                onChange={(e) => {
                  onEdgeClick(e, "end");
                }}
                style={{
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          )}
          {toggle === false && (
            <p
              style={{
                zIndex: 20,
                fontSize: 15,
                fontFamily: "sans-serif",
                backgroundColor: "transparent",
              }}
              onClick={() => setToggle(!toggle)}
            >
              {data.endLabel || " "}
            </p>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
