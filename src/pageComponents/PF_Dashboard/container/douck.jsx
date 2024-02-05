import React from "react";

export default function Douck({ setsavejs }) {
  return (
    <div
      className="absolute z-10 w-full flex flew-row justify-content-end gap-4 align-items-center"
      style={{ height: "50px" }}
    >
      <button
        className="shadow-4 border-none cursor-pointer z-3"
        style={{ width: "150px", height: "30px" }}
        onClick={() => setsavejs("update")}
      >
       Update Version
      </button>
      <button
        className="shadow-4 border-none  cursor-pointer z-3"
        style={{ width: "150px", height: "30px", marginRight: "15px" }}
        onClick={() => setsavejs("create")}
      >
        Create New Version
      </button>
    </div>
  );
}
