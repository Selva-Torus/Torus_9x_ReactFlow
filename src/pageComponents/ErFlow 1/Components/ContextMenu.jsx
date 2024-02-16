import React, { useCallback, useEffect, useState } from "react";
import { useReactFlow } from "reactflow";
import { Dialog } from "primereact/dialog";
import Builder from "../treejson/builder";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Deletepop from "./Deletepop";
import Image from "next/image";
export default function ContextMenu({
  setMenu,
  id,
  top,
  left,
  right,
  bottom,
  onEditAttribute,
  updatedNodeConfig,
  isAdmin,
  nodeConfig,
  controlPolicyApi,
  showerror,
  showsuccess,
  ...props
}) {
  const { setNodes, setEdges } = useReactFlow();
  const [visible, setVisible] = useState(false);
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const [vsResult, setVsResult] = useState("");
  const [json, setJson] = useState({});
  const [newJson, setNewJson] = useState({});
  const [toggle, setToggle] = useState(false);
  const [vsdialog, setvsdialog] = useState(false);
  const [deletepop, setDeletepop] = useState(false);
  const [deldialog, setdeldialog] = useState(false);
  // const monaco = useMonaco();
  const [controlPolicy, setControlPolicy] = useState(null);
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    setMenu(null);
  }, [id, setNodes, setEdges]);

  const EditHeading = () => {
    alert("Edited");
  };

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
    if (flowType === "Er") {
      if (node.data.attributes.length > 0) {
        setNewJson(node.data.attributes);
        setToggle(!toggle);
      } else {
        setToggle(!toggle);

        setNewJson([
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
          {
            cname: "",
            datatype: "",
            contraints: "",
          },
        ]);
      }
    }

    if (flowType === "CC") {
      // if (nodeConfig.hasOwnProperty(`customCode.${node.id}`)) {
      //   setVsResult(nodeConfig[`customCode.${node.id}`]);
      //   setvsdialog(!vsdialog);
      // } else if (
      //   nodeConfig.hasOwnProperty(`${node.id}.${node.property.name}.CC`)
      // ) {
      //   setVsResult(nodeConfig[`${node.id}.${node.property.name}.CC`]);
      //   setvsdialog(!vsdialog);
      // } else {
      setvsdialog(!vsdialog);

      setVsResult("");
      // }
    }
  };

  const EditAttribute = (attribute, index) => {
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === id) {
          const updatedAttributes = [
            ...node?.data?.attributes.slice(0, index),
            attribute,
            ...node?.data?.attributes.slice(index + 1),
          ];
          return {
            ...node,
            data: {
              ...node.data,
              attributes: updatedAttributes,
            },
          };
        }
        return node;
      });
    });
  };

  return (
    <>
      {
        <>
          {controlPolicy && (
            <>
              {controlPolicy && (
                <>
                  <Dialog
                    visible={toggle}
                    style={{ height: "100%", width: "80vw" }}
                    onHide={() => {
                      setToggle(!toggle);
                      setMenu(null);
                      updatedNodeConfig(newJson, node.id);
                    }}
                    maximizable
                    header={`${node?.data.label}`}
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
                        {node?.data.label}
                      </p>
                    </div>

                    <div className="context-menu-div">
                      <div className="context-menu-button-div">
                        <CiEdit size={20} color="blue" />
                        <button
                          disabled={node.data.label == "" ? true : false}
                          onClick={() => {
                            handleDropDown(
                              controlPolicy.workflowControlpolicy,
                              "Er"
                            );
                          }}
                          style={{
                            cursor:
                              node.data.label == "" ? "not-allowed" : "pointer",
                          }}
                        >
                          Add Attribute
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

                      <div
                        className="context-menu-button-div"
                        style={{
                          cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                        }}
                      >
                        <MdDelete size={20} color="red" />
                        <button
                          onClick={() => setDeletepop(true)}
                          // if (isAdmin?.canDelete) deleteNode(id, node);

                          disabled={!isAdmin?.canDelete}
                          style={{
                            cursor: !isAdmin?.canEdit
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          Delete
                        </button>

                        <Deletepop
                          deletepop={deletepop}
                          setDeletepop={setDeletepop}
                          id={id}
                          node={node}
                          deleteNode={deleteNode}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      }
    </>
  );
}
