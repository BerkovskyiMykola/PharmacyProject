namespace PharmacyProject.Entities
{
    public class Car
    {
        public Guid Id { get; set; }
        public string Number { get; set; } = string.Empty;
        public int AmountPlaces { get; set; }

        public CarState State { get; set; }

        public Guid PharmacyId { get; set; }
        public Pharmacy? Pharmacy { get; set; }

        public List<Order> Orders { get; set; } = new List<Order>();
    }
}
