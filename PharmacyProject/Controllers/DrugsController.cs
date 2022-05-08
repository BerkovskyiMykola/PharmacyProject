#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyProject.EF;
using PharmacyProject.Entities;

namespace PharmacyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "OwnerPharmacies")]
    public class DrugsController : ControllerBase
    {
        private readonly DataContext _context;

        public DrugsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetDrugs(Guid id)
        {
            var pharmacies = await _context.Pharmacies.Include(x => x.Drugs).SingleOrDefaultAsync(x => x.Id == id && x.UserId.ToString() == HttpContext.User.Identity.Name);

            if(pharmacies == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                pharmacies.Name,
                pharmacies.Address,
                Drugs = pharmacies.Drugs.Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Amount,
                    x.Price
                })
            });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutDrug(Guid id, Drug drug)
        {
            if (id != drug.Id)
            {
                return BadRequest();
            }

            var model = await _context.Drugs.SingleOrDefaultAsync(x => x.Id == id && x.Pharmacy.UserId.ToString() == HttpContext.User.Identity.Name);
            if (model == null)
            {
                return NotFound();
            }

            model.Amount = drug.Amount;
            model.Price = drug.Price;
            model.Name = drug.Name;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("create")]
        public async Task<ActionResult<Drug>> PostDrug(Drug drug)
        {
            var pharmacies = await _context.Pharmacies.Include(x => x.Drugs).SingleOrDefaultAsync(x => x.Id == drug.PharmacyId && x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (pharmacies == null)
            {
                return NotFound();
            }

            _context.Drugs.Add(drug);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                drug.Id,
                drug.Name,
                drug.Amount,
                drug.Price
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteDrug(Guid id)
        {
            var drug = await _context.Drugs.SingleOrDefaultAsync(x => x.Id == id && x.Pharmacy.UserId.ToString() == HttpContext.User.Identity.Name);
            if (drug == null)
            {
                return NotFound();
            }

            _context.Drugs.Remove(drug);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DrugExists(Guid id)
        {
            return _context.Drugs.Any(e => e.Id == id);
        }
    }
}
