namespace AgendaMedica.API.DTOs;

public record class AppointmentTimeDTO(
    int Id,
    DateTime StartTime,
    bool IsAvailable,
    int DoctorId
);
