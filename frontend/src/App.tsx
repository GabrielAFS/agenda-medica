import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";

import AppointmentsPage from "./pages/appointments";
import DoctorsPage from "./pages/doctors";
import Home from "./pages/home";
import ScheduleAppointmentPage from "./pages/scheduleAppointment";

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <AppointmentsPage />
    </LocalizationProvider>
  );
}

export default App;
