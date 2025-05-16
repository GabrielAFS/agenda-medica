using System.ComponentModel.DataAnnotations;

namespace AgendaMedica.API.DTOs;

public record class CreateAppointmentTimeDTO(
    [Required] DateTime StartTime,
    [Required] int DoctorId,
    bool IsAvailable = true
);
