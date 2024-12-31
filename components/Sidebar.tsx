"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Container from "./Container";
import useDesktop from "../hooks/use-desktop";
import { getUserInfo } from "../services/Auth";
// import { getSidebarItems } from "../constant";

export default function Sidebar({ children }) {
  const isDesktop = useDesktop();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(isDesktop ? false : true);
  const user = getUserInfo();
//   const items = getSidebarItems(user?.role);

  return (
    <>
      <div className="max-md:hidden">
        Sidebar content
      </div>
      <div className="hidden max-md:block">
        {children}
      </div>
    </>
  );
}