import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const Dropdown = ({ keys, obj, functionality, isAdmin, path }) => {
  const [Selectedjson, setSelected] = useState(null);
  const [isopen, setisopen] = useState(false);
  const [check, setChecked] = useState(true);

  const handleopts = (e) => {
    setSelected(e.target.value);
    setisopen(true);
    functionality("update", path + "." + keys + ".selectedValue", {
      key: "selectedValue",
      value: e.target.value,
    });
    console.log(Selectedjson, isopen, "open");
  };
  return (
    <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
      {!isopen && (
        <span>
          <h8 style={{ fontSize: "13px", color: "black" }}>{keys}</h8>:
          <select onChange={handleopts} value={obj[keys]?.selectedValue}>
            <option value="" disabled selected>
              Select an option
            </option>
            {(obj[keys]?.selectionList).map((values, index) => (
              <option key={index} value={values}>
                {values}
              </option>
            ))}
          </select>
        </span>
      )}

      {isopen && (
        <div>
          selectedValue: {obj[keys]?.selectedValue}
          <span
            onClick={(e) => {
              setisopen(false);
            }}
          >
            <FiEdit size={15} color="rgba(0,0,0,0.5)" />
          </span>
          <span
            onClick={(e) => {
              functionality(
                "delete",

                path + "." + keys,
                {
                  key: keys,
                  value: obj[keys]?.selectedValue,
                }
              );
            }}
          >
            <RiDeleteBin6Line size={16} color="rgba(0,0,0,0.4)" />
          </span>
        </div>
      )}
    </div>
  );
};
