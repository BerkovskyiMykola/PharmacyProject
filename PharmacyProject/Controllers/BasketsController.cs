using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyProject.EF;
using PharmacyProject.Entities;

namespace PharmacyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketsController : ControllerBase
    {
        private readonly DataContext _context;
        public BasketsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all/own")]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Baskets
                .Include(x => x.Drug)
                .Where(x => x.UserId.ToString() == HttpContext.User.Identity!.Name).ToListAsync();

            return Ok(result.Select(x => new
            {
                x.Amount,
                x.DrugId,
                x.Drug
            }));
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<IActionResult> Post(Basket basket)
        {
            var drug = await _context.Drugs.FindAsync(basket.DrugId);

            if (drug == null)
            {
                return NotFound();
            }

            var model = await _context.Baskets.SingleOrDefaultAsync(x => x.UserId == Guid.Parse(HttpContext.User.Identity.Name) && x.DrugId == basket.DrugId);

            if (model != null)
            {
                if(drug.Amount < basket.Amount - model.Amount)
                {
                    return BadRequest("Quantity is not enough");
                }
                else
                {
                    drug.Amount -= basket.Amount - model.Amount;
                    model.Amount = basket.Amount + model.Amount;

                    await _context.SaveChangesAsync();

                    return Ok();
                }
            }

            if (drug.Amount < basket.Amount)
            {
                return BadRequest("Quantity is not enough");
            }

            basket.UserId = Guid.Parse(HttpContext.User.Identity.Name);
            drug.Amount -= basket.Amount;
            _context.Baskets.Add(basket);

            await _context.SaveChangesAsync();

            return Ok(basket);
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit")]
        public async Task<IActionResult> Put(Basket basket)
        {
            var drug = await _context.Drugs.FindAsync(basket.DrugId);

            if (drug == null)
            {
                return NotFound();
            }

            var model = await _context.Baskets.SingleOrDefaultAsync(x => x.UserId == Guid.Parse(HttpContext.User.Identity.Name) && x.DrugId == basket.DrugId);

            if (model != null)
            {
                if (drug.Amount < basket.Amount - model.Amount)
                {
                    return BadRequest("Quantity is not enough");
                }
                else
                {
                    drug.Amount -= basket.Amount - model.Amount;
                    model.Amount = basket.Amount + model.Amount;

                    await _context.SaveChangesAsync();

                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{drugId}")]
        public async Task<IActionResult> Delete(Guid drugId)
        {
            var basket = await _context.Baskets.SingleOrDefaultAsync(x => x.UserId == Guid.Parse(HttpContext.User.Identity.Name) && x.DrugId == drugId);

            if(basket == null)
            {
                return NotFound();
            }

            _context.Baskets.Remove(basket);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
