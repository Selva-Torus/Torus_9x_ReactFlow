"use client";
import * as React from "react";
import { FcStart } from "react-icons/fc";
import { CgComponents } from "react-icons/cg";
import { IoDocumentsOutline } from "react-icons/io5";
// import { MdOutlineDocumentScanner } from "react-icons/md";
import TorusImg from "../PF_Dashboard/img/torus.png";
import { GrDocumentConfig } from "react-icons/gr";
// import start from "../PF_Dashboard/assets/sidebarImg/start-button.png";
// import api from "@/dashboard/assets/sidebarImg/api.png";
// import decisionTree from "@/dashboard/assets/sidebarImg/decision-tree.png";
// import end from "@/dashboard/assets/sidebarImg/end.png";
import { toast } from "react-toastify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import MenuDetailsComponent from "../PF_Dashboard/layout/PF_nodeMenu";

import { useSelector } from "react-redux";
import { useState } from "react";

const Icons = [
  {
    id: 1,
    icon: CgComponents,
    title: "DF",
    data: [
      {
        id: 21,
        label: "Data Collection",
        description: "Collect relevant data",
      },
      { id: 22, label: "Data Analysis", description: "Analyze gathered data" },
      {
        id: 23,
        label: "Data Visualization",
        description: "Create visualizations",
      },
      { id: 24, label: "Data Storage", description: "Manage data storage" },
    ],
  },
  {
    id: 2,
    icon: FcStart,
    title: "PF",
    data: [
      // {
      //   id: 21,
      //   label: "Process Collection",
      //   description: "Collect relevant data",
      // },
      // {
      //   id: 22,
      //   label: "Process Analysis",
      //   description: "Analyze gathered data",
      // },
      // {
      //   id: 23,
      //   label: "Process Visualization",
      //   description: "Create visualizations",
      // },
      // { id: 24, label: "Process Storage", description: "Manage data storage" },
    ],
  },
  {
    id: 3,
    icon: IoDocumentsOutline,
    title: "UF",
    data: [
      {
        id: 31,
        label: "Process Definition",
        description: "Define project processes",
      },
      {
        id: 32,
        label: "Workflow Optimization",
        description: "Optimize workflow",
      },
      {
        id: 33,
        label: "Process Documentation",
        description: "Document project processes",
      },
      {
        id: 34,
        label: "Continuous Improvement",
        description: "Implement continuous improvement",
      },
    ],
  },
  {
    id: 4,
    icon: TorusImg,
    title: "TRN",
    data: [
      {
        id: 41,
        label: "Document Management",
        description: "Manage project documents",
      },
      {
        id: 42,
        label: "Document Review",
        description: "Review important documents",
      },
      {
        id: 43,
        label: "Version Control",
        description: "Control document versions",
      },
      {
        id: 44,
        label: "Document Archive",
        description: "Archive outdated documents",
      },
    ],
  },
  {
    id: 5,
    icon: GrDocumentConfig,
    title: "System",
    data: [
      {
        id: 51,
        label: "System Configuration",
        description: "Configure project system",
      },
      {
        id: 52,
        label: "Integration",
        description: "Integrate system components",
      },
      {
        id: 53,
        label: "System Monitoring",
        description: "Monitor system performance",
      },
      {
        id: 54,
        label: "System Maintenance",
        description: "Perform system maintenance",
      },
    ],
  },
];

export default function SideNavAccordian({ state, setState }) {
  const [sideNavBar, setSideNavBar] = useState(Icons.slice(0, 3));
  const appName = useSelector((state) => state.counter.appName);
  const isTorusControl = useSelector((state) => state.counter.isTorusControl);

  React.useEffect(() => {
    isTorusControl && setSideNavBar(Icons);
  }, [isTorusControl]);

  const onDragStart = (
    event,
    nodeType,
    nodeName = "start",
    rolesColor,
    roles
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/name", nodeName);
    event.dataTransfer.setData("application/roleColor", rolesColor);
    event.dataTransfer.setData("application/roles", roles);
    event.dataTransfer.effectAllowed = "move";
  };

  const handlechange = (e) => {
    if (appName) {
      setState(e);
    } else {
      toast.error("Please select appName");
    }
    // console.log(e);
  };

  return (
    <Accordion
      value={state}
      onValueChange={handlechange}
      type="single"
      collapsible
      className="h-[88vh] w-[70px] bg-gray-200 flex flex-col justify-evenly "
    >
      {sideNavBar.map((item) => (
        <AccordionItem value={item.title} className="w-[70px]" key={item.id}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex flex-col items-center w-[70px] ">
              {item.icon == TorusImg ? (
                <Image src={TorusImg} alt="Torus" width={20} height={20} />
              ) : (
                React.createElement(item.icon, { size: 20 })
              )}
              <div className="text-[10px] ">{item.title}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent className=" absolute left-[70px] top-[40px] flex flex-col justify-start gap-3 bg-gray-200 h-[90vh] pt-[3%]">
            {state === "PF" || state === "TRN" ? (
              <MenuDetailsComponent />
            ) : state === "DF" ? null : (
              item.data.map((subContent) => (
                <div
                  key={subContent.id}
                  className="px-3 flex flex-col justify-evenly mt-3 "
                >
                  <div className="font-semibold">{subContent.label}</div>
                  <div className="text-xs">{subContent.description}</div>
                </div>
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
