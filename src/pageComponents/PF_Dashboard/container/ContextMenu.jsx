import React, { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import editSVG from "../img/edit.png";
import deleteSVG from "../img/delete.png";
import settingPNG from "../img/settings.png";
import _ from "lodash";
import { Dialog } from "primereact/dialog";

// import Editor, { useMonaco, Monaco } from "@monaco-editor/react";

import Builder from "./treejson/builder.jsx";

import {
  getControlPolicy,
  readReddis,
} from "../../../utilsfunctions/apiCallUnit.js";
import entity from "../../../utilsfunctions/entity.json";
import vs from "../img/vs.png";
import Image from "next/image.js";
import { useSelector } from "react-redux";

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
  // const monaco = useMonaco();
  const [controlPolicy, setControlPolicy] = useState(null);
  const editorRef = useRef(null);
  const monaRef = useRef(null);
  const [intialNewJson, setIntialNewJson] = useState({});
  const [intialJson, setIntialJson] = useState({});
  const appName = useSelector((state) => state.counter.appName);
  const fabrics = useSelector((state) => state.counter.fabrics);
  const TRSVersion = useSelector((state) => state.counter.TRSVersion);


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monaRef.current = monaco;
  }

  // function showValue() {
  //   setVsResult(editorRef.current.getValue());
  // }

  // monaRef.current.languages.registerCompletionItemProvider('javascript', {
  //   provideCompletionItems: function (model, position) {
  //     // Extract the last token
  //     var lastToken = tokens[tokens.length - 1];

  //     // Check if the last token is an identifier
  //     if (lastToken && lastToken.length > 0 && lastToken[0].type === 'identifier.js') {
  //       // Provide autocomplete suggestions based on a predefined list of keywords
  //       var completions = [
  //         'if', 'else', 'while', 'function', 'var', 'const', 'let', 'console', 'log', // Add more keywords
  //       ];

  //       // Filter completions based on the current token
  //       var filteredCompletions = completions.filter(function (completion) {
  //         return completion.startsWith(lastToken[0].value);
  //       });

  //       // Transform filtered completions into Monaco completion items
  //       var completionItems = filteredCompletions.map(function (completion) {
  //         return {
  //           label: completion,
  //           kind: monaRef.current.languages.CompletionItemKind.Keyword,
  //           insertText: completion,
  //           range: new monaRef.current.Range(position.lineNumber, lastToken[0].offset + 1, position.lineNumber, position.column),
  //         };
  //       });

  //       return completionItems;
  //     }

  //     // Return an empty array if no completions are found
  //     return [];
  //   }
  // });

  const getNodeConfig = (jsonb) => {
    setNewJson(jsonb);
  };

  const getConfig = (jsons) => {
    setJson(jsons);
  };
  useEffect(() => {
    (async () => {
      if (!node) return;
      const result = controlPolicyApi(node.type);
      setControlPolicy(result);
    })();
    return () => {
      setJson({});
    };
  }, [node]);

  const handlevscode = () => {
    setvsdialog(true);
  };

  const handleValidation = (data, type) => {
    if (type === "WF") {
      if (!_.isEqual(data, intialNewJson)) {
        updatedNodeConfig(
          { [`workflow.${node?.id}`]: { ...data } },
          "workflow"
        );
      }
    }
    if (type === "CP") {
      if (!_.isEqual(data, intialJson)) {
        updatedNodeConfig({ [`config.${node?.id}`]: { ...data } }, "config");
      }
    }
  };

  const handleDropDown = (controlpolicy, flowType) => {
    if (flowType === "WF") {
      if (nodeConfig.hasOwnProperty(`workflow.${node.id}`)) {
        setNewJson(nodeConfig[`workflow.${node.id}`]);
        setIntialNewJson(nodeConfig[`workflow.${node.id}`]);
        setToggle(!toggle);
      } else if (nodeConfig.hasOwnProperty(`${node.property.name}.WF`)) {
        setNewJson(nodeConfig[`${node.property.name}.WF`]);
        setIntialNewJson(nodeConfig[`${node.property.name}.WF`]);
        setToggle(!toggle);
      } else {
        setToggle(!toggle);
        readReddis(fabrics + ":defaultJson").then((res) => {
          console.log(res , 'new versioned json');
          if (res) {
            const nodeConfig = JSON.parse(res)[TRSVersion].nodeConfig;
            if (Object.keys(nodeConfig).includes(node.type + ".workflow")) {
              setNewJson(nodeConfig[node.type + ".workflow"]);
              setIntialNewJson(nodeConfig[node.type + ".workflow"]);
            } else {
              setNewJson({});
              setIntialNewJson({});
            }
          } else {
            setNewJson({});
            setIntialNewJson({});
          }
        });
        setNewJson({});
        setIntialNewJson({});
      }
    }
    if (flowType === "CP") {
      if (nodeConfig.hasOwnProperty(`config.${node.id}`)) {
        setJson(nodeConfig[`config.${node.id}`]);
        setIntialJson(nodeConfig[`config.${node.id}`]);
        setVisible(!visible);
      } else if (nodeConfig.hasOwnProperty(`${node.property.name}.config`)) {
        setJson(nodeConfig[`${node.property.name}.config`]);
        setIntialJson(nodeConfig[`${node.property.name}.config`]);
        setVisible(!visible);
      } else {
        setVisible(!visible);
        readReddis(fabrics + ":defaultJson").then((res) => {
          console.log(res , 'new versioned json');
          if (res) {
            const nodeConfig = JSON.parse(res)[TRSVersion].nodeConfig;
            if (Object.keys(nodeConfig).includes(node.type + ".config")) {
              setJson(nodeConfig[node.type + ".config"]);
              setIntialJson(nodeConfig[node.type + ".config"]);
            } else {
              setJson({});
              setIntialJson({});
            }
          } else {
            setJson({});
            setIntialJson({});
          }
        });

        setJson({});
        setIntialJson({});
      }
    }
    if (flowType === "CC") {
      if (nodeConfig.hasOwnProperty(`customCode.${node.id}`)) {
        setVsResult(nodeConfig[`customCode.${node.id}`]);
        setvsdialog(!vsdialog);
      } else if (
        nodeConfig.hasOwnProperty(`${node.id}.${node.property.name}.CC`)
      ) {
        setVsResult(nodeConfig[`${node.id}.${node.property.name}.CC`]);
        setvsdialog(!vsdialog);
      } else {
        setvsdialog(!vsdialog);

        setVsResult("");
      }
    }
  };
console.log(fabrics);
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
                      // handleValidation(json, "CP");
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
                      // handleValidation(newJson, "WF");
                      updatedNodeConfig(
                        { [`workflow.${node?.id}`]: { ...newJson } },
                        "workflow"
                      );
                    }}
                    maximizable
                    header={`${node?.property.name}`}
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
                      isAdmin={isAdmin}
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
                        {node?.data.label}
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
                            cursor: !isAdmin.canEdit
                              ? "not-allowed"
                              : "pointer",
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
                            cursor: !isAdmin.canEdit
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
