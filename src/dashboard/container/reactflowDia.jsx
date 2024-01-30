import ReactFlow, {
    Controls,
    Background,
    ReactFlowProvider,
    ConnectionLineType,
  } from "reactflow";
  import ContextMenu from "./ContextMenu";
  import "reactflow/dist/style.css";
  import SideBar from "./sideBar";
  
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
  }) => {
    const proOptions = { hideAttribution: true };
    return (
      <ReactFlowProvider>
        <div
          style={{
            width: widths,
            height: "100%",
            margin: "0",
            padding: "0",
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
                style={{ color: "#2C75B5", fontSize: "17px", fontWeight: "600" }}
              >
                {selectedTenant}/{selectedAppGroup}/{selectedApp}
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
              />
            )}
            <Background variant="dots" gap={10} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    );
  };
  
  export default ReactFlowDia;
  