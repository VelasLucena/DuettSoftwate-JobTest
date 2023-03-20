using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class FruitService : IFruitService
    {
        private readonly ApplicationDbContext _context;

        public FruitService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateFruit(FruitModel fruit)
        {
            _context.Fruit.Add(fruit);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFruit(FruitModel fruit)
        {
            _context.Fruit.Remove(fruit);
            await _context.SaveChangesAsync();
        }

        public async Task<FruitModel> GetFruitById(int id)
        {
            FruitModel fruit = new FruitModel();
            fruit = await _context.Fruit.FindAsync(id);
            return fruit;
        }

        public async Task<List<FruitModel>> GetFruits()
        {
            List<FruitModel> listFruits = new List<FruitModel>();
            listFruits = await _context.Fruit.ToListAsync();
            return listFruits;
        }

        public async Task<List<FruitModel>> GetFruitsByName(string name)
        {
            List<FruitModel> listFruits = new List<FruitModel>();

            if (!string.IsNullOrEmpty(name))
            {
                listFruits = await _context.Fruit.Where(x => x.Name.Contains(name)).ToListAsync();
            }
            else
                return null;

            return listFruits;
        }

        public async Task UpdateFruit(FruitModel fruit)
        {
            _context.Fruit.Update(fruit);
            await _context.SaveChangesAsync();
        }
    }
}
