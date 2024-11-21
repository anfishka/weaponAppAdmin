using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace WeaponAdminApi.Entities
{
    public class Product
    {
        public int Id { get; set; } 
        public string Name { get; set; } 
        public string Category { get; set; } 
        public string Model { get; set; } 
        public string Description { get; set; } 
        public string ImageUrl { get; set; }
        public bool IsVisible { get; set; } = true; 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
        public DateTime? UpdatedAt { get; set; } 
        public int AdminId { get; set; } 
        public string AdminName { get; set; } 
    }
}