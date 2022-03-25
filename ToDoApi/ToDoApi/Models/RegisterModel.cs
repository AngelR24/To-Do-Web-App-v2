using System.ComponentModel.DataAnnotations;
using ToDoApi.Authentication;

namespace ToDoApi.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [EmailAddress(ErrorMessage = "Not a valid email")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [MinLength(User.MinPasswordLength, ErrorMessage = "The password must be over 6 characters")]
        [MaxLength(User.MaxPasswordLength, ErrorMessage = "The password must be less than 16 characters")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

}
