import React, { useState } from "react";

const PF_AppDetail = ({
  setIsUserDetailsDialog,
  setApplicationDetails,
  applicationDetails,
}) => {
  const [error, setError] = useState("");
  const handleClick = () => {
    if (
      applicationDetails?.application == "" ||
      applicationDetails?.artifacts == "" || 
      Object.keys(applicationDetails).length
    ) {
      setError("Please Enter Application Details ");
    } else {
      console.log(applicationDetails);
        // setIsUserDetailsDialog(false);
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
      <input
        className="w-full border-none outline-none p-4"
        onChange={handleChange}
        name="application"
        type="text"
        placeholder="Enter Application name"
      />
      <input
        className="w-full border-none outline-none p-4"
        onChange={handleChange}
        name="artifacts"
        type="text"
        placeholder="Enter Artifacts name"
      />
      <span className="text-red-500 text-xs">{error}</span>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleClick}
      >
        Get Started
      </button>
    </div>
  );
};

export default PF_AppDetail;
