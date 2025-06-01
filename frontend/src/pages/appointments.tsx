import Card from "../components/card";
import { IAppointment } from "../types/appointments";

import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const dummyAppointments: IAppointment[] = [
  {
    id: 1,
    pacient: {
      id: 1,
      userId: 2,
      name: "Lucas Silva",
      email: "lucasilva@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Christian",
      birthDate: "1990-01-01",
    },
    doctor: {
      id: 1,
      userId: 1,
      specialty: "Cardiologista",
      crm: "123456",
      name: "Dr. João Silva",
      email: "drjoao@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Alexander",
      birthDate: "1980-01-01",
    },
    startTime: "2025-06-01T10:00:00Z",
  },
  {
    id: 2,
    pacient: {
      id: 2,
      userId: 3,
      name: "Luana Silva",
      email: "luanailva@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Caleb",
      birthDate: "1990-01-01",
    },
    doctor: {
      id: 1,
      userId: 1,
      specialty: "Cardiologista",
      crm: "123456",
      name: "Dr. João Silva",
      email: "drjoao@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Alexander",
      birthDate: "1980-01-01",
    },
    startTime: "2025-06-01T11:00:00Z",
  },
  {
    id: 3,
    pacient: {
      id: 3,
      userId: 4,
      name: "Ana Lucia Lima",
      email: "analucia@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Jessica",
      birthDate: "1975-06-15",
    },
    doctor: {
      id: 1,
      userId: 1,
      specialty: "Cardiologista",
      crm: "123456",
      name: "Dr. João Silva",
      email: "drjoao@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Alexander",
      birthDate: "1980-01-01",
    },
    startTime: "2025-06-02T11:00:00Z",
  },
  {
    id: 4,
    pacient: {
      id: 4,
      userId: 5,
      name: "Fernando Costa",
      email: "fernandocosta@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Brooklynn",
      birthDate: "1995-10-25",
    },
    doctor: {
      id: 1,
      userId: 1,
      specialty: "Cardiologista",
      crm: "123456",
      name: "Dr. João Silva",
      email: "drjoao@email.com",
      photo: "https://api.dicebear.com/9.x/personas/svg?seed=Alexander",
      birthDate: "1980-01-01",
    },
    startTime: "2025-06-02T14:00:00Z",
  },
];

const AppointmentsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const filteredAppointments = dummyAppointments.filter((appointment) =>
    dayjs(appointment.startTime).isSame(selectedDate, "day")
  );

  return (
    <div className='flex justify-center min-h-screen p-8 pb-20 gap-16 md:p-12'>
      <main className='flex flex-col gap-8 row-start-2 md:items-center items-start w-full md:w-3/4'>
        <p className='text-4xl font-bold'>Agenda</p>

        <div className='flex flex-col justify-between items-center w-full gap-4 bg-white p-4 rounded-lg'>
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
