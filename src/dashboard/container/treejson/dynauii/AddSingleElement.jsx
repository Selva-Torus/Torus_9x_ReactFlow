import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { ToggleButton } from "primereact/togglebutton";

const AddSingleElement = ({ json, getjson, setShowsidebar  , showsidebar , options}) => {
  const [selected, setSelected] = useState(null);
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(false);
const[leveloption , setLeveloption]= useState(options)

  const handleclicked = (type = null) => {
    if (type == "cancel") {
      setShowsidebar(null);
    } else {
      let js = {
        ...json,
        [key]:
          selected == "boolean"
            ? false
            : selected == "Number"
            ? 0
            : selected == "string"
            ? ""
            : selected == "array"
            ? [value]
            : selected == "object"
            ? {[key] :value}
            :"",
      };
      getjson(js);
      console.log(js, "jsss");
      setKey("");
      setValue("");
      setShowsidebar(null);
    }
  };

  return (
    <div className="add-model">
      <div className="model-box">
        <div className="dropdown-box"></div>
        { selected == "Number" ? (
          <div className="flex flex-row">
            <InputText
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="key"
              className="inputs"
            />
          </div>
        ) : selected == "boolean" ? (
          <div className="flex flex-row">
            <InputText
              id="key"
              value={key}
              placeholder="key"
              onChange={(e) => setKey(e.target.value)}
              className="inputs"
            />
          </div>
        ) :(
          
          ""
        )}

        <br />
        <Dropdown
          id="dropdown"
          options={leveloption}
          placeholder="Select an Option"
          value={selected}
          onChange={(e) => {
            setSelected(e.value);
          }}
          className="dropdown "
          style={{height:"37px"}}
        >

        </Dropdown>

        {selected === "string" ? (
          <>
            <div className="flex flex-row">
              <InputText
                id="key"
                value={key}
                placeholder="key"
                onChange={(e) => setKey(e.target.value)}
                className="inputs"
              />
            </div>
          </>
        ) :  selected === "array" ? (
          <div className="flex flex-row">
               <InputText
                id="value"
                value={value}
                placeholder="key"
                onChange={(e) => setValue(e.target.value)}
                className="inputs"
              />
         
        </div>
          
        ):selected === "object" ? (
          <>
          <InputText
                id="key"
                value={key}
                placeholder="key"
                onChange={(e) => setKey(e.target.value)}
                className="inputs"
                style={{marginRight:"10px"}}
              />
              <InputText
                id="value"
                value={value}
                placeholder="key"
                onChange={(e) => setValue(e.target.value)}
                className="inputs"
              />

          </>
        ):(
          ""
        )}
        <div
          className="model-buttons"
        >
          <span className="save-btns" style={{padding:"9px 16px"}}    onClick={handleclicked}>
            <i
              class="fa-solid fa-check model-check-btn-size"

           
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddSingleElement;
