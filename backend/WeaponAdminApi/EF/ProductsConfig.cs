using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WeaponAdminApi.Entities;

namespace WeaponAdminApi.EF
{
    public class ProductsConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("products"); // Указываем имя таблицы

            builder.HasKey(p => p.Id); // Указываем первичный ключ

            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(150); // Обязательное поле с максимальной длиной 150 символов

            builder.Property(p => p.Category)
                   .HasMaxLength(100); // Максимальная длина 100 символов

            builder.Property(p => p.Model)
                   .HasMaxLength(100); // Максимальная длина 100 символов

            builder.Property(p => p.Description)
                   .HasMaxLength(500); // Максимальная длина описания - 500 символов

            builder.Property(p => p.ImageUrl)
                   .HasMaxLength(300); // Максимальная длина URL

            builder.Property(p => p.IsVisible)
                   .IsRequired()
                   .HasDefaultValue(true); // Видимость товара по умолчанию

            builder.Property(p => p.CreatedAt)
                   .IsRequired(); // Поле "Дата создания" обязательно

            builder.Property(p => p.UpdatedAt)
                   .IsRequired(false); // Поле "Дата обновления" может быть null

            builder.Property(p => p.AdminId)
                   .IsRequired(); // Внешний ключ на администратора

            builder.Property(p => p.AdminName)
                   .HasMaxLength(100); // Имя администратора с ограничением длины

            // Индексы для ускорения поиска
            builder.HasIndex(p => p.Name);
            builder.HasIndex(p => p.Category);
        }
    }
}
