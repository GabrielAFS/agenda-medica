namespace AgendaMedica.API.DTOs;

public record class CreateUserDTO(
  string Name,
  string Email,
  string Password,
  int Age,
  string Photo
);