import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProps {
  name: string;
  email: string;
  avatar: string;
}

export interface UserContextType {
  user: UserProps | null;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [user, setUser] = useState<UserProps | null>(null);
  const [user, setUser] = useState<UserProps | null>({
    name: "Alexander, Johnson",
    email: "test@demo.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const logout = React.useCallback(() => {
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
