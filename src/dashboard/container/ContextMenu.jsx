import React, { useState, useEffect } from "react";
import { useReactFlow } from "reactflow";
import editSVG from "../img/edit.png";
import deleteSVG from "../img/delete.png";
import settingPNG from "../img/settings.png";

import { Dialog } from "primereact/dialog";

import Builder from "./treejson/builder.jsx";

import entity from "@/utilsfunctions/entity.json";
import { getControlPolicy } from "@/utilsfunctions/apiCallUnit";
import Image from "next/image";

export default function ContextMenu({
  sideT,
  setToogle,
  deleteNode,
  setMenu,
  id,
  top,
  left,
  right,
  bottom,
  type,
  updatedNodeConfig,
  isAdmin,
  nodeConfig,
  controlPolicyApi,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const [json, setJson] = useState({});
  const [newJson, setNewJson] = useState({});
  const [toggle, setToggle] = useState(false);
 

  
  const [controlPolicy, setControlPolicy] = useState(null);
  const getNodeConfig = (jsonb) => {
    setNewJson(jsonb);
  };

  const getConfig = (jsons) => {
    setJson(jsons);
    console.log(jsons, "jsons");
  };
  useEffect(() => {
    (async () => {
      if (!node) return;
      const result = await getControlPolicy(node.type);
      console.log(result, "result");
      setControlPolicy(result);
    })();
    return () => {
      setJson({});
    };
  }, [node]);

  

  const handleDropDown = (controlpolicy, flowType) => {
    if (flowType === "WF") {
      if (nodeConfig.hasOwnProperty(`workflow.${node.id}`)) {
        setNewJson(nodeConfig[`workflow.${node.id}`]);
        setToggle(!toggle);
      } else if (
        nodeConfig.hasOwnProperty(`${node.id}.${node.property.name}.WF`)
      ) {
        setNewJson(nodeConfig[`${node.id}.${node.property.name}.WF`]);
        setToggle(!toggle);
      } else {
        setToggle(!toggle);

        setNewJson(entity);
      }
    }
    if (flowType === "CP") {
      if (nodeConfig.hasOwnProperty(`config.${node.id}`)) {
        setJson(nodeConfig[`config.${node.id}`]);
        setVisible(!visible);
      } else if (
        nodeConfig.hasOwnProperty(`${node.id}.${node.property.name}.config`)
      ) {
        setJson(nodeConfig[`${node.id}.${node.property.name}.config`]);
        setVisible(!visible);
      } else {
        setVisible(!visible);

        setJson(entity);
      }
    }
  };

  return (
    <>
      {controlPolicy && (
        <>
          {node &&
            node.type !== "startNode" &&
            node.type !== "endNode" &&
            controlPolicy && (
              <Dialog
                visible={visible}
                style={{ height: "90vh", width: "66vw" }}
                onHide={() => {
                  setVisible(!visible);
                  setMenu(null);
                  updatedNodeConfig(
                    { [`config.${node?.id}`]: { ...json } },
                    "config"
                  );
                }}
                maximizable
                header={`${node?.property.name}`}
                headerStyle={{
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
                modal={true}
                resizable={true}
              >
                <Builder
                  keys={node?.id}
                  defaultJSOn={json}
                  updatedNodeConfig={getConfig}
                  nodeType={node?.type}
                  isAdmin={isAdmin}
                  controlPolicy={controlPolicy.configControlpolicy}
                  colorPolicy={controlPolicy.configColorpolicy}
                />
              </Dialog>
            )}

{node &&
            (node.type == "startNode" || node.type == "endNode") &&
            controlPolicy && (
              <Dialog
                visible={visible}
                style={{ height: "90vh", width: "66vw" }}
                onHide={() => {
                  setVisible(!visible);
                  setMenu(null);
                  updatedNodeConfig(
                    { [`config.${node?.id}`]: { ...json } },
                    "config"
                  );
                }}
                maximizable
                header={`${node?.property.name}`}
                headerStyle={{
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
                modal={true}
                resizable={true}
              >
                still on process
              </Dialog>
            )}

      
          {controlPolicy && (
            <>
              <Dialog
                visible={toggle}
                style={{ height: "100vh", width: "80vw" }}
                onHide={() => {
                  setToggle(!toggle);
                  setMenu(null);
                  updatedNodeConfig(
                    { [`workflow.${node?.id}`]: { ...newJson } },
                    "workflow"
                  );
                }}
                maximizable
                header={`${node?.property.name}`}
                headerStyle={{
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
                modal={true}
                resizable={true}
              >
                <Builder
                  keys={node?.id}
                  defaultJSOn={newJson}
                  updatedNodeConfig={getNodeConfig}
                  nodeType={node?.type}
                  isAdmin={isAdmin}
                  controlPolicy={controlPolicy.workflowControlpolicy}
                  colorPolicy={controlPolicy.workflowColorpolicy}
                />
              </Dialog>

              <div
                style={{ top, left, right, bottom }}
                className="context-menu"
              >
                <div className="context-menu-header">
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      marginBottom: "10px",
                    }}
                  >
                    {node?.data.label}
                  </p>
                </div>

                <div className="context-menu-div">
                  <div className="context-menu-button-div" id="divbtn">
                    <Image src={editSVG} alt="editIcon" />
                    <button
                      onClick={() => {
                        handleDropDown(controlPolicy.configControlpolicy, "CP");
                      }}
                    >
                      <span style={{ cursor: "pointer" }}>Configuration</span>
                    </button>
                  </div>
                  <div className="context-menu-button-div">
                    <Image src={editSVG} alt="deleteIcon" />
                    <button
                      onClick={() => {
                        handleDropDown(
                          controlPolicy.workflowControlpolicy,
                          "WF"
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      WorkFlow
                    </button>
                  </div>
               

                  <div
                    className="context-menu-button-div"
                    style={{
                      cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                    }}
                  >
                    <Image src={settingPNG} alt="settingPng" />
                    <button
                      onClick={() => {
                        if (isAdmin.canEdit) {
                          sideT();
                          setToogle(node);
                          setMenu(null);
                        }
                      }}
                      disabled={!isAdmin.canEdit}
                      style={{
                        cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                      }}
                    >
                      <span> Edit Node </span>
                    </button>
                  </div>
                  <div
                    className="context-menu-button-div"
                    style={{
                      cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                    }}
                  >
                    <Image src={deleteSVG} alt="deleteIcon" />
                    <button
                      onClick={() => {
                        if (isAdmin.canDelete) deleteNode(id, node);
                      }}
                      disabled={!isAdmin.canDelete}
                      style={{
                        cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
