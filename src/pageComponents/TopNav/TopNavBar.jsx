import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Dialog } from "primereact/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "../../../public/logo.ico";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { readReddis } from "@/utilsfunctions/apiCallUnit";
// import {RootState} from '../../redux/store'
import { useDispatch, useSelector } from "react-redux";

import { selectApp, setTorusControl } from "../../redux/reducer/CounterSlice";

const TopBar = ({ state }) => {
  const appName = useSelector((state) => state.counter.appName);
  const dispatch = useDispatch();

  const [app, setApp] = useState(false);
  const [LoginApplication, setLoginApplication] = useState([]);

  const GetJson = async () => {
    try {
      const response = await readReddis("Datafabrics").then((res) =>
        JSON.parse(res)
      );

      setLoginApplication(Object.keys(response.Datafabrics));
    } catch (err) {}
  };

  useEffect(() => {
    GetJson();
  }, []);
  return (
    <NavigationMenu className="flex justify-between max-w-none px-3 py-0 bg-gray-200">
      <Link href="/" className="flex items-center gap-1">
        <Image className="h-[25px] w-[30px] mt-2" src={logo}></Image>
        <logo className="text-[16px] font-bold">TORUS</logo>
      </Link>
      <NavigationMenuList className="flex gap-5 pr-4 py-2 items-center text-[15px] font-bold">
       {appName =="" ? <Button
          onClick={() => {
            setApp(true);
          }}
        >
          Select Application : {appName}
        </Button> : <Button> Application : {appName}</Button>}
        <Button onClick={() => dispatch(setTorusControl(true))}>
          Torus Control
        </Button>
        {/* <NavigationMenuItem>
          <NavigationMenuLink className="font-semibold" href="/dashboard">
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className="font-semibold" href="/Team">
            Team
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="font-semibold" href="/Projects">
            Projects
          </NavigationMenuLink>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuLink className="font-semibold" href="/Calendar">
            Calendar
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/msp397.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-center mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <p onClick={() => signOut()}>Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Dialog
        visible={app}
        style={{ width: "40vw" }}
        onHide={() => {
          setApp(false);
        }}
        headerStyle={{ textAlign: "center" }}
        closable={false}
      >
        <div className="flex justify-center gap-5">
          {LoginApplication.map((ele, id) => {
            return (
              <button
                key={id}
                onClick={() => {
                  dispatch(selectApp(ele));
                  setApp(false);
                }}
              >
                {ele}
              </button>
            );
          })}
        </div>
        <br />
        {/* <Button onClick={() => setApp(false)}>close</Button> */}
      </Dialog>
    </NavigationMenu>
  );
};
export default TopBar;
