import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";
import { InputNumber } from "primereact/inputnumber";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { FaCheck } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const AddElements = ({
  type = null,
  functionality,
  json,
  options,
  setFunc,
  path,
}) => {
  const [checked, setChecked] = useState(false);
  const [keys, setKey] = useState(null);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);
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
      life: 3000,
    });
  };
  return (
    <div className="add-model ">
      <Toast ref={toast} />
      <div className="dropdown-box">
        {type == "object" && (
          <>
            <InputText
              id="key"
              onChange={(e) => setKey(e.target.value)}
              placeholder="key"
              className={`${!keys && "p-invalid"}`}
              style={{ width: "140px" }}
            />
          </>
        )}

        <Dropdown
          id="dropdown"
          options={options}
          placeholder="Select an Option"
          value={selected}
          className="dropdown "
          onChange={(e) => setSelected(e.value)}
          style={{ width: "140px" }}
        />

        {selected === "string" && (
          <>
            <InputText
              id="value"
              onChange={(e) => setValue(e.target.value)}
              className={`${!value && "p-invalid"}`}
              placeholder="Value"
              style={{ width: "140px" }}
            />
          </>
        )}

        {selected == "number" && (
          <>
            <InputNumber
              id="value"
              value={value}
              onValueChange={(e) => setValue(e.target.value)}
              placeholder="Value"
              className={`${!value && "p-invalid"}`}
            />
          </>
        )}

        {selected == "boolean" && <></>}

        <div className="model-buttons">
          <span
            className="save-btns"
            onClick={() => {
              if (type == "array") {
                functionality("add", path, {
                  key: keys ?? Object.keys(json).length,
                  options: selected,
                  value: value,
                });

                setFunc(null);
              }
              if (
                type !== "array" &&
                keys &&
                (selected === "string" || selected === "number"
                  ? value
                  : true) &&
                selected
              ) {
                functionality("add", path, {
                  key: keys,
                  options: selected,
                  value: value,
                });

                setFunc(null);
              } else if (keys && selected && !value) {
                showError("value");
              } else if (keys && !selected) {
                showError("selected");
              } else if (!keys && selected && value) {
                showError("Key");
              } else {
                showError();
              }
            }}
          >
            <FaCheck color="white" />
          </span>
          <span onClick={() => setFunc(null)}>
            <IoCloseSharp size={25} color="#CCC" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddElements;
