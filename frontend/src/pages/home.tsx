import React from "react";

const Home: React.FC = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start sm:w-3/4'>
        <div className='w-full p-4 bg-white rounded-lg md:p-8'>
          <p className='text-center text-4xl mb-4'>Entre como:</p>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 mx-auto text-gray-900 sm:grid-cols-2 sm:p-8'>
            <div className='flex flex-col items-center'>
              <p className='text-2xl font-bold'>Paciente</p>
              <p className='text-lg'>
                Visualize e agende consultas com médicos.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='text-2xl font-bold'>Médico</p>
              <p className='text-lg'>Gerencie suas consultas agendadas.</p>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
};

export default Home;
