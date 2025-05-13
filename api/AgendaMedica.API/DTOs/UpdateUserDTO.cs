namespace AgendaMedica.API.DTOs;

public record class UpdateUserDTO(
  string Name,
  string Email,
  string Password,
  int Age,
  string Photo
);