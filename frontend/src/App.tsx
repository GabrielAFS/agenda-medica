import { Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";

import Home from "./pages/home";
import DoctorsPage from "./pages/doctors";
import AppointmentsPage from "./pages/appointments";
import ScheduleAppointmentPage from "./pages/scheduleAppointment";

import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/routes/protected";

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/agenda'
            element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/medicos'
            element={
              <ProtectedRoute>
                <DoctorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/marcar-consulta'
            element={
              <ProtectedRoute>
                <ScheduleAppointmentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
