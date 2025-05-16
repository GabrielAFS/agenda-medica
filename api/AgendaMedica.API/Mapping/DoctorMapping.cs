using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public static class DoctorMapping
{
    public static DoctorDTO ToDTO(this Doctor doctor)
    {
        return new DoctorDTO(
            doctor.Id,
            doctor.UserId,
            doctor.Specialty,
            doctor.Crm,
            doctor.User!.Name,
            doctor.User!.Email,
            doctor.User!.Photo ?? string.Empty,
            doctor.User!.BirthDate
        );
    }

    public static DoctorDTO ToDTO(this Doctor doctor, User user)
    {
        return new DoctorDTO(
            doctor.Id,
            doctor.UserId,
            doctor.Specialty,
            doctor.Crm,
            user.Name,
            user.Email,
            user.Photo ?? string.Empty,
            user.BirthDate
        );
    }
}
