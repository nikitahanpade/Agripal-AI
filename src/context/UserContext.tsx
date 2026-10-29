import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  phone: string;
  email?: string;
  token?: string;
}

interface FormData {
  location: string;
  state?: string;
  district?: string;
  season?: string;
  soilType: string;
  waterAvailability: string;
  budget: string;
  temperature?: number;
  ph?: number;
  humidity?: number;
}

interface UserContextType {
  user: User | null;
  formData: FormData | null;
  setUser: (user: User) => void;
  setFormData: (data: FormData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem('user') || 'null')
  );

  const [formData, setFormData] = useState<FormData | null>(null);

  const handleSetUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        formData,
        setUser: handleSetUser,
        setFormData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
