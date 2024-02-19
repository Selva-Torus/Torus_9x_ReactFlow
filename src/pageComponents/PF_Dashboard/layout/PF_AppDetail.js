import { setTRSVersion } from "@/redux/reducer/CounterSlice";
import { versionServerDefaultConfig } from "@/utilsfunctions/apiCallUnit";
import { Button, FormLabel, Input } from "@mui/material";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PF_AppDetail = ({
  setIsUserDetailsDialog,
  setApplicationDetails,
  applicationDetails,
}) => {
  const appName = useSelector((state) => state.counter.appName);
  const [versions , setVersions] = useState([]);
  const [error, setError] = useState("");
  const fabrics = useSelector((state) => state.counter.fabrics);
  const TRSVersion = useSelector((state) => state.counter.TRSVersion);
  const dispatch = useDispatch();
  const handleClick = () => {
    setApplicationDetails((prev) => ({
      ...prev,
      application: appName,
    }));

    console.log(TRSVersion);

    if (
      applicationDetails?.application == "" ||
      applicationDetails?.artifacts == "" ||
      TRSVersion == "" ||
      !Object.keys(applicationDetails).length
    ) {
      setError("Please Enter Application Details ");
    } else {
      console.log(applicationDetails);

      setIsUserDetailsDialog(false);
    }
  };

  const handleVersionChange = (e) => {
    dispatch(setTRSVersion(e.value));
  }


  useEffect(() => {
    const fetchVersions = async () => {
      const res = await versionServerDefaultConfig(`${fabrics}:defaultJson`);
      if(res){
       setVersions(res)
      }else{
        setVersions([]);
     }
    }
    fetchVersions();
  }, []);

  const handleChange = (e) => {
    setError("");
    setApplicationDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <Input
        className="w-full border-none outline-none p-4"
        // onChange={handleChange}
        value={appName}
        name="application"
        type="text"
        placeholder="Enter Application name"
      />
      <Input
        className="w-full border-none outline-none p-4"
        onChange={handleChange}
        name="artifacts"
        type="text"
        placeholder="Enter Artifacts name"
      />
      <Dropdown
          value={TRSVersion ?? ''}
          onChange={handleVersionChange}
          options={versions}
          // optionLabel="Select Tourus Resource Nodes"
          placeholder="Select Tourus Resource Nodes"
          className=" flex align-items-center w-full my-3"
          style={{ height: "35px", width: "150px" }}
          // disabled={versions.length ? false : true}
        />
      <span className="text-red-500 text-xs">{error}</span>
      <Button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleClick}
      >
        Get Started
      </Button>
    </div>
  );
};

export default PF_AppDetail;
