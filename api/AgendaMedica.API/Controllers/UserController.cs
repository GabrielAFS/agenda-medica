using AgendaMedica.API.DTOs;

namespace AgendaMedica.API.Controllers;

public static class UserController
{
    private static readonly List<UserDTO> users = [
        new (1, "Sicrano", "sicrano@email.com", "12345678", 18, "https://photos.com/myphoto.png"),
        new (2, "Beltrano", "beltrano@email.com", "12345678", 28, "https://photos.com/myphoto.png"),
        new (3, "Fulano", "fulano@email.com", "12345678", 21, "https://photos.com/myphoto.png"),
        new (4, "Sicrana", "sicrana@email.com", "12345678", 35, "https://photos.com/myphoto.png")
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
                newUser.Age,
                newUser.Photo
            );

            users.Add(user);

            return Results.CreatedAtRoute(GET_USER_ENDPOINT, new { id = user.Id }, user);
        });

        // PUT /users/:id
        group.MapPut("/{id}", (int id, UpdateUserDTO updatedUser) =>
        {
            var index = users.FindIndex(user => user.Id == id);

            if (index == -1) return Results.NotFound();

            users[index] = new UserDTO(id, updatedUser.Name, updatedUser.Email, updatedUser.Password, updatedUser.Age, updatedUser.Photo);

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