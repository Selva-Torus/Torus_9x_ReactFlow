"use client";
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Footer from "@/pageComponents/footer/Footer";
import SideNavAccordian from "@/pageComponents/sidebarAsAccordian/Sidenavbar";
import { useEffect, useState } from "react";
import Dashboard from "../pageComponents/PF_Dashboard/Dashboard";
import TopBar from "../pageComponents/TopNav/TopNavBar";
import { DarkmodeProvider } from "../pageComponents/PF_Dashboard/context/DarkmodeContext";
import { options } from "../utilsfunctions/getterJsOptions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "@/pageComponents/TorusNodeResource/Index";
import NodeHeader from "@/pageComponents/NodeHeader/nodeheader";
import DataFabric from "@/pageComponents/ErFlow 1/Components/DataFabric";
import { selectFabrics } from "@/redux/reducer/CounterSlice";
import { useDispatch } from "react-redux";
import NodeHeaderER from "@/pageComponents/ErFlow 1/ER_nodeHeader";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      alert("please signin to continue");
      signIn();
    },
  });
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [getterJS, getJS] = useState(options);
  const [setterJS, setJS] = useState({});
  const [haksd, setHaksd] = useState({});
  const [json, setJson] = useState({ nodes: [], nodeConfig: {} });
  const [getDataFromParent, setDataFromParent] = useState({ nodes: [], edges: [] , relationship : {} });
  const [postedData, setPostedData] = useState({ nodes: [], edges: [] , relationship : {} });

  if (status == "authenticated" && session) {
    const token = session?.user?.token;
    if (token) {
      Cookies.set("token", token);
    }
  }

  useEffect(() => {
    dispatch(selectFabrics(state))
  },[state])

  return (
    <main>
      {status !== "loading" && (
        <>
          <DarkmodeProvider>
            <TopBar state={state} />
            <div className="flex">
              <SideNavAccordian state={state} setState={setState} />

              {state == "PF" ? (
                <div className="ml-[60px]  w-[90vw]">
                  <Dashboard
                    admin={{ canAdd: true, canDelete: true, canEdit: true }}
                    roleObbj={[
                      { role: "supervisor", color: "#aebbff" },
                      { role: "admin", color: "#92b2ff" },
                      { role: "testing", color: "#8ad3ff" },
                    ]}
                    getJS={getterJS}
                    setJS={setJS}
                  />
                </div>
              ) : state == "TRN" ? (
                <div className="ml-[60px]  w-[90vw]">
                  <NodeHeader haksd={haksd} setJson={setJson} />
                  <Index sendDataToParent={setHaksd} getDataFromParent={json} />
                </div>
              ) : state == "DF" ? (
                <div className=" flex flex-col w-[100vw]">
                  <NodeHeaderER postedData={postedData} setDataFromParent={setDataFromParent}/>
                  <DataFabric getDataFromParent ={getDataFromParent} postDataToParent={setPostedData} />
                </div>
              ) : state ? (
                <div className="ml-[60px] h-[89vh] w-[90vw] bg-gray-400 flex justify-center items-center">
                  <div>You are @ {state}</div>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full">
                  <div>Select something</div>
                </div>
              )}
            </div>
            <Footer />
          </DarkmodeProvider>
          <ToastContainer />
        </>
      )}
    </main>
  );
}
