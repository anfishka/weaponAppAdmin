using Microsoft.EntityFrameworkCore;
using WeaponAdminApi.Entities;
using WeaponAdminApi.EF;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // ������� �������
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // ����������� ������������ ��� �������� Product
        modelBuilder.ApplyConfiguration(new ProductsConfig());
    }
}
