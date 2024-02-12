import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";

const SideBar = ({
  toogle,
  sideBarData,
  sideT,
  changeProperty,
  userRoleDetails,
  selectedRole,
  uniqueNames
  
}) => {
  const [err, setErr] = useState(false);
  const handleNames = (e, key) => {
    if (key === "name") {
      if (uniqueNames.includes(e.target.value.toLowerCase())) {
        if (
          e.target.value.toLowerCase() ==
          sideBarData.property.name.toLowerCase()
        ) {
          return;
        }
        setErr(true);
      } else {
        setErr(false);
        changeProperty({ [key]: e.target.value });
      }
    } else changeProperty({ [key]: e.target.value });
  };
  return (
    <>
      <Sidebar
        visible={toogle}
        position="right"
        onHide={() => sideT()}
        style={{ width: "30%" }}
        header={"Edit Node"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div
            style={{
              height: "40%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label>Role</label>
            <Dropdown
              value={selectedRole}
              onChange={(e) => changeProperty({ role: e.target.value })}
              options={userRoleDetails}
              optionLabel="role"
              placeholder={"Select Role"}
              className=" md:w-14rem "
              style={{
                paddingTop: "4px",
                paddingBottom: "4px",
                fontSize: "14px",
                width: "90%",
              }}
            />
          </div>
          {sideBarData && sideBarData.property
            ? Object.keys(sideBarData.property).map((key) => {
                if (key == "Id" || key === "nodeId") {
                  return (
                    <div
                      style={{
                        height: "40%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <label>Node ID:</label>
                      <label
                        style={{
                          marginLeft: "10px",
                          height: "50%",
                          width: "90%",
                        }}
                      >
                        {sideBarData.property[key]}
                      </label>
                    </div>
                  );
                } else if (key !== "role") {
                  return (
                    <div
                      style={{
                        height: "40%",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <label style={{ textTransform: "capitalize" }}>
                        {key}
                      </label>
                      {key !== "description" ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                            width: "68%",
                          }}
                        >
                          <InputText
                            defaultValue={sideBarData.property[key]}
                            onChange={(e) => handleNames(e, key)}
                            style={{ marginLeft: "10px" }}
                            className={err && key === "name" ? "p-invalid" : ""}
                            aria-describedby="username-help"
                          />
                          <small
                            id="username-help"
                            className="p-error"
                            style={{
                              marginLeft: "10px",
                              visibility:
                                err && key === "name" ? "visible" : "hidden",
                            }}
                          >
                            Node name already exists
                          </small>
                        </div>
                      ) : (
                        <InputTextarea
                          defaultValue={sideBarData.property[key]}
                          onChange={(e) =>
                            changeProperty({ [key]: e.target.value })
                          }
                          rows={5}
                          cols={30}
                        />
                      )}
                    </div>
                  );
                }
              })
            : "Please Click Node"}
        </div>
      </Sidebar>
    </>
  );
};

export default SideBar;
