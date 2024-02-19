//IMPORT
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  createContext,
} from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  Panel,
  updateEdge,
  ConnectionLineType,
} from "reactflow";
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
} from "../utils/environment";
import "reactflow/dist/style.css";
import { Button } from "primereact/button";
import "./App.css";
import dagre from "dagre";
import ContextMenu from "./ContextMenu.jsx";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar.jsx";

import CustomEdgeStartEnd from "./CustomEdgeStartEnd";
import { CustomTableNode } from "./DynamicNodes.jsx";

import { Toast } from "primereact/toast";

import ResizeRotateNode from "./ResizeRotateNode";
import { Dialog } from "primereact/dialog";
import DF_AppDetail from "../DF_AppDetail";

//BASIC URLS
const WORKFLOW_API_URL = "http://localhost:4000/Workflow";
const RELATIONSHIP_API_URL = "http://localhost:5000/Relationship";

//Declaring NodeTypes

// const data = [
//   {
//     label: "Table",
//     nodeType: "customTable",
//     entity: "One",
//     severity: "danger",
//   },
// ];

//Node Dimensions
const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;
export const uniQueNameContext = createContext(null);
//App Function
export default function DataFabric({ getDataFromParent, postDataToParent }) {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [relationShipData, setRelationShipData] = useState({});
  const [entityJson, setEntityJson] = useState({});
  const reactflowwrapper = useRef(null);
  const [menu, setMenu] = useState(null);
  const [nodeConfig, setnodeConfig] = useState({});
  const [uniqueNames, setUniqueNames] = useState([]);
  const [reactFlowInstance, setreactflowinstance] = useState(null);
  const [isUserDetailsDialog, setIsUserDetailsDialog] = useState(true);
  const toast = useRef(null);
  console.log(relationShipData, "relationShipData");

  useEffect(() => {
    if (nodes) {
      let uniqNameArray = [];
      for (let node of nodes) {
        if (!uniqNameArray.includes(node.data.label)) {
          uniqNameArray.push(node.data.label);
        }
      }
      console.log(uniqNameArray, "uniqNameArray");
      setUniqueNames(uniqNameArray);
    }
  }, [nodes]);

  const NODE_TYPES = useMemo(
    () => ({
      customTable: CustomTableNode,
      resizeRotate: ResizeRotateNode,
    }),
    []
  );
  useEffect(() => {
    setEdges(getDataFromParent.edges);
    setNodes(getDataFromParent.nodes);

    const result = RelationshipFlow(
      getDataFromParent.edges,
      getDataFromParent.nodes
    );
    setRelationShipData(result);
  }, [getDataFromParent]);

  useEffect(() => {
    if (nodes.length) {
      const result = RelationshipFlow(edges, nodes);
      setRelationShipData(result);
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (postDataToParent) {
      postDataToParent({
        nodes: nodes,
        edges: edges,
        relationship: relationShipData,
      });
    }
  }, [relationShipData]);

  //Edge Update Function
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  useEffect(() => {}, [edges]);

  //CustomEdges
  const edgeTypes = {
    "start-end": CustomEdgeStartEnd,
  };

  //Edges Connect to Nodes Function
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,

        type: "start-end",
        data: {
          startLabel: "One",
          endLabel: "One",
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  console.log(relationShipData, "relationShipData");
  //Toaster for success
  const showsuccess = (msg) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `${msg}`,
      life: 1000,
    });
  };
  //Toaster for error
  const showerror = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };

  //This function calls when a node is dragged to the WorkSpace
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //This function calls when a node is dropped to the WorkSpace
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // create flow using DAGRE graph for Edges
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));

      //calculateLayout for both nodes and edges
      const getLayoutedElements = (nodes, edges, direction = "TB") => {
        const isHorizontal = direction === "LR";
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
          dagreGraph.setNode(node.id, {
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
          });
        });

        edges.forEach((edge) => {
          dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node) => {
          const nodeWithPosition = dagreGraph.node(node.id);
          node.targetPosition = isHorizontal ? "left" : "top";
          node.sourcePosition = isHorizontal ? "right" : "bottom";

          // We are shifting the dagre node position (anchor=center center) to the top left
          // so it matches the React Flow node anchor point (top left).
          node.position = {
            x: nodeWithPosition.x - NODE_WIDTH / 2,
            y: nodeWithPosition.y - NODE_HEIGHT / 2,
          };

          return node;
        });

        return { node: nodes, edge: edges };
      };
      const newNode = {
        getLayoutedElements,
        id: uuidv4(),
        type,
        position,
        data: {
          label: "",
          attributes: [],
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  //ContextMenu for right click function for a node or edge
  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = reactflowwrapper.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - 80,
        left: event.clientX < pane.width - 200 && event.clientX - 80,
        right:
          event.clientX >= pane.width - 200 && pane.width - event.clientX + 80,
        bottom:
          event.clientY >= pane.height - 200 &&
          pane.height - event.clientY - 80,
      });
    },
    [setMenu]
  );

  //Memoized callback function to handle pane click events
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  //Function for Relationship Flow
  const RelationshipFlow = useCallback(
    (edges, nodes) => {
      const processFlow = () => {
        const resultObj = {};

        edges.forEach((edge) => {
          const { source, target, sourceHandle, targetHandle } = edge;
          const sourceNode = nodes.find((node) => node.id === source);
          const targetNode = nodes.find((node) => node.id === target);

          if (!resultObj[source]) {
            resultObj[source] = {
              Entity: sourceNode.data.label,
              attributes: sourceNode.data.attributes,
              relationships: [],
            };
          }
          let attributeSource = sourceHandle.split("-")[0];
          let attributeTarget = targetHandle.split("-")[0];
          const relationship = {
            Entities:
              sourceNode && targetNode
                ? `${sourceNode.data.label},${targetNode.data.label}`
                : "N/A",
            Relationship: edge.data.startLabel + "," + edge.data.endLabel,
            Coloumn:
              !isNaN(attributeSource) && !isNaN(attributeTarget)
                ? `${sourceNode.data.attributes[attributeSource].cname},${targetNode.data.attributes[attributeTarget].cname}`
                : "N/A",
          };

          resultObj[source].relationships.push(relationship);
        });

        const updatedArray = Object.values(resultObj);

        return updatedArray;
      };

      const processFlowResult = processFlow();
      const copyOfprocessFlowResult = structuredClone(processFlowResult);
      let entityJsonNames = [];
      processFlowResult.map((entity) => {
        if (!entityJsonNames.includes(entity.Entity)) {
          entityJsonNames.push(entity.Entity);
        }
      });

      nodes.map((node) => {
        if (!entityJsonNames.includes(node.data.label)) {
          copyOfprocessFlowResult.push({
            Entity: node.data.label,
            attributes: node.data.attributes,
            relationships: [],
          });
        }
      });

      return { Relationship: copyOfprocessFlowResult };
    },
    [entityJson, nodes, edges]
  );

  //Save function for Workflow
  // const onSave = async () => {
  //   console.log(nodes, edges);
  //   try {
  //     const nodesToSave = nodes.map((node) => ({
  //       id: node.id,
  //       type: node.type,
  //       position: { x: node.position.x, y: node.position.y },
  //       data: node.data,
  //       entity: data.entity,
  //       property: node.property,
  //       width: node.width,
  //       height: node.height,
  //       selected: node.selected,
  //       positionAbsolute: node.positionAbsolute,
  //       dragging: node.dragging,
  //     }));

  //     const edgesToSave = edges.map((edge) => ({
  //       source: edge.source,
  //       sourceHandle: edge.sourceHandle,
  //       target: edge.target,
  //       targetHandle: edge.targetHandle,
  //       type: edge.type,
  //       data: edge.data,
  //       id: edge.id,
  //     }));

  //     const workflowData = {
  //       nodes: nodesToSave,
  //       edges: edgesToSave,
  //     };

  //     const jsonString = JSON.stringify(workflowData, null, 2);

  //     const response = await fetch(WORKFLOW_API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: jsonString,
  //     });

  //     if (response.ok) {
  //       showsuccess("Processflow saved successfully");
  //     } else {
  //       showerror("Failed to save Processflow");
  //     }

  //     const relation = RelationshipFlow(edgesToSave, nodesToSave);

  //     const jsonStrings = JSON.stringify(relation, null, 2);

  //     const responses = await fetch(RELATIONSHIP_API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: jsonStrings,
  //     });

  //     if (responses.ok) {
  //       showsuccess("Relationship saved Successfully");
  //     } else {
  //       showerror("Failed to save Relationship");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  const updateErJson = (data, id) => {
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              attributes: data,
            },
          };
        }
        return node;
      });
    });
  };

  //Restore function for Workflow
  // const onRestore = async () => {
  //   try {
  //     const response = await fetch(WORKFLOW_API_URL, {
  //       method: "GET",
  //     }).then((res) => res.json());
  //     setEdges(response[0].edges);
  //     setNodes(response[0].nodes);
  //     console.log(nodes, edges);
  //     showsuccess("Restored Processflow Successfully");
  //   } catch (error) {
  //     console.error("Error restoring processflow:", error.message);
  //     showerror("Failed to restore Processflow");
  //   }
  // };

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
    <uniQueNameContext.Provider value={{ uniqueNames, entityJson }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toast ref={toast} />

        {/* Navbar */}

        {/* ReactFlow Component */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Sidebar />
          <ReactFlowProvider>
            <ReactFlow
              ref={reactflowwrapper}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDragOver={onDragOver}
              nodeTypes={NODE_TYPES}
              onPaneClick={onPaneClick}
              onNodeContextMenu={onNodeContextMenu}
              onInit={setreactflowinstance}
              reactflowwrapper={reactflowwrapper}
              onDrop={onDrop}
              edgeTypes={edgeTypes}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
              fitViewOptions={{
                padding: 0.2,
              }}
            >
              <Controls />

              <Background variant="lines" gap={25} size={1} />

              {menu && (
                <ContextMenu
                  nodeConfig={entityJson}
                  updatedNodeConfig={updateErJson}
                  setMenu={setMenu}
                  isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
                  onClick={onPaneClick}
                  controlPolicyApi={controlPolicyApi}
                  {...menu}
                />
              )}
            </ReactFlow>
          </ReactFlowProvider>
        </div>
        <Dialog
        visible={isUserDetailsDialog}
        style={{ width: "40vw" }}
        onHide={() => {
          setIsUserDetailsDialog(!isUserDetailsDialog);
        }}
        header="Application Details"
        headerStyle={{ textAlign: "center" }}
        closable={false}
      >
        <DF_AppDetail
          setIsUserDetailsDialog={setIsUserDetailsDialog}
        />
      </Dialog>
      </div>
    </uniQueNameContext.Provider>
  );
}
