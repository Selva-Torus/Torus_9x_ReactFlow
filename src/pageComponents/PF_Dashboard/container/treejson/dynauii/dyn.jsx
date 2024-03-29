import React, { useRef } from "react";
import { useEffect, useState } from "react";
import DynObj from "./DynObj";
import AddElements from "./AddElemnts";
import bracket from "../assets/dynicons/bracket.png";
import check from "../assets/dynicons/checked.png";
import "../../treejson/tree.css";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

import { FaCheck } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import InputTxt from "./InputTxt";
export default function Dyn({
  data,
  collapse,
  title,
  path,
  functionality,
  totalOptions,
  depth,
  isAdmin,
  totalColors,
}) {
  const [func, setFunc] = useState(null);
  const [currentJson, setCurrentJson] = useState([]);
  const [options, setOptions] = useState([]);

  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [parentPath, setParentPath] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
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

  const handlekey = (e) => {
    setValue(e.target.value);
  };

  console.log(currentJson, data, "data");
  useEffect(() => {
    setOptions(totalOptions[depth]?.options);
    if (JSON.stringify(data) !== JSON.stringify(currentJson)) {
      setCurrentJson(data);
    }
    if (path !== "") {
      let pth = path.split(".");
      pth.pop();
      setParentPath(pth.join("."));
    }
    return () => {
      setCurrentJson([]);
      setOptions([]);
      setFunc(null);
      setParentPath(null);
    };
  }, [data, totalOptions, depth, totalColors, path]);
  return (
    <>
      {totalOptions.length > depth && (
        <div className="list-array-obj" key={`${path}`}>
          <div className="array-title-box ">
            <div className="array-title">
              <div className="array-titles flex  ">
                {selected ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        defaultValue={title}
                        // value={keys}
                        onChange={(e) => {
                          handlekey(e);
                        }}
                        className="inputs"
                      />
                    </div>
                    <div>
                      <Image
                        src={check}
                        alt="check"
                        width={15}
                        height={20}
                        onClick={(e) => {
                          functionality("edit", path, value);
                          setSelected(null);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span>
                      <div
                        class="circle"
                        style={{
                          backgroundColor: ` ${totalColors[depth]?.color}`,
                        }}
                      >
                        <span class="text">{totalOptions[depth]?.L}</span>
                      </div>
                    </span>
                    {title} :{" "}
                    <Image
                      src={bracket}
                      alt="array"
                      style={{
                        width: "20px",
                        display: isAdmin?.canAdd ? "inline" : "none",
                      }}
                    />
                  </>
                )}

                <div className="top-right-dot-icon">
                  <span
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
                  </span>
                  {contextMenu && (
                    <div className="overlap-panels array-overlap">
                      <span
                        style={{
                          display: isAdmin?.canAdd ? "inline" : "none",
                        }}
                        className="second-add-btn"
                        onClick={() => setFunc("add")}
                      >
                        <IoMdAdd className="second-add-btn-img" />
                      </span>
                      <span
                        style={{
                          display: isAdmin?.canEdit ? "inline" : "none",
                        }}
                        htmlFor=""
                        onClick={(e) => setSelected(`${path}.${title}`)}
                        className="second-add-btn"
                      >
                        <FiEdit className="second-add-btn-img" />
                      </span>
                      <span
                        style={{
                          display: isAdmin?.canDelete ? "inline" : "none",
                        }}
                        htmlFor=""
                        className="second-add-btn trash-color"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          functionality("delete", path);
                        }}
                      >
                        <RiDeleteBin6Line className="second-add-btn-img" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {func && func == "add" && (
            <AddElements
              type={"array"}
              functionality={functionality}
              setFunc={setFunc}
              json={currentJson}
              options={options}
              path={path}
            />
          )}
          <table className="object-list">
            {currentJson.map((Element, index) => {
              if (!Array.isArray(Element)) {
                if (typeof Element == "object") {
                  return (
                    <tr style={{ flexGrow: 1 }}>
                      <DynObj
                        key={title + " - " + +index}
                        title={title + " - " + +index}
                        isAdmin={isAdmin}
                        json={Element}
                        collapse={collapse}
                        functionality={functionality}
                        depth={depth + 1}
                        totalOptions={totalOptions}
                        totalColors={totalColors}
                        parentType={"array"}
                        path={`${path}.${index}`}
                      />
                    </tr>
                  );
                }
              } else if (Array.isArray(Element)) {
                return (
                  <tr className="array-box">
                    <Dyn
                      key={`${path}.${index}`}
                      isAdmin={isAdmin}
                      data={Element}
                      collapse={collapse}
                      functionality={functionality}
                      title={index}
                      path={`${path}.${index}`}
                      totalOptions={totalOptions}
                      depth={depth + 1}
                      totalColors={totalColors}
                    />
                  </tr>
                );
              }
              return (
                <tr>
                  <InputTxt
                    functionality={functionality}
                    isAdmin={isAdmin}
                    keys={index}
                    obj={currentJson}
                    path={path}
                    key={index}
                    type="array"
                  />
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
}
