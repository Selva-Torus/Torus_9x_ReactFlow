import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { FaCheck } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import "../../treejson/tree.css";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

function InputTxt({ keys, obj, functionality, isAdmin }) {
  const [value, setValue] = useState(null);
  const [selectedinput, setSelectedinput] = useState(null);
  const [keyvalue, setKeyvalue] = useState(null);
  const [selectedkey, setSelectedkey] = useState(null);
  const [selectedBoolean, setSelectedBoolean] = useState(null);

  const bool = [{ name: "true" }, { name: "false" }];
  const handlekey = (e) => {
    setKeyvalue(e.target.value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div key={obj.path} className="input-container">
        {selectedkey ? (
          <div className="">
            <div className="edit-tname">
              <input
                type="text"
                defaultValue={keys}
                onChange={(e) => {
                  handlekey(e);
                }}
                className="inputs"
              />
              <div className="buttons-check">
                <span className="save-btns">
                  <span
                    onClick={(e) => {
                      functionality("edit", `${obj.path}.${keys}`, keyvalue);

                      setSelectedkey(null);
                    }}
                  >
                    <FaCheck color="white" />
                  </span>
                  <span onClick={() => setSelectedkey(null)}>
                    <IoCloseSharp color="white" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="tname-title">
              <span style={{ textTransform: "capitalize" }}>{keys}:</span>
              <span
                style={{
                  display:
                    isAdmin?.canAdd || isAdmin?.canDelete ? "inline" : "none",
                }}
                onClick={() => setSelectedkey(keys)}
              >
                <FiEdit size={15} color="rgba(0,0,0,0.5)" />
              </span>
            </div>
          </>
        )}

        {selectedinput ? (
          <>
            {typeof selectedinput == "number" ? (
              <div>
                <div>
                  <InputNumber
                    style={{ height: "30px", width: "100%" }}
                    value={obj[keys]}
                    onValueChange={(e) => {
                      handleChange(e);
                    }}
                    className="inputs"
                  />
                </div>
                <div className="buttons-check">
                  <span
                    className="save-btn"
                    onClick={(e) => {
                      if (value) {
                        functionality("update", `${obj.path}`, {
                          key: keys,
                          value: value,
                        });
                      }
                      setSelectedinput(null);
                    }}
                  >
                    <FaCheck color="white" />
                  </span>
                  <span onClick={() => setSelectedinput(null)}>
                    <IoCloseSharp color="white" />
                  </span>
                </div>
              </div>
            ) : (
              <div className="input-box">
                <div>
                  <input
                    type="text"
                    defaultValue={obj[keys]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="inputs"
                  />
                </div>
                <div className="buttons-check">
                  <span
                    className="save-btn"
                    onClick={(e) => {
                      if (value) {
                        functionality("update", `${obj.path}`, {
                          key: keys,
                          value: value,
                        });
                      }
                      setSelectedinput(null);
                    }}
                  >
                    <FaCheck color="white" />
                  </span>
                  <span onClick={() => setSelectedinput(null)}>
                    <IoCloseSharp color="white" />
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="tname-title">
            {typeof obj[keys] === "boolean" ? (
              <>
                {isAdmin?.canEdit ? (
                  <Dropdown
                    value={selectedBoolean}
                    onChange={(e) => setSelectedBoolean(e.value)}
                    options={bool}
                    optionLabel="name"
                    showClear
                    placeholder="Select true or false"
                    className="w-full md:w-14rem"
                  />
                ) : (
                  false
                )}
              </>
            ) : (
              <>
                {obj[keys]}
                <span
                  style={{
                    display: isAdmin?.canEdit ? "inline" : "none",
                  }}
                  onClick={(e) => setSelectedinput(obj[keys])}
                >
                  <FiEdit size={15} color="rgba(0,0,0,0.5)" />
                </span>

                <span
                  style={{
                    display: isAdmin?.canDelete ? "inline" : "none",
                  }}
                  onClick={(e) => {
                    functionality(
                      "delete",
                      obj.hasOwnProperty("path")
                        ? `${obj.path}.${keys}`
                        : `.${keys}`,
                      {
                        key: keys,
                        value: value,
                      }
                    );
                  }}
                >
                  <RiDeleteBin6Line size={16} color="rgba(0,0,0,0.4)" />
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default InputTxt;
