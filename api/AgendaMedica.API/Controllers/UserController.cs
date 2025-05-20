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

        // GET /users
        group.MapGet("/", async (DatabaseContext dbContext) =>
            await dbContext.Users
                .Select(user => user.ToDTO())
                .AsNoTracking()
                .ToListAsync()
        );

        // GET /users/me
        group.MapGet("/me", async (DatabaseContext dbContext, HttpContext httpContext) =>
        {
            if (httpContext.User is null)
            {
                return Results.NotFound();
            }

            var userId = int.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);
            User? user = await dbContext.Users.FindAsync(userId);

            return user is null ? Results.NotFound() : Results.Ok(user.ToDTO());
        }).WithName(GET_USER_ENDPOINT).RequireAuthorization();

        // POST /users
        group.MapPost("/", async (CreateUserDTO newUser, DatabaseContext dbContext) =>
        {
            User user = newUser.ToEntity();

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(
                GET_USER_ENDPOINT,
                new { id = user.Id },
                user.ToDTO()
            );
        });

        // POST /login
        group.MapPost("/login", [AllowAnonymous] async (LoginUserDTO userCredentials, DatabaseContext dbContext) =>
        {
            User? existingUser = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == userCredentials.Email && u.Password == userCredentials.Password);

            if (existingUser is null) return Results.NotFound();

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
        });

        // DELETE /users/:id
        group.MapDelete("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            await dbContext.Users.Where(user => user.Id == id).ExecuteDeleteAsync();

            return Results.NoContent();
        });

        return group;
    }
}