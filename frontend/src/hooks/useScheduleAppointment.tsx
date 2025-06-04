import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dayjs } from "dayjs";

import { IAppointmentTime } from "../types/appointments";
import { api } from "../utils/axios";
import { useLocalStorage } from "./useLocalStorage";
import { useDoctor } from "./useDoctor";
import { useAuth } from "./useAuth";

interface IScheduleAppointmentContextData {
  loading: boolean;

  appointmentTimes: IAppointmentTime[];
  scheduleAppointment: (appointmentTimeId: number) => Promise<void>;
  addAppointmentTime: (newDate: Dayjs | null) => Promise<void>;
  deleteAppointmentTime: (id: number) => Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAppointmentTimes = useCallback(async () => {
    // Logic to fetch appointment times for a specific doctor
    const doctorId = user && "crm" in user ? user.id : selectedDoctor?.id;
    const response = await api.get("/appointment-times", {
      params: { doctorId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IAppointmentTime[] = response.data;

    setAppointmentTimes(data);
  }, [selectedDoctor, user, token]);

  const scheduleAppointment = async (appointmentTimeId: number) => {
    const pacientId = user?.id;

    try {
      const response = await api.post(
        "/appointments",
        {
          pacientId,
          appointmentTimeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to schedule appointment");
      }

      await fetchAppointmentTimes();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      throw error;
    }
  };

  const addAppointmentTime = async (newDate: Dayjs | null) => {
    if (!newDate) return;

    setLoading(true);

    try {
      const response = await api.post(
        "/appointment-times",
        {
          startTime: newDate.toISOString(),
          doctorId: user?.id, // Assuming user is a doctor
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create appointment time");
      }

      await fetchAppointmentTimes();
    } catch (err) {
      console.error("Error adding appointment time:", err);
      // TODO: Improve error handling by getting error.response.data
      alert("Erro ao adicionar horário");
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointmentTime = async (id: number) => {
    setLoading(true);

    try {
      await api.delete(`/appointment-times/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointmentTimes((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting appointment time:", err);
      alert("Erro ao excluir horário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentTimes();
  }, [fetchAppointmentTimes]);

  return (
    <ScheduleAppointmentContext.Provider
      value={{
        loading,
        appointmentTimes,
        scheduleAppointment,
        addAppointmentTime,
        deleteAppointmentTime,
      }}
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
