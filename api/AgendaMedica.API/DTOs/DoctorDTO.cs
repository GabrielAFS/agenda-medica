namespace AgendaMedica.API.DTOs;

public record class DoctorDTO(
    int Id,
    int UserId,
    string Specialty,
    string Crm,
    string Name,
    string Email,
    string Photo,
    DateOnly BirthDate
);
