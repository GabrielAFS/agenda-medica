using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class AppointmentMapping
{
    public static AppointmentDTO ToDTO(this Appointment appointment)
    {
        return new AppointmentDTO(
            appointment.Id,
            appointment.DoctorId,
            appointment.PacientId,
            appointment.AppointmentTimeId
        );
    }

    public static Appointment ToEntity(this CreateAppointmentDTO appointmentDTO)
    {
        return new Appointment
        {
            DoctorId = appointmentDTO.DoctorId,
            PacientId = appointmentDTO.PacientId,
            AppointmentTimeId = appointmentDTO.AppointmentTimeId
        };
    }
}
