import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { IAppointment } from "../types/appointments";
import { api } from "../utils/axios";
import { useLocalStorage } from "./useLocalStorage";

interface IAppointmentContextData {
  appointments: IAppointment[];
}

const AppointmentContext = createContext<IAppointmentContextData>(
  {} as IAppointmentContextData
);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [token] = useLocalStorage("token", null);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await api.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: IAppointment[] = response.data;

      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const value = useMemo(() => ({ appointments }), [appointments]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider"
    );
  }

  return context;
};
