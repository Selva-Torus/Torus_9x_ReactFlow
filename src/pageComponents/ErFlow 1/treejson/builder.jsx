import React from "react";
import { MdOutlineExpand } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Dyn from "./dynauii/dyn";
import DynObj from "./dynauii/DynObj";
import { useRef } from "react";
import TreeView from "./dynauii/TreeView";
import Side from "./dynauii/Side";
import _ from "lodash";
import curly from "./assets/dynicons/curly-brackets.png";
import arrow from "./assets/dynicons/arrow.png";
import "../treejson/tree.css";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

import { FaCheck } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import SingleObj from "./dynauii/SIngleObj";
import { Toast } from "primereact/toast";
import { Upload } from "./dynauii/UploadJson";

export default function Builder({
  keys,
  defaultJSOn,
  updatedNodeConfig,
  nodeType,
  isAdmin,
  controlPolicy,
  colorPolicy,
}) {
  const [gDepth, setGDepth] = useState(0);
  const op = useRef(null);
  const [render, setRender] = useState(false);

  const [totalOptions, setTotalOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [json, setJson] = useState({});
  const [dupJson, setDupJson] = useState({});
  const [toggle, setToggle] = useState(false);
  const [toggl, setToggl] = useState(false);
  const [selectedjson, setSelectedjson] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [path, setPath] = useState(null);
  const [func, setFunc] = useState(null);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);
  const [Key, setKey] = useState(null);
  const [selectedjsonPath, setSelectedjsonPath] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [totalColors, setTotalColors] = useState([]);
  const iRef = useRef(null);
  const [parentType, setParentType] = useState(null);
  const [title, setTitle] = useState(null);
  const [files, setFiles] = useState(null);
  const toast = useRef(null);

  function checkForNull(jsonData) {
    if (typeof jsonData === "object" && jsonData !== null) {
      if (Array.isArray(jsonData)) {
        jsonData.forEach((item) => checkForNull(item));
      } else {
        Object.values(jsonData).forEach((value) => checkForNull(value));
      }
    } else if (jsonData === null || jsonData === undefined) {
      return true;
    }
    return false;
  }

  const showError = (type) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail:
        type == "key"
          ? "Key should not be empty"
          : type == "value"
          ? "Value should not be empty"
          : type == "selected"
          ? "selected should not be empty"
          : "please select key and value",
      life: 3000,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iRef.current && !iRef.current.contains(event.target)) {
        setContextMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const updateSinglejs = (js) => {
    updatedNodeConfig(js);
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: builder.jsx:261 ~ getSelectedJson ~ selectedjson:",
      selectedjsonPath
    );
  }, [selectedjsonPath]);

  console.log(
    "🚀 ~ file: builder.jsx:261 ~ getSelectedJson ~ js:",
    selectedjson
  );

  const settJson = (js, value = null) => {
    (async function () {
      setJson(js);

      const copiedObject = JSON.parse(JSON.stringify(js));
      // await objectToPaths(copiedObject);

      if (selectedjson !== null && selectedjsonPath !== null) {
        let result = selectedjsonPath.path;

        result = result.split(".");
        result.shift();
        result = result.join(".");
        const updatedselectedJs = _.get(copiedObject, result);
        console.log(updatedselectedJs, "checkType");
        setSelectedjson(updatedselectedJs);
      }

      console.log(copiedObject, "copiedObject");
      setDupJson(copiedObject);
      updatedNodeConfig(js);
      setPath(null);
    })();
  };
  const addFunction = (key, option, value, path) => {
    console.log(key, option, value, path, "add");
    let updateValue =
      option === "string" || option === "number"
        ? value
        : option === "array"
        ? []
        : option === "boolean"
        ? false
        : {};
    let js = json;
    const upjs = _.set(js, path + "." + key, updateValue);

    settJson(upjs);
  };
  console.log(selectedjson, "Selsctedjson");
  const functionality = (func, path, value = null) => {
    if (path !== "") {
      let result;
      console.log(func, path, value, "func");
      result = path.split(".");
      result.shift();
      result = result.join(".");
      console.log(result, "result");

      setPath(result);
      if (func == "add") {
        console.log(value, "vae");
        if (value) {
          addFunction(value.key, value.options, value.value, result);
        }
      }
      if (func == "edit") {
        let path = _.toPath(result);

        let jsr = json;
        console.log(path.join("."), "pathsss");

        if (path.length > 0) {
          let js = _.get(jsr, path.join("."));
          let gs;
          Object.keys(js).map((key) => {
            if (key == value.oldKey) {
              gs = { ...gs, [value.newKey]: js[key] };
            } else {
              gs = { ...gs, [key]: js[key] };
            }
          });
          _.set(jsr, path.join("."), gs);
          settJson(jsr);
        } else {
          let gss;
          Object.keys(jsr).map((key) => {
            if (key == value.oldKey) {
              gss = { ...gss, [value.newKey]: jsr[key] };
            } else {
              gss = { ...gss, [key]: jsr[key] };
            }
          });
          settJson(gss);
        }
      }
      if (func == "update") {
        if (value) {
          const js = json;
          console.log(value, "result");

          _.update(js, result, (n) => {
            // if (Array.isArray(n)) {
            //   console.log(n, "nArray");
            //   n.splice(value.key, 1, value.value);
            //   return n;
            // }

            n = value.value;
            console.log("n", typeof n);
            return n;
          });
          settJson(js);
        }
      }
      if (func == "delete") {
        let js = json;
        let path = _.toPath(result);
        console.log(path, "path123");
        for (let i = 0; i < path.length - 1; i++) {
          js = js[path[i]];
        }
        const indexToDelete = path[path.length - 1];
        const lastKey = path[path.length - 1];
        if (Array.isArray(js)) {
          js.splice(indexToDelete, 1);
        } else if (typeof js === "object") {
          delete js[lastKey];
        }

        settJson(json);
      }
    } else {
      let js = json;
      if (func == "add") {
        js = {
          ...js,
          [value.key]: value.value,
        };
        settJson(js);
      }
      if (func == "edit") {
        let gs;
        Object.keys(js).map((key) => {
          if (key == value.oldKey) {
            gs = { ...gs, [value.newKey]: js[key] };
          } else {
            gs = { ...gs, [key]: js[key] };
          }
        });
        settJson(gs);
      }
      if (func == "update") {
        Object.keys(js).map((key) => {
          if (key == value.key) {
            return (js[key] = value.value);
          }
          return js[key];
        });
        settJson(js);
      }
      if (func == "delete") {
        js = {};
        settJson(js);
      }
    }
  };

  async function objectToPaths(data) {
    var validId = /^[a-z_$][a-z0-9_$]*$/i;
    doIt(data, "");
    function doIt(data, s) {
      if (data && typeof data === "object") {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            if (data[i]) {
              doIt(data[i], s + "[" + i + "]");
              if (!Array.isArray(data[i]) && typeof data[i] === "object") {
                data[i].path = `${s}[${i}]`;
              }
            }
          }
        } else {
          for (var p in data) {
            if (!Array.isArray(data[p]) && typeof data[p] === "object") {
              data[p].path = s + "." + p;
            }
            if (validId.test(p)) {
              doIt(data[p], s + "." + p);
            } else {
              doIt(data[p], s + '["' + p + '"]');
            }
          }
        }
      }
    }

    // console.log(table.Entities[3].methods[4].conditionparams)
  }
  const onDropdownChange = (e) => {
    console.log(e.value);
    setSelectedOption(e.value);
  };
  const updjs = (e) => {
    console.log(e);
  };
  const getSelectedJson = (js, parentType, key) => {
    console.log("🚀 ~ file: builder.jsx:261 ~ getSelectedJson ~ key:", key);
    console.log(
      "🚀 ~ file: builder.jsx:261 ~ getSelectedJson ~ parentType:",
      parentType
    );
    console.log(js, "sdd");
    setParentType(parentType);
    setTitle(key);
    setSelectedjson(js);
  };

  const cycleObj = (
    json,
    totalOp,
    dp,
    totalco,
    parentType,
    title,
    single = null
  ) => {
    console.log(totalco, "cycleop");
    if (single) {
      return (
        <div>
          <DynObj
            title={selectedjsonPath !== null ? title : ""}
            isAdmin={isAdmin}
            json={json}
            collapse={collapse}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            totalColors={totalco}
            parentType={parentType}
            path={selectedjsonPath !== null ? "." + title : ""}
          />
        </div>
      );
    }
    if (typeof json == "object" && !Array.isArray(json)) {
      return (
        <div style={{ width: "100%", maxHeight: "60vh" }}>
          <DynObj
            title={selectedjsonPath !== null ? title : ""}
            isAdmin={isAdmin}
            json={json}
            collapse={collapse}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            settJson={settJson}
            totalColors={totalco}
            parentType={parentType}
            path={selectedjsonPath ? selectedjsonPath.path : ""}
          />
        </div>
      );
    }
    if (Array.isArray(json)) {
      return (
        <div style={{ width: "75%" }}>
          <Dyn
            title={selectedjsonPath !== null ? title : ""}
            isAdmin={isAdmin}
            data={json}
            className="col"
            collapse={collapse}
            path={selectedjsonPath ? selectedjsonPath.path : ""}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            totalColors={totalco}
          />
        </div>
      );
    }
  };
  useEffect(() => {
    console.log(files);
    if (files) {
      const error = checkForNull(JSON.parse(files));
      if (!error) {
        setJson(JSON.parse(files));
        updatedNodeConfig(JSON.parse(files));
      } else {
        showError("key should not be null or undefined");
      }
      setFiles(null);
    }
  }, [files]);

  useEffect(() => {
    let totalColor = [];

    if (Object.keys(colorPolicy).length === 0) {
      return setTotalColors([]);
    } else {
      for (const [level, values] of Object.entries(colorPolicy)) {
        const levelOptions = {
          value: colorPolicy[level],
        };

        totalColor.push({
          L: level.slice(5),
          color: levelOptions.value,
        });
      }
      setTotalColors(totalColor);
      console.log(totalColors, "totalColors");
    }
  }, [colorPolicy]);

  useEffect(() => {
    let totalOption = [];
    console.log(controlPolicy, "controlPolicy");
    if (Object.keys(controlPolicy).length == 0) {
      return setTotalOptions([]);
    } else {
      for (const [level, values] of Object.entries(controlPolicy)) {
        const levelOptions = values.map((value) => ({
          label: value.charAt(0).toUpperCase() + value.slice(1),
          value,
        }));

        totalOption.push({
          L: level.slice(5),
          options: levelOptions,
        });
      }
      setTotalOptions(totalOption);
      setOptions(totalOption[0].options);
    }
  }, [controlPolicy]);

  useEffect(() => {
    setJson(defaultJSOn);
    console.log(json, "effectjson");
  }, [defaultJSOn]);

  useEffect(() => {
    (async function () {
      const copiedObject = JSON.parse(JSON.stringify(json));
      // await objectToPaths(copiedObject);

      setDupJson(copiedObject);
    })();
  }, [json]);

  return (
    <>
      {totalOptions && totalOptions.length > 1 ? (
        <div
          className="home-page"
          style={{ height: "85vh", overflow: "hidden" }}
        >
          <div className="tree-view ">
            <div id="myUL">
              <div className="json-container">
                <div className="json-title">
                  <div className="json-title" onClick={() => setToggl(!toggl)}>
                    <Image
                      src={arrow}
                      alt="arrow"
                      class={toggl ? "arrow-caret caret-down " : "arrow-caret"}
                    />

                    <div
                      class="circle"
                      style={{ backgroundColor: `${totalColors[0]?.color}` }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {totalOptions[0]?.L}
                      </span>
                    </div>

                    <Image
                      src={curly}
                      alt="curly-brackets"
                      style={{
                        width: "20px",
                        display: isAdmin?.canAdd ? "inline" : "none",
                      }}
                    />
                  </div>

                  <span
                    ref={iRef}
                    style={{
                      display:
                        isAdmin?.canAdd || isAdmin?.canDelete ? "flex" : "none",
                    }}
                    onClick={(e) => {
                      if (contextMenu) {
                        setContextMenu(null);
                      } else setContextMenu(true);
                    }}
                  >
                    <HiDotsVertical />
                  </span>

                  {contextMenu &&
                    contextMenu === true &&
                    options.length > 0 && (
                      <div className="overlap-panel josn-add-icons">
                        <span
                          style={{
                            visibility: isAdmin?.canAdd ? "visible" : "hidden",
                          }}
                          onClick={() => {
                            setFunc("add");
                          }}
                        >
                          <span
                            onClick={(e) => {
                              if (func === "add") {
                                setFunc(null);
                              } else setFunc("add");
                            }}
                          >
                            <IoMdAdd className="first-add-btn" size={25} />
                          </span>
                        </span>

                        <span
                          style={{
                            display: isAdmin?.canDelete ? "flex" : "none",
                          }}
                          htmlFor=""
                          onClick={() => {
                            setJson({});
                            setSelectedjson({});
                            setDupJson({});
                            setFunc(null);
                          }}
                        >
                          <RiDeleteBin6Line
                            className="first-add-btn trash-color"
                            size={25}
                          />
                        </span>
                      </div>
                    )}
                </div>
                {func && func === "add" && options.length > 0 && (
                  <div className="dots-container">
                    <InputText
                      id="key"
                      onChange={(e) => setKey(e.target.value)}
                      className="inputs"
                      placeholder="Enter key"
                    />

                    <Dropdown
                      id="dropdown"
                      options={options}
                      placeholder="Select an Option"
                      value={selected}
                      onChange={(e) => {
                        setSelected(e.value);
                      }}
                      className="w-10rem h-2rem flex align-items-center border-blue "
                    />
                    <div className="input-container">
                      {selected === "string" && (
                        <>
                          <InputText
                            id="value"
                            onChange={(e) => setValue(e.target.value)}
                            className="inputs"
                            placeholder="Enter value"
                          />
                        </>
                      )}
                    </div>
                    <div className="btns-container">
                      <Toast ref={toast} />
                      {Key &&
                        (selected == "string"
                          ? value
                            ? true
                            : false
                          : true) &&
                        selected && (
                          <div className="check-btn">
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                settJson({
                                  ...json,
                                  [Key]:
                                    selected === "string"
                                      ? { [Key]: value }
                                      : selected === "array"
                                      ? []
                                      : {},
                                });
                                setFunc(null);
                                setSelected(null);
                              }}
                            >
                              <FaCheck color="white" />
                            </span>
                          </div>
                        )}
                      <div className="check-btn close-btn">
                        <span
                          onClick={() => setFunc(null)}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <IoCloseSharp color="white" size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {Object.keys(dupJson).map((element, index) => {
                  if (typeof dupJson[element] !== "object" && render) {
                    setRender(false);
                  }
                })}
                {render && totalOptions.length > 2 && (
                  <TreeView
                    isAdmin={isAdmin}
                    json={dupJson}
                    iterator={Number(0)}
                    to={toggl}
                    getjson={getSelectedJson}
                    funtionality={functionality}
                    setToggle={setToggle}
                    setPath={setSelectedjsonPath}
                    totalOptions={totalOptions.length > 0 && totalOptions}
                    depth={1}
                    setDepth={setGDepth}
                    totalColors={totalColors.length > 0 && totalColors}
                    path={""}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="panel-view">
            <div className="expand-btns">
              {/* <span
                className="expand-btn"
                onClick={() => {
                  setCollapse(!collapse);
                }}
              >
                <MdOutlineExpand />
              </span> */}
              <span>
                {!Object.keys(json).length && (
                  <span className="fileUpload">
                    <Upload setFiles={setFiles} />
                  </span>
                )}
              </span>
            </div>
            {Object.keys(json).length && (
              <div className="json-viewer">
                <div
                  style={{ width: "90%" }}
                  className="flex flex-column align-items-center gap-2  border-round p-3  overflow-y-scroll"
                >
                  {totalColors.length > 2 &&
                    selectedjson &&
                    cycleObj(
                      selectedjson,
                      totalOptions,
                      gDepth,
                      totalColors,
                      parentType,
                      title
                    )}
                  {(totalOptions.length <= 2 || !render) &&
                    cycleObj(
                      json,
                      totalOptions,
                      gDepth,
                      totalColors,
                      "",
                      ""
                    )}
                </div>
              </div>
            )}
          </div>
          <Side
            toggle={toggle}
            setToggle={setToggle}
            func={func}
            path={path}
            json={json}
            setjs={settJson}
          />
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <SingleObj
            singlejson={json}
            options={options}
            updateSinglejs={updateSinglejs}
            isAdmin={isAdmin}
          />
        </div>
      )}
    </>
  );
}
