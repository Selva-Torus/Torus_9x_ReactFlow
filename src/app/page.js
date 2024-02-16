"use client";
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Footer from "@/pageComponents/footer/Footer";
import SideNavAccordian from "@/pageComponents/sidebarAsAccordian/Sidenavbar";
import { useState } from "react";
import Dashboard from "../pageComponents/PF_Dashboard/Dashboard";
import TopBar from "../pageComponents/TopNav/TopNavBar";
import { DarkmodeProvider } from "../pageComponents/PF_Dashboard/context/DarkmodeContext";
import { options } from "../utilsfunctions/getterJsOptions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "@/pageComponents/TorusNodeResource/Index";
import NodeHeader from "@/pageComponents/NodeHeader/nodeheader";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      alert("please signin to continue");
      signIn();
    },
  });
  const [state, setState] = useState("");
  const [getterJS, getJS] = useState(options);
  const [setterJS, setJS] = useState({});
  const [haksd, setHaksd] = useState({});
  const [json, setJson] = useState({ nodes: [], nodeConfig: {} });

  if (status == "authenticated" && session) {
    const token = session?.user?.token;
    if (token) {
      Cookies.set("token", token);
    }
  }

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
                  <NodeHeader haksd={haksd} setJson={setJson}/>
                  <Index sendDataToParent={setHaksd} getDataFromParent={json} />
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
