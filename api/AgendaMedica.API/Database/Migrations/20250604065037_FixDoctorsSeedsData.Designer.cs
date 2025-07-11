﻿// <auto-generated />
using System;
using AgendaMedica.API.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AgendaMedica.API.Database.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20250604065037_FixDoctorsSeedsData")]
    partial class FixDoctorsSeedsData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AgendaMedica.API.Entities.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AppointmentTimeId")
                        .HasColumnType("integer");

                    b.Property<int?>("DoctorId")
                        .HasColumnType("integer");

                    b.Property<int>("PacientId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentTimeId");

                    b.HasIndex("DoctorId");

                    b.HasIndex("PacientId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.AppointmentTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DoctorId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("DoctorId");

                    b.ToTable("AppointmentTimes");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Doctor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Crm")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Specialty")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Doctors");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Crm = "123456",
                            Specialty = "Oncologista",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Crm = "654321",
                            Specialty = "Nutricionista",
                            UserId = 4
                        });
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Pacient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Pacients");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            UserId = 2
                        },
                        new
                        {
                            Id = 2,
                            UserId = 3
                        });
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("BirthDate")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Photo")
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BirthDate = new DateOnly(1943, 4, 2),
                            Email = "drauzio.varella@email.com",
                            Name = "Dr. Drauzio Varella",
                            Password = "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma",
                            Photo = "https://example.com/photo.jpg",
                            Role = "Doctor"
                        },
                        new
                        {
                            Id = 2,
                            BirthDate = new DateOnly(1949, 4, 2),
                            Email = "anamaria@email.com",
                            Name = "Ana Maria Braga",
                            Password = "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma",
                            Photo = "https://example.com/photo.jpg",
                            Role = "Pacient"
                        },
                        new
                        {
                            Id = 3,
                            BirthDate = new DateOnly(1971, 9, 3),
                            Email = "luciano.huck@email.com",
                            Name = "Luciano Huck",
                            Password = "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma",
                            Photo = "https://example.com/photo.jpg",
                            Role = "Pacient"
                        },
                        new
                        {
                            Id = 4,
                            BirthDate = new DateOnly(1960, 3, 2),
                            Email = "marcia.gold@email.com",
                            Name = "Marcia Goldschmidt",
                            Password = "$2a$13$n4OL/KeJzMNogVTLUbA.P.aEncr5g.2IoBBTYesd4/mj0IlKAirma",
                            Photo = "https://example.com/photo.jpg",
                            Role = "Doctor"
                        });
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Appointment", b =>
                {
                    b.HasOne("AgendaMedica.API.Entities.AppointmentTime", "AppointmentTime")
                        .WithMany()
                        .HasForeignKey("AppointmentTimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AgendaMedica.API.Entities.Doctor", null)
                        .WithMany("Appointments")
                        .HasForeignKey("DoctorId");

                    b.HasOne("AgendaMedica.API.Entities.Pacient", "Pacient")
                        .WithMany("Appointments")
                        .HasForeignKey("PacientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppointmentTime");

                    b.Navigation("Pacient");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.AppointmentTime", b =>
                {
                    b.HasOne("AgendaMedica.API.Entities.Doctor", "Doctor")
                        .WithMany("AppointmentTimes")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Doctor");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Doctor", b =>
                {
                    b.HasOne("AgendaMedica.API.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Pacient", b =>
                {
                    b.HasOne("AgendaMedica.API.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Doctor", b =>
                {
                    b.Navigation("AppointmentTimes");

                    b.Navigation("Appointments");
                });

            modelBuilder.Entity("AgendaMedica.API.Entities.Pacient", b =>
                {
                    b.Navigation("Appointments");
                });
#pragma warning restore 612, 618
        }
    }
}
