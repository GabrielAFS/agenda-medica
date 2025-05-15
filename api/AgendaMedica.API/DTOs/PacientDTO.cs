namespace AgendaMedica.API.DTOs;

public record class PacientDTO(
    int Id,
    int UserId,
    string Name,
    string Email,
    string Photo,
    DateOnly BirthDate
);
