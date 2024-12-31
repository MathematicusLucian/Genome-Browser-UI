"use client";
import { Dropdown, Skeleton } from "antd";
import { usePathname } from "next/navigation";
import UserProfileBox from "./UserProfileBox";
// import {
//   generateProfileDropdownOptions,
//   getUserRoleForRoute,
// } from "./../constant";

const UserProfile = ({ user, isLoading }) => {
  const pathname = usePathname();
//   const role = getUserRoleForRoute(user);
//   const items = generateProfileDropdownOptions(role);

    return (
        <>
          {isLoading ? (
            <div className="hidden w-40 cursor-pointer items-center gap-2 rounded-md border p-1 px-2 md:flex">
              <Skeleton.Avatar active />
              <div className="space-y-1 pr-2">
                <p className="h-3.5 w-16 animate-pulse rounded-sm bg-gray-200"></p>
                <p className="h-2.5 w-24 animate-pulse rounded-sm bg-gray-200"></p>
              </div>
            </div>
          ) : (
            // <Dropdown
            //   menu={{
            //     items,
            //     selectedKeys: [pathname],
            //   }}
            //   placement="bottomRight"
            //   className="max-md:hidden"
            // >
            //   <div>
            //     <UserProfileBox user={user} />
            //   </div>
            // </Dropdown>
          )}
        </>
    )
}

export default UserProfile;