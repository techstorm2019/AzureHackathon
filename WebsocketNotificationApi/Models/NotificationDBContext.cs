using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using NotificationApp;

namespace WebsocketNotificationApi.Models
{
    public partial class NotificationDBContext : DbContext
    {
        public NotificationDBContext()
        {
        }

        public NotificationDBContext(DbContextOptions<NotificationDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderShipmentStatusDetails> OrderShipmentStatusDetails { get; set; }
        public virtual DbSet<ShipmentStatus> ShipmentStatus { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserNotification> UserNotification { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //  optionsBuilder.UseSqlServer("Server=SANJEEB;Database=NotificationDB;Integrated Security=True");
                optionsBuilder.UseSqlServer(Startup.ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("Customer_PK");

                entity.Property(e => e.Address).HasMaxLength(200);

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.EmailId)
                    .HasColumnName("EmailID")
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.PhoneNo).HasMaxLength(20);

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("Notification_PK");

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("Order_PK");

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.OrderDetails).HasMaxLength(200);

                entity.Property(e => e.OrderNo)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.OrderStatus).HasMaxLength(100);

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Order_Customer_FK");
            });

            modelBuilder.Entity<OrderShipmentStatusDetails>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("OrderShipmentStatusDetails_PK");

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Notes).HasMaxLength(2000);

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.ShipmentStatusId).HasColumnName("ShipmentStatusID");

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderShipmentStatusDetails)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("OrderShipmentStatusDetails_Order_FK");

                entity.HasOne(d => d.ShipmentStatus)
                    .WithMany(p => p.OrderShipmentStatusDetails)
                    .HasForeignKey(d => d.ShipmentStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("OrderShipmentStatus_ShipmentStatus_FK");
            });

            modelBuilder.Entity<ShipmentStatus>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("ShipmentStatus_PK");

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.NotificationId).HasColumnName("NotificationID");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Notification)
                    .WithMany(p => p.ShipmentStatus)
                    .HasForeignKey(d => d.NotificationId)
                    .HasConstraintName("ShipmentStatus_Notification_FK");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("User_PK");

                entity.Property(e => e.Address).HasMaxLength(200);

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasColumnName("EmailID")
                    .HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Phone).HasMaxLength(100);

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("User_Customer_FK");
            });

            modelBuilder.Entity<UserNotification>(entity =>
            {
                entity.HasKey(e => e.DataUniqueId)
                    .HasName("UserNotification_PK");

                entity.Property(e => e.CreatedTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Notes).HasMaxLength(2000);

                entity.Property(e => e.NotificationId).HasColumnName("NotificationID");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.UpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.UpdatedUser)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Notification)
                    .WithMany(p => p.UserNotification)
                    .HasForeignKey(d => d.NotificationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserNotification_Notification_FK");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.UserNotification)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserNotification_Order_FK");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserNotification)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserNotification_User_FK");
            });
        }
    }
}
