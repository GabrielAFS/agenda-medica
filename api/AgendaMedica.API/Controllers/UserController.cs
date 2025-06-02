using System.Security.Claims;
using AgendaMedica.API.Database;
using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using AgendaMedica.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class UserController
{
    const string GET_USER_ENDPOINT = "GetUser";

    public static RouteGroupBuilder MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users").WithParameterValidation();

        // GET /users/me
        group.MapGet("/me", async (DatabaseContext dbContext, HttpContext httpContext) =>
        {
            if (httpContext.User is null)
            {
                return Results.NotFound();
            }

            var userId = int.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
            User? user = await dbContext.Users.FindAsync(userId);

            if (user is null)
            {
                return Results.NotFound();
            }

            if (user.Role == "Pacient")
            {
                var pacient = await dbContext.Pacients
                    .Include(p => p.User)
                    .FirstOrDefaultAsync(p => p.UserId == userId);

                if (pacient is null)
                {
                    return Results.NotFound("Associated Pacient not found.");
                }

                return Results.Ok(pacient.ToDTO(user));
            }

            var doctor = await dbContext.Doctors
                    .Include(d => d.User)
                    .FirstOrDefaultAsync(d => d.UserId == userId);

            if (doctor is null)
            {
                return Results.NotFound("Associated Doctor not found.");
            }

            return Results.Ok(doctor.ToDTO(user));
        }).WithName(GET_USER_ENDPOINT).RequireAuthorization();

        // POST /users/login
        group.MapPost("/login", [AllowAnonymous] async (LoginUserDTO userCredentials, DatabaseContext dbContext) =>
        {
            User? existingUser = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == userCredentials.Email);

            if (existingUser is null || !BCrypt.Net.BCrypt.EnhancedVerify(userCredentials.Password, existingUser.Password))
                return Results.NotFound();

            string token = JwtBearerService.GenerateToken(existingUser);
            return Results.Ok(new { Token = token });
        });

        // PUT /users/:id
        group.MapPut("/{id}", async (int id, UpdateUserDTO updatedUser, DatabaseContext dbContext) =>
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user is null) return Results.NotFound();

            dbContext.Entry(user).CurrentValues.SetValues(updatedUser.ToEntity(id));
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization();

        return group;
    }
}