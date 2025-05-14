using AgendaMedica.API.DTOs;

namespace AgendaMedica.API.Controllers;

public static class UserController
{
    private static readonly List<UserDTO> users = [
        new (1, "Sicrano", "sicrano@email.com", "12345678", "https://photos.com/myphoto.png", DateOnly.Parse("21-10-1985")),
        new (2, "Beltrano", "beltrano@email.com", "12345678", "https://photos.com/myphoto.png", DateOnly.Parse("11-01-1996")),
        new (3, "Fulano", "fulano@email.com", "12345678", "https://photos.com/myphoto.png", DateOnly.Parse("09-05-1991")),
        new (4, "Sicrana", "sicrana@email.com", "12345678", "https://photos.com/myphoto.png", DateOnly.Parse("30-09-1986"))
    ];

    const string GET_USER_ENDPOINT = "GetUser";

    public static RouteGroupBuilder MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/users").WithParameterValidation();

        // GET /users
        group.MapGet("/", () => users);

        // GET /users/:id
        group.MapGet("/{id}", (int id) =>
        {
            UserDTO? user = users.Find(user => user.Id == id);

            return user is null ? Results.NotFound() : Results.Ok(user);
        }).WithName(GET_USER_ENDPOINT);

        // POST /users
        group.MapPost("/", (CreateUserDTO newUser) =>
        {
            UserDTO user = new(
                users.Count + 1,
                newUser.Name,
                newUser.Email,
                newUser.Password,
                newUser.Photo,
                newUser.BirthDate
            );

            users.Add(user);

            return Results.CreatedAtRoute(GET_USER_ENDPOINT, new { id = user.Id }, user);
        });

        // PUT /users/:id
        group.MapPut("/{id}", (int id, UpdateUserDTO updatedUser) =>
        {
            var index = users.FindIndex(user => user.Id == id);

            if (index == -1) return Results.NotFound();

            users[index] = new UserDTO(
                id,
                updatedUser.Name,
                updatedUser.Email,
                updatedUser.Password,
                updatedUser.Photo,
                updatedUser.BirthDate
            );

            return Results.Ok(users[index]);
        });

        // DELETE /users/:id
        group.MapDelete("/{id}", (int id) =>
        {
            users.RemoveAll(user => user.Id == id);

            return Results.NoContent();
        });

        return group;
    }
}