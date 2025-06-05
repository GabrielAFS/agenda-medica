import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { IDoctor } from "../types/users";
import { api } from "../utils/axios";
import { useLocalStorage } from "./useLocalStorage";

interface IDoctorContextData {
  doctors: IDoctor[] | null;
  selectedDoctor: IDoctor | null;
  setSelectedDoctor: (doctor: IDoctor | null) => void;
}

const DoctorContext = createContext<IDoctorContextData>(
  {} as IDoctorContextData
);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [token] = useLocalStorage("token", null);

  const [doctors, setDoctors] = useState<IDoctor[] | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await api.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: IDoctor[] = response.data;

      setDoctors(data);
    } catch (error) {
      console.log("Failed to fetch doctors:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const value = useMemo(
    () => ({
      doctors,
      selectedDoctor,
      setSelectedDoctor,
    }),
    [doctors, selectedDoctor]
  );

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("useDoctor must be used within a DoctorProvider");
  }

  return context;
};
