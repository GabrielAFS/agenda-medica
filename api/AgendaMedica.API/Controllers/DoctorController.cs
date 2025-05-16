using AgendaMedica.API.Database;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class DoctorController
{
    const string GET_DOCTOR_ENDPOINT = "GetDoctor";

    public static RouteGroupBuilder MapDoctorEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/doctors").WithParameterValidation();

        // GET /doctors
        group.MapGet("/", async (DatabaseContext dbContext) =>
            await dbContext.Doctors
                .Include(doctor => doctor.User)
                .Select(doctor => doctor.ToDTO())
                .AsNoTracking()
                .ToListAsync()
        );

        // GET /doctors/:id
        group.MapGet("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            Doctor? doctor = await dbContext.Doctors.FindAsync(id);

            if (doctor is null) return Results.NotFound();

            User? user = await dbContext.Users.FindAsync(doctor.UserId);

            return user is null
                ? Results.NotFound("Associated user not found.")
                : Results.Ok(doctor.ToDTO(user));
        }).WithName(GET_DOCTOR_ENDPOINT);

        return group;
    }
}
