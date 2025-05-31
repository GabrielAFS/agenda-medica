import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import CardSection from "../components/cardSection";
import Button from "../components/button";
import { PickerValue } from "@mui/x-date-pickers/internals";

const ScheduleAppointmentPage: React.FC = () => {
  const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<PickerValue | null>(
    null
  );
  const [selectedTime, setSelectedTime] = React.useState<PickerValue | null>(
    null
  );

  const availableDatesAndTimes: { [key: string]: string[] } = {
    "2025-06-01": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    "2025-06-02": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    "2025-06-03": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    "2025-06-04": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    "2025-06-05": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
  };

  const availableDates = Object.keys(availableDatesAndTimes);

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

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Por favor, selecione uma data e um horário.");
      return;
    }

    console.log(
      `Consulta agendada com ${doctor.name} no dia ${selectedDate.format(
        "DD/MM/YYYY"
      )} às ${selectedTime.format("HH:mm")}.`
    );
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
          isCollapsable
        />

        <form
          className='flex flex-col w-full p-4 bg-white rounded-lg md:p-8 gap-8'
          action={handleSubmit}
        >
          <p className='text-xl font-bold'>Agendar Consulta</p>
          <fieldset className='flex flex-col md:flex-row items-end justify-between'>
            <div className='flex flex-col w-full md:w-auto'>
              <label htmlFor='date-picker-button' className='text-lg font-bold'>
                Data da Consulta
              </label>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => {
                  const formattedDate = newValue?.format("YYYY-MM-DD");
                  if (formattedDate && availableDatesAndTimes[formattedDate]) {
                    setAvailableTimes(availableDatesAndTimes[formattedDate]);
                  } else {
                    setAvailableTimes([]);
                  }

                  setSelectedDate(newValue);
                }}
                shouldDisableDate={(day) =>
                  !availableDates.includes(day.format("YYYY-MM-DD"))
                }
                slotProps={{
                  openPickerButton: {
                    id: "date-picker-button",
                  },
                }}
                format='DD/MM/YYYY'
                disablePast
                showDaysOutsideCurrentMonth
              />
            </div>

            <div className='flex flex-col w-full md:w-auto'>
              <label htmlFor='time-picker-button' className='text-lg font-bold'>
                Horário da Consulta
              </label>
              <TimePicker
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                shouldDisableTime={(time, view) => {
                  if (view === "hours") {
                    return !availableTimes.includes(time.format("HH:mm"));
                  }
                  return false;
                }}
                slotProps={{
                  openPickerButton: {
                    id: "time-picker-button",
                  },
                }}
                views={["hours"]}
                format='HH:mm'
                ampmInClock={false}
                ampm={false}
                disablePast
              />
            </div>
          </fieldset>
          <Button type='submit' className='w-full m-0 md:w-auto'>
            Agendar
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ScheduleAppointmentPage;
