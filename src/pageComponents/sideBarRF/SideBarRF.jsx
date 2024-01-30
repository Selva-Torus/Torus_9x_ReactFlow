import React, { useState } from "react";
import menuIcon from "@/dashboard/img/menu.png";
import backIcon from "@/dashboard/img/arrows.png";
import Torus from "@/dashboard/img/torus.png";
import { MENU_DETAILS } from "../../utilsfunctions/content";
import Image from "next/image";
// import { FaMoon, FaSun } from "react-icons/fa";
// import Tooltip from "@mui/material/Tooltip";
const MenuDetailsComponent = () => {
  const [toside, setToside] = useState(false);
  const onDragStart = (
    event,
    nodeType,
    nodeName = "start",
    rolesColor,
    roles
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/name", nodeName);
    event.dataTransfer.setData("application/roleColor", rolesColor);
    event.dataTransfer.setData("application/roles", roles);
    event.dataTransfer.effectAllowed = "move";
  };
  //   const handleclick = () => {
  //     toggleDarkmode();
  //   };

  return (
    <>
      <div
        className={toside ? "bigContainer" : "smallContainer"}
        style={{ backgroundColor: "#DFE4E2" }}
      >
        <div
          className="flex flex-col justify-between items-center px-4"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            style={{ height: "10%", width: "100%", paddingLeft: "18px" }}
            className="flex justify-start items-center"
          >
            <div
              onClick={() => {
                setToside(!toside);
              }}
            >
              {toside ? (
                <Image
                  src={backIcon}
                  className="opacity-80"
                  style={{ width: "20px", cursor: "pointer" }}
                />
              ) : (
                <Image
                  src={menuIcon}
                  style={{ width: "20px", cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <div
            className="flex flex-col w-full"
            style={{
              height: "69%",
              gap: "20px",
              overflow: "scroll",
              maxHeight: "400px",
            }}
          >
            {MENU_DETAILS.map((node, index) => {
              return (
                <div
                  key={index}
                  className={
                    toside
                      ? " w-full flex justify-center items-center border-round h-[60px]"
                      : "w-full flex justify-center items-center  h-[60px] "
                  }
    
                  onDragStart={(event) =>
                    onDragStart(event, node.type, node.name, "#ccc", "NoRole")
                  }
                  draggable
                >
                  {toside ? (
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "15px",
                        color: "#808080",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          src={node.icons}
                          className="opacity-80 w-[30px] h-[30px]"
                          alt={node.name}
                        />
                        <span>{node.name}</span>
                      </div>
                    </p>
                  ) : (
                    <Image src={node.icons} className="opacity-80 w-[30px] h-[30px]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* <span onClick={handleclick}>
            {darkmode ? (
              <Tooltip title="Light Mode">
           
                <FaSun style={{ cursor: "pointer", opacity: "0.8" }} />
              </Tooltip>
            ) : (
              <Tooltip title="Dark Mode">
              
                <FaMoon style={{ cursor: "pointer", opacity: "0.8" }} />
              </Tooltip>
            )}
          </span> */}

         
        </div>
      </div>
    </>
  );
};

export default MenuDetailsComponent;
