using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;

namespace AgendaMedica.API.Mapping;

public class DoctorMapping
{
    public static DoctorDTO ToDTO(Doctor doctor)
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
}
