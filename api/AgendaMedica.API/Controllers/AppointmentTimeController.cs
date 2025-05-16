using AgendaMedica.API.Database;
using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class AppointmentTimeController
{
    public static RouteGroupBuilder MapAppointmentTimeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/appointment-times").WithParameterValidation();

        // GET /appointment-times
        group.MapGet("/", async (DatabaseContext dbContext) =>
            await dbContext.AppointmentTimes
                .Include(appointmentTime => appointmentTime.Doctor)
                .Select(appointmentTime => appointmentTime.ToDTO())
                .AsNoTracking()
                .ToListAsync()
        );

        // GET /appointment-times/:id
        group.MapGet("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            AppointmentTime? appointmentTime = await dbContext.AppointmentTimes.FindAsync(id);

            if (appointmentTime is null) return Results.NotFound();

            return Results.Ok(appointmentTime.ToDTO());
        });

        // POST /appointment-times
        group.MapPost("/", async (CreateAppointmentTimeDTO appointmentTimeDTO, DatabaseContext dbContext) =>
        {
            AppointmentTime appointmentTime = appointmentTimeDTO.ToEntity();
            await dbContext.AppointmentTimes.AddAsync(appointmentTime);
            await dbContext.SaveChangesAsync();
            return Results.Created($"/appointment-times/{appointmentTime.Id}", appointmentTime.ToDTO());
        });

        // PUT /appointment-times/:id
        group.MapPut("/{id}", async (int id, UpdateAppointmentTimeDTO appointmentTimeDTO, DatabaseContext dbContext) =>
        {
            AppointmentTime? existingAppointmentTime = await dbContext.AppointmentTimes.FindAsync(id);
            if (existingAppointmentTime is null) return Results.NotFound();

            existingAppointmentTime.StartTime = appointmentTimeDTO.StartTime;
            existingAppointmentTime.IsAvailable = appointmentTimeDTO.IsAvailable;

            dbContext.AppointmentTimes.Update(existingAppointmentTime);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        // DELETE /appointment-times/:id
        group.MapDelete("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            AppointmentTime? appointmentTime = await dbContext.AppointmentTimes.FindAsync(id);
            if (appointmentTime is null) return Results.NotFound();

            dbContext.AppointmentTimes.Remove(appointmentTime);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        return group;
    }
}
