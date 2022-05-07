using PharmacyProject.Entities;

namespace PharmacyProject.Services.JWT.Models
{
    public class JwtUser
    {
        public Guid Id { set; get; }
        public Role Role { set; get; }
    }
}
