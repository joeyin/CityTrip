"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";
import { ToastContainer, toast } from "react-toastify";
import { AppProvider } from "@/providers/AppProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        refreshInterval: 0,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        onError: (err: Error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(err);
          }
          toast.error(err?.message || "Unknown error");
        },
      }}
    >
      <NextUIProvider>
        <ToastContainer
          autoClose={1500}
          limit={3}
          newestOnTop
          position="bottom-left"
        />
        <AppProvider>{children}</AppProvider>
      </NextUIProvider>
    </SWRConfig>
  );
}
