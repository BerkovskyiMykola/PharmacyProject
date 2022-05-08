using MimeKit;
using MailKit.Net.Smtp;
using MimeKit.Text;

namespace PharmacyProject.Services.Mail
{
    public class MailService : IMailService
    {
        private readonly string _serviceEmail = "2f7a25b270f5d7";
        private readonly string _serviceEmailPassword = "f25dd677f32317";

        public async Task SendEmailAsync(string to, string subject, string html)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("Example", _serviceEmail));
            email.To.Add(new MailboxAddress("", to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            // send email
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.mailtrap.io", 465, true);
            await smtp.AuthenticateAsync(_serviceEmail, _serviceEmailPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
