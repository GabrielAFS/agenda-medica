namespace AgendaMedica.API.Entities;

public class Doctor
{
    public int Id { get; set; }
    public required string Specialty { get; set; }
    public required string Crm { get; set; }
    public User? User { get; set; }
    public int UserId { get; set; }
}
