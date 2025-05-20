namespace AgendaMedica.API.DTOs;

public record class AppointmentDTO(
    int Id,
    int PacientId,
    int AppointmentTimeId
);
