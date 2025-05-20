namespace AgendaMedica.API.Entities;

public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? Photo { get; set; }
    public DateOnly BirthDate { get; set; }
    public string Role { get; set; } = "Pacient";
}