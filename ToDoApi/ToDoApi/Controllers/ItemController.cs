using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemModel>>> GetToDoItems()
        {
            return await _context.ToDoItems.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemModel>> GetItemModel(int id)
        {
            var ItemModel = await _context.ToDoItems.FindAsync(id);

            if (ItemModel == null)
            {
                return NotFound();
            }

            return ItemModel;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemModel(int id, ItemModel ItemModel)
        {
            if (id != ItemModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(ItemModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemModelExists(id))
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

        [HttpPost]
        public async Task<ActionResult<ItemModel>> PostItemModel(ItemModel ItemModel)
        {
            _context.ToDoItems.Add(ItemModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemModel", new { id = ItemModel.Id }, ItemModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemModel(int id)
        {
            var ItemModel = await _context.ToDoItems.FindAsync(id);
            if (ItemModel == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(ItemModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemModelExists(int id)
        {
            return _context.ToDoItems.Any(e => e.Id == id);
        }
    }
}
