import React from "react";
import CardSection from "../components/cardSection";
import Button from "../components/button";

const ScheduleAppointmentPage: React.FC = () => {
  const doctor = {
    id: 4,
    userId: 4,
    specialty: "Neurologista",
    crm: "345678",
    name: "Dra. Ana Costa",
    email: "draana@email.com",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Wyatt",
    birthDate: "1988-11-30",
  };

  return (
    <div className='flex justify-center min-h-screen p-4 pb-20 gap-16 md:items-center md:p-20'>
      <main className='flex flex-col gap-2 md:row-start-2 items-start md:w-3/4 w-full'>
        <CardSection
          title={doctor.name}
          sections={[
            { title: "CRM", content: doctor.crm },
            { title: "Especialidade", content: doctor.specialty },
            { title: "Email", content: doctor.email },
          ]}
        />

        <form className='flex flex-col w-full p-4 bg-white rounded-lg md:p-8 gap-4'>
          <p className='text-xl font-bold mb-4'>Agendar Consulta</p>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='date' className='text-lg font-bold'>
                Data da Consulta
              </label>
              <input
                type='date'
                id='date'
                className='w-full p-2 border border-gray-300 rounded-lg'
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='time' className='text-lg font-bold'>
                Horário da Consulta
              </label>
              <input
                type='time'
                id='time'
                className='w-full p-2 border border-gray-300 rounded-lg'
                required
              />
            </div>
            <div className='flex flex-col'>
              <Button type='submit'>Agendar</Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ScheduleAppointmentPage;
