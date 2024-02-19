import React, { useState, useEffect, useContext } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { InputText } from "primereact/inputtext";
import { uniQueNameContext } from "./DataFabric";
export function CustomTableNode({ data, id }) {
  const { uniqueNames, entityJson } = useContext(uniQueNameContext);
  const [datas, setDatas] = useState(null);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [editedAttributeValue, setEditedAttributeValue] = useState("");
  const [editingHeader, setEditingHeader] = useState(false);
  const [editedHeader, setEditedHeader] = useState("");
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setDatas(data.attributes);
    setEditedHeader(data.label);
  }, [data]);

  const tableStyle = {
    fontFamily: "sans-serif",
    backgroundColor: "white",
    border: "2px solid gray",
    borderRadius: "6px",
    minWidth: "200px",
    maxWidth: "500px",
    borderSpacing: 0,
  };

  const thStyle = {
    padding: "8px",
    fontWeight: "bold",
    borderBottom: "2px solid gray",
    backgroundColor: "#C5C7F8 ",
    borderRadius: "4px 4px 0 0",
    position: "relative",
  };

  const tbodyStyle = {
    minHeight: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const handleWrapperStyle = {
    position: "relative ",
  };

  const coloumnStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderTop: "2px solid #ccc",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    borderRadius: "0 0 4px 4px",
  };

  const positionStyles = {
    [Position.Left]: {
      left: "-16px",
      top: "51%",
      transform: "translateY(-50%)",
    },
    [Position.Right]: {
      right: "-16px",
      top: "50%",
      transform: "translateY(-50%)",
    },
    [Position.Top]: {
      top: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    [Position.Bottom]: {
      bottom: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  const customHandleLeft = {
    width: "16px",
    height: "37px",
    position: "absolute",
    cursor: "crosshair",
    background: "#D3D3D3",
    borderRadius: "8px 0 0 8px",
    border: "2px solid gray",
    transition: "0.3s ease-in-out",
  };

  const customHandleRight = {
    width: "16px",
    height: "37px",
    position: "absolute",
    cursor: "crosshair",
    background: "#D3D3D3",
    borderRadius: "0 8px 8px 0",
    border: "2px solid gray",
    transition: "0.3s ease-in-out",
  };

  const { setNodes } = useReactFlow();

  const handleAttributeChange = (e, index) => {
    if (e.key === "Enter") {
      setNodes((nds) => {
        if (e.target.value.trim() === "") return nds;
        return nds.map((node) => {
          if (node.id === id) {
            const updatedAttributes = [
              ...node?.data?.attributes.slice(0, index),
              {
                ...node?.data?.attributes[0],
                cname: e.target.value,
              },
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
      e.target.value = "";
      setEditingAttribute(null);
      setEditedAttributeValue("");
    }
  };

  const EditAttribute = (attribute, index) => {
    setEditingAttribute(index);
    setEditedAttributeValue(attribute);
  };

  const handleInputChange = (e) => {
    setEditedAttributeValue(e.target.value);
  };

  const handleHeaderChange = (e) => {
    if (uniqueNames.includes(e.target.value) && e.target.value !== data.label) {
      setShowError(true);
      e.target.value = "";
      return;
    } else {
      showError && setShowError(false);
      setEditedHeader(e.target.value);
    }
  };

  const handleHeaderBlur = (e) => {
    if (editedHeader === "") {
      return;
    }
    setShowError(false);
    setEditingHeader(false);
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editedHeader,
            },
          };
        }
        return node;
      });
    });
  };

  const handleHeaderClick = () => {
    setEditingHeader(true);
  };

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} colSpan={1} onClick={handleHeaderClick}>
              {editingHeader ? (
                <div>
                  <InputText
                    aria-describedby="username-help"
                    value={editedHeader}
                    onChange={handleHeaderChange}
                    onBlur={handleHeaderBlur}
                    onKeyDown={(e) => {
                      console.log(e.key);
                      if (e.key === "Enter") {
                        handleHeaderBlur(e);
                      }
                    }}
                    // className={showError ? "p-invalid" : ""}
                    style={{ borderColor: "#DCDCDC", width: "100%" }}
                    autoFocus
                  />
                  {showError && (
                    <small id="username-help">Table name already exists</small>
                  )}
                </div>
              ) : (
                <>
                  {data.label || "click to give entity name"}
                  <Handle
                    id={`header-${id}-left`}
                    type="target"
                    position={Position.Left}
                    style={{
                      ...customHandleLeft,
                      ...positionStyles[Position.Left],
                    }}
                  />
                  <Handle
                    id={`header-${id}-right`}
                    type="source"
                    position={Position.Right}
                    style={{
                      ...customHandleRight,
                      ...positionStyles[Position.Right],
                    }}
                  />
                </>
              )}
            </th>
          </tr>
        </thead>
        {datas && (
          <tbody style={tbodyStyle}>
            {Object.keys(data?.attributes).map((key, index) => (
              <>
                {data?.attributes[key].cname !== "" && (
                  <tr key={key} style={coloumnStyle}>
                    <td style={handleWrapperStyle}>
                      <Handle
                        type="target"
                        id={`${index}-right`}
                        position={Position.Left}
                        style={{
                          width: "13px",
                          height: "13px",
                          position: "absolute",
                          cursor: "crosshair",
                          background: "white",
                          left: "-18px",
                          borderRadius: "50%",
                          border: "2px solid gray",
                          transition: "0.3s ease-in-out",
                        }}
                      />
                      {console.log(data?.attributes[key].cname)}
                      {<td>{data?.attributes[key].cname}</td>}

                      <Handle
                        type="source"
                        id={`${index}-left`}
                        position={Position.Right}
                        style={{
                          width: "13px",
                          height: "13px",
                          position: "absolute",
                          cursor: "crosshair",
                          background: "white",
                          right: "-18px",
                          borderRadius: "50%",
                          border: "2px solid gray",
                          transition: "0.3s ease-in-out",
                        }}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        )}
        {/* <tr>
          <td colSpan={1}>
            <InputText
              placeholder="Add Attribute"
              onKeyDown={(e) => handleAttributeChange(e, datas.length)}
              style={{ borderColor: "#ccc" }}
              autoFocus
            />
          </td>
        </tr> */}
      </table>
    </>
  );
}
