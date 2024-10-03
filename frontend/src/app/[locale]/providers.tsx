"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";
import { ToastContainer, toast } from "react-toastify";
import { AppProvider, FormBody } from "@/providers/AppProvider";

type FetcherParams = {
  url: string;
  method?: "GET" | "POST";
  body?: FormBody;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const fetcher = (
    { url, method = "GET", body }: FetcherParams,
    // init: BareFetcher
  ) => {
    if (method === "POST") {
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) => res.json());
    } else {
      return fetch(url).then((res) => res.json());
    }
  };

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        refreshInterval: 0,
        fetcher,
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
