import React, { useContext, useState } from "react";
import menuIcon from "../img/menu.png";
import backIcon from "../img/arrows.png";
import Torus from "../img/torus.png";
import { FaMoon, FaSun } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { MENU_DETAILS } from "../../../utilsfunctions/contents";
import { DarkmodeContext } from "../context/DarkmodeContext";
import Image from "next/image";
const MenuDetailsComponent = () => {
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
  const [toside, setToside] = useState(false);
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  const handleclick = () => {
    toggleDarkmode();
  };

  return (
    <>
      <div
        className={toside ? "bigContainer" : "smallContainer" }
      >
        <div
          className="flex flex-column justify-content-between align-items-center "
          style={{ width: "100%", height: "100%"  }}
        >
          <div
            style={{ height: "10%", width: "100%", paddingLeft: "18px" }}
            className="flex justify-content-start align-items-center"
          >
            <div
              onClick={() => {
                setToside(!toside);
              }}
            >
              {toside ? (
                <Tooltip title="Back">
                  <Image
                    src={backIcon}
                    className="opacity-80"
                    style={{ width: "20px", cursor: "pointer" }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title=" ExpanMenu">
                  <Image
                    src={menuIcon}
                    style={{ width: "20px", cursor: "pointer" }}
                  />
                </Tooltip>
              )}
            </div>
          </div>
          <div
            className="flex flex-column w-full"
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
                      ? " w-full flex justify-content-center align-items-center border-round "
                      : "w-full flex justify-content-center align-items-center  "
                  }
                  id={`${toside ? "asasas" : ""}`}
                  style={{
                    height: `${toside ? "60px" : "60px"}`,

                    // border: `${toside ? "1px solid #d3d3d3" : ""}`,
                  }}
                  onDragStart={(event) =>
                    onDragStart(event, node.type, node.name, "#ccc", "No Role")
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
                      <Tooltip title={node.name}>
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
                            className="opacity-80"
                            alt={node.name}
                          />
                          <span>{node.name}</span>
                        </div>
                      </Tooltip>
                    </p>
                  ) : (
                    <Tooltip title={node.name} style={{ cursor: "pointer" }}>
                      <Image src={node.icons} className="opacity-80" />
                    </Tooltip>
                  )}
                </div>
              );
            })}
          </div>

          <span onClick={handleclick} className="mt-5">
            {darkmode ? (
              <Tooltip title="Light Mode">
                <FaSun style={{ cursor: "pointer", opacity: "0.8" }} />
              </Tooltip>
            ) : (
              <Tooltip title="Dark Mode">
                <FaMoon style={{ cursor: "pointer", opacity: "0.8" }} />
              </Tooltip>
            )}
          </span>

          <div style={{ marginTop: "20px" }}>
            <Tooltip title="GSS">
              <a href="https://www.gsstechgroup.com/">
                <Image
                  src={Torus}
                  alt="torus"
                  style={{
                    height: `${!toside ? "50px" : "80px"}`,
                    width: `${!toside ? "50px" : "80px"}`,
                  }}
                />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDetailsComponent;
