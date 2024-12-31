import React from "react";
import { Card } from "./ui/card";

const Footer = ({children}) => {
    return (
        <Card className="w-full rounded-2xl bg-card bg-slate-200 dark:bg-gray-900 md:h-10 md:flex-row flex flex-row items-center justify-between gap-4 m-0 py-3 px-4">
            {children}
        </Card>
    )
};

export default Footer;