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
            bool isTimeSlotAvailable = await dbContext.AppointmentTimes
                .AnyAsync(at => at.Id == appointmentDTO.AppointmentTimeId && at.IsAvailable);

            if (!isTimeSlotAvailable)
            {
                return Results.BadRequest("O horário selecionado não está disponível.");
            }

            Appointment appointment = appointmentDTO.ToEntity();

            await dbContext.Appointments.AddAsync(appointment);
            await dbContext.SaveChangesAsync();

            // Mark the appointment time as no longer available
            AppointmentTime? appointmentTime = await dbContext.AppointmentTimes
                .FirstOrDefaultAsync(at => at.Id == appointment.AppointmentTimeId);

            if (appointmentTime is not null)
            {
                appointmentTime.IsAvailable = false;
                dbContext.AppointmentTimes.Update(appointmentTime);
                await dbContext.SaveChangesAsync();
            }
            else
            {
                return Results.NotFound("Horário de consulta não encontrado.");
            }

            return Results.Created($"/appointments/{appointment.Id}", appointment.ToSimpleDTO());
        });

        return group;
    }
}
