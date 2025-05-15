using AgendaMedica.API.Database;
using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class UserController
{
    const string GET_USER_ENDPOINT = "GetUser";

    public static RouteGroupBuilder MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users").WithParameterValidation();

        // GET /users
        group.MapGet("/", (ApiContext dbContext) => dbContext.Users
            .Select(user => user.ToDTO())
            .AsNoTracking()
        );

        // GET /users/:id
        group.MapGet("/{id}", (int id, ApiContext dbContext) =>
        {
            User? user = dbContext.Users.Find(id);

            return user is null ? Results.NotFound() : Results.Ok(user.ToDTO());
        }).WithName(GET_USER_ENDPOINT);

        // POST /users
        group.MapPost("/", (CreateUserDTO newUser, ApiContext dbContext) =>
        {
            User user = newUser.ToEntity();

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return Results.CreatedAtRoute(
                GET_USER_ENDPOINT,
                new { id = user.Id },
                user.ToDTO()
            );
        });

        // PUT /users/:id
        group.MapPut("/{id}", (int id, UpdateUserDTO updatedUser, ApiContext dbContext) =>
        {
            var user = dbContext.Users.Find(id);
            if (user is null) return Results.NotFound();

            dbContext.Entry(user).CurrentValues.SetValues(updatedUser.ToEntity(id));
            dbContext.SaveChanges();

            return Results.NoContent();
        });

        // DELETE /users/:id
        group.MapDelete("/{id}", (int id, ApiContext dbContext) =>
        {
            dbContext.Users.Where(user => user.Id == id).ExecuteDelete();

            return Results.NoContent();
        });

        return group;
    }
}