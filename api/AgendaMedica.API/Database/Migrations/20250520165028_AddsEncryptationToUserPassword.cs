using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgendaMedica.API.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddsEncryptationToUserPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "12345678");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "12345678");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "12345678");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "12345678");
        }
    }
}
