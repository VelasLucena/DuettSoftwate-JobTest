using Api.Message;
using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using static Api.Models.MessageErrorEnum;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly IFruitService _fruitService;

        public MainController(IFruitService service)
        {
            _fruitService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<FruitModel>>> GetFruits()
        {
            try
            {
                List<FruitModel> listFruits = new List<FruitModel>();

                listFruits = await _fruitService.GetFruits();

                if (listFruits.FirstOrDefault() == null)
                    return NotFound(CodeMessage.MyErrorMessage(ApiMessage.EX0001));

                return Ok(listFruits);
            }
            catch 
            {
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpGet]
        public async Task<ActionResult<FruitModel>> GetFruitById([FromQuery] int id)
        {
            try
            {
                FruitModel fruit = new FruitModel();

                fruit = await _fruitService.GetFruitById(id);

                if (fruit == null)
                    return NotFound(CodeMessage.MyErrorMessage(ApiMessage.EX0003));

                return Ok(fruit);
            }
            catch 
            {
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FruitModel>>> GetFruitsByName([FromQuery] string fruitName)
        {
            try
            {
                List<FruitModel> listFruits = new List<FruitModel>();

                listFruits = await _fruitService.GetFruitsByName(fruitName);

                if (listFruits == null)
                    return NotFound(CodeMessage.MyErrorMessage(ApiMessage.EX0004));

                return Ok(listFruits);
            }
            catch 
            {               
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateFruit(FruitModel fruit)
        {
            try
            {
                await _fruitService.CreateFruit(fruit);

                return CreatedAtAction(nameof(GetFruitById), new { id = fruit.Id },fruit);
            }
            catch 
            {     
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpPut]
        public async Task<ActionResult> EditFruit(FruitModel fruit)
        {
            try
            {
                await _fruitService.UpdateFruit(fruit);

                return CreatedAtAction(nameof(GetFruitById), new { id = fruit.Id }, fruit);
            }
            catch 
            {
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteFruit([FromQuery] int id)
        {
            try
            {
                FruitModel fruit = new FruitModel();

                fruit = await _fruitService.GetFruitById(id);

                if (fruit == null)
                    return NotFound(CodeMessage.MyErrorMessage(ApiMessage.EX0003));

                await _fruitService.DeleteFruit(fruit);

                return Ok();

            }
            catch 
            {
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpGet]
        public async Task<ActionResult> DivisionValues(int id)
        {
            try
            {
                FruitModel fruit = new FruitModel();
                fruit = await _fruitService.GetFruitById(id);

                if (fruit == null)
                    return NotFound(CodeMessage.MyErrorMessage(ApiMessage.EX0003));

                double result = fruit.ValueA / fruit.ValueB;

                return Ok(result.ToString("F"));
            }
            catch
            {
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }

        [HttpGet]
        public async Task<ActionResult> MultiplicationValues(int id)
        {
            try
            {
                FruitModel fruit = new FruitModel();
                fruit = await _fruitService.GetFruitById(id);
                string teste = string.Empty;

                if (fruit == null)
                    return NotFound(CodeMessage.MyErrorMessage(ApiMessage.EX0003));

                double result = fruit.ValueA * fruit.ValueB;

                return Ok(result.ToString("F"));
            }
            catch
            {
                return BadRequest(CodeMessage.MyErrorMessage(ApiMessage.EX0002));
            }
        }
    }
}
