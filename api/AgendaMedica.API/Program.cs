using AgendaMedica.API.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

List<UserDTO> users = [
    new (1, "Sicrano", "sicrano@email.com", "12345678", 18, "https://photos.com/myphoto.png"),
    new (2, "Beltrano", "beltrano@email.com", "12345678", 28, "https://photos.com/myphoto.png"),
    new (3, "Fulano", "fulano@email.com", "12345678", 21, "https://photos.com/myphoto.png"),
    new (4, "Sicrana", "sicrana@email.com", "12345678", 35, "https://photos.com/myphoto.png")
];

const string GET_USER_ENDPOINT = "GetUser";

// GET /users
app.MapGet("/users", () => users);

// GET /users/:id
app.MapGet("/users/{id}", (int id) => users.Find(user => user.Id == id))
    .WithName(GET_USER_ENDPOINT);

// POST /users
app.MapPost("/users", (CreateUserDTO newUser) => {
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
app.MapPut("/users/{id}", (int id, UpdateUserDTO updatedUser) => {
    var index = users.FindIndex(user => user.Id == id);

    users[index] = new UserDTO(id, updatedUser.Name, updatedUser.Email, updatedUser.Password, updatedUser.Age, updatedUser.Photo);

    return Results.Ok(users[index]);
});

// DELETE /users/:id
app.MapDelete("/users/{id}", (int id) => {
    users.RemoveAll(user => user.Id == id);

    return Results.NoContent();
});

app.Run();
