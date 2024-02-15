import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 1 };

export function ApiNode({ data, isConnectable }) {

  return (
    <div
      style={{
        width: "150px",
        height: "40px",
        border: "1px solid black",
        borderRadius: "10px",
        backgroundColor: data.nodeColor,
        border: "1px solid #697078",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ backgroundColor: " #669999", width: "1px", height: "1px" }}
      />
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
        }}
      >
        <label  htmlFor="" style={{ fontSize: "12px" ,color:"black"}}>
          {data.label}
        </label>
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
      {/* <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{transform:"translate(0px,-29px) rotate(-45deg)", backgroundColor :"#697078",  width:"1px",height:"1px",}}
        isConnectable={isConnectable}
      /> */}
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ backgroundColor: " #6666ff", width: "1px", height: "1px" }}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ApiNode;
