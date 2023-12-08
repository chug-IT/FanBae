import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type UserContextType = {
  user: User | undefined;
  signIn: (user: User | undefined) => void;
  signOut: () => void;
  loading: boolean;
};

type User = {
  email: string;
  name: string;
  phone: string;
  birthday: number;
  authToken: string;
  interests?: string[];
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = await SecureStore.getItemAsync('user');
      if (user) {
        setUser(JSON.parse(user));
      }
      setLoading(false);
    })();
  }, []);

  const signIn = (user: User | undefined) => {
    setLoading(true);
    setUser(user);
    if (user) {
      SecureStore.setItemAsync('user', JSON.stringify(user));
    } else {
      SecureStore.deleteItemAsync('user');
    }
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    setUser(undefined);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useSession must be used within a UserProvider');
  }
  return context;
};
