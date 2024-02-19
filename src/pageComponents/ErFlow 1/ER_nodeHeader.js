import { saveERDiagram, serverDataForERD, updateDiagram, versionServerERD } from "@/utilsfunctions/apiCallUnit";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NodeHeaderER = ({ setDataFromParent, postedData }) => {
  const [versions , setVersions] = useState([]);
  const [version , setVersion] = useState('');
  const appName = useSelector((state) => state.counter.appName);
  const [refetch , setRefetch] = useState(false);
  const fetchVersions = async() => {
   const res = await versionServerERD("DF" , appName);
   if(res){
    setVersions(res);
   }else{
    setVersions([]);
   }
  }

  const fetchData = async() => {
    const res = await serverDataForERD("DF" , appName , version);
    if(res){
      setDataFromParent(res);
    }else{
      setDataFromParent((json) => ({...json}));
    }
  }

  useEffect(() => {
    fetchVersions();
    if(version && version !== ''){
      fetchData();
    }
  },[version , refetch , appName])
  

  const handleVersionChange = (e) => {
    setVersion(e.value);
  }
  
  const handleSave = async () => {
    const res = await saveERDiagram("DF" , appName , JSON.stringify(postedData));
    if(res){
      setRefetch((prev)=> !prev);
      toast.success('new version saved');
    }else{
      toast.error('error occured');
    }
  }

  const handleUpdate = async () => {
    const res = await updateDiagram("DF" , appName ,version , JSON.stringify(postedData))
    if(res){
      setRefetch((prev)=> !prev);
      toast.success('version updated');
    }else{
      toast.error('error occured');
    }
   }
  

  return (
    <div className="w-full flex justify-end items-center bg-gray-200 py-2 px-4">
      <div className="flex justify-between gap-2">
      <Dropdown
          value={version}
          onChange={handleVersionChange}
          options={versions}
          optionLabel=""
          placeholder="Version"
          className=" flex align-items-center"
          style={{ height: "35px", width: "150px" }}
        />
        <button onClick={handleSave} className="bg-[#6366f1] text-white p-1 rounded">
          Save (New Version)
        </button>
        <button onClick={handleUpdate} className="bg-[#6366f1] text-white p-1 rounded">
          Update (Current Version)
        </button>
      </div>
    </div>
  );
};

export default NodeHeaderER;
