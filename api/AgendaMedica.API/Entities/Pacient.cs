namespace AgendaMedica.API.Entities;

public class Pacient
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public List<Appointment>? Appointments { get; set; }
}
