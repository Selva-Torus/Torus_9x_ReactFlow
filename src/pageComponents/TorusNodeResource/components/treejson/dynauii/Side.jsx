import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import "../../treejson/tree.css";

export default function Side({ json, toggle, setToggle, func, path, setjs }) {
  let options = [
    { label: "Array", value: "array" },
    { label: "Object", value: "object" },
    { label: "String", value: "string" },
  ];
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const addFunction = (key, option, value, path) => {
    console.log(key, option, value, path);

    _.update(json, path, function (n) {
      if (Array.isArray(n)) {
        let updateValue =
          option === "string" ? value : option === "array" ? [] : {};

        let arr = [...n];
        arr.push(updateValue);
        n = arr;
      } else {
        if (typeof n == "object") {
          let updateValue = {
            key: key,
            value: option === "string" ? value : option === "array" ? [] : {},
          };

          n[updateValue.key] = updateValue.value;
        } else {
          let updateValue = key;
          n = updateValue;
        }
      }
      return n;
    });

 
  };
  useEffect(() => {
    const checkType = _.get(json, path);

    if (Array.isArray(checkType)) {
      setType("array");
    } else if (typeof checkType == "object" && !Array.isArray(checkType)) {
      setType("object");
    }
  },[json,path]);
  return (
    <div>
      <Sidebar
        visible={toggle}
        position="right"
        onHide={() => {
          addFunction(key, selected, value, path);
          setjs(json)
          setToggle(false);
        }}
      >

        {func == "add" && (
          <div>

            {type == "object" && (
              <div className="flex flex-column">
                <label htmlFor="key">key</label>
                <InputText id="key" onChange={(e) => setKey(e.target.value)} />
              </div>
            )}
            <label htmlFor="dropdown">Option</label>
            <br />
            <Dropdown
              id="dropdown"
              options={options}
              placeholder="Select an Option"
              value={selected}
              onChange={(e) => {
                setSelected(e.value);
              }}
            />
            {selected == "string" && (
              <div className="flex flex-column">
                <label htmlFor="key">Value</label>
                <InputText
                  id="key"
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </Sidebar>
    </div>
  );
}
