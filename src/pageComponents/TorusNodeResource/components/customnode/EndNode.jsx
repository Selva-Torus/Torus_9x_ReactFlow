import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function EndNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
  }, []);
  const [isVisible, setIsVisible] = useState(true);

  const onDragOvers = () => {
    alert("her");
    setIsVisible((visible) => !visible);
  };

  return (
    <div
      style={{
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        border: "1px solid #697078",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          width: "1px",
          height: "1px",
          borderRadius: "50%",
          backgroundColor: "#697078",
        }}
      />
      <div style={{ fontSize: "10px",color:"white" }}>
        <label  htmlFor="text">{data.label}</label>
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
    </div>
  );
}

export default EndNode;
