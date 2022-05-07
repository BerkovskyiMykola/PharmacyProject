using System.ComponentModel.DataAnnotations;

namespace PharmacyProject.Entities
{
    public class Pharmacy
    {
        public Guid Id { get; set; }
        [MinLength(2)]
        public string Name { get; set; } = string.Empty;
        [MinLength(2)]
        public string Address { get; set; } = string.Empty;

        public Guid UserId { get; set; }
        public User? User { get; set; }

        public List<Drug> Drugs { get; set; } = new List<Drug>();
        public List<Car> Cars { get; set; } = new List<Car>();
    }
}
