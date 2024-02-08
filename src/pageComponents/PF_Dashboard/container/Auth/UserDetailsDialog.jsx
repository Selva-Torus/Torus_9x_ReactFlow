import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getRoleDetails, getTenantDetails } from "../../api";

const UserDetailsDialog = ({ setIsAdmin, setT, setAG, setA }) => {
  const [isUserDetailsDialog, setIsUserDetailsDialog] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedAppGroup, setSelectedAppGroup] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [roleId, setRoleId] = useState("");
  const [tenant, setTenant] = useState([]);
  const [applicationGroup, setApplicationGroup] = useState([]);
  const [selectApp, setSelectApp] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getTenantDetails();
      setTenant(res.saveOptions);
    })();
  }, []);

  const onTenantchange = (e) => {
    setSelectedTenant(e.value);
    setT(e.value);
    const appGroup = [];

    tenant.map((element, i) => {
      if (element.tenant === e.value) {
        element.groups.map((elements, i) => {
          if (!appGroup.includes(elements.groupName)) appGroup.push(elements);
        });
      }
    });

    if (appGroup.length) {
      setApplicationGroup(appGroup);
    }
  };

  const onApplictionGroupchange = (e) => {
    setAG(e.value);
    setSelectedAppGroup(e.value);
    const appGrou = [];
    applicationGroup.map((element, i) => {
      if (element.groupName === e.value) {
        element.applications.map((elements, i) => {
          if (!appGrou.includes(elements.applicationName))
            appGrou.push(elements.applicationName);
        });
      }
    });

    if (appGrou.length) {
      setSelectApp(appGrou);
    }
  };

  const getRoleDetailsApi = async () => {
    try {
      const response = await getRoleDetails(roleId);
      if (response.statusCode === 200) {
        if (response.roleType === "READ_ONLY")
          setIsAdmin({ canAdd: false, canDelete: false, canEdit: false });
        else if (response.roleType === "ADMIN")
          setIsAdmin({ canAdd: true, canDelete: true, canEdit: true });
        else setIsAdmin({ canAdd: false, canDelete: false, canEdit: true });
        // showSuccess(`Now you are on ${response.roleType} mode`);
        setIsUserDetailsDialog(false);
        // await applicationDetailsApi();
      } else {
        // showError(`Invalid role code`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog
      visible={isUserDetailsDialog}
      style={{ width: "40vw" }}
      onHide={() => setIsUserDetailsDialog(!isUserDetailsDialog)}
      header="Login"
      headerStyle={{ textAlign: "center" }}
      closable={false}
    >
      <div className="h-full">
        <div
          className="flex flex-column justify-content-around gap-3"
          style={{ height: "60%" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dropdown
              value={selectedTenant}
              onChange={onTenantchange}
              options={tenant}
              optionLabel="tenant"
              optionValue="tenant"
              placeholder="Select Tenant"
              className=" flex align-items-center py-2"
              style={{ width: "92%", fontSize: 200 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dropdown
              value={selectedAppGroup}
              onChange={onApplictionGroupchange}
              options={applicationGroup}
              optionLabel="groupName"
              optionValue="groupName"
              placeholder="Select Appliction Group"
              className=" flex align-items-center py-2 "
              style={{ width: "92%" }}
              disabled={selectedTenant ? false : true}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dropdown
              value={selectedApp}
              onChange={(e) => {
                setSelectedApp(e.value);
                setA(e.value);
              }}
              options={selectApp}
              placeholder="Select Appliction "
              className=" flex align-items-center py-2"
              style={{ width: "92%" }}
              disabled={selectedTenant && selectedAppGroup ? false : true}
            />
          </div>
        </div>
        <div className="flex justify-content-center py-3">
          <InputText
            name="roleId"
            onChange={(event) => setRoleId(event.target.value)}
            placeholder="Enter your Role"
            style={{
              height: "50px",
              width: "calc( 100% - 40px )",
              marginLeft: "0px",
            }}
            disabled={
              selectedTenant && selectedAppGroup && selectedApp ? false : true
            }
          />
        </div>
        <div
          className="flex justify-content-center align-items-center mt-3"
          style={{ height: "40%" }}
        >
          <Button
            label="Submit"
            severity="info"
            style={{ height: "50px" }}
            onClick={getRoleDetailsApi}
            disabled={
              roleId && selectedTenant && selectedAppGroup ? false : true
            }
          />
        </div>
      </div>
    </Dialog>
  );
};

export default UserDetailsDialog;
