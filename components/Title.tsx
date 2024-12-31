"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "../cn";

interface TitleProps {
  className?: string;
  title: string;
  button?: any;
  buttonText?: string;
  icon?: any;
  href?: string;
  onClick?: () => void;
}

const Title: React.FC<TitleProps> = ({
  className,
  title,
  button,
  buttonText,
  icon,
  href,
  onClick,
}) => {
  
  return (
    <>
      <h2
        className={cn(
          "text-center text-2xl font-semibold text-primary xl:text-3xl",
          className,
        )}
      >
        {title}
      </h2>  
      {button 
        && buttonText ? (
          href ? (
            <Link href={href}>
              <Button>
                {buttonText}
                {icon}
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={onClick}
            >
              {buttonText}
              {icon}
            </Button>
          )
        ) 
        : (<></>)
      } 
    </>
  );
}

export default Title;