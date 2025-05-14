using System.ComponentModel.DataAnnotations;

namespace AgendaMedica.API.DTOs;

public record class UpdateUserDTO(
  [Required][StringLength(128)] string Name,
  [Required][EmailAddress] string Email,
  [Required][MinLength(8)] string Password,
  int Age,
  string Photo
);