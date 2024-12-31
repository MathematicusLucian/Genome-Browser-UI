import {
    LayoutDashboard,
    KeyRound,
    LogOut,
    UserRound,
    LayoutList,
    Box,
    UsersRoundIcon,
  } from "lucide-react";
  import Link from "next/link";
  
  export const AUTH_TOKEN_KEY = "ds97fd79gd97d97g9gs7f96g"; // "AUTH_TOKEN";
//   export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  export const BASE_URL = 'http://127.0.0.1:8000/';

//   export const generateProfileDropdownOptions = (role) => {
//     return [
//       {
//         key: `/profile`,
//         label: (
//           <Link href={`/profile`} className="flex items-center gap-2">
//             <UserRound className="size-5" /> Profile
//           </Link>
//         ),
//       },
//       {
//         key: "/change-password",
//         label: (
//           <Link href="/change-password" className="flex items-center gap-2">
//             <KeyRound className="size-5" /> Change Password
//           </Link>
//         ),
//       },
//       {
//         type: "divider",
//       },
//       {
//         key: "/logout",
//         label: (
//           <Link href="/logout" className="flex items-center gap-2">
//             <LogOut className="size-5" /> Logout
//           </Link>
//         ),
//         danger: true,
//       },
//     ];
//   };
  
//   export const getUserRoleForRoute = (user) => {
//     return `${user?.role === "SUPER_ADMIN" ? "super-admin" : user?.role?.toLowerCase()}`;
//   };
  
//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }
  
//   export const getSidebarItems = (role) => {
//     const SUPER_ADMIN = [
//       getItem("Dashboard", "/super-admin/dashboard", <LayoutDashboard />),
//       getItem("Manage Categories", "category", <LayoutList />, [
//         getItem("Category List", "/super-admin/category"),
//         getItem("Add Category", "/super-admin/category/add"),
//       ]),
//       getItem("Manage Products", "product", <Box />, [
//         getItem("Product Size", "/super-admin/product/size"),
//         getItem("Product List", "/super-admin/product"),
//         getItem("Add Product", "/super-admin/product/add"),
//       ]),
//       getItem("Manage Users", "/super-admin/user", <UsersRoundIcon />),
//     ];
  
//     switch (role) {
//       case "SUPER_ADMIN":
//         return SUPER_ADMIN;
//       case "ADMIN":
//         return ADMIN;
//       default:
//         return [];
//     }
//   };
  
//   export function transformCategories(data) {
//     return data.map((category) => transformCategory(category));
//   }
  
//   function transformCategory(category) {
//     return {
//       value: category.id,
//       label: category.name,
//       children: (category.sub_categories || []).map((subCategory) =>
//         transformCategory(subCategory),
//       ),
//     };
//   }
  
//   export const userStatusOptions = [
//     {
//       key: "1",
//       value: "ACTIVE",
//       label: "Active",
//     },
//     {
//       key: "2",
//       value: "INACTIVE",
//       label: "Inactive",
//     },
//   ];
  
//   export const userRoleOptions = [
//     // {
//     //   key: "1",
//     //   value: "ADMIN",
//     //   label: "Admin",
//     // },
//     {
//       key: "CUSTOMER",
//       value: "CUSTOMER",
//       label: "Customer",
//     },
//   ];