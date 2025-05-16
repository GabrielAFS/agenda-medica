using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class AppointmentTimeMapping
{
    public static AppointmentTimeDTO ToDTO(this AppointmentTime appointmentTime)
    {
        return new AppointmentTimeDTO(
            appointmentTime.Id,
            appointmentTime.StartTime,
            appointmentTime.IsAvailable,
            appointmentTime.DoctorId
        );
    }

    public static AppointmentTime ToEntity(this CreateAppointmentTimeDTO appointmentTimeDTO)
    {
        return new AppointmentTime
        {
            StartTime = appointmentTimeDTO.StartTime,
            IsAvailable = appointmentTimeDTO.IsAvailable,
            DoctorId = appointmentTimeDTO.DoctorId
        };
    }
}
