import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PF_AppDetail = ({
  setIsUserDetailsDialog,
  setApplicationDetails,
  applicationDetails,
}) => {
  const appName = useSelector((state) => state.counter.appName);

  const [error, setError] = useState("");
  const handleClick = () => {
    setApplicationDetails((prev) => ({
      ...prev,
      application: appName,
    }));

    if (
      applicationDetails?.application == "" ||
      applicationDetails?.artifacts == "" ||
      !Object.keys(applicationDetails).length
    ) {
      setError("Please Enter Application Details ");
    } else {
      console.log(applicationDetails);

      setIsUserDetailsDialog(false);
    }
  };

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
