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
}) {
  const [obj, setObj] = useState();
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
    if (json) {
      setObj(json);
      setOptions(totalOptions[depth]?.options);
      console.log(parentType, "objcolors");
      return () => {
        setFunc(null);
      };
    }
  }, [json, collapse, depth, totalOptions, totalColors]);
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

                {parentType == "object"
                  ? title
                  : json.hasOwnProperty("isHeader")
                  ? json[json["isHeader"]]
                  : title}

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
                        onClick={() => functionality("delete", json.path)}
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
                />
              )}
            </div>
            {obj && (
              <>
                <div style={{ marginBottom: "10px" }}>
                  {Object.keys(obj).map((key) => {
                    if (key !== "isHeader" && key !== "path") {
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
                              functionality={functionality}
                            />
                          </div>
                        );
                      }
                    }
                  })}
                </div>
                <div className="home-page-view" style={{ overflow: "scroll" }}>
                  {Object.keys(obj).map((key) => {
                    if (key !== "isHeader" && key !== "path") {
                      if (
                        !Array.isArray(obj[key]) &&
                        typeof obj[key] === "object"
                      ) {
                        return (
                          <div style={{ flexGrow: 1 }}>
                            <DynObj
                              title={key}
                              json={obj[key]}
                              collapse={collapse}
                              functionality={functionality}
                              totalOptions={totalOptions}
                              depth={depth + 1}
                              isAdmin={isAdmin}
                              totalColors={totalColors}
                              parentType={"object"}
                            />
                          </div>
                        );
                      }
                      if (Array.isArray(obj[key])) {
                        return (
                          <tr>
                            <Dyn
                              data={obj[key]}
                              title={key}
                              collapse={collapse}
                              path={obj.path == "" ? key : obj.path}
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
