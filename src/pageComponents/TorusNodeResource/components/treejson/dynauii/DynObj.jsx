import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dyn from "./dyn";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

import { FaCheck } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import InputTxt from "./InputTxt";

import AddElements from "./AddElemnts";

import object from "../assets/dynicons/curly-brackets.png";
import arrow from "../assets/dynicons/arrow.png";
import "../../treejson/tree.css";
import { Dropdown } from "./Dropdown";

export default function DynObj({
  title,
  json,
  collapse,
  functionality,
  totalOptions,
  depth,
  settJson,
  isAdmin,
  totalColors,
  parentType,
  path,
}) {
  const [obj, setObj] = useState(null);
  const [func, setFunc] = useState(null);
  const [options, setOptions] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const iRef = useRef(null);

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


  useEffect(() => {
    if (JSON.stringify(json) !== JSON.stringify(obj)) {
      setObj(json);
    }
    setOptions(totalOptions[depth]?.options);
    return () => {
      setFunc(null);
      setOptions([]);
      setObj(null);
    };
  }, [json, collapse, depth, totalOptions]);
  return (
    <>
      {totalOptions.length > depth && (
        <div className="obj-container">
          <details
            open={collapse}
            className=" obj-box"
            onToggle={(e) => setExpanded(e.currentTarget.open)}
          >
            <summary className="summary-title">
              <div className="heading-primary ">
                {expanded ? (
                  <Image src={arrow} alt="" className="arrow-caret caret-down" />
                ) : (
                  <Image src={arrow} alt="" className="arrow-caret" />
                )}

                <div
                  class="circle"
                  style={{ backgroundColor: `${totalColors[depth]?.color}` }}
                >
                  <span class="text">{totalOptions[depth]?.L}</span>
                </div>

                {title}

                <Image
                  src={object}
                  style={{
                    width: "20px",
                    display: isAdmin?.canAdd ? "inline" : "none",
                  }}
                />
              </div>

              <>
                <div className="top-right-dot-icon">
                  <div
                    className=""
                    style={{
                      display:
                        isAdmin?.canAdd || isAdmin?.canDelete
                          ? "inline"
                          : "none",
                    }}
                  >
                    {options.length !== 0 && (
                      <span
                        ref={iRef}
                        onClick={(e) => {
                          e.preventDefault();
                          if (contextMenu) {
                            setContextMenu(null);
                          } else setContextMenu(true);
                        }}
                      >
                        <HiDotsVertical />
                      </span>
                    )}
                  </div>
                  {contextMenu && (
                    <div className="overlap-panels">
                      <span
                        style={{
                          display: isAdmin?.canAdd ? "inline" : "none",
                        }}
                        className="first-add-btn"
                        onClick={(e) => {
                          setFunc("add");
                          e.preventDefault();
                        }}
                      >
                        <IoMdAdd className="first-add-btn-img" />
                      </span>

                      <span
                        style={{
                          display: isAdmin?.canDelete ? "inline" : "none",
                        }}
                        htmlFor=""
                        className="first-add-btn trash-color"
                        onClick={() => functionality("delete", path)}
                      >
                        <RiDeleteBin6Line className="first-add-btn-img" />
                      </span>
                    </div>
                  )}
                </div>
              </>
            </summary>
            <div className="obj-model">
              {func && func == "add" && (
                <AddElements
                  type={"object"}
                  functionality={functionality}
                  setFunc={setFunc}
                  json={json}
                  options={options}
                  path={path}
                />
              )}
            </div>
            {obj && (expanded || collapse) && (
              <>
                <div style={{ marginBottom: "10px" }}>
                  {Object.keys(obj).map((key) => {
                    console.log(obj[key], "typee");
                    if (
                      key !== "isHeader" &&
                      key !== "path" &&
                      key !== "dropdownlabel" &&
                      key !== "dropdownvalue"
                    ) {
                      if (typeof obj[key] !== "object") {
                        return (
                          <div
                            style={{ marginLeft: "20px", marginBottom: "10px" }}
                          >
                            <InputTxt
                              isAdmin={isAdmin}
                              key={obj.path}
                              keys={key}
                              obj={obj}
                              path={path}
                              functionality={functionality}
                            />
                          </div>
                        );
                      }
                    }
                  })}
                </div>
                <div className="home-page-view" style={{ overflow: "scroll" }}>
                  {Object.keys(obj).map((key, index) => {
                    if (key !== "isHeader" && key !== "path") {
                      if (
                        !Array.isArray(obj[key]) &&
                        typeof obj[key] === "object"
                      ) {
                        return (
                          <> 
                            {
                            obj[key]?.hasOwnProperty("dropdownlabel") ? (
                              <Dropdown
                                isAdmin={isAdmin}
                                key={obj.path}
                                keys={key}
                                obj={obj}
                                path={path}
                                functionality={functionality}
                              />
                            ) : (
                              <div style={{ flexGrow: 1 }}>
                                <DynObj
                                  key={path + "." + key}
                                  title={key}
                                  json={obj[key]}
                                  collapse={collapse}
                                  functionality={functionality}
                                  totalOptions={totalOptions}
                                  depth={depth + 1} 
                                  isAdmin={isAdmin}
                                  totalColors={totalColors}
                                  parentType={"object"}
                                  path={path + "." + key}
                                />
                              </div>
                            )}
                          </>
                        );
                      }
                      if (Array.isArray(obj[key]) && key !== "dropdownvalue" && key !== "dropdownlabel") {
                        return (
                          <tr>
                            <Dyn
                              key={path + "." + key}
                              data={obj[key]}
                              title={key}
                              collapse={collapse}
                              path={path + "." + key}
                              functionality={functionality}
                              depth={depth + 1}
                              totalOptions={totalOptions}
                              isAdmin={isAdmin}
                              totalColors={totalColors}
                            />
                          </tr>
                        );
                      }
                    }
                  })}
                </div>
              </>
            )}
          </details>
        </div>
      )}
    </>
  );
}
