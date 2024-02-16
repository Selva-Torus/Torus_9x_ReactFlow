import React, { useState } from "react";

export const Dropdown = ({ keys, obj, functionality, isAdmin, path }) => {
  const [Selectedjson, setSelected] = useState(null);
  const [isopen, setisopen] = useState(false);

  const handleopts = (e) => {
    setSelected(e.target.value);
    setisopen(true);
    console.log(Selectedjson, isopen , "open")
  };
  return (
    <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
      {keys}
      <select onChange={handleopts}>
        {obj[keys]?.dropdownvalue.map((value, index) => (
          <option key={index} value={value} >
            {value}
          </option>
        ))}
      </select>
      {isopen && (
        <button
          onClick={() => {
            functionality("update", path + "." + keys, {
              value: Selectedjson,
            });
          }}
        >
          ok
        </button>
      )}
    </div>
  );
};
