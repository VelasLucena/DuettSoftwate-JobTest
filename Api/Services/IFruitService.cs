using Api.Models;

namespace Api.Services
{
    public interface IFruitService
    {
        Task<List<FruitModel>> GetFruits();

        Task<FruitModel> GetFruitById(int id);

        Task<List<FruitModel>> GetFruitsByName(string name);

        Task CreateFruit(FruitModel fruit);

        Task UpdateFruit(FruitModel fruit);

        Task DeleteFruit(FruitModel fruit);
    }
}
