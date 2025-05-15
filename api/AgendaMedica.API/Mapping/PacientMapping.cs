using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class PacientMapping
{
    public static PacientDTO ToDTO(this Pacient pacient)
    {
        return new(
            Id: pacient.Id,
            UserId: pacient.UserId,
            Name: pacient.User!.Name,
            Email: pacient.User!.Email,
            Photo: pacient.User!.Photo ?? string.Empty,
            BirthDate: pacient.User!.BirthDate
        );
    }
}
