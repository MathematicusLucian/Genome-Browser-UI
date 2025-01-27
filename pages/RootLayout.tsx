'use client'
import React, { useState, useEffect, useMemo, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Drawer from '../components/Drawer'
import { Separator } from '../components/ui/separator'
import { getUserInfo } from '../services/Auth'
import { ModalContext, DrawerContext } from '../context'
import { Button } from '@/components/ui/button'

const RootLayout = ({ sidebar, session, children }: any) => {
  // const { data: session } = useSession();

  const {
    modalTitle,
    modalContent,
    modalVisible,
    updatModalTitle,
    updateModalContent,
    toggleModalVisible,
  } = useContext(ModalContext)
  const {
    drawerTitle,
    drawerContent,
    drawerVisible,
    updateDrawerTitle,
    updateDrawerContent,
    toggleDrawerVisible,
  } = useContext(DrawerContext)

  const router = useRouter()
  const user: any = getUserInfo()

  useEffect(() => {
    if (!session) {
      // router.push("/");
    } else {
      // router.push(
      //   `/${user?.role === "SUPER_ADMIN" ? "super-admin" : user?.role.toLowerCase()}/dashboard`,
      // );
    }
  })

  const FooterContent = ({}) => (
    <>
      <div className="text-balance text-center sm:text-sm leading-loose text-muted-foreground md:text-left leading-none">
        <a href="/" className="text-slate-950 dark:text-slate-100 text-xs">
          GenomeSearch: UI, and API 🔬🧬
        </a>
      </div>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="text-balance text-center xs:text-sm leading-loose text-muted-foreground md:text-left leading-none">
        <strong></strong> &copy;{' '}
        <a
          href="https://github.com/MathematicusLucian"
          target="\_blank"
          rel="noreferrer"
          className="font-medium no-underline underline-offset-4 text-xs"
        >
          Luke Jones <span className="xs:hidden md:inline">(github.com/MathematicusLucian)</span>
        </a>
        <span className="text-balance text-center xs:text-xs leading-loose text-muted-foreground md:text-left leading-none">
          {new Date().getFullYear()}
        </span>
      </div>
    </>
  )

  return (
    <div className="flex flex-col h-screen p-0 m-0 top-0">
      <Modal
        isOpen={modalVisible}
        onClose={toggleModalVisible}
        title={modalTitle}
        content={modalContent}
      />
      <Drawer
        isOpen={drawerVisible}
        onClose={toggleDrawerVisible}
        title={drawerTitle}
        content={drawerContent}
      />

      <SessionProvider session={session}>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="w-full text-center border-b border-grey">
            <Header session={session} />
          </header>

          <main className="flex-1 overflow-y-scroll w-100 justify-top items-center text-center border-b border-grey px-14 py-8 bg-slate-100 dark:bg-gray-950 top-0">
            {/* flex flex-1 flex-column */}
            <div className="min-h-screen">
              {/* Session management */}
              {/* {session ? (
                <div className="p-0 m-0 flex flex-col flex-1 flex-grow w-full"> 
                  {children}
                </div>
              ):(
                <> 
                  <h2 className="pb-5">Please login ...</h2>
                  <Button className="close-button rounded px-3 py-1 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900" onClick={() => signIn()}>Log in</Button>
                </>
              )} */}

              {children}
            </div>
          </main>

          <footer className="w-full text-center border-t border-grey">
            <Footer>
              <FooterContent />
            </Footer>
          </footer>
        </div>
      </SessionProvider>

      <style jsx>{`
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono',
            'Bitstream Vera Sans Mono', 'Courier New', monospace;
        }
      `}</style>
    </div>
  )
}

export default RootLayout
