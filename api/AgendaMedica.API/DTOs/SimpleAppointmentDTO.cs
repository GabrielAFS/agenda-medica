namespace AgendaMedica.API.DTOs;

public record class SimpleAppointmentDTO(
    int Id,
    int AppointmentTimeId,
    int PacientId
);
