import React, { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import editSVG from "../../img/edit.png";
import deleteSVG from "../../img/delete.png";
import { Dialog } from "primereact/dialog";
import Builder from "../treejson/builder.jsx";
import "./contextMenu.css";
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
  showerror,
  showsuccess,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const [vsResult, setVsResult] = useState("");
  const [json, setJson] = useState({});
  const [newJson, setNewJson] = useState({});
  const [toggle, setToggle] = useState(false);
  const [vsdialog, setvsdialog] = useState(false);

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
      const result = controlPolicyApi(node.type);
      console.log(result, "result");
      setControlPolicy(result);
    })();
    return () => {
      setJson({});
    };
  }, [node]);

  const handleDropDown = (controlpolicy, flowType) => {
    if (flowType === "WF") {
      if (nodeConfig.hasOwnProperty(`${node.type}.workflow`)) {
        setNewJson(nodeConfig[`${node.type}.workflow`]);
        setToggle(!toggle);
      } else if (nodeConfig.hasOwnProperty(`PF.${node.type}.workflow`)) {
        setNewJson(nodeConfig[`PF.${node.type}.workflow`]);
        setToggle(!toggle);
      } else if (nodeConfig.hasOwnProperty(`DF.${node.type}.workflow`)) {
        setNewJson(nodeConfig[`DF.${node.type}.workflow`]);
      } else {
        setToggle(!toggle);

        setNewJson({});
      }
    }
    if (flowType === "CP") {
      if (nodeConfig.hasOwnProperty(`${node.type}.config`)) {
        setJson(nodeConfig[`${node.type}.config`]);
        setVisible(!visible);
      } else if (nodeConfig.hasOwnProperty(`PF.${node.type}.config`)) {
        setJson(nodeConfig[`PF.${node.type}.config`]);
        setVisible(!visible);
      } else if (nodeConfig.hasOwnProperty(`DF.${node.type}.config`)) {
        setJson(nodeConfig[`DF.${node.type}.config`]);
      } else {
        setVisible(!visible);

        setJson({});
      }
    }
  };

  return (
    <>
      {node && (
        <>
          {controlPolicy && (
            <>
              {node &&
                node.type !== "startNode" &&
                node.type !== "endNode" &&
                controlPolicy && (
                  <Dialog
                    visible={visible}
                    style={{ height: "100%", width: "66vw" }}
                    onHide={() => {
                      setVisible(!visible);
                      setMenu(null);
                      updatedNodeConfig(
                        { [`${node?.type}.config`]: { ...json } },
                        "config"
                      );
                    }}
                    maximizable
                    header={`${node?.type}`}
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
                      isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
                      controlPolicy={controlPolicy.configControlpolicy}
                      colorPolicy={controlPolicy.configColorpolicy}
                      showError={showerror}
                      showSuccess={showsuccess}
                    />
                  </Dialog>
                )}

              {controlPolicy && (
                <>
                  <Dialog
                    visible={toggle}
                    style={{ height: "100%", width: "80vw" }}
                    onHide={() => {
                      setToggle(!toggle);
                      setMenu(null);
                      updatedNodeConfig(
                        { [`${node?.type}.workflow`]: { ...newJson } },
                        "workflow"
                      );
                    }}
                    maximizable
                    header={`${node?.type}`}
                    headerStyle={{
                      height: "40px",
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
                      isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
                      controlPolicy={controlPolicy.workflowControlpolicy}
                      colorPolicy={controlPolicy.workflowColorpolicy}
                      showError={showerror}
                      showSuccess={showsuccess}
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
                        {node?.type}
                      </p>
                    </div>

                    <div className="context-menu-div">
                      <div className="context-menu-button-div" id="divbtn">
                        <Image src={editSVG} alt="editIcon" />
                        <button
                          onClick={() => {
                            handleDropDown(
                              controlPolicy.configControlpolicy,
                              "CP"
                            );
                          }}
                        >
                          <span style={{ cursor: "pointer" }}>
                            Configuration
                          </span>
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
                      {/* <div className="context-menu-button-div">
                        <Image src={vs} alt="deleteIcon" />
                        <button
                          onClick={() => {
                            handleDropDown("", "CC");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Custom Code
                        </button>
                      </div> */}

                      {/* <div
                        className="context-menu-button-div"
                        style={{
                          cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                        }}
                      >
                        <Image src={settingPNG} alt="settingPng" />
                        <button
                          onClick={() => {
                            if (isAdmin?.canEdit) {
                              sideT();
                              setToogle(node);
                              setMenu(null);
                            }
                          }}
                          disabled={!isAdmin?.canEdit}
                          style={{
                            cursor: !isAdmin?.canEdit
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <span> Edit Node </span>
                        </button>
                      </div> */}
                      <div
                        className="context-menu-button-div"
                        style={{
                          cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                        }}
                      >
                        <Image src={deleteSVG} alt="deleteIcon" />
                        <button
                          onClick={() => {
                            if (isAdmin?.canDelete) deleteNode(id, node);
                          }}
                          disabled={!isAdmin?.canDelete}
                          style={{
                            cursor: !isAdmin?.canEdit
                              ? "not-allowed"
                              : "pointer",
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
      )}
    </>
  );
}
