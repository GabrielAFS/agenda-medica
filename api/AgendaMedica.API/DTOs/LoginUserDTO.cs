using System.ComponentModel.DataAnnotations;

namespace AgendaMedica.API.DTOs;

public record class LoginUserDTO(
    [Required][EmailAddress] string Email,
    [Required][MinLength(8)] string Password
);
