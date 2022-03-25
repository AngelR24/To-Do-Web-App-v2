using Microsoft.AspNetCore.Identity;

namespace ToDoApi.Authentication
{
    public class User : IdentityUser
    {
        public const int MinPasswordLength = 6;
        public const int MaxPasswordLength = 16;
    }
}
