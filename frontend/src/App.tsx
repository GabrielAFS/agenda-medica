import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";

import Routes from "./components/routes";
import { AuthProvider } from "./hooks/useAuth";
import { AppointmentProvider } from "./hooks/useAppointments";
import { DoctorProvider } from "./hooks/useDoctor";
import { ScheduleAppointmentProvider } from "./hooks/useScheduleAppointment";

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <AuthProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <ScheduleAppointmentProvider>
              <Routes />
            </ScheduleAppointmentProvider>
          </AppointmentProvider>
        </DoctorProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
