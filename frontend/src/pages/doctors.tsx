import React from "react";

import Card from "../components/card";
import { IDoctor } from "../types/users";

const dummyDoctors: IDoctor[] = [
  {
    id: 1,
    userId: 1,
    specialty: "Cardiologista",
    crm: "123456",
    name: "Dr. João Silva",
    email: "drjoao@email.com",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Alexander",
    birthDate: "1980-01-01",
  },
  {
    id: 2,
    userId: 2,
    specialty: "Pediatra",
    crm: "654321",
    name: "Dra. Maria Oliveira",
    email: "dramaria@email.com",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Mason",
    birthDate: "1995-05-15",
  },

  {
    id: 3,
    userId: 3,
    specialty: "Dermatologista",
    crm: "789012",
    name: "Dr. Pedro Santos",
    email: "drpedro@email.com",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Brooklynn",
    birthDate: "1990-03-20",
  },
  {
    id: 4,
    userId: 4,
    specialty: "Neurologista",
    crm: "345678",
    name: "Dra. Ana Costa",
    email: "draana@email.com",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Wyatt",
    birthDate: "1988-11-30",
  },
];

const DoctorsPage: React.FC = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start sm:w-3/4'>
        <p className='text-4xl font-bold'>Médicos</p>
        <div className='w-full p-4 bg-white rounded-lg md:p-8'>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 mx-auto text-gray-900 sm:grid-cols-2'>
            {dummyDoctors.map((doctor, index) => (
              <Card key={index.toString()} doctor={doctor} />
            ))}
          </dl>
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
