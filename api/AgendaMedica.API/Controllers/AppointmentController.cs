using AgendaMedica.API.Database;
using AgendaMedica.API.DTOs;
using AgendaMedica.API.Entities;
using AgendaMedica.API.Mapping;
using Microsoft.EntityFrameworkCore;

namespace AgendaMedica.API.Controllers;

public static class AppointmentController
{
    public static RouteGroupBuilder MapAppointmentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/appointments").WithParameterValidation().RequireAuthorization();

        // GET /appointments
        group.MapGet("/", async (DatabaseContext dbContext) =>
        {
            List<AppointmentDTO> appointments = await dbContext.Appointments
                .Include(appointment => appointment.Pacient)
                    .ThenInclude(pacient => pacient!.User)
                .Include(appointment => appointment.AppointmentTime)
                    .ThenInclude(appointmentTime => appointmentTime!.Doctor)
                        .ThenInclude(doctor => doctor!.User)
                .Select(appointment => appointment.ToDTO())
                .AsNoTracking()
                .ToListAsync();

            return Results.Ok(appointments);
        }).WithName("GetAllAppointments");

        // GET /appointments/:id
        group.MapGet("/{id}", async (int id, DatabaseContext dbContext) =>
        {
            Appointment? appointment = await dbContext.Appointments
                .Include(appointment => appointment.Pacient)
                    .ThenInclude(pacient => pacient!.User)
                .Include(appointment => appointment.AppointmentTime)
                .FirstOrDefaultAsync(appointment => appointment.Id == id);

            if (appointment is null) return Results.NotFound();

            return Results.Ok(appointment.ToDTO());
        });

        // POST /appointments
        group.MapPost("/", async (CreateAppointmentDTO appointmentDTO, DatabaseContext dbContext) =>
        {
            Appointment appointment = appointmentDTO.ToEntity();
            await dbContext.Appointments.AddAsync(appointment);
            await dbContext.SaveChangesAsync();
            return Results.Created($"/appointments/{appointment.Id}", appointment.ToDTO());
        });

        return group;
    }
}
