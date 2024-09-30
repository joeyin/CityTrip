"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <NextUIProvider>
        <ToastContainer
          autoClose={2000}
          limit={3}
          newestOnTop
          position="bottom-left"
        />
        {children}
      </NextUIProvider>
    </SWRConfig>
  );
}
