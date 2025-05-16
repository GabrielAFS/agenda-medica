using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AgendaMedica.API.Database.Migrations
{
    /// <inheritdoc />
    public partial class SeedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "BirthDate", "Email", "Name", "Password", "Photo" },
                values: new object[,]
                {
                    { 1, new DateOnly(1943, 4, 2), "drauzio.varella@email.com", "Dr. Drauzio Varella", "12345678", "https://example.com/photo.jpg" },
                    { 2, new DateOnly(1949, 4, 2), "anamaria@email.com", "Ana Maria Braga", "12345678", "https://example.com/photo.jpg" },
                    { 3, new DateOnly(1971, 9, 3), "luciano.huck@email.com", "Luciano Huck", "12345678", "https://example.com/photo.jpg" },
                    { 4, new DateOnly(1960, 3, 2), "marcia.gold@email.com", "Marcia Goldschmidt", "12345678", "https://example.com/photo.jpg" }
                });

            migrationBuilder.InsertData(
                table: "Doctors",
                columns: new[] { "Id", "Crm", "Specialty", "UserId" },
                values: new object[,]
                {
                    { 1, "123456", "Oncologista", 1 },
                    { 4, "654321", "Nutricionista", 2 }
                });

            migrationBuilder.InsertData(
                table: "Pacients",
                columns: new[] { "Id", "UserId" },
                values: new object[,]
                {
                    { 1, 2 },
                    { 2, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Pacients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Pacients",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
