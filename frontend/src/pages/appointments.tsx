"use client";

import Card from "../components/card";
import React from "react";

import { IAppointment } from "../types/appointments";

const dummyAppointments: IAppointment[] = [
  {
    id: 1,
    pacient: {
      id: 1,
      userId: 1,
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
    id: 1,
    pacient: {
      id: 1,
      userId: 1,
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
];

const AppointmentsPage: React.FC = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start sm:w-3/4'>
        <p className='text-4xl font-bold'>Agenda</p>
        <div className='w-full p-4 bg-white rounded-lg md:p-8'>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 mx-auto text-gray-900 sm:grid-cols-2 sm:p-8'>
            {dummyAppointments.map((appointment, index) => (
              <Card key={index.toString()} data={appointment} />
            ))}
          </dl>
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
