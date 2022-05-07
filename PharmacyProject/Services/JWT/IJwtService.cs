using PharmacyProject.Services.JWT.Models;

namespace PharmacyProject.Services.JWT
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
