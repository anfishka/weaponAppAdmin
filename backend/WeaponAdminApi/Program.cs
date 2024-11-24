using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WeaponAdminApi.Entities;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Добавляем DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSqlDb")));

// Проверка подключения
var connectionString = builder.Configuration.GetConnectionString("AzureSqlDb");
try
{
    using (var connection = new SqlConnection(connectionString))
    {
        connection.Open();
        Console.WriteLine("Подключение к Azure SQL Server установлено успешно!");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Ошибка подключения: {ex.Message}");
}

// Настройка контроллеров и JSON
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
    });

// Добавление Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Настройка CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .WithExposedHeaders("Content-Length");
    });
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

// Поиск продуктов
app.MapGet("/products/search", async ([FromQuery] string? query, AppDbContext context) =>
{
    if (string.IsNullOrEmpty(query))
    {
        return Results.BadRequest("Search query cannot be empty.");
    }

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

    if (products.Count == 0)
    {
        return Results.NotFound("No products found matching the query.");
    }

    return Results.Ok(products);
});

app.Run();
