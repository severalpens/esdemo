using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using FunctionApp1;
using Microsoft.EntityFrameworkCore;

var builder = FunctionsApplication.CreateBuilder(args);
builder.Configuration.AddUserSecrets<Program>();

string? connectionString = builder.Configuration.GetValue<string>("ConnectionStrings:ScbDatabase");


if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string for 'ScbDatabase' is not configured in user secrets.");
}

builder.Services.AddDbContext<ScbContext>(options =>
    options.UseSqlServer(connectionString));

builder.ConfigureFunctionsWebApplication();
builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();

builder.Build().Run();