import { readReddis, writeReddis } from "@/utilsfunctions/apiCallUnit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NodeHeader = ({ haksd, setJson }) => {
  const appName = useSelector((state) => state.counter.appName);

  const handleSave = async () => {
    const res = await writeReddis(appName + ":defaultJson", haksd);
    console.log(res);
  };

  const handleReload = async () => {
    readReddis(appName + ":defaultJson")
      .then((res) => {
        if (res){
            setJson(JSON.parse(res));
        }else{
            setJson((json) => ({...json}));
        }
      })
      .catch((err) => toast.error("error occured"));
  };

  useEffect(() => {
    handleReload();
  }, [appName]);

  return (
    <div className="flex justify-end px-4">
      <div className="flex justify-between py-2 gap-4">
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
