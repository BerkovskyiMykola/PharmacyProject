using System.ComponentModel.DataAnnotations;

namespace PharmacyProject.DTO.Request
{
    public class ProfileRequest
    {
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; } = string.Empty;
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; } = string.Empty;
    }
}
