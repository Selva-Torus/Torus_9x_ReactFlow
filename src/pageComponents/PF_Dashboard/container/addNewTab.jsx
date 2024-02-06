import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";

const AddNewTab = ({
  itemkey,
  handleAdded,
  showSideBar,
  setShowSideBar,
  iteration,
}) => {
  const [obj, setObj] = useState({
    name: "",
    footer: "",
    header: "",
    group: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setObj({ ...obj, [name]: value });
  };

  const handleClose = () => {
    setShowSideBar(false);
    if (obj.name && obj.header && obj.footer && obj.group) {
 
      handleAdded(itemkey, obj, true);

    }
  };

  const handleAddOption = () => {
    if (obj.options[obj.options.length - 1] !== "") {
      setObj({
        ...obj,
        options: [...obj.options, ""],
      });
    }
  };

  const handleChangeOption = (e, index) => {
    const newOptions = [...obj.options];
    newOptions[index] = e.target.value;
    setObj({
      ...obj,
      options: newOptions,
    });
  };

  const handleCloseOption = (index) => {
    if (obj.options.length > 1) {
      const newOptions = [...obj.options];
      newOptions.splice(index, 1);
      setObj({
        ...obj,
        options: newOptions,
      });
    }
  };
  return (
    <>
      <Sidebar
        visible={showSideBar}
        position="right"
        onHide={handleClose}
        style={{ backgroundColor: "#f1efef" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "80px",
            // backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="name" style={{ textTransform: "capitalize" }}>
            name
          </label>
          <InputText
            type="type"
            name="name"
            id="name"
            value={obj.name}
            onChange={handleChange}
            style={{ marginLeft: "10px", height: "33px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "80px",
            // backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="header" style={{ textTransform: "capitalize" }}>
            header
          </label>
          <InputText
            type="type"
            name="header"
            id="name"
            value={obj.header}
            onChange={handleChange}
            style={{ marginLeft: "10px", height: "33px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "80px",
            // backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="group" style={{ textTransform: "capitalize" }}>
            group
          </label>
          <InputText
            type="type"
            name="group"
            id="name"
            value={obj.group}
            onChange={handleChange}
            style={{ marginLeft: "10px", height: "33px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "80px",
            // backgroundColor: "red",
            justifyContent: "space-around",
          }}
        >
          <label htmlFor="footer" style={{ textTransform: "capitalize" }}>
            footer
          </label>
          <InputText
            type="type"
            name="footer"
            id="name"
            value={obj.footer}
            onChange={handleChange}
            style={{ marginLeft: "10px", height: "33px" }}
          />
        </div>


      </Sidebar>
    </>
  );
};

export default AddNewTab;
