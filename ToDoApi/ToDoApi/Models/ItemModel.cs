using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Models
{
    public class ItemModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public bool? IsCompleted { get; set; }
    }
}
