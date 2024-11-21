using Microsoft.EntityFrameworkCore;
using WeaponAdminApi.Entities;
using WeaponAdminApi.EF;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Таблица товаров
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Подключение конфигурации для сущности Product
        modelBuilder.ApplyConfiguration(new ProductsConfig());
    }
}
