using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class PacientMapping
{
    public static PacientDTO ToDTO(this Pacient pacient)
    {
        return new(
            pacient.Id,
            pacient.UserId,
            pacient.User!.Name,
            pacient.User!.Email,
            pacient.User!.Photo ?? string.Empty,
            pacient.User!.BirthDate
        );
    }

    public static PacientDTO ToDTO(this Pacient pacient, User user)
    {
        return new(
            pacient.Id,
            pacient.UserId,
            user.Name,
            user.Email,
            user.Photo ?? string.Empty,
            user.BirthDate
        );
    }
}
