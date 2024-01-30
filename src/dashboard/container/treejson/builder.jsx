import React from "react";

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
import curly from "@/dashboard/assets/dynicons/curly-brackets.png";
import arrow from "@/dashboard/assets/dynicons/arrow.png";
import "../treejson/tree.css";

import SingleObj from "./dynauii/SIngleObj";
import { Toast } from "primereact/toast";

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
  const [render, setRender] = useState(true);

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

  const toast = useRef(null);

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
      life: 3000
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

  const settJson = (js, value = null) => {
    (async function () {
      setJson(js);

      const copiedObject = JSON.parse(JSON.stringify(js));
      await objectToPaths(copiedObject);

      if (selectedjson) {
        let result = selectedjsonPath.path.split(".");

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
    let js = json;
    _.update(js, path, function (n) {
      if (Array.isArray(n)) {
        let updateValue =
          option === "string" || option === "number"
            ? value
            : option === "array"
            ? []
            : option === "boolean"
            ? false
            : {};

        let arr = [...n];
        arr.push(updateValue);
        n = arr;
      } else {
        if (typeof n == "object") {
          let updateValue = {
            key: key,
            value:
              option === "string" || option === "number"
                ? value
                : option === "array"
                ? []
                : option === "boolean"
                ? false
                : {},
          };

          n[updateValue.key] = updateValue.value;
        } else {
          let updateValue = value;
          n[key] = updateValue;
        }
      }
      return n;
    });
    console.log(js, "js");
    settJson(js);
  };
  console.log(selectedjson, "Selsctedjson");
  const functionality = (func, path, value = null) => {
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
      console.log(value, "vae");
      if (value) {
        let path = _.toPath(result);
        let nestedObj = json;
        for (let i = 0; i < path.length - 1; i++) {
          nestedObj = nestedObj[path[i]];
        }

        nestedObj[value] = nestedObj[path[path.length - 1]];

        delete nestedObj[path[path.length - 1]];

        console.log(json, "json123");
        settJson(json);
      }
    }
    if (func == "update") {
      if (value) {
        const js = json;
        console.log(value, "result");

        _.update(js, result, (n) => {
          if (Array.isArray(n)) {
            console.log(n, "nArray");
            n.splice(value.key, 1, value.value);
            return n;
          }
          console.log(n, "nObject");
          n[value.key] = value.value;
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
            title={title}
            isAdmin={isAdmin}
            json={json}
            collapse={collapse}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            totalColors={totalco}
            parentType={parentType}
          />
        </div>
      );
    }
    if (typeof json == "object" && !Array.isArray(json)) {
      return (
        <div style={{ width: "100%", maxHeight: "60vh" }}>
          <DynObj
            title={title}
            isAdmin={isAdmin}
            json={json}
            collapse={collapse}
            functionality={functionality}
            depth={dp}
            totalOptions={totalOp}
            settJson={settJson}
            totalColors={totalco}
            parentType={parentType}
          />
        </div>
      );
    }
    if (Array.isArray(json)) {
      return (
        <div style={{ width: "75%" }}>
          <Dyn
            title={title}
            isAdmin={isAdmin}
            data={json}
            className="col"
            collapse={collapse}
            path={selectedjsonPath.path}
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
      await objectToPaths(copiedObject);

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
                    <img
                      src={arrow}
                      alt="arrow"
                      class={toggl ? "arrow-caret caret-down " : "arrow-caret"}
                    />

                    <div
                      class="circle"
                      style={{ backgroundColor: `${totalColors[0]?.color}` }}
                    >
                      <i
                        class={`fa-solid fa-number fa-${totalOptions[0]?.L}`}
                      ></i>
                    </div>

                    <img
                      src={curly}
                      alt="curly-brackets"
                      style={{ width: "20px" ,
                        display: isAdmin?.canAdd ? "inline" : "none",
                      }} 
                    />
                  </div>

                  <span
                    ref={iRef}
                    style={{
                      display:
                        isAdmin?.canAdd || isAdmin?.canDelete
                          ? "inline"
                          : "none",
                    }}
                    onClick={(e) => {
                      if (contextMenu) {
                        setContextMenu(null);
                      } else setContextMenu(true);
                    }}
                  >
                    <i class="fa-solid fa-ellipsis caret-down"></i>
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
                          className="first-add-btn"
                        >
                          <span
                            onClick={(e) => {
                              if (func === "add") {
                                setFunc(null);
                              } else setFunc("add");
                            }}
                          >
                            <i class="fa-solid fa-plus first-add-btn-img"></i>
                          </span>
                        </span>

                        <span
                          style={{
                            display: isAdmin?.canDelete ? "inline" : "none",
                          }}
                          htmlFor=""
                          onClick={() => {
                            setJson({});
                            setSelectedjson(null);
                          }}
                          className="first-add-btn trash-color"
                        >
                          <i class="fa-solid fa-trash first-add-btn-img"></i>
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
                              onClick={() => {
                                settJson({
                                  ...json,
                                  [Key]:
                                    selected === "string"
                                      ?{[Key]:value}
                                      : selected === "array"
                                      ? []
                                      : {},
                                });
                                setFunc(null);
                                setSelected(null);
                              }}
                            >
                              <i class="fa-solid fa-check"></i>
                            </span>
                          </div>
                        )}
                      <div className="check-btn close-btn">
                        <span onClick={() => setFunc(null)}>
                          <i
                            class="fa-solid fa-xmark"
                            style={{ color: "white" }}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {Object.values(dupJson).map((element, index) => {
                  if (
                    typeof element !== "object" &&
                    !Array.isArray(element) &&
                    render
                  ) {
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
                  />
                )}
              </div>
            </div>
          </div>

          <div className="panel-view">
            <div className="expand-btns">
              <span
                className="expand-btn"
                onClick={() => {
                  setCollapse(!collapse);
                }}
              >
                <i class="fa-solid fa-arrows-left-right-to-line caret-down"></i>
              </span>
            </div>
            {Object.keys(json).length && (
              <div className="json-viewer">
                {selectedjson && (
                  <div
                    style={{ width: "90%" }}
                    className="flex flex-column align-items-center gap-2  border-round p-3  overflow-y-scroll"
                  >
                    {totalColors.length > 2 &&
                      cycleObj(
                        selectedjson,
                        totalOptions,
                        gDepth,
                        totalColors,
                        parentType,
                        title
                      )}
                  </div>
                )}

                {totalOptions.length <= 2 &&
                  cycleObj(dupJson, totalOptions, gDepth, totalColors)}
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
