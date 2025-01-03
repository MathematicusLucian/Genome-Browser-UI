"use client";
import { makeStore } from "../state/store";
// import themeConfig from "@/theme/themeConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function GlobalProvider({ children }) {
  return (
    <Provider store={makeStore()}>
      <Toaster position="top-center" richColors />
      <AntdRegistry>
        {/* <ConfigProvider theme={themeConfig}>{children}</ConfigProvider> */}
      </AntdRegistry>{" "}
    </Provider>
  );
}