using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PharmacyProject.DTO.Request;
using PharmacyProject.DTO.Response;
using PharmacyProject.EF;
using PharmacyProject.Entities;
using PharmacyProject.Services.JWT;
using PharmacyProject.Services.JWT.Models;

namespace PharmacyProject.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMapper _mapper;

        public AccountService(
            DataContext context,
            IJwtService jwtService,
            IPasswordHasher<User> passwordHasher,
            IMapper mapper)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
        }

        public async Task<AuthorizeResponse> AuthenticateAsync(AuthenticateRequest model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
            {
                throw new KeyNotFoundException("Email or password is incorrect");
            }

            var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, model.Password);

            if (verificationResult == PasswordVerificationResult.Failed)
            {
                throw new ArgumentException("Email or password is incorrect");
            }
            else if (verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
            {
                user.Password = _passwordHasher.HashPassword(user, model.Password);
                await _context.SaveChangesAsync();
            }

            var token = _jwtService.GetToken(_mapper.Map<JwtUser>(user));

            var response = _mapper.Map<AuthorizeResponse>(user);
            response.Token = token;

            return response;
        }

        public async Task EditUserProfile(ProfileRequest model, Guid userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new KeyNotFoundException("No user found");
            }

            user.Lastname = model.Lastname;
            user.Firstname = model.Firstname;

            await _context.SaveChangesAsync();
        }

        public async Task<ProfileResponse> GetProfileInfoAsync(Guid userId)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new KeyNotFoundException("No user found");
            }

            return _mapper.Map<ProfileResponse>(user);
        }

        public async Task<AuthorizeResponse> RegisterAsync(RegisterRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                throw new ArgumentException("User with such Email exists");
            }

            var newUser = _mapper.Map<User>(model);
            newUser.Role = Role.User;

            newUser.Password = _passwordHasher.HashPassword(newUser, model.Password);

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            var token = _jwtService.GetToken(_mapper.Map<JwtUser>(newUser));

            var response = _mapper.Map<AuthorizeResponse>(newUser);
            response.Token = token;

            return response;
        }
    }
}
