using System.ComponentModel.DataAnnotations;

namespace PharmacyProject.Entities
{
    public class Drug
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [Range(0.0, double.MaxValue)]
        public double Price { get; set; }
        [Range(0, int.MaxValue)]
        public int Amount { get; set; }

        public Guid PharmacyId { get; set; }
        public Pharmacy? Pharmacy { get; set; }
    }
}
