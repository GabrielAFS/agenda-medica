import Button from "./button";
import { IDoctor } from "../types/users";
import { IAppointment } from "../types/appointments";
import { dateFormat } from "../utils/dateFormat";

interface Props {
  data: IDoctor | IAppointment;
  onButtonClick?: () => void;
}

const Card: React.FC<Props> = ({ data, onButtonClick }) => {
  const isDoctor = data.hasOwnProperty("crm");
  const title = isDoctor
    ? (data as IDoctor).name
    : (data as IAppointment).pacient.name;

  const renderDescription = () => {
    if (isDoctor) {
      return (
        <div className='flex justify-center gap-6 text-sm italic text-gray-500'>
          <span>
            <b>CRM:</b> {(data as IDoctor).crm}
          </span>
          <span>
            <b>Área:</b> {(data as IDoctor).specialty}
          </span>
        </div>
      );
    }

    return (
      <div className='flex justify-center gap-6 text-sm italic text-gray-500'>
        <span>
          <b>Data:</b>{" "}
          {dateFormat.format(new Date((data as IAppointment).startTime))}
        </span>
      </div>
    );
  };

  return (
    <div className='relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-10'>
      <div className='flex flex-col items-center'>
        <img
          className='w-24 h-24 mb-3 rounded-full shadow-lg'
          src={`${
            isDoctor
              ? (data as IDoctor).photo
              : (data as IAppointment).pacient.photo
          }`}
          alt={`${title}`}
          width={50}
          height={50}
        />

        <h5 className='mb-1 text-xl font-medium text-gray-900'>{`${title}`}</h5>

        {renderDescription()}

        <div className='flex mt-4 md:mt-6'>
          <Button onClick={onButtonClick} outline>
            {isDoctor ? "Agendar consulta" : "Ver detalhes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
