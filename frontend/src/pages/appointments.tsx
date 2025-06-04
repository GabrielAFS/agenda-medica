import Card from "../components/card";
import { useAppointments } from "../hooks/useAppointments";

import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

const AppointmentsPage: React.FC = () => {
  const { appointments } = useAppointments();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const filteredAppointments = appointments.filter((appointment) =>
    dayjs(appointment.startTime).isSame(selectedDate, "day")
  );

  return (
    <div className='flex justify-center min-h-screen p-8 pb-20 gap-16 md:p-12'>
      <main className='flex flex-col gap-8 row-start-2 md:items-center items-start w-full md:w-3/4'>
        <p className='text-4xl font-bold'>Agenda</p>

        <div className='flex justify-evenly items-center w-full gap-4 bg-white p-4 rounded-lg'>
          <DatePicker
            views={["month", "day"]}
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) {
                setSelectedDate(newValue);
              }
            }}
            format='MMMM'
            disablePast
            className='w-full md:w-auto'
          />
          <Button
            className='h-full rounded-md m-0'
            onClick={() => navigate("/agenda/gerenciar")}
          >
            Gerenciar Horários
          </Button>
        </div>

        <div className='w-full p-4 bg-white rounded-lg'>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 text-gray-900 sm:grid-cols-2'>
            {filteredAppointments.length ? (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id} data={appointment} />
              ))
            ) : (
              <p className='text-lg text-gray-500'>
                Nenhuma consulta agendada para esta data.
              </p>
            )}
          </dl>
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
