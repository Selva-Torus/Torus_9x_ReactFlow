import React, { useEffect, useState } from "react";
import arrow from "@/dashboard/assets/dynicons/arrow.png";

import curly from "@/dashboard/assets/dynicons/curly-brackets.png";
import bracket from "@/dashboard/assets/dynicons/bracket.png";

import AddElements from "./AddElemnts";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "../../treejson/tree.css";
import Image from "next/image";


const TreeView = ({
  titile,
  json,
  iterator,
  to = null,
  getjson,
  funtionality,
  setToggle,
  setPath,
  totalOptions,
  depth,
  setDepth,
  isAdmin,
  totalColors,
}) => {
  const [render, setRender] = useState(null);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [func, setFunc] = useState(null);
  const [keys, setKey] = useState(null);
  const [jsondata, setJsondata] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const renderTree = (data) => {
    if (depth <= 2) {
      if (!Array.isArray(data) && typeof data === "object") {
        return (
          <>
            <ul
             style={{marginBottom:"0" ,marginTop:"0" }}
              className={
               
                Number(iterator) < 2
                  ? to
                    ? "active list-title"
                    : "nested"
                  : "nested"
              }
            >
              {Object.keys(data).map((key) => {
                if (key !== "isHeader" && key !== "path") {
                  if (typeof data[key] === "object") {
                    return (
                      <>
                        <li className="tree-list  ">
                          <span className="tree-list-title">
                            <div
                              className="tree-list-title"
                              onClick={() => {
                                if (keys === key) {
                                  setKey(null);
                                  getjson(null);
                                } else {
                                  setKey(key);
                                }
                                if (
                                  !Array.isArray(data[key]) ||
                                  totalOptions.length == 2
                                ) {
                                  setPath({
                                    header: key,
                                    path: data[key].path,
                                  });
                                  setDepth(depth);
                                  getjson(
                                    { ...data[key] },

                                    !Array.isArray(data[key])
                                      ? "array"
                                      : "object",
                                    key
                                  );
                                }
                              }}
                            >
                              <Image
                                src={arrow}
                                alt="arrow"
                                className={`${
                                  Number(iterator) < 1 &&
                                  keys == key &&
                                  typeof data[key] === "object" &&
                                  Array.isArray(data[key])
                                    ? "arrow-caret caret-down"
                                    : "arrow-caret "
                                }`}
                              />
                              <div
                                class="circle"
                                style={{
                                  backgroundColor: `${totalColors[depth]?.color}`,
                                }}
                              >
                                <span class="text">
                                  {totalOptions[depth]?.L}
                                </span>
                              </div>
                    
                              <span className="heading">{key && key}</span>

                           
                              <span className="flex">
                                {Array.isArray(data[key]) ? (
                                  <Image
                                    src={bracket}
                                    alt="bracket"
                                    style={{ width: "20px" ,
                                    display: isAdmin?.canAdd ? "inline" : "none",
                                  }} 
                                  />
                                ) : (
                                  typeof data[key] == "object" &&
                                  !Array.isArray(data[key]) && (
                                    <Image
                                      src={curly}
                                      alt="curly"
                                      style={{ width: "20px" ,
                        display: isAdmin?.canAdd ? "inline" : "none",
                      }} 
                                    />
                                  )
                                )}
                              </span>
                            </div>

                            <span
                              style={{
                                display:
                                  isAdmin?.canAdd || isAdmin?.canDelete
                                    ? "inline"
                                    : "none",
                              }}
                            >
                              <span
                                onClick={(e) => {
                                  e.preventDefault();

                                  if (clicked) {
                                    setClicked(null);
                                  } else {
                                    setClicked(key);

                                    setPoints({
                                      x: e.pageX,
                                      y: e.pageY,
                                    });
                                  }
                                }}
                              >
                                <i class="fa-solid fa-ellipsis caret-down"></i>
                              </span>

                              {clicked == key && (
                                <div>
                                  <div className="overlap-panel">
                                    <span
                                      style={{
                                        display: isAdmin?.canAdd
                                          ? "inline"
                                          : "none",
                                      }}
                                      onClick={() => {
                                        setFunc("add")
                                      }}
                                      className="second-add-btn"
                                    >
                                      <i class="fa-solid fa-plus second-add-btn-img"></i>
                                    
                                    </span>

                                    <span
                                      style={{
                                        display: isAdmin?.canEdit
                                          ? "inline"
                                          : "none",
                                      }}
                                      htmlFor=""
                                      onClick={() => setFunc("edit")}
                                      className="second-add-btn"
                                    >
                                      <i class="fa-regular fa-pen-to-square second-add-btn-img"></i>
                                    </span>
                                    <span
                                      style={{
                                        display: isAdmin?.canDelete
                                          ? "inline"
                                          : "none",
                                      }}
                                      htmlFor=""
                                      onClick={() =>
                                        funtionality("delete", `.${key}`)
                                      }
                                      className="first-add-btn trash-color"
                                    >
                                      <i class="fa-solid fa-trash first-add-btn-img"></i>
                                    </span>
                                  </div>
                                  {func && func === "add" ? (
                                    <div className="tree-view-add-model">
                                      <AddElements
                                        type={
                                          Array.isArray(data[key])
                                            ? "array"
                                            : typeof data[key] == "object" &&
                                              "object"
                                        }
                                        functionality={funtionality}
                                        json={{ ...data[key], path: `.${key}` }}
                                        path={`.${key}`}
                                        options={options}
                                        setFunc={setFunc}
                                      />
                                    </div>
                                  ) : (
                                    func === "edit" && (
                                      <div className="edit-box">
                                        <label htmlFor="">New Key</label>
                                        <InputText
                                          className="ml-3"
                                          defaultValue={key}
                                          value={value}
                                          onChange={(e) => {
                                            setValue(e.target.value);
                                          }}
                                        />

                                        <Button
                                          label="Save"
                                          severity="help"
                                          style={{
                                            marginLeft: "15px",
                                            cursor: "pointer",
                                            width: "80px",
                                            height: "30px",
                                            marginBottom: "10px",
                                            borderRadius: "15px",
                                          }}
                                          onClick={() => {
                                            funtionality(
                                              "edit",
                                              `.${key}`,
                                              value
                                            );
                                            setFunc(null);
                                          }}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </span>
                          </span>
                        </li>

                        {Array.isArray(data[key]) &&
                          totalOptions &&
                          totalOptions.length > 2 && (
                            <TreeView
                              json={data[key]}
                              titile={key}
                              iterator={Number(iterator) + 1}
                              to={keys == key ? true : false}
                              getjson={getjson}
                              funtionality={funtionality}
                              setPath={setPath}
                              totalOptions={totalOptions}
                              depth={depth + 1}
                              setDepth={setDepth}
                              isAdmin={isAdmin}
                              totalColors={totalColors}
                            />
                          )}
                      </>
                    );
                  } else {
                    return <li>{`${key} : ${data[key]}`}</li>;
                  }
                }
              })}
            </ul>
          </>
        );
      } else if (Array.isArray(data)) {
        return (
          <>
            <ul
              className={
                Number(iterator) < 2 ? (to ? "active" : "nested") : "nested"
              }
            >
              {data.map((element, index) => {
                if (typeof element === "object" && data[index]) {
                  return (
                    <>
                      <li
                        className={`list-titles`}
                        onClick={() => {
                          if (keys === index) {
                            setKey(null);
                          } else {
                            setKey(index);
                          }
                          if (Number(iterator) >= 1) {
                      
                            setDepth(depth);
                            setPath({
                              header: data[index][[data[index]["isHeader"]]]
                                ? data[index][[data[index]["isHeader"]]]
                                : index,

                              path: `.${titile}[${index}]`,
                            });
                            keys === index
                              ? getjson("")
                              : getjson(Array.isArray(element) ? [...element]:{...element}, "array", index);
                          }
                        }}
                      >
                        <Image
                          src={arrow}
                          alt=""
                          width={20}
                          className={
                            Number(iterator) < 1 && keys === index
                              ? "arrow-caret caret-down"
                              : "arrow-caret"
                          }
                        />
                        <div
                          class="circle"
                          style={{
                            backgroundColor: `${totalColors[depth]?.color}`,
                          }}
                        >
                          <span class="text">{totalOptions[depth]?.L}</span>
                        </div>
                        <span className="heading ">
                          {data[index][[data[index]["isHeader"]]]
                            ? data[index][[data[index]["isHeader"]]]
                            : index}
                        </span>

                        {Array.isArray(element) ? (
                                  <Image
                                    src={bracket}
                                    alt="bracket"
                                    style={{ width: "20px" ,
                                    display: isAdmin?.canAdd ? "inline" : "none",
                                  }} 
                                  />
                                ) : (
                                  typeof element == "object" &&
                                  !Array.isArray(element) && (
                                    <Image
                                      src={curly}
                                      alt="curly"
                                      style={{ width: "20px" ,
                        display: isAdmin?.canAdd ? "inline" : "none",
                      }} 
                                    />
                                  )
                                )}
                      </li>

                      {totalOptions && totalOptions.length > 2 && (
                        <TreeView
                          json={element}
                          iterator={Number(iterator) + 1}
                          to={keys === index ? true : false}
                          getjson={getjson}
                          setPath={setPath}
                          totalOptions={totalOptions}
                          depth={depth + 1}
                          setDepth={setDepth}
                          isAdmin={isAdmin}
                          totalColors={totalColors}
                        />
                      )}
                    </>
                  );
                }
                if (data[index]) {
                  return (
                    <li>
                      {element}-L{totalOptions[depth]?.L}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </>
        );
      } else {
        return (
          <>
            <li>
              {data}-L{totalOptions[depth]?.L}
            </li>
          </>
        );
      }
    }
  };

  useEffect(() => {
    setJsondata(json);
    console.log(json, "json");
    setOptions(totalOptions[depth]?.options);
  }, [json]);
  return <>{jsondata && renderTree(jsondata)}</>;
};

export default TreeView;
