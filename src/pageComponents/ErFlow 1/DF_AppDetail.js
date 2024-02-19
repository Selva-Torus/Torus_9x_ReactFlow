import { setER_Artifacts } from "@/redux/reducer/CounterSlice";
import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DF_AppDetail = ({
  setIsUserDetailsDialog
}) => {
  const appName = useSelector((state) => state.counter.appName);
  const ER_Artifacts = useSelector((state) => state.counter.ER_Artifacts);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    if(appName == "" || ER_Artifacts == ""){
        setError('Please enter Application Details')
    }else{
        setIsUserDetailsDialog((prev)=> !prev);
    }

  };

  const handleChange = (e) => {
    setError("");
    if(e.target.name == 'artifacts'){
        dispatch(setER_Artifacts(e.target.value))
    }
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

export default DF_AppDetail;
