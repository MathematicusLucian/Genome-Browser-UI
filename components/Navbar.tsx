import React, { useContext } from "react";
import styles from '../styles/Layout.module.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Menu } from "lucide-react";
  import { Card } from "@/components/ui/card";
  import ModeToggle from './ModeToggle';
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  import { nanoid } from "nanoid";
  import Link from "next/link";
  
  const Navbar = () => {
    return (
      <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
        <div className="-ml-1 text-primary cursor-pointer">
            <h1 className={styles.title}>
                <a href="/" className="text-slate-950 dark:text-slate-100">
                    Genome Browser 🔬🧬
                </a>
            </h1>
            <div className={styles.subtitle}>
                (<strong>Engineered by:</strong>&nbsp;
                <a href="https://github.com/MathematicusLucian" target="blank" className="dark:text-slate-100">
                    MathematicusLucian
                </a>)
            </div>
        </div> 
        <Separator orientation="vertical" className="mr-2 h-4" />
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="cursor-pointer">Patient</span>
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
  
        <div className="flex items-center">
          <Button variant="secondary" className="hidden md:block px-2">
            Login
          </Button>
          <Button className="hidden md:block ml-2 mr-2">Get Started</Button>
  
          <div className="flex md:hidden mr-2 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="py-2 px-2 bg-gray-100 rounded-md">Patient</span>
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
                  <Button variant="secondary" className="w-full text-sm">
                    Login
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="w-full text-sm">Get Started</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
  
          {/* <ModeToggle /> */}
          <ModeToggle children={undefined} />
        </div>
      </Card>
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