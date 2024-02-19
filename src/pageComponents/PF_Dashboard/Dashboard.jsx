/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ReactFlowDia from "./container/reactflowDia";
import dagre from "dagre";
import FloatingEdge from "./container/customEdge/FloatEdge";
import 'primeflex/primeflex.css';
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
} from "./container/customnode/CustomNode";
import { v4 as uuidv4 } from "uuid";
import {
  saveaWorkFlow,
  versionController,
  versionServer,
} from "../../utilsfunctions/apiCallUnit";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import CustomEdge from "./container/customEdge/CustomEdge";
import {
  workflow_controlpolicy,
  config_controlpolicy,
  workflow_colorpolicy,
  config_colorpolicy,
} from "../../utilsfunctions/environment";
import "./app.css";
import PF_AppDetail from "./layout/PF_AppDetail";
import ModuleDetails from "./layout/ProcessFlowModuleDetails";
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

const edgeTypes = {
  customedge: CustomEdge,
  floatEdge: FloatingEdge,
};
const Dashboard = ({ ten, admin, roleObbj, getJS, setJS }) => {
  const [uniqueNames, setUniqueNames] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [newEdge, setNewEdge] = useState(null);
  const [roleColor, setRoleColor] = useState(null);
  const [toggleSide, setToggleSide] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const dagreGraph = new dagre.graphlib.Graph();
  const [menu, setMenu] = useState(null);
  const [nodeConfig, setNodeConfig] = useState({});
  const [visible, setVisible] = useState(false);
  const [applicationName, setApplicationName] = useState([]);
  const [selectedApplication, setSelectApplication] = useState(null);
  const [processFlow, setProcessFlow] = useState(null);
  const [selectedProcessFlow, setSelectedProcessFlow] = useState(null);
  const [roleDetailsObj, setRoleDetailsObj] = useState(roleObbj);
  const toast = useRef(null);
  const [isAdmin, setIsAdmin] = useState(admin);
  const edgeUpdateSuccessful = useRef(true);
  const [versions, setVersions] = useState([]);
  const [selectedAppVersion, setSelectedAppVersion] = useState(null);
  const [userRoleDetails, setUserRoleDetails] = useState(roleObbj);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isUserDetailsDialog, setIsUserDetailsDialog] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState("Datafabrics");
  const [applicationDetails, setApplicationDetails] = useState({});

  // useEffect(() => {
  //   setNodes(getJS?.node);
  //   setEdges(getJS?.edge);
  //   if (getJS?.configuration) setNodeConfig(getJS?.configuration);
  // }, [getJS]);

  // useEffect(() => {
  //   setJS({ node: nodes, edge: edges, configuration: nodeConfig });
  // }, [nodes, edges, nodeConfig]);

  const fetchVersion = async () => {
    const response = await versionController(
      "Datafabrics",
      applicationDetails?.application,
      applicationDetails?.artifacts
    );
    setVersions(response);
  };
  useEffect(() => {
    fetchVersion();
  }, [isUserDetailsDialog]);

  const showSuccess = (msg) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `${msg}`,
      life: 1000,
    });
  };
  const showError = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const deleteNode = useCallback(
    (id) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) =>
        edges.filter((edge) => {
          if (edge.source !== id && edge.target !== id) {
            return edge;
          }
        })
      );

      setMenu(null);
    },
    [nodes]
  );

  const setSidebar = (node) => {
    setToggleSide(!toggleSide);
    setNodeData(node);

    setSelectedRole({
      role: node.data.role,
      color: roleDetailsObj[node.data.role],
    });
  };

  const sideT = () => {
    setToggleSide(!toggleSide);
  };

  const changeChildColor = (nodes, childID, Id) => {
    return nodes.map((node) => {
      if (childID.includes(node.id)) {
        return {
          ...node,
          data: {
            ...node.data,
            nodeColor: nodes.find((node) => node.id === Id)?.data.nodeColor,
            role: nodes.find((node) => node.id === Id)?.data.role,
          },
        };
      }
      return node;
    });
  };

  const changeNodeProperty = (values) => {
    const key = Object.keys(values);
    if (key == "name") {
      if (
        Object.keys(nodeConfig).includes(`${nodeData.property.name}.config`) ||
        Object.keys(nodeConfig).includes(`${nodeData.property.name}.WF`)
      ) {
        let nodeDatas = {};
        Object.keys(nodeConfig).map((keys) => {
          if (keys === `${nodeData.property.name}.config`) {
            nodeDatas = {
              ...nodeDatas,
              [`${values["name"]}.config`]: nodeConfig[keys],
            };
          }
 
          if (keys === `${nodeData.property.name}.WF`) {
            nodeDatas = {
              ...nodeDatas,
              [`${values["name"]}.WF`]: nodeConfig[keys],
            };
          }
          nodeDatas = {
            ...nodeDatas,
            [keys]: nodeConfig[keys],
          };
        });
        setNodeConfig(nodeDatas);
      }
    }
    const nds = nodes.map((nodes) => {
      if (nodes.id === nodeData.id) {
        if (key[0] === "role") {
          setSelectedRole(values.role);

          return {
            ...nodes,
            data: {
              ...nodes.data,
              nodeColor: values?.role.color,
              role: values?.role.role,
            },
            ...values?.role,
          };
        }
        return {
          ...nodes,
          data: {
            ...nodes.data,
            label: key == "name" ? values[key] : nodes?.data.label,
          },
          property: {
            ...nodes.property,
            [key]: values[key],
          },
        };
      }
      return nodes;
    });

    if (key[0] === "role") {
      const childID = getChildId(nodeData.id, edges);
      const node = changeChildColor(nds, childID, nodeData.id);
      setNodes(node);
    } else {
      setNodes(nds);
    }
  };

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = reactFlowWrapper.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - 80,
        left: event.clientX < pane.width - 200 && event.clientX - 80,
        right:
          event.clientX >= pane.width - 200 && pane.width - event.clientX + 80,
        bottom:
          event.clientY >= pane.height - 200 &&
          pane.height - event.clientY + 80,
      });
    },
    [setMenu]
  );
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onConnect = useCallback((params) => {
    if (nodes.length) {
      setNewEdge(params);
      setEdges((eds) => {
        if (eds.source !== params.target && eds.target !== params.source) {
          return addEdge(
            {
              ...params,

              type:
                nodes &&
                nodes.filter((node) => node.id === params.source)[0]?.type ==
                  "decisionNode"
                  ? "customedge"
                  : "smoothstep",
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            },
            eds
          );
        } else {
          showError("Source and Target cannot be same");
          return addEdge(eds);
        }
      });
    }
  }, [setEdges, nodes][(setEdges, nodes)]);

  // Function call when node drag over in react flow work space
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Function call when edges was changed.
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      updateJson(oldEdge, newConnection);
      return setEdges((els) => {
        return updateEdge(oldEdge, newConnection, els);
      });
    },
    [nodes]
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

  const updateNodeDetails = (nodes, oldEdge, newEdges, childID) => {
    return nodes.map((node) => {
      if (node.id === oldEdge.target) {
        return {
          ...node,
          parentId: [...node.parentId, newEdges.source],

          data: {
            ...node.data,
            nodeColor: nodes[newEdges.source]?.data.nodeColor,
            role: nodes[newEdges.source]?.data.role,
          },
        };
      }
      if (childID.includes(node.id)) {
        return {
          ...node,
          data: {
            ...node.data,
            nodeColor: nodes[newEdges.source]?.data.nodeColor,
            role: nodes[newEdges.source]?.data.role,
          },
        };
      }
      return node;
    });
  };

  //Funtion used to update JSON and nodes when there is a change occurs in edges
  const updateJson = (oldEdge, newEdges) => {
    if (nodes.length) {
      const childID = getChildId(newEdges.target, edges);

      const updatedNodes = updateNodeDetails(nodes, oldEdge, newEdges, childID);

      setNodes(updatedNodes);
    }
  };

  // Function call when node drop in react flow work space

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const name = event.dataTransfer.getData("application/name");
      const roles = event.dataTransfer.getData("application/roles");
      const rolesColor = event.dataTransfer.getData("application/roleColor");
      if (
        typeof type === "undefined" ||
        !type ||
        typeof roleColor === "undefined"
      ) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      // let id = nodes.length ? Number(nodes[nodes.length - 1].id) + 1 : 0;
      const nodeDetails = type;
      const newNode = {
        id: uuidv4(),
        type: nodeDetails,
        position,
        parentId: [],
        data: {
          label: nodeDetails=="startNode" || nodeDetails=="endNode"?name:"",

          nodeColor: rolesColor,
          role: roles,
        },
        property: {
          name: nodeDetails=="startNode" || nodeDetails=="endNode"?name:"",
          description: "",
          nodeType: nodeDetails,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes]
  );

  // find child node Id using edges and targetId
  function getChildId(target, edges, sr = []) {
    const sources = [];
    for (let index in edges) {
      if (edges[index].source == target && !sr.includes(edges[index].target)) {
        sr.push(edges[index].source);
        sources.push(edges[index].target);
        sources.push(...getChildId(edges[index].target, edges, sr));
      }
    }
    return sources;
  }

  useEffect(() => {
    if (newEdge) {
      if (newEdge.source == "0") {
        setNewEdge(null);
        updateNode("", newEdge.source);
      } else {
        const edgesSource = getChildId(newEdge.target, edges);
        let targetIndex;
        let sourceIndex;
        nodes.map((ele, index) => {
          if (ele.id === newEdge.target) targetIndex = index;
          if (ele.id === newEdge.source) sourceIndex = index;
        });
        edgesSource.unshift(newEdge.target);
        const role = nodes[Number(sourceIndex)].data.role;
        updateNode(role, edgesSource);
      }
    }
  }, [newEdge]);

  const updateNode = (role = "", childID = []) => {
    setNodes((node) => {
      let sourceIndex;
      node.map((ele, index) => {
        if (ele.id === newEdge.source) {
          sourceIndex = index;
        }
      });
      const nds = node.map((nodes, index) => {
        if (nodes.id === newEdge.target) {
          return {
            ...nodes,
            parentId: [...nodes.parentId, newEdge.source],

            data: {
              ...nodes.data,
              nodeColor: node[sourceIndex]?.data.nodeColor,
              role,
            },
          };
        }
        if (childID.includes(nodes.id)) {
          return {
            ...nodes,

            data: {
              ...nodes.data,

              nodeColor: node[sourceIndex]?.data.nodeColor,
              role,
            },
          };
        }
        return nodes;
      });
      return nds;
    });
  };

  // Use to save and update the processFlow
  const saveProcessFlow = async (
    type,
    appName = applicationDetails?.application ?? "App1",
    processFlow = applicationDetails?.artifacts ?? "Artifacts1"
  ) => {
    try {
      if (nodes.length && edges.length && uniqueNames.length == nodes.length) {
        let checkNode = nodes.findIndex((ele) => ele.type == "startNode");
        let checkendnode = nodes.findIndex((ele) => ele.type == "endNode");
        if (checkNode !== -1 && checkendnode !== -1) {
          const configuration = {};
          for (let node of nodes) {
            if (node && node.property && node.id) {
              if (
                nodeConfig.hasOwnProperty(`config.${node.id}`) ||
                nodeConfig.hasOwnProperty(`${node.property.name}.config`)
              )
                configuration[`${node.property.name}.config`] =
                  nodeConfig[`config.${node.id}`] ??
                  nodeConfig[`${node.property.name}.config`];

              if (
                nodeConfig.hasOwnProperty(`workflow.${node.id}`) ||
                nodeConfig.hasOwnProperty(`${node.property.name}.WF`)
              )
                configuration[`${node.property.name}.WF`] =
                  nodeConfig[`workflow.${node.id}`] ??
                  nodeConfig[`${node.property.name}.WF`];
            }
          }

          const payload = {
            workFlow: { node: nodes, edge: edges },
            applicationName: appName
              ? appName
              : selectedApplication.application,
            configuration: { ...configuration },
            processFlow: processFlow
              ? processFlow
              : selectedProcessFlow.processFlow,
          };
          const response = await saveaWorkFlow(
            payload,
            type,
            selectedAppVersion,
            selectedTenant
          );
          if (response.code === 200 || response.code === 201) {
            fetchVersion();
            showSuccess(response.msg);
          }

          return response;
        } else {
          showError(
            checkNode == -1 && checkendnode == -1
              ? "Add Start Node and End Node"
              : checkNode == -1
              ? "Add Start Node"
              : checkendnode == -1 && "Add End Node"
          );
        }
      } else {
        showError(
          "Please add nodes and edges also provide names for all nodes"
        );
      }
    } catch (error) {
      showError(error.message);
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (nodes.length > 0) {
      let uniqueName = [];
      for (let i = 0; i < nodes.length; i++) {
        if (
          !uniqueName.includes(nodes[i].property.name.toLowerCase()) &&
          nodes[i]?.property?.name !== ""
        )
          uniqueName.push(nodes[i].property.name.toLowerCase());
      }
      setUniqueNames(uniqueName);
    }
  }, [nodes]);
  const updatedNodeConfig = (config) => {
    setNodeConfig({ ...nodeConfig, ...config });
  };

  const updateVersion = async (version) => {
    const response = await versionServer(
      "Datafabrics",
      applicationDetails?.application,
      applicationDetails?.artifacts,
      version
    );
    if (
      response &&
      response.result?.edge &&
      response.result?.node &&
      response?.config
    ) {
      setNodeConfig(response?.config);
      setEdges(response?.result?.edge);
      setNodes(response?.result?.node);
    } else {
      showError("No Record Found");
    }
  };

  const controlPolicyApi = (type) => {
    const configControlpolicy = config_controlpolicy[type];
    const workflowControlpolicy = workflow_controlpolicy[type];
    const configColorpolicy = config_colorpolicy[type];
    const workflowColorpolicy = workflow_colorpolicy[type];
    configControlpolicy;
    return {
      workflowControlpolicy: { ...workflowControlpolicy },
      configControlpolicy: { ...configControlpolicy },
      configColorpolicy: { ...configColorpolicy },
      workflowColorpolicy: { ...workflowColorpolicy },
    };
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toast ref={toast} />
      <ModuleDetails
        applicationName={applicationName}
        setsavejs={saveProcessFlow}
        setVisible={setVisible}
        isAdmin={isAdmin}
        selectedApplication={selectedApplication}
        processFlow={processFlow}
        setProcessFlow={setProcessFlow}
        selectedProcessFlow={selectedProcessFlow}
        selectedAppVersion={selectedAppVersion}
        setSelectedAppVersion={setSelectedAppVersion}
        updateVersion={updateVersion}
        versions={versions}
        nodes={nodes}
        showError={showError}
        showSuccess={showSuccess}
      />
      <ReactFlowDia
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onDragOver={onDragOver}
        onDrop={onDrop}
        reactFlowWrapper={reactFlowWrapper}
        setReactFlowInstance={setReactFlowInstance}
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={NODE_TYPE}
        toogle={toggleSide}
        setToogle={setSidebar}
        sideBarData={nodeData}
        changeProperty={changeNodeProperty}
        sideT={sideT}
        menu={menu}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        widths={"100%"}
        deleteNode={deleteNode}
        setMenu={setMenu}
        updatedNodeConfig={updatedNodeConfig}
        setsavejs={saveProcessFlow}
        isAdmin={isAdmin}
        nodeConfig={nodeConfig}
        userRoleDetails={userRoleDetails}
        selectedRole={selectedRole}
        showSuccess={showSuccess}
        showError={showError}
        selectedTenant={selectedTenant}
        controlPolicyApi={controlPolicyApi}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        uniqueNames={uniqueNames}
        applicationDetails={applicationDetails}
      />
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
        <PF_AppDetail
          setIsUserDetailsDialog={setIsUserDetailsDialog}
          applicationDetails={applicationDetails}
          setApplicationDetails={setApplicationDetails}
        />
      </Dialog>
    </div>
  );
};

export default Dashboard;
