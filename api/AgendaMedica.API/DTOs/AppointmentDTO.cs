namespace AgendaMedica.API.DTOs;

public record class AppointmentDTO(
    int Id,
    int DoctorId,
    int PacientId,
    int AppointmentTimeId
);
