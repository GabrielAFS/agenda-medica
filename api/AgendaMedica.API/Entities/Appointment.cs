namespace AgendaMedica.API.Entities;

public class Appointment
{
    public int Id { get; set; }
    public int PacientId { get; set; }
    public Pacient? Pacient { get; set; }
    public int AppointmentTimeId { get; set; }
    public AppointmentTime? AppointmentTime { get; set; }
}
