using System.ComponentModel.DataAnnotations;

namespace PharmacyProject.Entities
{
    public class Basket
    {
        public Guid DrugId { get; set; }
        public Drug? Drug { get; set; }

        public Guid UserId { get; set; }
        public User? User { get; set; }

        [Range(0, int.MaxValue)]
        public int Amount { get; set; }
    }
}
