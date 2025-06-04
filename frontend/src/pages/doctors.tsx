import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/card";
import { useDoctor } from "../hooks/useDoctor";

const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { doctors, setSelectedDoctor } = useDoctor();

  return (
    <div className='flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start sm:w-3/4'>
        <p className='text-4xl font-bold'>Médicos</p>
        <div className='w-full p-4 bg-white rounded-lg md:p-8'>
          <dl className='grid grid-cols-1 justify-items-center gap-8 max-w-screen-xl p-4 mx-auto text-gray-900 sm:grid-cols-2'>
            {doctors?.length ? (
              doctors.map((doctor, index) => (
                <Card
                  key={index.toString()}
                  data={doctor}
                  onButtonClick={() => {
                    setSelectedDoctor(doctor);
                    navigate("/marcar-consulta");
                  }}
                />
              ))
            ) : (
              <p className='text-lg text-gray-500'>
                Nenhum médico cadastrado no momento.
              </p>
            )}
          </dl>
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
