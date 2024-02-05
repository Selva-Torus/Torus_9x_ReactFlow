"use client";
import * as React from "react";
import { FcStart } from "react-icons/fc";
import { CgComponents } from "react-icons/cg";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { GrDocumentConfig } from "react-icons/gr";
import start from "@/dashboard/assets/sidebarImg/start-button.png";
import api from "@/dashboard/assets/sidebarImg/api.png";
import decisionTree from "@/dashboard/assets/sidebarImg/decision-tree.png";
import end from "@/dashboard/assets/sidebarImg/end.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

import MenuDetailsComponent from "../sideBarRF/SideBarRF";

const Icons = [
  {
    id: 1,
    icon: CgComponents,
    title: "Data",
    data: [
      // {
      //   id: 21,
      //   label: "Data Collection",
      //   description: "Collect relevant data",
      // },
      // { id: 22, label: "Data Analysis", description: "Analyze gathered data" },
      // {
      //   id: 23,
      //   label: "Data Visualization",
      //   description: "Create visualizations",
      // },
      // { id: 24, label: "Data Storage", description: "Manage data storage" },
    ],
  },
  {
    id: 2,
    icon: FcStart,
    title: "Process",
    data: [
      {
        id: 21,
        label: "Process Collection",
        description: "Collect relevant data",
      },
      {
        id: 22,
        label: "Process Analysis",
        description: "Analyze gathered data",
      },
      {
        id: 23,
        label: "Process Visualization",
        description: "Create visualizations",
      },
      { id: 24, label: "Process Storage", description: "Manage data storage" },
    ],
  },
  {
    id: 3,
    icon: IoDocumentsOutline,
    title: "Application",
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
    icon: MdOutlineDocumentScanner,
    title: "Documents",
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

  return (
    <Accordion
      value={state}
      onValueChange={setState}
      type="single"
      collapsible
      className="h-[88vh] w-[70px] bg-gray-200 flex flex-col justify-evenly "
    >
      {Icons.map((item) => (
        <AccordionItem value={item.title} className="w-[70px]" key={item.id}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex flex-col items-center w-[70px] ">
              {React.createElement(item.icon, { size: 20 })}
              <div className="text-[10px] ">{item.title}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent className=" absolute left-[70px] top-[40px] flex flex-col justify-start gap-3 bg-gray-200 h-[90vh] pt-[3%]">
            {state === "Data" ? (
              <MenuDetailsComponent />
            ) : (
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
