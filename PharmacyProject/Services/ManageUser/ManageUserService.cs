using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PharmacyProject.DTO.Request;
using PharmacyProject.EF;
using PharmacyProject.Entities;
using PharmacyProject.Services.Mail;
using TestProject.DTO.Response;

namespace PharmacyProject.Services.ManageUser
{
    public class ManageUserService : IManageUserService
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;

        public ManageUserService(
            DataContext context,
            IPasswordHasher<User> passwordHasher,
            IMapper mapper,
            IMailService mailService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _mailService = mailService;
        }

        public async Task<UserResponse> CreateUserAsync(UserRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                throw new ArgumentException("User with such Email exists");
            }

            var user = _mapper.Map<User>(model);

            if(user.Role == Role.OwnerPharmacies)
            {
                var message = $"<p>Email: {user.Email}; Password: {user.Password}</p>";
                await _mailService.SendEmailAsync(user.Email, "Credentials from PharmacyProject", message);
            }

            user.Password = _passwordHasher.HashPassword(user, user.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserResponse>(user);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new KeyNotFoundException("No user found");
            }

            _context.Baskets.RemoveRange(_context.Baskets.Where(x => x.UserId == userId));

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task EditUserAsync(Guid userId, EditUserRequest model)
        {
            if (userId != model.UserId) { throw new ArgumentException("UserId is not same in model and Guid"); }

            var user = await _context.Users.FindAsync(model.UserId);

            if (user == null)
            {
                throw new KeyNotFoundException("No user found");
            }

            user.Lastname = model.Lastname;
            user.Firstname = model.Firstname;
            user.Role = model.Role;

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserResponse>> GetUsersForAdminAsync(Guid withoutUserId)
        {
            var users = await _context.Users
                .Where(x => x.Id != withoutUserId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<UserResponse>>(users);
        }
    }
}
