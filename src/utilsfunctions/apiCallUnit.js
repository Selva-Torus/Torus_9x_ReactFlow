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
 
export const saveWorkFlow = async (
  resquestBody,
  type,
  version,
  tenant,
 
) => {
  try {
    const URL =
      type === "create"
        ? `${BASE_URL}/?type=${type}&tenant=${tenant}`
        : `${BASE_URL}/?type=${type}&version=${version}&tenant=${tenant}`;
    return await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resquestBody),
    }).then((res) => res.json());
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


// export function newCreatePrcessFlow(edges, node) {
//   let nodes = structuredClone(node);
//   let edge = structuredClone(edges);

//   const initElement = (item, element) => {
//     item.role = element.data.role;

//     item.nodeType =
//       element.property.nodeType == 'defaultNode'
//         ? element.type
//         : element.property.nodeType;

//     item.nodeId = element.id;
//     if (typeof element?.parentId === 'object') {
//       item.parentId = [...element?.parentId];
//     } else {
//       item.parentId = element?.parentId;
//     }

//     item.nodeName = element.property.name;

//     item.nodeDesc = element.property.description;

//     return item;
//   };

//   const addingElements = (item, array) => {
//     if (array.filter((x) => x.id === item.id).length === 0) {
//       let element = nodes.find((node) => node.id == item.source);

//       array.push(initElement(item, element));
//     }
//   };

//   const processFlow = () => {
//     const resultObj = {};

//     let array = [];

//     let removeFields = [
//       'source',

//       'label',

//       'sourceHandle',

//       'selected',

//       'targetHandle',

//       'target',

//       'type',

//       'markerEnd',

//       'id',
//     ];

//     edge.map((edges) => {
//       addingElements(edges, array);
//     });

//     array.forEach((obj) => {
//       let routeArray = [];

//       const { source, target } = obj;

//       let initRouteObj = {};

//       if (!resultObj[source]) {
//         resultObj[source] = obj;
//       }

//       if (obj.label) {
//         initRouteObj['conditionResult'] = obj.label;
//       }

//       initRouteObj['nodeName'] = nodes.find(
//         (node) => node.id == target,
//       ).data.label;

//       initRouteObj['nodeId'] = target;

//       routeArray.push(initRouteObj);

//       if (resultObj[source]?.routeArray?.length > 0) {
//         let check = resultObj[source].routeArray.findIndex(
//           (index) => obj.nodeId == source,
//         );

//         if (check >= 0) {
//           resultObj[source].routeArray.push(initRouteObj);
//         }
//       } else {
//         resultObj[source].routeArray = routeArray;
//       }

//       Object.keys(resultObj[source]).map((key) => {
//         let status = removeFields.includes(key);

//         if (status) {
//           delete resultObj[source][key];
//         }
//       });
//     });

//     const updatedArray = Object.values(resultObj);

//     let endNodeElement = nodes.find((node) => node.type == 'endNode');

//     let item = initElement({}, endNodeElement);

//     updatedArray.push(item);

//     return updatedArray;
//   };

//   let processFlowResult = processFlow();

//   return processFlowResult;
// }


// export const saveaWorkFlow  = async (
//   req,
//   type,
//   version,
//   tenant,
  
// ) => {
//   try {
//     const workFlows = JSON.parse(JSON.stringify(req.workFlow));
//     const nodes = JSON.parse(JSON.stringify(req.workFlow.node));
//     const edges = JSON.parse(JSON.stringify(req.workFlow.edge));
//     const processFlowSummary = this.findAllRoutesWithFormatAndDecision(
//       nodes,
//       edges,
//     );

//     const result = this.newCreatePrcessFlow(edges, nodes);

//     const processflowapi = this.sortProcessFlow(result);

//     if (type === 'create') {
//       const res = await this.readReddis(tenant);
//       const applications = await JSON.parse(res);

//       if (
//         applications &&
//         applications.hasOwnProperty(tenant) &&
//         // applications[tenant].hasOwnProperty(appGroup) &&
//         // applications[tenant][appGroup].hasOwnProperty(app) &&
//         typeof applications === 'object' 
//         // && Object.keys(applications[tenant][appGroup][app]).length
//       ) {
//         console.log('inside');
//         const application = { ...applications };
//         console.log('version --->', applications[tenant]);

//         if (
//           application[tenant].hasOwnProperty(
//             req.applicationName,
//           )
//         ) {
//           if (
//             application[tenant][
//               req.applicationName
//             ].hasOwnProperty(req.processFlow)
//           ) {
//             const version = `v${
//               Object.keys(
//                 applications[tenant][req.applicationName][
//                   req.processFlow
//                 ],
//               ).length + 1
//             }`;
//             applications[tenant][req.applicationName][
//               req.processFlow
//             ] = {
//               ...applications[tenant][req.applicationName][
//                 req.processFlow
//               ],
//               [version]: {
//                 processFlow: {
//                   ...workFlows,
//                   ProcessFlow: [...processflowapi],
//                 },

