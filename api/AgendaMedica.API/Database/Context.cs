using AgendaMedica.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Doctor> Doctors => Set<Doctor>();
    public DbSet<Pacient> Pacients => Set<Pacient>();
    public DbSet<AppointmentTime> AppointmentTimes => Set<AppointmentTime>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Hardcoded password to prevent PendingModelChangesWarning
        var hashedPassword = "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma";

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Dr. Drauzio Varella",
                Email = "drauzio.varella@email.com",
                Password = hashedPassword,
                Photo = "https://example.com/photo.jpg",
                BirthDate = new DateOnly(1943, 4, 2),
                Role = "Doctor"
            },
            new User
            {
                Id = 2,
                Name = "Ana Maria Braga",
                Email = "anamaria@email.com",
                Password = hashedPassword,
                Photo = "https://example.com/photo.jpg",
                BirthDate = new DateOnly(1949, 4, 2),
                Role = "Pacient"
            },
            new User
            {
                Id = 3,
                Name = "Luciano Huck",
                Email = "luciano.huck@email.com",
                Password = hashedPassword,
                Photo = "https://example.com/photo.jpg",
                BirthDate = new DateOnly(1971, 9, 3),
                Role = "Pacient"
            },
            new User
            {
                Id = 4,
                Name = "Marcia Goldschmidt",
                Email = "marcia.gold@email.com",
                Password = hashedPassword,
                Photo = "https://example.com/photo.jpg",
                BirthDate = new DateOnly(1960, 3, 2),
                Role = "Doctor"
            }
        );

        modelBuilder.Entity<Doctor>().HasData(
            new Doctor
            {
                Id = 1,
                Specialty = "Oncologista",
                Crm = "123456",
                UserId = 1
            },
            new Doctor
            {
                Id = 4,
                Specialty = "Nutricionista",
                Crm = "654321",
                UserId = 2
            }
        );

        modelBuilder.Entity<Pacient>().HasData(
            new Pacient
            {
                Id = 1,
                UserId = 2
            },
            new Pacient
            {
                Id = 2,
                UserId = 3
            }
        );
    }
}