import React, { useContext } from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
  
const Navbar = ({children}) => {
  return (
      <>

        {/* Mobile */}

        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hidden md:block ml-2 mr-2">DNA Analysis</Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="start">
                {patientSubMenu.map((page) => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#faqs">FAQs</a>
          </li>
        </ul>

        {/* Desktop */}
  
        <div className="flex items-center">
          <div className="flex md:hidden mr-2 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild> 
                <span className="py-2 px-2 bg-gray-950 dark:bg-slate-100 text-slate-100 dark:text-zinc-950 xs:text-sm rounded-md">DNA Analysis</span>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="start">
                {patientSubMenu.map((page) => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
  
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <a href="#home">Home</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#features">Features</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#pricing">Pricing</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#faqs">FAQs</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  { children }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center">  
          { children }
        </div>

      </>
    );
  };
  
  const patientSubMenu = [
    {
      id: nanoid(),
      title: "Patients Viewer", 
      route: "/patient/list/",
    },
    {
      id: nanoid(),
      title: "Genome Viewer",
      route: "/patient/genome/",
    },
    {
      id: nanoid(),
      title: "SNP Analysis",
      route: "/patient/report/",
    },
  ];
  
  export default Navbar;