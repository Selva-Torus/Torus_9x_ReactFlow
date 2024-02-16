import React from "react";

export function Upload({ setFiles }) {
  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = (e) => {
      console.log(e.target.result, "result");
      setFiles(e.target.result);
    };
  };
  return (
    <>
      <label htmlFor="file" className="fileUploadLabel">
        <i class="fa-solid fa-upload"></i>
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        accept="application/json"
        onChange={handleChange}
      />
    </>
  );
}
