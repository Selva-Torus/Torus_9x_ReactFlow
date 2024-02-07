import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  ConnectionLineType,
} from "reactflow";
import ContextMenu from "./ContextMenu";
import "reactflow/dist/style.css";
import SideBar from "./sideBar";
import { DarkmodeContext } from "../context/DarkmodeContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";

const ReactFlowDia = ({
  nodes,
  edges,
  onConnect,
  edgeTypes,
  onEdgesChange,
  onNodesChange,
  onDragOver,
  onDrop,
  reactFlowWrapper,
  setReactFlowInstance,
  onEdgeUpdate,
  nodeTypes,
  toogle,
  setToogle,
  sideBarData,
  changeProperty,
  sideT,
  menu,
  onNodeContextMenu,
  onPaneClick,
  widths,
  deleteNode,
  setMenu,
  updatedNodeConfig,
  setsavejs,
  isAdmin,
  nodeConfig,
  userRoleDetails,
  selectedRole,
  selectedTenant,
  selectedAppGroup,
  selectedApp,
  controlPolicyApi,
  connectionLine,
  showSuccess,
  showError,
  onEdgeUpdateStart,
  onEdgeUpdateEnd
}) => {
  const proOptions = { hideAttribution: true };
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  return (
    <ReactFlowProvider>
      <div
        style={{
          width: widths,
          height: "100%",
          margin: "0",
          padding: "0",
          backgroundColor: darkmode ? "#121212" : "#E9E8E8",
        }}
      >
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          edgeTypes={edgeTypes}
          onDragOver={onDragOver}
          fitView
          onInit={setReactFlowInstance}
          onEdgeUpdate={onEdgeUpdate}
          connectionLineType={ConnectionLineType.SmoothStep}
          nodeTypes={nodeTypes}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onNodeContextMenu}
          proOptions={proOptions}
          connectionLineComponent={connectionLine}

          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
        >
          <p
            style={{
              float: "right",
              color: "#808080",
              fontSize: "15px",
              paddingRight: "20px",
              fontWeight: "500",
            }}
          >
            <span
              // "#5A47B0"
              style={{
                color: darkmode ? "white" : "#5A47B0",
                fontSize: "17px",
                fontWeight: "600",
                zIndex: "9999",
              }}
       
            >
              
            </span>
          </p>
          <SideBar
            toogle={toogle}
            sideBarData={sideBarData}
            sideT={sideT}
            changeProperty={changeProperty}
            userRoleDetails={userRoleDetails}
            selectedRole={selectedRole}
          />
          <Controls />
          {/* <MiniMap/> */}
          {menu && (
            <ContextMenu
              onClick={onPaneClick}
              {...menu}
              sideT={sideT}
              setToogle={setToogle}
              deleteNode={deleteNode}
              setMenu={setMenu}
              updatedNodeConfig={updatedNodeConfig}
              isAdmin={isAdmin}
              nodeConfig={nodeConfig}
              controlPolicyApi={controlPolicyApi}
              showerror={showError}
              showsuccess={showSuccess}
            />
          )}
          <Background
            variant="dots"
            color={darkmode ? "white" : "black"}
            gap={12}
            size={1}
          />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default ReactFlowDia;
