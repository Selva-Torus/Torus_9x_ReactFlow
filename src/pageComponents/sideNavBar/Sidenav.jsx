"use client";
import React from "react";
import { FcStart } from "react-icons/fc";
import { CgComponents } from "react-icons/cg";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { GrDocumentConfig } from "react-icons/gr";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const Icons = [
  { id: 1, icon: FcStart, title: "start" },
  { id: 2, icon: CgComponents, title: "data" },
  { id: 3, icon: IoDocumentsOutline, title: "process" },
  { id: 4, icon: MdOutlineDocumentScanner, title: "Doc" },
  { id: 5, icon: GrDocumentConfig, title: "txt" },
];

const Sidenav = () => {
  return (
    // <Menubar className="flex flex-col items-center bg-gray-200 relative border-r w-[70px] border-gray-300 border-none rounded-none h-full">
    //   {Icons.map((item) => (
    //     <MenubarMenu key={item.id}>
    //       <MenubarTrigger className="flex flex-col">
    //         {React.createElement(item.icon, { size: 20 })}
    //         <div className="text-[10px] left:100px">{item.title}</div>
    //       </MenubarTrigger>
    //       <MenubarContent className="fixed left-[70px] top-[0px] z-0 space-x-0 h-[40%] justify-start bg-gray-400">
    //         <MenubarItem className="flex">
    //           New Tab <MenubarShortcut>⌘T</MenubarShortcut>
    //         </MenubarItem>
    //         <MenubarItem>New Window</MenubarItem>
    //         <MenubarSeparator />
    //         <MenubarItem>Share</MenubarItem>
    //         <MenubarSeparator />
    //         <MenubarItem>Print</MenubarItem>
    //       </MenubarContent>
    //     </MenubarMenu>
    //   ))}
    // </Menubar>
    <NavigationMenu className="bg-gray-200 p-4 h-full border-none">
      <NavigationMenuList className='flex flex-col justify-evenly h-[82vh]'>
        {Icons.map((item) => (
          <NavigationMenuItem key={item.id} >
            <NavigationMenuTrigger className='bg-transparent'>
              <div className="flex flex-col items-center">
                {React.createElement(item.icon, { size: 20 })}
                <div className="text-[10px]">{item.title}</div>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col justify-evenly px-4 h-[82vh] border-none bg-gray-200" >
              <NavigationMenuLink className="w-[100px] text-center">Dashboard</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Tasks</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Projects</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Calendar</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Reports</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Users</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Settings</NavigationMenuLink>
              <NavigationMenuLink className="w-[100px] text-center">Help</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

  );
};

export default Sidenav;