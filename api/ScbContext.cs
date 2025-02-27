using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FunctionApp1;

public partial class ScbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public ScbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }


    public ScbContext(DbContextOptions<ScbContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<ApiKey> ApiKeys { get; set; }

    public virtual DbSet<Cluster> Clusters { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ApiKey>(entity =>
        {
            entity.HasKey(e => e.ApiKeyId).HasName("PK__ApiKeys__2F1344F234C07689");

            entity.Property(e => e.KeyType)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.KeyValue)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.Cluster).WithMany(p => p.ApiKeys)
                .HasForeignKey(d => d.ClusterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApiKeys_Clusters");
        });

        modelBuilder.Entity<Cluster>(entity =>
        {
            entity.HasKey(e => e.ClusterId).HasName("PK__Clusters__919BFF7350B416D0");

            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Endpoint)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.KibanaUrl)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Url)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
