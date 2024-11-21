using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WeaponAdminApi.Entities; // ������������ ��� ��� ���������

var builder = WebApplication.CreateBuilder(args);

// ��������� DbContext ��� ������ � ����� ������
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ��������� ������������ � �������������� Newtonsoft.Json
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
    });

// ���������� Swagger ��� ������������ API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();

// ������������ Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// ��������� ��������� �������� ��� ������ �������
app.MapGet("/products/search", async (string? query, AppDbContext context) =>
{
    if (string.IsNullOrEmpty(query))
    {
        return Results.BadRequest("Search query cannot be empty.");
    }

    // ����� ������� �� �������� ��� ���������
    var products = await context.Products
        .Where(p =>
            p.Name.Contains(query) ||
            p.Category.Contains(query))
        .Select(p => new
        {
            p.Id,
            p.Name,
            p.Category,
            p.Model,
            p.Description,
            p.IsVisible,
            p.CreatedAt
        })
        .ToListAsync();

    if (!products.Any())
    {
        return Results.NotFound("No products found matching the query.");
    }

    return Results.Ok(products);
})
.WithName("SearchProducts")
.Produces(200)
.Produces(404)
.Produces(400);

app.Run();
