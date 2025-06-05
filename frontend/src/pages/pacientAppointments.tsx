import Card from "../components/card";
import { IAppointment } from "../types/appointments";
import { useAppointments } from "../hooks/useAppointments";

import React, { useEffect } from "react";
import dayjs from "dayjs";

const PacientAppointmentsPage: React.FC = () => {
  const { appointments, fetchAppointments } = useAppointments();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const finishedAppointments = appointments.filter(
    (appointment: IAppointment) =>
      dayjs(appointment.startTime).isBefore(dayjs())
  );
  const upcomingAppointments = appointments.filter(
    (appointment: IAppointment) => dayjs(appointment.startTime).isAfter(dayjs())
  );

  return (
    <div className='flex justify-center min-h-screen p-8 pb-20 gap-16 md:p-12'>
      <main className='flex flex-col gap-8 row-start-2 md:items-center items-start w-full md:w-3/4'>
        <p className='text-4xl font-bold'>Minhas consultas</p>

        <div className='w-full p-4 bg-white rounded-lg'>
          <p className='text-2xl font-bold mb-4'>Próximas</p>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 text-gray-900 sm:grid-cols-2'>
            {upcomingAppointments.length ? (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} data={appointment} />
              ))
            ) : (
              <p className='text-lg text-gray-500'>
                Nenhuma consulta agendada para esta data.
              </p>
            )}
          </dl>

          <p className='text-2xl font-bold my-4'>Finalizadas</p>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 text-gray-900 sm:grid-cols-2'>
            {finishedAppointments.length ? (
              finishedAppointments.map((appointment) => (
                <Card key={appointment.id} data={appointment} />
              ))
            ) : (
              <p className='text-lg text-gray-500'>
                Você não possui consultas finalizadas.
              </p>
            )}
          </dl>
        </div>
      </main>
    </div>
  );
};

export default PacientAppointmentsPage;
