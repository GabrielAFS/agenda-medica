using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class UserMapping
{
    public static UserDTO ToDTO(this User user)
    {
        return new UserDTO(
            user.Id,
            user.Name,
            user.Email,
            user.Photo ?? string.Empty,
            user.BirthDate
        );
    }

    public static User ToEntity(this CreateUserDTO userDto)
    {
        return new User()
        {
            Name = userDto.Name,
            Password = userDto.Password,
            Email = userDto.Email,
            Photo = userDto.Photo,
            BirthDate = userDto.BirthDate
        };
    }
}
