using System.ComponentModel.DataAnnotations;

namespace PharmacyProject.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; } = string.Empty;
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; } = string.Empty;
        public string Email { set; get; } = string.Empty;
        public string Password { set; get; } = string.Empty;

        public string VerificationToken { get; set; } = string.Empty;
        public DateTime? Verified { get; set; }

        public Role Role { get; set; }

        public List<Pharmacy> Pharmacies { get; set; } = new List<Pharmacy>();

        public List<Basket> Baskets { get; set; } = new List<Basket>();
        public List<Drug> Drugs { get; set; } = new List<Drug>();
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}
