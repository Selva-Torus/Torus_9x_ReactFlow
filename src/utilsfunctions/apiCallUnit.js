"use server"
import redis from "@/lib/redis";

const {
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
} = require('./environment');

const BASE_URL = "http://localhost:3001";
export const initialCall = async (
  application,
  version,
  processFlow,
  tenant,
 
) => {
  try {
    return await fetch(
      `${BASE_URL}/?applicationName=${application}&version=${version}&processFlow=${processFlow}&tenant=${tenant}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
 
export const getApplicationName = async (tenant) => {
  try {
    return await fetch(
      `${BASE_URL}/applicationName?tenant=${tenant}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
 
export const deleteApplication = async (
  applicationName,
  tenant,
 
) => {
  try {
    return await fetch(
      `${BASE_URL}/deleteApplication?applicationName=${applicationName}&tenant=${tenant}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
 
export const initailApiCall = async (tenant) => {
  try {
    return Promise.all([
      fetch(`${BASE_URL}/applicationName?tenant=${tenant}`, {
        method: "GET",
      }).then((res) => res.json()),
      fetch(`${BASE_URL}/applicationDetails`, {
        method: "GET",
      }).then((res) => res.json()),
    ]).then((res) => res);
    // return await fetch(`${BASE_URL}/applicationName`, {
    //   method: "GET",
    // }).then((res) => res.json());
  } catch (error) {
    console.log(error, "ERROR");
    throw error;
  }
};
 
export const getRoleDetails = async (roleId) => {
  try {
    return await fetch(`${BASE_URL}/userRole?roleId=${roleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
 
export const getTenantDetails = async () => {
  try {
    return await fetch(`${BASE_URL}/tenantDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
 
export const syncFileSystem = async (tenant) => {
  try {
    return await fetch(`${BASE_URL}/sync?tenant=${tenant}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
 
// export const getControlPolicy = async (nodeType) => {
//   try {
//     return await fetch(`${BASE_URL}/controlpolicy?nodeType=${nodeType}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => res.json());
//   } catch (error) {
//     throw error;
//   }
// }
 
 
// export const getColorPolicy = async (nodeType) => {
//   try{
//     return await fetch(`${BASE_URL}/colorpolicy?nodeType=${nodeType}`,{
//       method:"GET",
//       headers:{
//         "Content-Type":"application/json",
//       },
//     }).then((res) => res.json());
 
//   }
//   catch(error){
//     throw error;
//   }
// }


export async function readReddis(tenant) {
  return await redis.call('JSON.GET', tenant);
}

export async function writeReddis(key, json) {
  await redis.call('JSON.SET', key, '$', JSON.stringify(json));
}

export async function createRedisFiles(obj, currentPath = '', interator) {
  let path = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newPath = `${currentPath}:${key}`;
      path.push(newPath);

      if (typeof obj[key] == 'object' && obj[key] !== null) {
        if (interator <= 4) {
          path = path.concat(
            await createRedisFiles(obj[key], newPath, interator + 1),
          );
        } else {
          let arr = newPath.split(':');
          arr.shift();
          const kes = arr.join(':');
          console.log(kes, 'key');
          await redis.call('JSON.SET', kes, '$', JSON.stringify(obj[key]));
        }
      }
    }
  }
}

export async function newCreatePrcessFlow(edges, node) {
  let nodes = JSON.parse(JSON.stringify(node));
  let edge = JSON.parse(JSON.stringify(edges));

  const initElement = (item, element) => {
    item.role = element.data.role;

    item.nodeType =
      element.property.nodeType == 'defaultNode'
        ? element.type
        : element.property.nodeType;

    item.nodeId = element.id;
    if (typeof element?.parentId === 'object') {
      item.parentId = [...element?.parentId];
    } else {
      item.parentId = element?.parentId;
    }

    item.nodeName = element.property.name;

    item.nodeDesc = element.property.description;

    return item;
  };

  const addingElements = (item, array) => {
    if (array.filter((x) => x.id === item.id).length === 0) {
      let element = nodes.find((node) => node.id == item.source);

      array.push(initElement(item, element));
    }
  };

  const processFlow = () => {
    const resultObj = {};

    let array = [];

    let removeFields = [
      'source',

      'label',

      'sourceHandle',

      'selected',

      'targetHandle',

      'target',

      'type',

      'markerEnd',

      'id',
    ];

    edge.map((edges) => {
      addingElements(edges, array);
    });

    array.forEach((obj) => {
      let routeArray = [];

      const { source, target } = obj;

      let initRouteObj = {};

      if (!resultObj[source]) {
        resultObj[source] = obj;
      }

      if (obj.label) {
        initRouteObj['conditionResult'] = obj.label;
      }

      initRouteObj['nodeName'] = nodes.find(
        (node) => node.id == target,
      ).data.label;

      initRouteObj['nodeId'] = target;

      routeArray.push(initRouteObj);

      if (resultObj[source]?.routeArray?.length > 0) {
        let check = resultObj[source].routeArray.findIndex(
          (index) => obj.nodeId == source,
        );

        if (check >= 0) {
          resultObj[source].routeArray.push(initRouteObj);
        }
      } else {
        resultObj[source].routeArray = routeArray;
      }

      Object.keys(resultObj[source]).map((key) => {
        let status = removeFields.includes(key);

        if (status) {
          delete resultObj[source][key];
        }
      });
    });

    const updatedArray = Object.values(resultObj);

    let endNodeElement = nodes.find((node) => node.type == 'endNode');

    let item = initElement({}, endNodeElement);

    updatedArray.push(item);

    return updatedArray;
  };

  let processFlowResult = processFlow();

  return processFlowResult;
}

export async function sortProcessFlow(processFlow) {
  const nodeIdToIndex = {};
  processFlow.forEach((node, index) => {
    nodeIdToIndex[node.nodeId] = index;
  });

  const getNodeIndex = (nodeId) => nodeIdToIndex[nodeId];

  const sortRouteArray = (routeArray) => {
    return (routeArray || []).sort((a, b) => {
      const indexA = getNodeIndex(a.nodeId);
      const indexB = getNodeIndex(b.nodeId);
      return indexA - indexB;
    });
  };

  const startNodeIds = processFlow
    .filter((node) => node.nodeType === 'startNode')
    .map((node) => node.nodeId);
  const endNodeIds = processFlow
    .filter((node) => node.nodeType === 'endNode')
    .map((node) => node.nodeId);

  processFlow.sort((a, b) => {
    if (startNodeIds.includes(a.nodeId)) {
      return -1;
    } else if (startNodeIds.includes(b.nodeId)) {
      return 1;
    } else if (endNodeIds.includes(a.nodeId)) {
      return 1;
    } else if (endNodeIds.includes(b.nodeId)) {
      return -1;
    } else {
      const indexA = getNodeIndex(a.nodeId);
      const indexB = getNodeIndex(b.nodeId);
      return indexA - indexB;
    }
  });

  processFlow.forEach((node) => {
    node.routeArray = sortRouteArray(node.routeArray);
  });

  return processFlow;
}

export async function findAllRoutesWithFormatAndDecision(node, edges) {
  let nodes = JSON.parse(JSON.stringify(node));
  let edge = JSON.parse(JSON.stringify(edges));
  let adjacencyList = {};
  const updateLable = (routeArray) => {
    let childRoute = [...routeArray];
    routeArray.forEach((parent) => {
      if (parent?.source) {
        childRoute.map((child) => {
          if (parent.source == child.NodeId) {
            if (parent?.conditionResult) {
              child.conditionResult = parent.conditionResult;
              delete parent.conditionResult;
            }
          }
        });
      }
    });
    childRoute.forEach((e) => {
      delete e.source;
    });
    return childRoute;
  };
  let findAllRoutes = (
    startNode,
    endNode,
    visited = new Set(),
    currentRoute = [],
    allRoutes = [],
  ) => {
    visited.add(startNode);
    let getNode = nodes.find((node) => node.id == startNode);
    let nodeObj = {
      NodeId: startNode,
      NodeName: getNode.data.label,
      NodeType: getNode.type,
    };
    currentRoute.push(nodeObj);
    if (startNode === endNode) {
      let flowName = `flow${allRoutes.length + 1}`;
      allRoutes.push({ [flowName]: [...currentRoute] });
    } else if (adjacencyList[startNode]) {
      for (const neighbor of adjacencyList[startNode]) {
        if (!visited.has(neighbor)) {
          findAllRoutes(neighbor, endNode, visited, currentRoute, allRoutes);
        }
      }
    }
    visited.delete(startNode);
    currentRoute.pop();
  }

  const findAllRoutesWithFormatAndDecisionResults = (nodes, edges) => {
    const graph = {};
    edges.forEach((edge) => {
      if (!graph[edge.source]) {
        graph[edge.source] = [];
      }
      graph[edge.source].push({
        target: edge.target,
        sourcenodeid: edge.source,
        label: edge.label,
      });
    });
    const allRoutes = [];
    const dfs = (node, currentRoute) => {
      const neighbors = graph[node] || [];
      neighbors.forEach((neighborInfo) => {
        const newRoute = [
          ...currentRoute,
          {
            nodeId: neighborInfo.target,
            sourcenodeid: neighborInfo.sourcenodeid,
            label: neighborInfo.label,
          },
        ];
        dfs(neighborInfo.target, newRoute);
      });
      if (neighbors.length === 0) {
        allRoutes.push(currentRoute);
      }
    };
    nodes.forEach((node) => {
      if (node.type === 'startNode') {
        const startNodeId = node.id;
        dfs(startNodeId, [{ nodeId: startNodeId, label: null }]);
      }
    });
    const formattedRoutes = allRoutes.map((route, index) => {
      let newArray = [];
      let currentConditionResult = null;
      let routeArray = route.map((routeItem) => {
        const sourceNodeId = routeItem.nodeId;
        const sourceNode = nodes.find((node) => node.id === sourceNodeId);
        if (sourceNode) {
          currentConditionResult = routeItem.label;
        }
        let routes = {
          nodeType:
            sourceNode.property.nodeType == 'defaultNode'
              ? sourceNode.type
              : sourceNode.property.nodeType,
          NodeId: sourceNode.id,
          Nodename: sourceNode.data.label,
          source: routeItem.sourcenodeid,
        };
        if (currentConditionResult) {
          routes['conditionResult'] = currentConditionResult;
        }
        return routes;
      });
      let routeOptionArray = updateLable(routeArray);
      let flowName = `flow${index + 1}`;
      return { [flowName]: routeOptionArray };
    });
    return formattedRoutes;
  };

  const summeryFlow = () => {
    const adjacencyList = {};
    edge.forEach((edge) => {
      if (!adjacencyList[edge.source]) {
        adjacencyList[edge.source] = [];
      }
      adjacencyList[edge.source].push(edge.target);
    });
    const routesWithFormatAndDecisionResults =
      findAllRoutesWithFormatAndDecisionResults(nodes, edge);
    return routesWithFormatAndDecisionResults;
  };
  let summeryRoutes = summeryFlow();
  return summeryRoutes;
}


export const saveaWorkFlow  = async (
  req,
  type,
  version,
  tenant,
  
) => {
  try {
    const workFlows = JSON.parse(JSON.stringify(req.workFlow));
    const nodes = JSON.parse(JSON.stringify(req.workFlow.node));
    const edges = JSON.parse(JSON.stringify(req.workFlow.edge));
    const processFlowSummary = await findAllRoutesWithFormatAndDecision(
      nodes,
      edges,
    );

    
    const result = await newCreatePrcessFlow(edges, nodes);    
    const processflowapi = await sortProcessFlow(result);

    if (type === 'create') {
      const res = await readReddis(tenant);

      console.log(res , 'response');
      const applications = await JSON.parse(res);

      if (
        applications &&
        applications.hasOwnProperty(tenant) &&
        // applications[tenant].hasOwnProperty(appGroup) &&
        // applications[tenant][appGroup].hasOwnProperty(app) &&
        typeof applications === 'object' 
        // && Object.keys(applications[tenant][appGroup][app]).length
      ) {
        console.log('inside');
        const application = { ...applications };
        console.log('version --->', applications[tenant]);

        if (
          application[tenant].hasOwnProperty(
            req.applicationName,
          )
        ) {
          if (
            application[tenant][
              req.applicationName
            ].hasOwnProperty(req.processFlow)
          ) {
            const version = `v${
              Object.keys(
                applications[tenant][req.applicationName][
                  req.processFlow
                ],
              ).length + 1
            }`;
            applications[tenant][req.applicationName][
              req.processFlow
            ] = {
              ...applications[tenant][req.applicationName][
                req.processFlow
              ],
              [version]: {
                processFlow: {
                  ...workFlows,
                  ProcessFlow: [...processflowapi],
                },

                processFlowSummary: [...processFlowSummary],
                ...req.configuration,
              },
            };
          } else {
            applications[tenant][req.applicationName] = {
              ...applications[tenant][req.applicationName],
              [req.processFlow]: {
                v1: {
                  processFlow: {
                    ...workFlows,
                    ProcessFlow: [...processflowapi],
                  },

                  processFlowSummary: [...processFlowSummary],
                  ...req.configuration,
                },
              },
            };
          }
          console.log(
            'application exists-->',
            JSON.stringify(application),
            tenant,
          );
          await writeReddis(tenant, application);
          const versions = Object.keys(
            application[tenant][req.applicationName][
              req.processFlow
            ],
          );

          const appw = JSON.parse(JSON.stringify(application));

          await createRedisFiles(appw, '', 1);
          return {
            msg: 'New Application Created',
            versions: versions,
            code: 200,
          };
        } else {
          const version = `v1`;
          applications[tenant][req.applicationName] = {
            ...applications[tenant][req.applicationName],
            [req.processFlow]: {
              [version]: {
                processFlow: {
                  ...workFlows,
                  ProcessFlow: [...processflowapi],
                },

                processFlowSummary: [...processFlowSummary],
                ...req.configuration,
              },
            },
          };
          console.log(
            'application exists-->',
            JSON.stringify(application),
            tenant,
          );
          await writeReddis(tenant, application);

          const versions = Object.keys(
            application[tenant][req.applicationName][
              req.processFlow
            ],
          );

          const appw = JSON.parse(JSON.stringify(application));

          await createRedisFiles(appw, '', 1);
          return {
            msg: 'New Version Created',
            versions: versions,
            code: 200,
          };
        }
      } else {
        const res = await readReddis(tenant);
        let application = { ...(await JSON.parse(res)) };
        console.log('workflow', workFlows, processflowapi);
        console.log(
          application,
          'outside',
          tenant,
          req.applicationName,
          req.processFlow,
        );
        let appl = JSON.parse(JSON.stringify(application));
        const version = `v1`;
        if (!appl.hasOwnProperty(tenant)) {
          appl = {
            ...appl,
            [tenant]: {},
          };
        }
        // if (!appl[tenant].hasOwnProperty(appGroup)) {
        //   appl[tenant] = { ...appl[tenant], [appGroup]: {} };
        // }
        // if (!appl[tenant][appGroup].hasOwnProperty(app)) {
        //   appl[tenant][appGroup] = {
        //     ...appl[tenant][appGroup],
        //     [app]: {},
        //   };
        // }

        appl[tenant] = {
          [req.applicationName]: {
            [req.processFlow]: {
              [version]: {
                processFlow: {
                  ...workFlows,
                  ProcessFlow: [...processflowapi],
                },

                processFlowSummary: [...processFlowSummary],
                ...req.configuration,
              },
            },
          },
        };

        console.log('application created-->', appl, tenant);
        await writeReddis(tenant, appl);
        const versions = Object.keys(
          appl[tenant][req.applicationName][req.processFlow],
        );
        const appw = JSON.parse(JSON.stringify(appl));

        await createRedisFiles(appw, '', 1);
       
        return {
          msg: 'New Application Created',
          versions: versions,
          code: 200,
        };
      }
    } else if (type === 'update') {
      const res = await readReddis(tenant);
      const applications = await JSON.parse(res);
      console.log('redis-->', JSON.stringify(applications), tenant);
      const application = { ...applications };

      applications[tenant][req.applicationName][
        req.processFlow
      ] = {
        ...applications[tenant][req.applicationName][
          req.processFlow
        ],
        [version]: {
          ...applications[tenant][req.applicationName][
            req.processFlow
          ][version],
          processFlow: {
            ...workFlows,
            ProcessFlow: [...processflowapi],
          },

          processFlowSummary: [...processFlowSummary],
          ...req.configuration,
        },
      };
      console.log(
        'application exists-->',
        JSON.stringify(application),
        tenant,
      );
      await writeReddis(tenant, application);

      const appw = JSON.parse(JSON.stringify(application));

      await createRedisFiles(appw, '', 1);

      return { msg: `${version} Updated`, code: 201 };
    }
  } catch (error) {
    return error;
  }
}


//version controller
export const versionController = async(tenant , app ='App1' , af = 'Artifacts1')  => {
  const res = await readReddis(tenant);
  const applications = await JSON.parse(res);
  let versions=[]
  if(applications[tenant].hasOwnProperty(app) && applications[tenant][app].hasOwnProperty(af)) {
     versions = Object.keys(applications[tenant][app][af]);
    return versions;
  }
  return versions;  
}


//version server
export const versionServer = async(DF , app, af , version)  => {
  const res = await readReddis(DF);
  const applications = await JSON.parse(res);
  const result = applications[DF][app][af][version].processFlow;
  return result;
}