using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class FruitModel
    {
        [Key]
        public int? Id { get; set; }

        [StringLength(100)]
        public string? Name { get; set; }
        public int ValueA { get; set; }
        public int ValueB { get; set; }
    }
}
