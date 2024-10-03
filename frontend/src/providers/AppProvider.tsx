import { Facility } from "@/constants";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProps {
  name: string;
  email: string;
  avatar: string;
}

export interface FormBody {
  facility: string[];
  place?: google.maps.places.PlaceResult;
  timestamp?: number;
  [key: string]: string[] | number | google.maps.places.PlaceResult | undefined;
}

export interface AppContextType {
  user: UserProps | null;
  logout: () => void;
  queryParameters?: FormBody;
  setQueryParameters: (body?: FormBody) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [user, setUser] = useState<UserProps | null>(null);
  const [user, setUser] = useState<UserProps | null>({
    name: "Alexander, Johnson",
    email: "test@demo.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  const [queryParameters, setQueryParameters] = useState<FormBody | undefined>({
    facility: [Facility.BIKE_STATION, Facility.WATER_FOUNTAIN],
  });

  const logout = React.useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AppContext.Provider
      value={{ user, logout, queryParameters, setQueryParameters }}
    >
      {children}
    </AppContext.Provider>
  );
};
