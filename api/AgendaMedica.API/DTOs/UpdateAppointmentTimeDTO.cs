using System.ComponentModel.DataAnnotations;

namespace AgendaMedica.API.DTOs;

public record class UpdateAppointmentTimeDTO(
    [Required] DateTime StartTime,
    bool IsAvailable = true
);
