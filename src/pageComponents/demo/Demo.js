import React from "react";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  ConnectionLineType,
  MiniMap,
} from "reactflow";
export default function Demo() {
  return (
    <div>
      <ReactFlowProvider>
        <ReactFlow fitView>
          <Background variant="dots" size={1} gap={10} />

          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
