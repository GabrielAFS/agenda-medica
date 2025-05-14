using AgendaMedica.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Database;

public class ApiContext(DbContextOptions<ApiContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
}