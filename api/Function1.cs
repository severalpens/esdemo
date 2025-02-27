using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace FunctionApp1
{
    public class Function1
    {
        private readonly ILogger<Function1> _logger;
        private readonly ScbContext _context;

        public Function1(ILogger<Function1> logger, ScbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [Function("Function1")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            List<Cluster> clusters = _context.Clusters.ToList();
            foreach (Cluster cluster in clusters)
            {
                _logger.LogInformation($"Cluster Name: {cluster.Name}");
            }
            return new OkObjectResult(clusters.FirstOrDefault()?.Name);
        }
    }
}
