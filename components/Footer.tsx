import React from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

const Footer = () => {
    return (
        <footer> 
            <Card className="container rounded-2xl bg-card bg-slate-200 dark:bg-gray-900 py-3 px-4 border-0 flex items-center justify-between gap-6 mt-5">
                <div className="flex flex-row items-center justify-between gap-4 md:h-10 md:flex-row">
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
            </Card>
        </footer>
    )
};

export default Footer;