using AgendaMedica.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
}