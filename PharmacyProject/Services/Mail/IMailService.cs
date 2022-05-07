using MimeKit;

namespace PharmacyProject.Services.Mail
{
    public interface IMailService
    {
        Task SendEmailAsync(string to, string subject, string html);
    }
}
