using AgendaMedica.API.Database;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class PacientController
{
    const string GET_PACIENT_ENDPOINT = "GetPacient";

    public static RouteGroupBuilder MapPacientEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/pacients").WithParameterValidation().RequireAuthorization();

        // GET /pacients
        group.MapGet("/", async (DatabaseContext dbContext) =>
            await dbContext.Pacients
                .Include(pacient => pacient.User)
                .Select(pacient => pacient.ToDTO())
                .AsNoTracking()
                .ToListAsync()
        );

        // GET /pacients/:id
        group.MapGet("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            Pacient? pacient = await dbContext.Pacients.FindAsync(id);

            if (pacient is null) return Results.NotFound();

            User? user = await dbContext.Users.FindAsync(pacient.UserId);

            return user is null
                ? Results.NotFound("Associated user not found.")
                : Results.Ok(pacient.ToDTO(user));
        }).WithName(GET_PACIENT_ENDPOINT);

        return group;
    }

}

