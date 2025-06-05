using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgendaMedica.API.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserSeedImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Photo",
                value: "https://api.dicebear.com/9.x/personas/svg?seed=Brooklynn");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Photo",
                value: "https://api.dicebear.com/9.x/personas/svg?seed=Sara");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Photo",
                value: "https://api.dicebear.com/9.x/personas/svg?seed=Easton");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Photo",
                value: "https://api.dicebear.com/9.x/personas/svg?seed=Sadie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Photo",
                value: "https://example.com/photo.jpg");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Photo",
                value: "https://example.com/photo.jpg");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Photo",
                value: "https://example.com/photo.jpg");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Photo",
                value: "https://example.com/photo.jpg");
        }
    }
}
