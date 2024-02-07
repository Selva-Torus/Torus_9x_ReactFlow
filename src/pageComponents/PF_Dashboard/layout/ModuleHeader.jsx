import { Dropdown } from "primereact/dropdown";
import React from "react";

const ModuleHeader = ({ setsavejs , versions ,setSelectedAppVersion , selectedAppVersion}) => {
  return (
    <div className="w-full h-8 flex justify-end gap-2 pr-2 items-center">
        <Dropdown
            value={selectedAppVersion}
            onChange={(event) => {
              setSelectedAppVersion(event.value);
            }}
            options={versions}
            optionLabel=""
            placeholder="Version"
            className=" flex align-items-center"
            style={{ height: "35px", width: "150px" }}
            disabled={versions.length ? false : true}
          />
      <button
        className="bg-blue-400 text-white p-1 m-1 rounded"
        onClick={() => setsavejs("update")}
      >
        Update (Update version)
      </button>
      <button
        className="bg-blue-400 text-white p-1 m-1 rounded"s
        onClick={() => setsavejs("create")}
      >
        Save (New version)
      </button>
    </div>
  );
};

export default ModuleHeader;
