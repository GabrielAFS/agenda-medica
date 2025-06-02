namespace AgendaMedica.API.DTOs;

public record class UserDTO(
  int Id,
  string Name,
  string Email,
  string Photo,
  DateOnly BirthDate,
  string Role
);
