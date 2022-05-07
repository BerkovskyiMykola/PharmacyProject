using PharmacyProject.DTO.Request;
using TestProject.DTO.Response;

namespace PharmacyProject.Services.ManageUser
{
    public interface IManageUserService
    {
        Task<IEnumerable<UserResponse>> GetUsersForAdminAsync(Guid withoutUserId);
        Task<UserResponse> CreateUserAsync(UserRequest model);
        Task EditUserAsync(Guid userId, EditUserRequest model);
        Task DeleteUserAsync(Guid userId);
    }
}
