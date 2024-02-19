import React, { useEffect, useState } from "react";
import arrow from "../assets/dynicons/arrow.png";

import curly from "../assets/dynicons/curly-brackets.png";
import bracket from "../assets/dynicons/bracket.png";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

import AddElements from "./AddElemnts";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "../../treejson/tree.css";

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
  path,
}) => {
  const [render, setRender] = useState(null);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [func, setFunc] = useState(null);
  const [keys, setKey] = useState(null);
  const [jsondata, setJsondata] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [points, setPoints] = useState(null);

  const renderTree = (data) => {
    if (depth <= 3) {
      if (!Array.isArray(data) && typeof data === "object") {
        return (
          <>
            <ul
              style={{ marginBottom: "0", marginTop: "0" }}
              className={to ? "active list-title" : "nested"}
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
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (keys === key) {
                                  setKey(null);
                                } else {
                                  setKey(key);
                                }
                                // if (
                                //   !Array.isArray(data[key])
                                //   // totalOptions.length == 2
                                // ) {

                                // }
                              }}
                            >
                              <Image
                                src={arrow}
                                alt="arrow"
                                className={`${
                                  keys == key && typeof data[key] === "object"
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

                              <span
                                className="heading"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (points == key) {
                                    setPoints(null);
                                    setPath(null);
                                    setDepth(null);
                                    getjson(null);
                                  } else {
                                    setPoints(key);
                                    setPath({
                                      header: key,
                                      path: path + "." + key,
                                    });
                                    setDepth(depth);
                                    getjson(
                                      data[key],

                                      !Array.isArray(data[key])
                                        ? "array"
                                        : "object",
                                      key
                                    );
                                  }
                                }}
                              >
                                {key && key}
                              </span>

                              <span className="flex">
                                {Array.isArray(data[key]) ? (
                                  <Image
                                    src={bracket}
                                    alt="bracket"
                                    style={{
                                      width: "20px",
                                      display: isAdmin?.canAdd
                                        ? "inline"
                                        : "none",
                                    }}
                                  />
                                ) : (
                                  typeof data[key] == "object" &&
                                  !Array.isArray(data[key]) && (
                                    <Image
                                      src={curly}
                                      alt="curly"
                                      style={{
                                        width: "20px",
                                        display: isAdmin?.canAdd
                                          ? "inline"
                                          : "none",
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
                                    ? "flex"
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
                                  }
                                }}
                              >
                                <HiDotsVertical />
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
                                        setFunc("add");
                                      }}
                                      className="second-add-btn"
                                    >
                                      <IoMdAdd size={15} />
                                    </span>

                                    <span
                                      style={{
                                        display: isAdmin?.canEdit
                                          ? "flex"
                                          : "none",
                                      }}
                                      htmlFor=""
                                      onClick={() => setFunc("edit")}
                                      className="second-add-btn"
                                    >
                                      <FiEdit size={15} />
                                    </span>
                                    <span
                                      style={{
                                        display: isAdmin?.canDelete
                                          ? "inline"
                                          : "none",
                                      }}
                                      htmlFor=""
                                      onClick={() => {
                                        funtionality(
                                          "delete",
                                          path + `.${key}`
                                        );
                                        setClicked(null);
                                      }}
                                      className="first-add-btn trash-color"
                                    >
                                      <RiDeleteBin6Line size={15} />
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
                                        json={data[key]}
                                        path={path + `.${key}`}
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
                                            funtionality("edit", path, {
                                              oldKey: key,
                                              newKey: value,
                                            });
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

                        {typeof data[key] === "object" &&
                          totalOptions &&
                          totalOptions.length > 2 &&
                          key == keys && (
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
                              path={path + `.${key}`}
                            />
                          )}
                      </>
                    );
                  }
                }
              })}
            </ul>
          </>
        );
      } else if (Array.isArray(data)) {
        return (
          <>
            <ul className={to ? "active" : "nested"}>
              {data.map((element, index) => {
                if (typeof element === "object" && data[index]) {
                  return (
                    <>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (points === index) {
                            setPoints(null);
                            setDepth(0);
                            setPath(null);
                            getjson(null);
                          } else {
                            setPoints(index);
                            setDepth(depth);
                            setPath({
                              header: data[index][[data[index]["isHeader"]]]
                                ? data[index][[data[index]["isHeader"]]]
                                : index,

                              path: path + `.${index}`,
                            });
                            keys === index
                              ? getjson("")
                              : getjson(element, "array", index);
                          }
                        }}
                      >
                        <li
                          className={`list-titles`}
                          onClick={() => {
                            if (keys === index) {
                              setKey(null);
                            } else {
                              setKey(index);
                            }
                            // if (Number(iterator) >= 1) {

                            // }
                          }}
                        >
                          <Image
                            src={arrow}
                            alt=""
                            width={20}
                            className={`${
                              keys == index && typeof data[index] === "object"
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
                            <span class="text">{totalOptions[depth]?.L}</span>
                          </div>
                          <span className="heading">
                            {data[index][[data[index]["isHeader"]]]
                              ? data[index][[data[index]["isHeader"]]]
                              : index}
                          </span>

                          {Array.isArray(element) ? (
                            <Image
                              src={bracket}
                              alt="bracket"
                              style={{
                                width: "20px",
                                display: isAdmin?.canAdd ? "inline" : "none",
                              }}
                            />
                          ) : (
                            typeof element == "object" &&
                            !Array.isArray(element) && (
                              <Image
                                src={curly}
                                alt="curly"
                                style={{
                                  width: "20px",
                                  display: isAdmin?.canAdd ? "inline" : "none",
                                }}
                              />
                            )
                          )}
                        </li>
                      </span>

                      {typeof element === "object" &&
                        totalOptions &&
                        totalOptions.length > 2 &&
                        keys == index && (
                          <TreeView
                            json={element}
                            iterator={Number(iterator) + 1}
                            to={keys === index ? true : false}
                            getjson={getjson}
                            setPath={setPath}
                            totalOptions={totalOptions}
                            depth={depth + 1}
                            setDepth={setDepth}
                            funtionality={funtionality}
                            isAdmin={isAdmin}
                            totalColors={totalColors}
                            path={path + `.${index}`}
                          />
                        )}
                    </>
                  );
                }

                return null;
              })}
            </ul>
          </>
        );
      }
    }
  };

  useEffect(() => {
    if (JSON.stringify(json) !== JSON.stringify(jsondata)) {
      setJsondata(json);
    }

    setOptions(totalOptions[depth]?.options);
  }, [json]);
  return <>{jsondata && renderTree(jsondata)}</>;
};

export default TreeView;
