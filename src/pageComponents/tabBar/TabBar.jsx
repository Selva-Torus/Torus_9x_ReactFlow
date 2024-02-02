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
import { signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Builder from "@/dashboard/container/treejson/builder";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { fetchToken, setDemoToken } from "@/utilsfunctions/redisFunctions";

export const Tabbar = () => {
  const { data: session } = useSession();
  const router = useRouter;
  const handleSignOut = async () => {
    console.log("hi");
    await signOut();
  };

  const handleSetData = async () => {
    await setDemoToken("Mari Shanmug pandian", 30);
  };

  const handleGetData = async () => {
    const val = await fetchToken();
    console.log(val);
  };
  return (
    <NavigationMenu className="flex justify-between max-w-none px-3 py-0 bg-gray-200">
      <Link href="/" className="flex items-center gap-1">
        <Image className="h-[25px] w-[30px] mt-2" src={logo} ></Image>
        <logo className="text-[16px] font-bold">TORUS</logo>
      </Link>
      <NavigationMenuList className="flex gap-5 pr-4 py-2 items-center text-[15px] font-bold">
        <NavigationMenuItem>
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
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="font-semibold" href="/Calendar">
            Calendar
          </NavigationMenuLink>
          {/* <NavigationMenuLink className="font-semibold" onClick={handleSetData} >setData</NavigationMenuLink> */}
          {/* <NavigationMenuLink className="font-semibold" onClick={handleGetData}>getData</NavigationMenuLink> */}
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
              <Dialog className="">
                <DialogTrigger className="text-[14px] mr-[3%]">
                  React-Flow
                </DialogTrigger>
                <DialogContent>
                  <Builder
                    defaultJSOn={{
                      js: [
                        {
                          id: 1,
                          name: "Leanne Graham",
                          username: "Bret",
                          email: "Sincere@april.biz",
                          address: {
                            street: "Kulas Light",
                            suite: "Apt. 556",
                            city: "Gwenborough",
                            zipcode: "92998-3874",
                            geo: {
                              lat: "-37.3159",
                              lng: "81.1496",
                            },
                          },
                          phone: "1-770-736-8031 x56442",
                          website: "hildegard.org",
                          company: {
                            name: "Romaguera-Crona",
                            catchPhrase:
                              "Multi-layered client-server neural-net",
                            bs: "harness real-time e-markets",
                          },
                        },
                        {
                          id: 2,
                          name: "Ervin Howell",
                          username: "Antonette",
                          email: "Shanna@melissa.tv",
                          address: {
                            street: "Victor Plains",
                            suite: "Suite 879",
                            city: "Wisokyburgh",
                            zipcode: "90566-7771",
                            geo: {
                              lat: "-43.9509",
                              lng: "-34.4618",
                            },
                          },
                          phone: "010-692-6593 x09125",
                          website: "anastasia.net",
                          company: {
                            name: "Deckow-Crist",
                            catchPhrase: "Proactive didactic contingency",
                            bs: "synergize scalable supply-chains",
                          },
                        },
                        {
                          id: 3,
                          name: "Clementine Bauch",
                          username: "Samantha",
                          email: "Nathan@yesenia.net",
                          address: {
                            street: "Douglas Extension",
                            suite: "Suite 847",
                            city: "McKenziehaven",
                            zipcode: "59590-4157",
                            geo: {
                              lat: "-68.6102",
                              lng: "-47.0653",
                            },
                          },
                          phone: "1-463-123-4447",
                          website: "ramiro.info",
                          company: {
                            name: "Romaguera-Jacobson",
                            catchPhrase: "Face to face bifurcated interface",
                            bs: "e-enable strategic applications",
                          },
                        },
                        {
                          id: 4,
                          name: "Patricia Lebsack",
                          username: "Karianne",
                          email: "Julianne.OConner@kory.org",
                          address: {
                            street: "Hoeger Mall",
                            suite: "Apt. 692",
                            city: "South Elvis",
                            zipcode: "53919-4257",
                            geo: {
                              lat: "29.4572",
                              lng: "-164.2990",
                            },
                          },
                          phone: "493-170-9623 x156",
                          website: "kale.biz",
                          company: {
                            name: "Robel-Corkery",
                            catchPhrase:
                              "Multi-tiered zero tolerance productivity",
                            bs: "transition cutting-edge web services",
                          },
                        },
                        {
                          id: 5,
                          name: "Chelsey Dietrich",
                          username: "Kamren",
                          email: "Lucio_Hettinger@annie.ca",
                          address: {
                            street: "Skiles Walks",
                            suite: "Suite 351",
                            city: "Roscoeview",
                            zipcode: "33263",
                            geo: {
                              lat: "-31.8129",
                              lng: "62.5342",
                            },
                          },
                          phone: "(254)954-1289",
                          website: "demarco.info",
                          company: {
                            name: "Keebler LLC",
                            catchPhrase: "User-centric fault-tolerant solution",
                            bs: "revolutionize end-to-end systems",
                          },
                        },
                        {
                          id: 6,
                          name: "Mrs. Dennis Schulist",
                          username: "Leopoldo_Corkery",
                          email: "Karley_Dach@jasper.info",
                          address: {
                            street: "Norberto Crossing",
                            suite: "Apt. 950",
                            city: "South Christy",
                            zipcode: "23505-1337",
                            geo: {
                              lat: "-71.4197",
                              lng: "71.7478",
                            },
                          },
                          phone: "1-477-935-8478 x6430",
                          website: "ola.org",
                          company: {
                            name: "Considine-Lockman",
                            catchPhrase: "Synchronised bottom-line interface",
                            bs: "e-enable innovative applications",
                          },
                        },
                        {
                          id: 7,
                          name: "Kurtis Weissnat",
                          username: "Elwyn.Skiles",
                          email: "Telly.Hoeger@billy.biz",
                          address: {
                            street: "Rex Trail",
                            suite: "Suite 280",
                            city: "Howemouth",
                            zipcode: "58804-1099",
                            geo: {
                              lat: "24.8918",
                              lng: "21.8984",
                            },
                          },
                          phone: "210.067.6132",
                          website: "elvis.io",
                          company: {
                            name: "Johns Group",
                            catchPhrase: "Configurable multimedia task-force",
                            bs: "generate enterprise e-tailers",
                          },
                        },
                        {
                          id: 8,
                          name: "Nicholas Runolfsdottir V",
                          username: "Maxime_Nienow",
                          email: "Sherwood@rosamond.me",
                          address: {
                            street: "Ellsworth Summit",
                            suite: "Suite 729",
                            city: "Aliyaview",
                            zipcode: "45169",
                            geo: {
                              lat: "-14.3990",
                              lng: "-120.7677",
                            },
                          },
                          phone: "586.493.6943 x140",
                          website: "jacynthe.com",
                          company: {
                            name: "Abernathy Group",
                            catchPhrase: "Implemented secondary concept",
                            bs: "e-enable extensible e-tailers",
                          },
                        },
                        {
                          id: 9,
                          name: "Glenna Reichert",
                          username: "Delphine",
                          email: "Chaim_McDermott@dana.io",
                          address: {
                            street: "Dayna Park",
                            suite: "Suite 449",
                            city: "Bartholomebury",
                            zipcode: "76495-3109",
                            geo: {
                              lat: "24.6463",
                              lng: "-168.8889",
                            },
                          },
                          phone: "(775)976-6794 x41206",
                          website: "conrad.com",
                          company: {
                            name: "Yost and Sons",
                            catchPhrase:
                              "Switchable contextually-based project",
                            bs: "aggregate real-time technologies",
                          },
                        },
                        {
                          id: 10,
                          name: "Clementina DuBuque",
                          username: "Moriah.Stanton",
                          email: "Rey.Padberg@karina.biz",
                          address: {
                            street: "Kattie Turnpike",
                            suite: "Suite 198",
                            city: "Lebsackbury",
                            zipcode: "31428-2261",
                            geo: {
                              lat: "-38.2386",
                              lng: "57.2232",
                            },
                          },
                          phone: "024-648-3804",
                          website: "ambrose.net",
                          company: {
                            name: "Hoeger LLC",
                            catchPhrase: "Centralized empowering task-force",
                            bs: "target end-to-end models",
                          },
                        },
                      ],
                    }}
                  />

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem>
                <p onClick={() => signOut()}>Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
