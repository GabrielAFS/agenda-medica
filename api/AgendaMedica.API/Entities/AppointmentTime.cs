namespace AgendaMedica.API.Entities;

public class AppointmentTime
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public bool IsAvailable { get; set; } = true;
    public int DoctorId { get; set; }
    public Doctor? Doctor { get; set; }
}
