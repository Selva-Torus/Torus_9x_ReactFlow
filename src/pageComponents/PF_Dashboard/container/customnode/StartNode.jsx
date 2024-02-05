import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function StartNode({ data, isConnectable }) {

  return (
    <div
      style={{
        height: "50px",
        width: "50px",
        border: "1px solid black",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00D7CA",
        border: "1px solid #697078",
        
      }}
    >
      <div style={{ fontSize: "10px", color:"white"}}>
        <label  htmlFor="text">{data.label}</label>
        {/* <input
          id="text"
          name="text"
          value={data.label}
          onChange={onChange}
          className="nodrag"
        /> */}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
        style={{
          width: "1px",
          height: "1px",
          borderRadius: "50%",
          backgroundColor: "#697078",
        }}
        // style={{ borderColor: "green" }}
      />
    </div>
  );
}

export default StartNode;
