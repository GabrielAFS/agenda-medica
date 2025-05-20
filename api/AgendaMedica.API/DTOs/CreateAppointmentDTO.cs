using System.ComponentModel.DataAnnotations;

namespace AgendaMedica.API.DTOs;

public record class CreateAppointmentDTO(
    [Required] int PacientId,
    [Required] int AppointmentTimeId
);
