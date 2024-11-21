using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WeaponAdminApi.Entities; // Пространство имён для сущностей

var builder = WebApplication.CreateBuilder(args);

// Добавляем DbContext для работы с базой данных
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Настройка контроллеров с использованием Newtonsoft.Json
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
    });

// Добавление Swagger для тестирования API
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

// Конфигурация Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Добавляем обработку запросов для поиска товаров
app.MapGet("/products/search", async (string? query, AppDbContext context) =>
{
    if (string.IsNullOrEmpty(query))
    {
        return Results.BadRequest("Search query cannot be empty.");
    }

    // Поиск товаров по названию или категории
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
