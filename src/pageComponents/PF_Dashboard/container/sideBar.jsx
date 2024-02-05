import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";

const SideBar = ({
  toogle,
  sideBarData,
  sideT,
  changeProperty,
  userRoleDetails,
  selectedRole,
}) => {
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
            {console.log("dropDwon-->", selectedRole)}
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
                } else if ( key !== "role") {
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
                        <InputText
                          defaultValue={sideBarData.property[key]}
                          onChange={(e) =>
                            changeProperty({ [key]: e.target.value })
                          }
                          style={{ marginLeft: "10px" }}
                        />
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