//                 processFlowSummary: [...processFlowSummary],
//                 ...req.configuration,
//               },
//             };
//           } else {
//             applications[tenant][req.applicationName] = {
//               ...applications[tenant][req.applicationName],
//               [req.processFlow]: {
//                 v1: {
//                   processFlow: {
//                     ...workFlows,
//                     ProcessFlow: [...processflowapi],
//                   },

//                   processFlowSummary: [...processFlowSummary],
//                   ...req.configuration,
//                 },
//               },
//             };
//           }
//           console.log(
//             'application exists-->',
//             JSON.stringify(application),
//             tenant,
//           );
//           await this.writeReddis(tenant, application);
//           const versions = Object.keys(
//             application[tenant][req.applicationName][
//               req.processFlow
//             ],
//           );

//           const appw = structuredClone(application);

//           await createRedisFiles(appw, '', 1);
//           return {
//             msg: 'New Application Created',
//             versions: versions,
//             code: 200,
//           };
//         } else {
//           const version = `v1`;
//           applications[tenant][req.applicationName] = {
//             ...applications[tenant][req.applicationName],
//             [req.processFlow]: {
//               [version]: {
//                 processFlow: {
//                   ...workFlows,
//                   ProcessFlow: [...processflowapi],
//                 },

//                 processFlowSummary: [...processFlowSummary],
//                 ...req.configuration,
//               },
//             },
//           };
//           console.log(
//             'application exists-->',
//             JSON.stringify(application),
//             tenant,
//           );
//           await this.writeReddis(tenant, application);

//           const versions = Object.keys(
//             application[tenant][req.applicationName][
//               req.processFlow
//             ],
//           );

//           const appw = structuredClone(application);

//           await createRedisFiles(appw, '', 1);

//           return {
//             msg: 'New Version Created',
//             versions: versions,
//             code: 200,
//           };
//         }
//       } else {
//         const res = await this.readReddis(tenant);
//         let application = { ...(await JSON.parse(res)) };
//         console.log('workflow', workFlows, processflowapi);
//         console.log(
//           application,
//           'outside',
//           tenant,
//           req.applicationName,
//           req.processFlow,
//         );
//         let appl = structuredClone(application);
//         const version = `v1`;
//         if (!appl.hasOwnProperty(tenant)) {
//           appl = {
//             ...appl,
//             [tenant]: {},
//           };
//         }
//         // if (!appl[tenant].hasOwnProperty(appGroup)) {
//         //   appl[tenant] = { ...appl[tenant], [appGroup]: {} };
//         // }
//         // if (!appl[tenant][appGroup].hasOwnProperty(app)) {
//         //   appl[tenant][appGroup] = {
//         //     ...appl[tenant][appGroup],
//         //     [app]: {},
//         //   };
//         // }

//         appl[tenant] = {
//           [req.applicationName]: {
//             [req.processFlow]: {
//               [version]: {
//                 processFlow: {
//                   ...workFlows,
//                   ProcessFlow: [...processflowapi],
//                 },

//                 processFlowSummary: [...processFlowSummary],
//                 ...req.configuration,
//               },
//             },
//           },
//         };

//         console.log('application created-->', appl, tenant);
//         await this.writeReddis(tenant, appl);
//         const versions = Object.keys(
//           appl[tenant][req.applicationName][req.processFlow],
//         );
//         const appw = structuredClone(appl);

//         await createRedisFiles(appw, '', 1);
//         return {
//           msg: 'New Application Created',
//           versions: versions,
//           code: 200,
//         };
//       }
//     } else if (type === 'update') {
//       const res = await this.readReddis(tenant);
//       const applications: any = await JSON.parse(res);
//       console.log('redis-->', JSON.stringify(applications), tenant);
//       const application = { ...applications };

//       applications[tenant][req.applicationName][
//         req.processFlow
//       ] = {
//         ...applications[tenant][req.applicationName][
//           req.processFlow
//         ],
//         [version]: {
//           ...applications[tenant][req.applicationName][
//             req.processFlow
//           ][version],
//           processFlow: {
//             ...workFlows,
//             ProcessFlow: [...processflowapi],
//           },

//           processFlowSummary: [...processFlowSummary],
//           ...req.configuration,
//         },
//       };
//       console.log(
//         'application exists-->',
//         JSON.stringify(application),
//         tenant,
//       );
//       await this.writeReddis(tenant, application);

//       const appw = structuredClone(application);

//       await createRedisFiles(appw, '', 1);

//       return { msg: `${version} Updated`, code: 201 };
//     }
//   } catch (error) {
//     return error;
//   }
// }