import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "./useLocalStorage";
import { IDoctor, IPacient } from "../types/users";
import { api } from "../utils/axios";

type User = IDoctor | IPacient | null;

interface IAuthContextData {
  user: User;
  signIn: (data: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const navigate = useNavigate();

  const clearHttpToken = () => {
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
  };

  const setHttpToken = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setToken(token);
  };

  const getUser = async () => {
    try {
      const response = await api.get("/users/me");
      const userData = response.data;

      if (userData.role === "doctor") {
        setUser(userData as IDoctor);
      } else {
        setUser(userData as IPacient);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      clearHttpToken();
      setUser(null);
    }
  };

  // call this function when you want to authenticate the user
  const signIn = useCallback(
    async (data: any) => {
      // login user in the backend and get token
      const response = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;

      setHttpToken(token);

      await getUser(); // fetch user data after setting token
      // navigate to appointments if user is doctor, otherwise to doctors page
      if (user && user.role === "doctor") {
        navigate("/appointments", { replace: true });
      } else {
        navigate("/doctors", { replace: true });
      }
    },
    [navigate, user]
  );

  // call this function to sign out logged in user
  const signOut = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [user, signIn, signOut]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
