namespace AgendaMedica.API.DTOs;

public record class AppointmentDTO(
    int Id,
    DoctorDTO Doctor,
    PacientDTO Pacient,
    DateTime StartTime
);
