'use client'
import React, { useContext } from "react";
import type {FC} from 'react'; 
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button"; 
import { useSession, signIn, signOut } from "next-auth/react"

const AuthAndThemeToggleButtons: FC<any> = ({session}) => {   
    return (
        <> 
            {session ?
                (<Button variant="secondary" className="hidden md:block px-2" onClick={() => signIn()}>
                    Log in
                </Button>
                )
                : (<Button variant="secondary" className="hidden md:block px-2" onClick={() => signOut()}>
                    Log out
                </Button>)
            }
            <ModeToggle />
        </>
    )
}; 

export default AuthAndThemeToggleButtons;