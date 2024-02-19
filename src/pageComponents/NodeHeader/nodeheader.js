import { selectFabrics } from "@/redux/reducer/CounterSlice";
import { SaveDefaultConfigVersion, readReddis, versionServerDefaultConfig } from "@/utilsfunctions/apiCallUnit";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const NodeHeader = ({ haksd, setJson }) => {
  const appName = useSelector((state) => state.counter.appName);
  const fabrics = useSelector((state) => state.counter.fabrics);
  const dispatch = useDispatch();
  const [versions , setVersions] = useState([]);
  const [version , setVersion] = useState('')

  const opt = ["DF", "PF", "UF"];
  const handleSave = async () => {
    if (fabrics && fabrics !== '') {
      const res = await SaveDefaultConfigVersion(fabrics + ":defaultJson", haksd);
      console.log(res);
      if(res){
        toast.success('ok');
      }
    } else {
      toast.error("Please Select Fabrics");
    }
  };

  const handleOptionsChange = (e) => {
    dispatch(selectFabrics(e.value));
  };

  const handleVersionChange = (e) => {
    setVersion(e.value);
  }

  console.log(version);
  const handleReload = async () => {
    readReddis(fabrics + ":defaultJson")
      .then((res) => {
        if (res && version !=='') {
          setJson(JSON.parse(res)[version]);
        } else {
          setJson({ nodes: [], nodeConfig: {} });
        }
      })
      .catch((err) => toast.error("error occured"));
  };


  useEffect(() => {
    const fetchVersions = async () => {
      const res = await versionServerDefaultConfig(`${fabrics}:defaultJson`);
      if(res){
        setVersions(res);
      }else{
        setVersions([]);
      }
    }
    fetchVersions();
    handleReload();
  }, [fabrics , version]);

  return (
    <div className="flex justify-end px-4">
      <div className="flex justify-between py-2 gap-4">
       
        <Dropdown
          value={fabrics}
          onChange={handleOptionsChange}
          options={opt}
          placeholder="Select an option"
        />
         <Dropdown
          value={version}
          onChange={handleVersionChange}
          options={versions}
          optionLabel=""
          placeholder="Version"
          className=" flex align-items-center"
          style={{ height: "35px", width: "150px" }}
          // disabled={versions.length ? false : true}
        />
        <button onClick={handleSave} className="p-1 bg-gray-200 rounded">
          Save
        </button>
        <button onClick={handleReload} className="p-1 bg-gray-200 rounded">
          Reload
        </button>
      </div>
    </div>
  );
};

export default NodeHeader;
