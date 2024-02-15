import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background } from "reactflow";
import "reactflow/dist/style.css";
import {
  StartNode,
  EndNode,
  DecisionNode,
  DefaultNode,
  ApiNode,
  DatabaseNode,
  KafkaNode,
  PostgresNode,
  DockerNode,
  InputNode,
  OutputNode,
} from "./components/customnode/CustomNode";
import { Toast } from "primereact/toast";
import {
  tenant_details,
  roles,
  app_pfd_path,
  read_only,
  developer,
  admin,
  user_type,
  save_options,
  workflow_controlpolicy,
  config_controlpolicy,
  workflow_colorpolicy,
  config_colorpolicy,
} from "./utils/environment";

import { v4 as uuidv4 } from "uuid";
import ContextMenu from "./components/contextMenu/ContextMenu";
const NODE_TYPE = {
  startNode: StartNode,
  decisionNode: DecisionNode,
  endNode: EndNode,
  defaultNdoe: DefaultNode,
  apiNode: ApiNode,
  databaseNode: DatabaseNode,
  kafkaNode: KafkaNode,
  postgresNode: PostgresNode,
  dockerNode: DockerNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};
export default function Index({ sendDataToParent, getDataFromParent }) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [menu, setMenu] = useState([]);
  const [typesInFlow, setTypesInFlow] = useState([]);
  const [nodeConfig, setnodeConfig] = useState({});
  const toast = useRef(null);
  const deleteNode = useCallback(
    (id) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));

      setMenu(null);
    },
    [nodes]
  );

  const showErr = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };

  const getTypesinFlow = useCallback(() => {
    let typeinFlow = [];

    for (let i = 0; i < nodes.length; i++) {
      if (!typeinFlow.includes(nodes[i].type)) {
        typeinFlow.push(nodes[i].type);
      }
    }
    console.log(typeinFlow);
    console.log(nodes);
    setTypesInFlow(typeinFlow);
  }, [nodes]);

  useEffect(() => {
    if (nodes.length > 0) {
      getTypesinFlow();
      sendDataToParent({ nodes: nodes, nodeConfig: nodeConfig });
    } else {
      setTypesInFlow([]);
    }
  }, [nodes,nodeConfig]);

  useEffect(() => {
    setNodes(getDataFromParent?.nodes);
    setnodeConfig(getDataFromParent?.nodeConfig);
  }, [getDataFromParent]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const name = event.dataTransfer.getData("application/name");
      const roles = event.dataTransfer.getData("application/roles");
      const rolesColor = event.dataTransfer.getData("application/roleColor");
      try {
        if (typeof type === "undefined" || type === null) {
          throw "type is undefined";
        }
        if (typesInFlow.includes(type)) {
          throw "type already exists";
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // let id = nodes.length ? Number(nodes[nodes.length - 1].id) + 1 : 0;
        const nodeDetails = type;
        const newNode = {
          // connectable: false,
          // draggable: false,
          id: uuidv4(),
          type: nodeDetails,
          position,
          parentId: [],
          data: {
            label: "",
            nodeType: nodeDetails,
            nodeColor: rolesColor,
            // role: roles,
          },
          property: {
            name: "",
            description: "",
            nodeType: nodeDetails,
            defaultConfig: {},
            defaultWorkflow: {},
          },
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (err) {
        showErr(err);
      }
    },
    [reactFlowInstance, nodes, typesInFlow]
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNodeConfig = (data, config) => {
    setnodeConfig((prev) => ({ ...prev, ...data }));
  };

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = reactFlowWrapper.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - 80,
        left: event.clientX < pane.width - 200 && event.clientX - 80,
        right: event.clientX >= pane.width && pane.width - event.clientX + 80,
        bottom:
          event.clientY >= pane.height - 200 &&
          pane.height - event.clientY + 80,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  const controlPolicyApi = (type) => {
    // const res = await getColorPolicy(type);
    const configControlpolicy = config_controlpolicy[type];
    const workflowControlpolicy = workflow_controlpolicy[type];
    const configColorpolicy = config_colorpolicy[type];
    const workflowColorpolicy = workflow_colorpolicy[type];

    return {
      workflowControlpolicy: { ...workflowControlpolicy },
      configControlpolicy: { ...configControlpolicy },
      configColorpolicy: { ...configColorpolicy },
      workflowColorpolicy: { ...workflowColorpolicy },
    };
  };
  return (
    <div
      className="TNR-main"
      style={{ height: "100%", width: "100%", backgroundColor: "black" }}
    >
      <Toast ref={toast} />
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesChange={onNodesChange}
        nodeTypes={NODE_TYPE}
        onInit={setReactFlowInstance}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView={true}
        panOnDrag={false}
        // zoomOnScroll={false}
        // nodesDraggable={false}
        nodesConnectable={false}
      >
        {menu && (
          <ContextMenu
            onClick={onPaneClick}
            {...menu}
            // sideT={sideT}
            // setToogle={setToogle}
            deleteNode={deleteNode}
            setMenu={setMenu}
            updatedNodeConfig={updateNodeConfig}
            isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
            nodeConfig={nodeConfig}
            controlPolicyApi={controlPolicyApi}
            // showerror={showError}
            // showsuccess={showSuccess}
          />
        )}
        <Background variant="dots" />
      </ReactFlow>
    </div>
  );
}
