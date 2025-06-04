import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IAppointmentTime } from "../types/appointments";
import { api } from "../utils/axios";
import { useLocalStorage } from "./useLocalStorage";
import { useDoctor } from "./useDoctor";
import { useAuth } from "./useAuth";

interface IScheduleAppointmentContextData {
  appointmentTimes: IAppointmentTime[];
  scheduleAppointment: (appointmentTimeId: number) => Promise<void>;
}

const ScheduleAppointmentContext =
  createContext<IScheduleAppointmentContextData>(
    {} as IScheduleAppointmentContextData
  );

export const ScheduleAppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token] = useLocalStorage("token", null);
  const { user } = useAuth();
  const { selectedDoctor } = useDoctor();
  const [appointmentTimes, setAppointmentTimes] = useState<IAppointmentTime[]>(
    []
  );

  const fetchAppointmentTimes = useCallback(async () => {
    // Logic to fetch appointment times for a specific doctor
    const response = await api.get("/appointment-times", {
      params: { doctorId: selectedDoctor?.id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IAppointmentTime[] = response.data;

    setAppointmentTimes(data);
  }, [selectedDoctor, token]);

  const scheduleAppointment = async (appointmentTimeId: number) => {
    const pacientId = user?.id;

    // Logic to schedule the appointment
    console.log(
      `Scheduling appointment for pacient ${pacientId} at time ${appointmentTimeId}`
    );
  };

  useEffect(() => {
    fetchAppointmentTimes();
  }, [fetchAppointmentTimes]);

  return (
    <ScheduleAppointmentContext.Provider
      value={{ appointmentTimes, scheduleAppointment }}
    >
      {children}
    </ScheduleAppointmentContext.Provider>
  );
};

export const useScheduleAppointment = () => {
  const context = useContext(ScheduleAppointmentContext);

  if (!context) {
    throw new Error(
      "useScheduleAppointment must be used within a ScheduleAppointmentProvider"
    );
  }

  return context;
};
