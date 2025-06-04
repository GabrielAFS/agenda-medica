using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgendaMedica.API.Database.Migrations
{
    /// <inheritdoc />
    public partial class FixDoctorsSeedsData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.InsertData(
                table: "Doctors",
                columns: new[] { "Id", "Crm", "Specialty", "UserId" },
                values: new object[] { 2, "654321", "Nutricionista", 4 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Doctors",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.InsertData(
                table: "Doctors",
                columns: new[] { "Id", "Crm", "Specialty", "UserId" },
                values: new object[] { 4, "654321", "Nutricionista", 2 });
        }
    }
}
