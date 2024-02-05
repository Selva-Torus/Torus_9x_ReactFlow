/* eslint-disable */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ReactFlowDia from "./container/reactflowDia";
import Menu from "./container/menu";
import dagre from "dagre";
import FloatingEdge from "./container/customEdge/FloatEdge";
import FloatingConnectionLine from "./container/customConnectionLine/FloatingConnectionLine";
// import StartNode from "./container/customnode/StartNode";
// import EndNode from "./container/customnode/EndNode";
// import DecisionNode from "./container/customnode/DecisionNode";
// import DefaultNode from "./container/customnode/DefaultNode";
// import ApiNode from "./container/customnode/ApiNode";

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
//   import { MOCK_J, NODES_COLOR } from "./utills/contents";
// import Douck from "./container/douck";
import { v4 as uuidv4, validate } from "uuid";
import {
  deleteApplication,
  getApplicationName,
  getColorPolicy,
  getRoleDetails,
  getTenantDetails,
  initailApiCall,
  initialCall,
  saveWorkFlow,
  syncFileSystem,
} from "../../utilsfunctions/apiCallUnit";
//   import Reactflow from "./layout/reactFlow";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import _, { add, conforms, get, map } from "lodash";
import CustomEdge from "./container/customEdge/CustomEdge";
//   import { DarkmodeContext } from "./context/DarkmodeContext";
//   import ModuleDetails from "./layout/ProcessFlowModuleDetails";
import "./app.css";
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
const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;
const Dashboard = ({ ten, admin, roleObbj, getJS, setJS }) => {
  const [saveOptions, setSaveOptions] = useState({});
  const [toside, setToside] = useState(false);
  const [applicationGroup, setApplicationGroup] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [jsonData, setJsonData] = useState({});
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [newEdge, setNewEdge] = useState(null);
  const [roleColor, setRoleColor] = useState(null);
  const [toggleSide, setToggleSide] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const dagreGraph = new dagre.graphlib.Graph();
  const [menu, setMenu] = useState(null);
  const [savedJs, setsavedJs] = useState([]);
  const [nodeConfig, setNodeConfig] = useState({});
  const [visible, setVisible] = useState(false);
  const [applicationName, setApplicationName] = useState([]);
  const [selectedApplication, setSelectApplication] = useState(null);
  // const [selectedAppGroup, setSelectedAppGroup] = useState(applicationG);
  const [processFlow, setProcessFlow] = useState(null);
  const [selectedProcessFlow, setSelectedProcessFlow] = useState(null);
  const [selectApp, setSelectApp] = useState([]);
  const [newApplicationName, setNewApplicationName] = useState(null);
  const [selectedApplicationDropDown, setSelectedApplicationDropDown] =
    useState("");
  const [isNewApplication, setIsNewApplication] = useState(false);
  const [newApplicationError, setNewApplicationError] = useState({
    applicationError: false,
    processFlowError: false,
  });
  // const [selectedApp, setSelectedApp] = useState(applicationV);
  const [processFlowName, setProcessFlowName] = useState("");
  const [roleDetailsObj, setRoleDetailsObj] = useState(roleObbj);

  // const [newApplicationName]
  const toast = useRef(null);
  const [isAdmin, setIsAdmin] = useState(admin);

  const [versions, setVersions] = useState([]);
  const [selectedAppVersion, setSelectedAppVersion] = useState(null);

  const [userRoleDetails, setUserRoleDetails] = useState(roleObbj);
  const [selectedRole, setSelectedRole] = useState(null);

  // const [isUserDetailsDialog, setIsUserDetailsDialog] = useState(true);
  // const [roleId, setRoleId] = useState(null);
  // const [tenant, setTenant] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(ten);

  useEffect(() => {
    console.log("getJS--->", getJS);
    setNodes(getJS?.node);
    setEdges(getJS?.edge);
    if (getJS?.configuration) setNodeConfig(getJS?.configuration);
  }, [getJS]);

  useEffect(() => {
    setJS({ node: nodes, edge: edges, configuration: nodeConfig });
  }, [nodes, edges, nodeConfig]);

  // useEffect(() => {
  //   (async () => {
  //     if (ten) await applicationDetailsApi();
  //   })();
  // }, [ten]);

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

  const Toside = () => {
    setToside(!toside);
  };

  const setSidebar = (node) => {
    setToggleSide(!toggleSide);
    setNodeData(node);

    // if (node && node.data && node.data.role) {
    setSelectedRole({
      role: node.data.role,
      color: roleDetailsObj[node.data.role],
    });
    // }
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
  console.log("nodes", edges);
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
      updateJson(oldEdge, newConnection);
      return setEdges((els) => {
        return updateEdge(oldEdge, newConnection, els);
      });
    },
    [nodes]
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
          label: `${name}`,

          nodeColor: rolesColor,
          role: roles,
        },
        property: {
          name: `${name}`,
          description: "",
          nodeType: nodeDetails,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes]
  );

  // create flow using DAGRE graph
  // const getLayoutedElements = (nodes, edges, direction = "TB") => {
  //   const isHorizontal = direction === "LR";
  //   dagreGraph.setGraph({ rankdir: direction });

  //   nodes.forEach((node) => {
  //     dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  //   });

  //   edges.forEach((edge) => {
  //     dagreGraph.setEdge(edge.source, edge.target);
  //   });

  //   dagre.layout(dagreGraph);

  //   nodes.forEach((node) => {
  //     const nodeWithPosition = dagreGraph.node(node.id);
  //     node.targetPosition = isHorizontal ? "left" : "top";
  //     node.sourcePosition = isHorizontal ? "right" : "bottom";

  //     // We are shifting the dagre node position (anchor=center center) to the top left
  //     // so it matches the React Flow node anchor point (top left).
  //     node.position = {
  //       x: nodeWithPosition.x - NODE_WIDTH / 2,
  //       y: nodeWithPosition.y - NODE_HEIGHT / 2,
  //     };

  //     return node;
  //   });

  //   return { node: nodes, edge: edges };
  // };

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

  // const applicationNameApi = async () => {
  //   try {
  //     const response = await getApplicationName(selectedTenant);
  //     setApplicationName(response);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const initalApi = async (processFlow, version, application, tenant) => {
  //   try {
  //     const res = await initialCall(application, version, processFlow, tenant);
  //     return res;
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // Use to save and update the processFlow
  // const saveProcessFlow = async (type, appName = "", processFlow = "") => {
  //   try {
  //     if (nodes.length && edges.length) {
  //       let checkNode = nodes.findIndex((ele) => ele.type == "startNode");
  //       let checkendnode = nodes.findIndex((ele) => ele.type == "endNode");
  //       console.log(checkNode, checkendnode, "ckn");
  //       if (checkNode !== -1 && checkendnode !== -1) {
  //         const configuration = {};
  //         for (let node of nodes) {
  //           if (node && node.property && node.id) {
  //             if (nodeConfig.hasOwnProperty(`${node.id}.config`))
  //               configuration[`${node.id}.${node.property.name}.config`] =
  //                 nodeConfig[`${node.id}.config`];

  //             if (nodeConfig.hasOwnProperty(`${node.id}.workflow`))
  //               configuration[`${node.id}.${node.property.name}.WF`] =
  //                 nodeConfig[`${node.id}.workflow`];
  //           }
  //         }
  //         const payload = {
  //           workFlow: { node: nodes, edge: edges },
  //           applicationName: appName
  //             ? appName
  //             : selectedApplication.application,
  //           configuration: { ...configuration },
  //           processFlow: processFlow
  //             ? processFlow
  //             : selectedProcessFlow.processFlow,
  //         };
  //         const response = await saveWorkFlow(
  //           payload,
  //           type,
  //           selectedAppVersion,
  //           selectedTenant
  //         );
  //         if (response.code === 200) {
  //           const appVersions = response.versions.sort((a, b) => {
  //             const version1 = Number(a.split("v")[1]);
  //             const version2 = Number(b.split("v")[1]);
  //             return version1 > version2 ? -1 : 1;
  //           });
  //           setVersions(appVersions);
  //           setSelectedAppVersion(appVersions[0]);
  //         }
  //         showSuccess(response.msg);

  //         return response;
  //       } else {
  //         showError(
  //           checkNode == -1 && checkendnode == -1
  //             ? "Add Start Node and End Node"
  //             : checkNode == -1
  //             ? "Add Start Node"
  //             : checkendnode == -1 && "Add End Node"
  //         );
  //       }
  //     } else {
  //       showError("Create Workflow");
  //     }
  //   } catch (error) {
  //     showError(error.message);
  //     console.error(error.message);
  //   }
  // };

  const updatedNodeConfig = (config) => {
    console.log(config, "config");
    setNodeConfig({ ...nodeConfig, ...config });
  };

  // const deleteApplicationApi = async (appName) => {
  //   try {
  //     const response = await deleteApplication(appName, selectedTenant);
  //     if (response.code === 200) {
  //       const applicationNames = applicationName.filter(
  //         (names) => names.application !== appName
  //       );
  //       setApplicationName(applicationNames);
  //       setSelectedAppVersion(null);
  //       setVersions([]);
  //     } else {
  //       alert(response.msg);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // Use to create application, processflow and version
  // const createApplication = async () => {
  //   if (nodes && edges) {
  //     const applicationName = newApplicationName
  //       ? newApplicationName
  //       : selectedApplicationDropDown
  //       ? selectedApplicationDropDown.application
  //       : "";
  //     const response = await saveProcessFlow(
  //       "create",
  //       applicationName,
  //       processFlowName
  //     );
  //     if (response && typeof response === "object" && response.msg) {
  //       showSuccess("Application Created");
  //       setVisible(false);
  //       await applicationNameApi();
  //     }
  //   }
  // };

  // const getRoleDetailsApi = async () => {
  //   try {
  //     const response = await getRoleDetails(roleId);
  //     if (response.statusCode === 200) {
  //       if (response.roleType === "READ_ONLY")
  //         setIsAdmin({ canAdd: false, canDelete: false, canEdit: false });
  //       else if (response.roleType === "ADMIN")
  //         setIsAdmin({ canAdd: true, canDelete: true, canEdit: true });
  //       else setIsAdmin({ canAdd: false, canDelete: false, canEdit: true });
  //       showSuccess(`Now you are on ${response.roleType} mode`);
  //       setIsUserDetailsDialog(false);
  //       await applicationDetailsApi();
  //     } else {
  //       showError(`Invalid role code`);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const getProcessFlowApi = async (event) => {
  //   try {
  //     setSelectedProcessFlow(event.value);
  //     const appVersions = event.value.version.sort((a, b) => {
  //       const version1 = Number(a.split("v")[1]);
  //       const version2 = Number(b.split("v")[1]);
  //       return version1 > version2 ? -1 : 1;
  //     });
  //     setVersions(appVersions);
  //     if (appVersions.length) {
  //       setSelectedAppVersion(appVersions[0]);
  //       const response = await initalApi(
  //         event.value.processFlow,
  //         appVersions[0],
  //         selectedApplication.application,
  //         selectedTenant
  //       );

  //       if (response && typeof response === "object" && response.workflow) {
  //         if (response.hasOwnProperty("configuration")) {
  //           setNodeConfig({ ...response.configuration });
  //         }
  //         const result = response.workflow;

  //         const nodes = result.node;
  //         const edges = result.edge;
  //         setEdges(edges);
  //         setNodes(nodes);
  //         setVisible(false);
  //       } else {
  //         alert("No Record Found");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const getApplication = (event) => {
  //   if (event.value && event.value.processFlow) {
  //     setProcessFlow(event.value.processFlow);
  //     setSelectApplication(event.value);
  //   }
  // };

  // const updateVersion = async (version) => {
  //   const response = await initalApi(
  //     selectedProcessFlow.processFlow,
  //     version,
  //     selectedApplication.application,
  //     selectedTenant
  //   );
  //   if (response && typeof response === "object" && response.workflow) {
  //     if (response.hasOwnProperty("configuration")) {
  //       setNodeConfig({ ...response.configuration });
  //     }
  //     const result = response.workflow;

  //     const nodes = result.node;
  //     const edges = result.edge;

  //     setEdges(edges);
  //     setNodes(nodes);
  //     setVisible(false);
  //   } else {
  //     alert("No Record Found");
  //   }
  // };

  // const applicationDetailsApi = async () => {
  //   try {
  //     const response = await initailApiCall(selectedTenant);
  //     if (response.length) {
  //       console.log("application Details -->", response);
  //       if (response[0]) setApplicationName(response[0]);
  //       const roles = response[1].role;
  //       const roleDetails = {};
  //       for (let obj of roles) {
  //         roleDetails[obj.role] = obj.color;
  //       }
  //       setUserRoleDetails(roles);

  //       // convert the roles array into object
  //       if (Object.keys(roleDetails).length) setRoleDetailsObj(roleDetails);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const applicationDropDown = (event) => {
  //   if (event.value.application === "Create New Module") {
  //     setIsNewApplication(true);
  //   } else {
  //     setIsNewApplication(false);
  //     setNewApplicationName("");
  //   }
  //   validateProccesFlow(processFlowName, event.value);
  //   setSelectedApplicationDropDown(event.value);
  // };

  // const handleInput = (event) => {
  //   const { value, name } = event.target;
  //   switch (name) {
  //     case "application":
  //       let isApplicationError = false;
  //       for (let obj of applicationName) {
  //         if (obj.application === value) {
  //           isApplicationError = true;
  //         }
  //       }
  //       if (isApplicationError) {
  //         setNewApplicationError({
  //           ...newApplicationError,
  //           applicationError: true,
  //         });
  //         showError("Application already exist");
  //       } else {
  //         setNewApplicationError({
  //           ...newApplicationError,
  //           applicationError: false,
  //         });
  //       }

  //       setNewApplicationName(value);
  //       break;
  //     case "processFlow":
  //       if (newApplicationName || selectedApplicationDropDown) {
  //         validateProccesFlow(value, selectedApplicationDropDown);
  //         setProcessFlowName(value);
  //       } else {
  //         showError("Please select application Name");
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // // };
  // const validateProccesFlow = (value, selectedApplicationDropDown) => {
  //   if (selectedApplicationDropDown) {
  //     let isError = false;
  //     for (let obj of applicationName) {
  //       if (obj.application === selectedApplicationDropDown.application) {
  //         for (let pfObj of obj.processFlow) {
  //           if (pfObj.processFlow === value) {
  //             isError = true;
  //           }
  //         }
  //       }
  //     }
  //     if (isError) {
  //       setNewApplicationError({
  //         ...newApplicationError,
  //         processFlowError: true,
  //       });
  //       showError("Process flow name already exists");
  //     } else {
  //       setNewApplicationError({
  //         ...newApplicationError,
  //         processFlowError: false,
  //       });
  //     }
  //   }
  // };

  // const syncFileSys = async () => {
  //   try {
  //     const response = await syncFileSystem("DF");
  //     if (Object.keys(response).length) {
  //       showSuccess("File system sync completed");
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     const res = await getTenantDetails();
  //     console.log("tenant details -->", res.saveOptions);

  //     setTenant(res.saveOptions);
  //   })();
  // }, []);

  // const onTenantchange = (e) => {
  //   console.log(e, e.value, "Tenantdata");
  //   setSelectedTenant(e.value);
  //   const appGroup = [];

  //   tenant.map((element, i) => {
  //     if (element.tenant === e.value) {
  //       element.groups.map((elements, i) => {
  //         if (!appGroup.includes(elements.groupName)) appGroup.push(elements);
  //       });
  //     }
  //   });

  //   if (appGroup.length) {
  //     setApplicationGroup(appGroup);
  //   }
  // };

  // const onApplictionGroupchange = (e) => {
  //   setSelectedAppGroup(e.value);
  //   const appGrou = [];
  //   applicationGroup.map((element, i) => {
  //     if (element.groupName === e.value) {
  //       element.applications.map((elements, i) => {
  //         if (!appGrou.includes(elements.applicationName))
  //           appGrou.push(elements.applicationName);
  //       });
  //     }
  //   });

  //   if (appGrou.length) {
  //     setSelectApp(appGrou);
  //   }
  // };
  console.log("processFlow", selectApp);

  const controlPolicyApi = async (type) => {
    const res = await getColorPolicy(type);

    return {
      workflowControlpolicy: { ...res.workflowControlpolicy },
      configControlpolicy: { ...res.configControlpolicy },
      configColor: { ...res.configColorpolicy },
      workflowColor: { ...res.workflowColorpolicy },
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
      {/* <Reactflow
          setToside={Toside}
          toside={toside}
          setsavejs={saveProcessFlow}
          applicationName={applicationName}
          processFlow={processFlow}
          selectedApplication={selectedApplication}
          setApplication={getApplication}
          setProcessFlow={getProcessFlowApi}
          setVisible={setVisible}
          deleteApplicationApi={deleteApplicationApi}
          versions={versions}
          setSelectedAppVersion={setSelectedAppVersion}
          selectedAppVersion={selectedAppVersion}
          isAdmin={isAdmin}
          updateVersion={updateVersion}
          selectedProcessFlow={selectedProcessFlow}
          syncFileSys={syncFileSys}
          role={roleDetailsObj && roleDetailsObj}
          nodes={nodes}
          showError={showError}
        >
      </Reactflow> */}
      <Toast ref={toast} />
      {/* <ModuleDetails
          applicationName={applicationName}
          // darkmode={darkmode}
          // toggleDarkmode ={toggleDarkmode}
          setsavejs={saveProcessFlow}
          processFlow={processFlow}
          selectedApplication={selectedApplication}
          setApplication={getApplication}
          setProcessFlow={getProcessFlowApi}
          setVisible={setVisible}
          deleteApplicationApi={deleteApplicationApi}
          versions={versions}
          setSelectedAppVersion={setSelectedAppVersion}
          selectedAppVersion={selectedAppVersion}
          isAdmin={isAdmin}
          updateVersion={updateVersion}
          selectedProcessFlow={selectedProcessFlow}
          syncFileSys={syncFileSys}
          role={roleDetailsObj && roleDetailsObj}
          nodes={nodes}
          showError={showError}
        /> */}
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
        // setsavejs={saveProcessFlow}
        isAdmin={isAdmin}
        nodeConfig={nodeConfig}
        userRoleDetails={userRoleDetails}
        selectedRole={selectedRole}
        showSuccess={showSuccess}
        showError={showError}
        selectedTenant={selectedTenant}
        // selectedAppGroup={selectedAppGroup}
        // selectedApp={selectedApp}
        controlPolicyApi={controlPolicyApi}
      />
      {/* <Dialog
          visible={visible}
          style={{ width: "45vw", height: "80vh" }}
          onHide={() => {
            setVisible(!visible);
          }}
          header="Add Module"
          headerStyle={{ textAlign: "center" }}
        >
          <div className="h-full">
            <div
              className="flex flex-column justify-content-around"
              style={{ height: "70%" }}
            >
              <div>
                <div
                  className="flex justify-content-between align-items-center"
                  style={{ height: "80px" }}
                >
                  <label
                    htmlFor="moduleName"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      marginLeft: "24px",
                    }}
                  >
                    Applications
                  </label>
                  <div
                    className="flex justify-content-center"
                    style={{ width: "60%" }}
                  >
                    <Dropdown
                      value={selectedApplicationDropDown}
                      onChange={applicationDropDown}
                      options={[
                        { application: "Create New Module" },
                        ...applicationName,
                      ]}
                      optionLabel="application"
                      placeholder="Application"
                      className=" flex align-items-center"
                      style={{ height: "35px", width: "100%" }}
                    />
                  </div>
                </div>
                <>
                  {isNewApplication ? (
                    <div
                      className="flex justify-content-between align-items-center"
                      style={{
                        visibility: isNewApplication ? "visible" : "hidden",
                        height: "80px",
                      }}
                    >
                      <label
                        htmlFor="applicationName"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginLeft: "24px",
                        }}
                      >
                        Application Name
                      </label>
                      <div
                        className="flex justify-content-center"
                        style={{ width: "60%" }}
                      >
                        <InputText
                          name="application"
                          value={newApplicationName}
                          onChange={(event) => handleInput(event)}
                          style={{
                            height: "50px",
                            width: "calc( 100%  )",
                            marginLeft: "0px",
                          }}
                          className={`${
                            newApplicationError.applicationError
                              ? "p-invalid"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              </div>
              <div
                className="flex justify-content-between align-items-center"
                style={{ height: "80px" }}
              >
                <label
                  htmlFor="processFlow"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    marginLeft: "24px",
                  }}
                >
                  Process Flow Diagram
                </label>
                <div
                  className="flex justify-content-center"
                  style={{ width: "60%" }}
                >
                  <InputText
                    name="processFlow"
                    value={processFlowName}
                    onChange={(event) => handleInput(event)}
                    style={{
                      height: "50px",
                      width: "calc( 100%  )",
                      marginLeft: "0px",
                    }}
                    className={`${
                      newApplicationError.processFlowError ? "p-invalid" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex justify-content-center align-items-center"
              style={{ height: "30%" }}
            >
              <Button
                label="Add"
                severity="info"
                style={{ height: "50px" }}
                onClick={createApplication}
                disabled={
                  newApplicationError.applicationError ||
                  newApplicationError.processFlowError ||
                  (!newApplicationName && isNewApplication) ||
                  !selectedApplicationDropDown ||
                  !processFlowName
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </Dialog> */}
      {/* <Dialog
          visible={isUserDetailsDialog}
          style={{ width: "40vw" }}
          onHide={() => {
            setIsUserDetailsDialog(!isUserDetailsDialog);
          }}
          header="Login"
          headerStyle={{ textAlign: "center" }}
          closable={false}
        >
          <div className="h-full">
            <div
              className="flex flex-column justify-content-around gap-3"
              style={{ height: "60%" }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Dropdown
                  value={selectedTenant}
                  onChange={onTenantchange}
                  options={tenant}
                  optionLabel="tenant"
                  optionValue="tenant"
                  placeholder="Select Tenant"
                  className=" flex align-items-center py-2"
                  style={{ width: "92%", fontSize: 200 }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Dropdown
                  value={selectedAppGroup}
                  onChange={onApplictionGroupchange}
                  options={applicationGroup}
                  optionLabel="groupName"
                  optionValue="groupName"
                  placeholder="Select Appliction Group"
                  className=" flex align-items-center py-2 "
                  style={{ width: "92%" }}
                  disabled={selectedTenant ? false : true}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Dropdown
                  value={selectedApp}
                  onChange={(e) => setSelectedApp(e.value)}
                  options={selectApp}
                  placeholder="Select Appliction "
                  className=" flex align-items-center py-2"
                  style={{ width: "92%" }}
                  disabled={selectedTenant && selectedAppGroup ? false : true}
                />
              </div>
            </div>
            <div className="flex justify-content-center py-3">
              <InputText
                name="roleId"
                onChange={(event) => setRoleId(event.target.value)}
                placeholder="Enter your Role"
                style={{
                  height: "50px",
                  width: "calc( 100% - 40px )",
                  marginLeft: "0px",
                }}
                disabled={
                  selectedTenant && selectedAppGroup && selectedApp ? false : true
                }
              />
            </div>
            <div
              className="flex justify-content-center align-items-center mt-3"
              style={{ height: "40%" }}
            >
              <Button
                label="Submit"
                severity="info"
                style={{ height: "50px" }}
                onClick={getRoleDetailsApi}
                disabled={
                  roleId && selectedTenant && selectedAppGroup ? false : true
                }
              />
            </div>
          </div>
        </Dialog> */}
    </div>
  );
};

export default Dashboard;
