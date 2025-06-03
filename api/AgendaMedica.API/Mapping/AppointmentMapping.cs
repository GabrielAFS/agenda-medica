using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class AppointmentMapping
{
    public static AppointmentDTO ToDTO(this Appointment appointment)
    {
        if (appointment.AppointmentTime == null)
        {
            Console.WriteLine($"Warning: AppointmentTime is null for AppointmentId: {appointment.Id}");
            throw new NullReferenceException("AppointmentTime is null in AppointmentMapping.ToDTO");
        }
        if (appointment.AppointmentTime.Doctor == null)
        {
            Console.WriteLine($"Warning: Doctor is null for AppointmentTimeId: {appointment.AppointmentTime.Id} (AppointmentId: {appointment.Id})");
            throw new NullReferenceException("Doctor is null in AppointmentMapping.ToDTO");
        }
        if (appointment.Pacient == null)
        {
            Console.WriteLine($"Warning: Pacient is null for AppointmentId: {appointment.Id}");
            throw new NullReferenceException("Pacient is null in AppointmentMapping.ToDTO");
        }

        return new AppointmentDTO(
            appointment.Id,
            appointment.AppointmentTime.Doctor.ToDTO(),
            appointment.Pacient!.ToDTO(),
            appointment.AppointmentTime.StartTime
        );
    }

    public static SimpleAppointmentDTO ToSimpleDTO(this Appointment appointment)
    {
        return new SimpleAppointmentDTO(
            appointment.Id,
            appointment.AppointmentTimeId,
            appointment.PacientId
        );
    }

    public static Appointment ToEntity(this CreateAppointmentDTO appointmentDTO)
    {
        return new Appointment
        {
            PacientId = appointmentDTO.PacientId,
            AppointmentTimeId = appointmentDTO.AppointmentTimeId
        };
    }
}
