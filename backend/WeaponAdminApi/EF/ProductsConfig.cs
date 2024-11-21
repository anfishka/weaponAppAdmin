using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WeaponAdminApi.Entities;

namespace WeaponAdminApi.EF
{
    public class ProductsConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("products"); // ��������� ��� �������

            builder.HasKey(p => p.Id); // ��������� ��������� ����

            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(150); // ������������ ���� � ������������ ������ 150 ��������

            builder.Property(p => p.Category)
                   .HasMaxLength(100); // ������������ ����� 100 ��������

            builder.Property(p => p.Model)
                   .HasMaxLength(100); // ������������ ����� 100 ��������

            builder.Property(p => p.Description)
                   .HasMaxLength(500); // ������������ ����� �������� - 500 ��������

            builder.Property(p => p.ImageUrl)
                   .HasMaxLength(300); // ������������ ����� URL

            builder.Property(p => p.IsVisible)
                   .IsRequired()
                   .HasDefaultValue(true); // ��������� ������ �� ���������

            builder.Property(p => p.CreatedAt)
                   .IsRequired(); // ���� "���� ��������" �����������

            builder.Property(p => p.UpdatedAt)
                   .IsRequired(false); // ���� "���� ����������" ����� ���� null

            builder.Property(p => p.AdminId)
                   .IsRequired(); // ������� ���� �� ��������������

            builder.Property(p => p.AdminName)
                   .HasMaxLength(100); // ��� �������������� � ������������ �����

            // ������� ��� ��������� ������
            builder.HasIndex(p => p.Name);
            builder.HasIndex(p => p.Category);
        }
    }
}
