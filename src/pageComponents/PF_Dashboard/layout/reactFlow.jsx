import { MENU_DETAILS } from "../utills/contents";
import Torus from "../img/torus.png";
import { Dropdown } from "primereact/dropdown";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

import deleteIcon from "../../../assets/icons/delete (1).png";
import FILE_SYNC from "../img/data-transfer.png";
import { useContext } from "react";
import MenuDetailsComponent from "../layout/PF_nodeMenu";
import ModuleDetails from "./ProcessFlowModuleDetails";
import { DarkmodeContext } from "../context/DarkmodeContext";
import Image from "next/image";




const Reactflow = ({
  setToside,
  toside,
  setsavejs,
  children,
  applicationName,
  selectedApplication,
  setApplication,
  setVisible,
  deleteApplicationApi,
  versions,
  setSelectedAppVersion,
  selectedAppVersion,
  isAdmin,
  updateVersion,
  setProcessFlow,
  processFlow,
  selectedProcessFlow,
  syncFileSys,
  role,
  nodes,
  showError,
}) => {
  const onDragStart = (
    event,
    nodeType,
    nodeName = "start",
    rolesColor,
    roles
  ) => {
    console.log(event);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/name", nodeName);
    event.dataTransfer.setData("application/roleColor", rolesColor);
    event.dataTransfer.setData("application/roles", roles);
    event.dataTransfer.effectAllowed = "move";
  };

  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  const deleteIconTemplate = (option, index) => {
    return (
      <div className="flex align-items-center justify-content-between">
        <div>{option.application}</div>
        <Image
          alt={option}
          src={deleteIcon}
          style={{ width: "18px" }}
          onClick={(event) => {
            if (isAdmin.canDelete) {
              event.stopPropagation();
              deleteApplicationApi(option.application);
            }
          }}
          hidden={!isAdmin.canDelete}
        />
      </div>
    );
  };

  return (
    <div
      className="flex w-full h-full"
      style={{
        backgroundColor: darkmode
          ? "#DFE4E2" 
          : "rgb(234,234,234)",
      }}
    >
      <MenuDetailsComponent
        MENU_DETAILS={MENU_DETAILS}
        toside={toside}
        role={role}
        setToside={setToside}
        darkmode={darkmode}
        toggleDarkmode ={toggleDarkmode}
      />
      <ModuleDetails
        applicationName={applicationName}
        darkmode={darkmode}
        toggleDarkmode ={toggleDarkmode}
        setsavejs={setsavejs}
        setVisible={setVisible}
        isAdmin={isAdmin}
        syncFileSys={syncFileSys}
        selectedApplication={selectedApplication}
        setApplication={setApplication}
        processFlow={processFlow}
        setProcessFlow={setProcessFlow}
        selectedProcessFlow={selectedProcessFlow}
        selectedAppVersion={selectedAppVersion}
        setSelectedAppVersion={setSelectedAppVersion}
        updateVersion={updateVersion}
        versions={versions}
        nodes={nodes}
        showError={showError}
        deleteApplicationApi={deleteApplicationApi}
      >
        {children}
      </ModuleDetails>
    </div>
  );
};

export default Reactflow;
