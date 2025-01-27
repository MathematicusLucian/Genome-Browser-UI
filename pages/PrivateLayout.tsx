'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { addDemoDataIfDatabaseTablesEmpty } from '@/database/database'

const PrivateLayout = ({ isSidebar, children }) => {
  const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

  useEffect(() => {
    addDemoDataIfDatabaseTablesEmpty()
    console.log('addDemoDataIfDatabaseTablesEmpty')
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

export default PrivateLayout
