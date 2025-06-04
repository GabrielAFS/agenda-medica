import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "./useLocalStorage";
import { IDoctor, IPacient } from "../types/users";
import { api } from "../utils/axios";

type User = IDoctor | IPacient | null;

interface ILoginData {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: User;
  signIn: (data: ILoginData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User>("user", null);
  const [, setToken] = useLocalStorage<string | null>("token", null);
  const navigate = useNavigate();

  const clearHttpToken = useCallback(() => {
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  const getUser = useCallback(async () => {
    try {
      const response = await api.get("/users/me");
      const userData = response.data;
      const isDoctor = userData.hasOwnProperty("crm");

      if (isDoctor) {
        setUser(userData as IDoctor);
      } else {
        setUser(userData as IPacient);
      }

      return isDoctor;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      clearHttpToken();
    }
  }, [setUser, clearHttpToken]);

  const signIn = useCallback(
    async (data: ILoginData) => {
      // login user in the backend and get token
      const response = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;

      // setHttpToken logic inlined here
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setToken(token);

      const isDoctor = await getUser(); // fetch user data after setting token

      // navigate to appointments if user is doctor, otherwise to doctors page
      if (isDoctor) {
        navigate("/agenda", { replace: true });
      } else {
        navigate("/medicos", { replace: true });
      }
    },
    [navigate, setToken, getUser]
  );

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  }, [navigate, setToken, setUser]);

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
