namespace AgendaMedica.API.DTOs;

public record class UserDTO(
  int Id,
  string Name,
  string Email,
  string Password,
  string Photo,
  DateOnly BirthDate
);
