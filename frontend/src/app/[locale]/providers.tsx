"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";
import { ToastContainer, toast } from "react-toastify";
import { AppProvider } from "@/providers/AppProvider";

interface RequestOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: { [key: string]: FormDataEntryValue };
}

export function Providers({ children }: { children: React.ReactNode }) {
  const fetcher = async (resource: [string, RequestOptions]) => {
    const [url, options = { method: "GET" }] = resource;
    const headers: HeadersInit = {
      Accept: "application/json",
      ...(options?.headers || {}),
    };
    const formData = new FormData();
    let body: BodyInit | null = null;
    if (options?.body) {
      for (const [key, value] of Object.entries(options.body)) {
        formData.append(key, value);
      }
      body = formData;
    }
    const response =
      options?.method === "GET"
        ? await fetch(url)
        : await fetch(url, {
            credentials: "include",
            method: options?.method || "POST",
            body,
            headers,
          });
    if (!response.ok) {
      const errorMessage = await response.json();
      if (errorMessage?.errors) {
        const firstErrorKey = Object.keys(errorMessage.errors)[0];
        const firstErrorMessage = errorMessage.errors[firstErrorKey][0];
        throw new Error(firstErrorMessage);
      } else if (errorMessage?.messages) {
        throw new Error(errorMessage.messages);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
    return await response.json();
  };

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        refreshInterval: 0,
        onError: (err: Error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(err);
          }
          toast.error(err?.message || "Unknown error");
        },
        fetcher,
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
