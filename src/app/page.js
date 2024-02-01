"use client";
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { Tabbar } from "@/pageComponents/tabBar/TabBar";
import Sidenav from "@/pageComponents/menubar/Sidenav";
import Footer from "@/pageComponents/footer/Footer";
import SideNavAccordian from "@/pageComponents/sidebarAsAccordian/Sidenavbar";
import { Background } from "reactflow";
import { useState } from "react";


import Dashboard from "@/dashboard/container/Dashboard";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      alert("please signin to continue");
      signIn();
    },
  });
  console.log(session, status);

  const [open, setOpen] = useState(false);

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
          <Tabbar />
          <div className="h-[82vh] flex">
            <SideNavAccordian setOpen={setOpen} />

            {open && <div className="ml-[60px] h-[82vh] w-[90vw]"> <Dashboard
          ten={"TORUS9X"}
          applicationG={"Group-1"}
          applicationV={"app1"}
          admin={{ canAdd: true, canDelete: true, canEdit: true }}
        /> </div>}
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}
