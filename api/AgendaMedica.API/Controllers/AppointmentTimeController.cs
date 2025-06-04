using AgendaMedica.API.Database;
using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class AppointmentTimeController
{
    public static RouteGroupBuilder MapAppointmentTimeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/appointment-times").WithParameterValidation().RequireAuthorization();

        // GET /appointment-times
        group.MapGet("/", async (DatabaseContext dbContext, HttpRequest request) =>
        {
            string? doctorId = request.Query["doctorId"];
            IQueryable<AppointmentTime> query = dbContext.AppointmentTimes.Include(at => at.Doctor);

            if (!string.IsNullOrEmpty(doctorId))
            {
                query = query.Where(at => at.DoctorId == int.Parse(doctorId));
            }

            List<AppointmentTimeDTO> appointmentTimes = await query
                .Where(at => at.IsAvailable)
                .OrderByDescending(at => at.StartTime)
                .Select(at => at.ToDTO())
                .ToListAsync();

            return Results.Ok(appointmentTimes);
        }).WithName("GetAllAppointmentTimes");

        // GET /appointment-times/:id
        group.MapGet("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            AppointmentTime? appointmentTime = await dbContext.AppointmentTimes.FindAsync(id);

            if (appointmentTime is null) return Results.NotFound();

            return Results.Ok(appointmentTime.ToDTO());
        });

        // POST /appointment-times
        group.MapPost("/", [Authorize(Roles = "Doctor")] async (CreateAppointmentTimeDTO appointmentTimeDTO, DatabaseContext dbContext) =>
        {
            // check if start time already exists for the doctor
            bool exists = await dbContext.AppointmentTimes
                .AnyAsync(at => at.DoctorId == appointmentTimeDTO.DoctorId && at.StartTime == appointmentTimeDTO.StartTime);

            if (exists)
            {
                return Results.BadRequest("Um horário de consulta já existe para este médico nesse horário.");
            }

            AppointmentTime appointmentTime = appointmentTimeDTO.ToEntity();

            await dbContext.AppointmentTimes.AddAsync(appointmentTime);
            await dbContext.SaveChangesAsync();

            return Results.Created($"/appointment-times/{appointmentTime.Id}", appointmentTime.ToDTO());
        });

        // PUT /appointment-times/:id
        group.MapPut("/{id}", [Authorize(Roles = "Doctor")] async (int id, UpdateAppointmentTimeDTO appointmentTimeDTO, DatabaseContext dbContext) =>
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
        group.MapDelete("/{id}", [Authorize(Roles = "Doctor")] async (int id, DatabaseContext dbContext) =>
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
