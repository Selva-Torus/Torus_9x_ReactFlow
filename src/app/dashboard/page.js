"use client"
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { Tabbar } from "@/pageComponents/tabBar/TabBar";
import Sidenav from "@/pageComponents/menubar/Sidenav";
import Footer from "@/pageComponents/footer/Footer";
import SideNavAccordian from "@/pageComponents/sidebarAsAccordian/Sidenavbar";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      alert("please signin to continue");
      signIn();
    },
  });
  console.log(session, status);

  if (status == "authenticated" && session) {
    const token = session?.token?.token?.user?.token;
    if (token) {
      Cookies.set("token", token);
    }
  }

 

  return (
    <main >
      {status !== "loading" && (<>
      <Tabbar/>
      <div className="h-[82vh]">
        <Sidenav />
      </div>
      <Footer/>
      </>)}
    </main>
  )
}
