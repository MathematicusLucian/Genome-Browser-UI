import React from "react";
import { Separator } from "./ui/separator";

const Footer = () => {
    return (
        <footer className="py-6 md:px-8 md:py-0 bottom sticky">
        <Separator orientation="horizontal" className="mt-4 h-1" />
        <div className="container flex flex-row items-center justify-between gap-4 md:h-10 md:flex-row">
            <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                <a href="/" className="text-slate-950 dark:text-slate-100 text-xs">
                    Genome Browser UI, and Genome Browser API 🔬🧬
                </a> 
            </div>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"> 
                <strong></strong> &copy; <a
                    href="https://github.com/MathematicusLucian"
                    target="\_blank"
                    rel="noreferrer"
                    className="font-medium no-underline underline-offset-4 text-xs"
                >
                    Luke Jones (github.com/MathematicusLucian)
                </a> {new Date().getFullYear()} 
            </div>
        </div>
        </footer>
    )
};

export default Footer;