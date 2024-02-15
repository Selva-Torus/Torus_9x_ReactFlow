import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 1 };

function DecisionNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
  }, []);

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        transform: "rotate(45deg)",
        border: "1px solid black",
        backgroundColor: data.nodeColor,
        border:"1px solid #697078",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{transform:"translate(0px,22px) rotate(-45deg)",  backgroundColor :"#697078", width:"1px",height:"1px",}}
      />
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-45deg)",
          fontSize:"10px"
        }}
      >
        <label htmlFor="text"  style={{fontSize:"10px",textAlign:"center"}}>{data.label}</label>
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{transform:"translate(0px,-29px) rotate(-45deg)", backgroundColor :"green",  width:"1px",height:"1px",}}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{transform:"translate(22px,0px) rotate(-45deg)",  backgroundColor :"red",  width:"1px",height:"1px",}}
        isConnectable={isConnectable}
      />
        <Handle
        type="source"
        position={Position.Top}
        id="c"
        style={{transform:"translate(-28px,0px) rotate(-45deg)",  backgroundColor :"#697078",  width:"1px",height:"1px",}}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default DecisionNode;
