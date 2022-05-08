#nullable disable
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyProject.EF;
using PharmacyProject.Entities;

namespace PharmacyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "OwnerPharmacies")]
    public class PharmaciesController : ControllerBase
    {
        private readonly DataContext _context;

        public PharmaciesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Pharmacy>>> GetPharmacies()
        {
            return await _context.Pharmacies.Where(x => x.UserId.ToString() == HttpContext.User.Identity.Name).ToListAsync();
        }

        [HttpGet("one/{id}")]
        public async Task<ActionResult<Pharmacy>> GetPharmacy(Guid id)
        {
            var pharmacy = await _context.Pharmacies.FindAsync(id);

            if (pharmacy == null)
            {
                return NotFound();
            }

            return pharmacy;
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutPharmacy(Guid id, Pharmacy pharmacy)
        {
            if (id != pharmacy.Id)
            {
                return BadRequest();
            }

            var model = await _context.Pharmacies.FindAsync(id);
            model.Name = pharmacy.Name;
            model.Address = pharmacy.Address;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PharmacyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("create")]
        public async Task<ActionResult<Pharmacy>> PostPharmacy(Pharmacy pharmacy)
        {
            pharmacy.UserId = Guid.Parse(HttpContext.User.Identity.Name);
            _context.Pharmacies.Add(pharmacy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPharmacy", new { id = pharmacy.Id }, pharmacy);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePharmacy(Guid id)
        {
            var pharmacy = await _context.Pharmacies.FindAsync(id);
            if (pharmacy == null)
            {
                return NotFound();
            }

            _context.Pharmacies.Remove(pharmacy);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PharmacyExists(Guid id)
        {
            return _context.Pharmacies.Any(e => e.Id == id);
        }
    }
}
