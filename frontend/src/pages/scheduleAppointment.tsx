import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";

import CardSection from "../components/cardSection";
import Button from "../components/button";
import { useDoctor } from "../hooks/useDoctor";

// Simulated available dates and times for the doctor
const availableDatesAndTimes = [
  {
    id: 1,
    startTime: "2025-06-04T08:00:00",
  },
  {
    id: 2,
    startTime: "2025-06-04T09:00:00",
  },
  {
    id: 3,
    startTime: "2025-06-04T10:00:00",
  },
  {
    id: 4,
    startTime: "2025-06-04T11:00:00",
  },
  {
    id: 5,
    startTime: "2025-06-04T14:00:00",
  },
  {
    id: 6,
    startTime: "2025-06-04T15:00:00",
  },
  {
    id: 7,
    startTime: "2025-06-04T16:00:00",
  },
  {
    id: 8,
    startTime: "2025-06-04T17:00:00",
  },
];

const ScheduleAppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<PickerValue | null>(
    null
  );

  const availableDates = availableDatesAndTimes.map(
    (appointment) => appointment.startTime.split("T")[0]
  );

  const { selectedDoctor: doctor } = useDoctor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Por favor, selecione uma data e um horário.");
      return;
    }

    alert(
      `Consulta agendada com ${doctor?.name} no dia ${selectedDate.format(
        "DD/MM/YYYY"
      )} às ${selectedDate.format("HH:mm")}.`
    );
  };

  return (
    <div className='flex justify-center min-h-screen p-4 pb-20 gap-16 md:items-center md:p-20'>
      <main className='flex flex-col gap-2 md:row-start-2 items-start md:w-3/4 w-full'>
        <CardSection
          title={doctor?.name || "Médico"}
          sections={[
            { title: "CRM", content: doctor?.crm || "Não informado" },
            {
              title: "Especialidade",
              content: doctor?.specialty || "Não informado",
            },
            { title: "Email", content: doctor?.email || "Não informado" },
          ]}
          isCollapsable
        />

        <form
          className='flex flex-col w-full p-4 bg-white rounded-lg md:p-8 gap-8'
          onSubmit={handleSubmit}
        >
          <p className='text-xl font-bold'>Agendar Consulta</p>
          <div className='flex flex-col w-full md:w-auto'>
            <label htmlFor='date-picker-button' className='text-lg font-bold'>
              Data da Consulta
            </label>
            <DateTimePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              shouldDisableDate={(day) =>
                !availableDates.includes(day.format("YYYY-MM-DD"))
              }
              shouldDisableTime={(time, view) => {
                if (view === "hours") {
                  return !availableDatesAndTimes.some(
                    (dates) =>
                      dates.startTime === time.format("YYYY-MM-DDTHH:mm:ss")
                  );
                }
                return false;
              }}
              slotProps={{
                openPickerButton: {
                  id: "date-picker-button",
                },
              }}
              format='DD/MM/YYYY - HH:mm'
              views={["year", "month", "day", "hours"]}
              disablePast
              ampmInClock={false}
              ampm={false}
              showDaysOutsideCurrentMonth
            />
          </div>

          <Button type='submit' className='w-full m-0 md:w-auto'>
            Agendar
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ScheduleAppointmentPage;
