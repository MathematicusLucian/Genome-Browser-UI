'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { addDemoDataIfDatabaseTablesEmpty } from '@/database/database'

const PublicLayout = ({ isSidebar, children }) => {
  const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

  useEffect(() => {
    addDemoDataIfDatabaseTablesEmpty()
  }, [])

  return children
  // return isSidebar ?
  //   (
  //     <div>
  //       <Sidebar>
  //         Sidebar content
  //       </Sidebar>
  //       <div>{children}</div>
  //     </div>
  //   )
  //   : (<></>)
}

export default PublicLayout
