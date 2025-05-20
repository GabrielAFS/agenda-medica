import Button from "./button";
import { IDoctor } from "../types/users";

interface Props {
  doctor: IDoctor;
}

const Card: React.FC<Props> = ({ doctor }) => {
  return (
    <div className='relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-10'>
      <div className='flex flex-col items-center'>
        <img
          className='w-24 h-24 mb-3 rounded-full shadow-lg'
          src={`${doctor.photo}`}
          alt={`${doctor.name}`}
          width={50}
          height={50}
        />

        <h5 className='mb-1 text-xl font-medium text-gray-900'>
          {`${doctor.name}`}
        </h5>

        <div className='flex justify-center gap-6 text-sm italic text-gray-500'>
          <span>
            <b>CRM:</b> {doctor.crm}
          </span>
          <span>
            <b>Área:</b> {doctor.specialty}
          </span>
        </div>

        <div className='flex mt-4 md:mt-6'>
          <Button onClick={() => {}} outline>
            Ver Horários disponiveis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
