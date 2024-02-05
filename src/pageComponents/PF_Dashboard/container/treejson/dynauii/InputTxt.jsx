import React, { useState } from "react";

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
                    <i class="fa-solid fa-check model-check-btn-size"></i>
                  </span>
                  <span onClick={() => setSelectedkey(null)}>
                    <i class="fa-solid fa-xmark closebtns-tname"></i>
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
                <i class="fa-regular fa-pen-to-square  first-add-btn-title"></i>
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
                    <i class="fa-solid fa-check check-btn-size"></i>
                  </span>
                  <span onClick={() => setSelectedinput(null)}>
                    <i class="fa-solid fa-xmark closebtns-tname"></i>
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
                    <i class="fa-solid fa-check check-btn-size"></i>
                  </span>
                  <span onClick={() => setSelectedinput(null)}>
                    <i class="fa-solid fa-xmark closebtns-tname"></i>
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
                  <i class="fa-regular fa-pen-to-square  first-add-btn-title"></i>
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
                  <i class="fa-solid fa-trash first-add-btn-delete"></i>
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
