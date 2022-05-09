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
    public class CarsController : ControllerBase
    {
        private readonly DataContext _context;

        public CarsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetCurs(Guid id)
        {
            var pharmacies = await _context.Pharmacies.Include(x => x.Cars).SingleOrDefaultAsync(x => x.Id == id && x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (pharmacies == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                pharmacies.Name,
                pharmacies.Address,
                Cars = pharmacies.Cars.Select(x => new
                {
                    x.Id,
                    x.Number,
                    x.AmountPlaces,
                    x.State
                })
            });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutCar(Guid id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            var model = await _context.Cars.SingleOrDefaultAsync(x => x.Id == id && x.Pharmacy.UserId.ToString() == HttpContext.User.Identity.Name);
            if (model == null)
            {
                return NotFound();
            }

            model.State = car.State;
            model.Number = car.Number;
            model.AmountPlaces = car.AmountPlaces;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("create")]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            var pharmacies = await _context.Pharmacies.Include(x => x.Cars).SingleOrDefaultAsync(x => x.Id == car.PharmacyId && x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (pharmacies == null)
            {
                return NotFound();
            }

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                car.Id,
                car.Number,
                car.AmountPlaces,
                car.State
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            var car = await _context.Cars.SingleOrDefaultAsync(x => x.Id == id && x.Pharmacy.UserId.ToString() == HttpContext.User.Identity.Name);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
