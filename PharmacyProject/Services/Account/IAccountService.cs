using PharmacyProject.DTO.Request;
using PharmacyProject.DTO.Response;

namespace PharmacyProject.Services.Account
{
    public interface IAccountService
    {
        Task<AuthorizeResponse> RegisterAsync(RegisterRequest model);
        Task<AuthorizeResponse> AuthenticateAsync(AuthenticateRequest model);
        Task<ProfileResponse> GetProfileInfoAsync(Guid userId);
        Task EditUserProfile(ProfileRequest model, Guid userId);
    }
}
