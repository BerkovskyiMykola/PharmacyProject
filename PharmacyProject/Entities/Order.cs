namespace PharmacyProject.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid DrugId { get; set; }
        public Drug? Drug { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public int Amount { get; set; }
        public double PricePaid { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Address { get; set; } = string.Empty;
        public bool IsComplited { get; set; }

        public Guid? CarId { get; set; }
        public Car? Car { get; set; }
    }
}
