// src/components/routes/index.tsx
import { Route, Routes, Outlet } from "react-router-dom";

import ProtectedLayout from "./ProtectedLayout";
import { ProtectedRoute } from "./ProtectedRoute";

import AppointmentsPage from "../../pages/appointments";
import ManageAppointmentTimesPage from "../../pages/manageAppointmentTimes";
import DoctorsPage from "../../pages/doctors";
import ScheduleAppointmentPage from "../../pages/scheduleAppointment";
import PacientAppointmentsPage from "../../pages/pacientAppointments";
import Home from "../../pages/home";

import { useAuth } from "../../hooks/useAuth";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const isDoctor = user && "crm" in user;

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Outlet />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      >
        {isDoctor ? (
          <>
            <Route path='/agenda' element={<AppointmentsPage />} />
            <Route
              path='/agenda/gerenciar'
              element={<ManageAppointmentTimesPage />}
            />
          </>
        ) : (
          <>
            <Route path='/medicos' element={<DoctorsPage />} />
            <Route
              path='/marcar-consulta'
              element={<ScheduleAppointmentPage />}
            />
            <Route
              path='/minhas-consultas'
              element={<PacientAppointmentsPage />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
