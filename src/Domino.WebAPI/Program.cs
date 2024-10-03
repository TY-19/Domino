using Domino.Application.Interfaces;
using Domino.Application.Services;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;

namespace Domino.WebAPI;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddElectron();
        builder.WebHost.UseElectron(args);

        builder.Services.AddMemoryCache();
        builder.Services.AddCors(options => {
            options.AddPolicy(name: "FreeCorsPolicy", cfg =>
                {
                    cfg.AllowAnyHeader();
                    cfg.AllowAnyMethod();
                    cfg.WithOrigins("*");
                });
        });
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options => {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Domino", Version = "v1" });
        });
        builder.Services.AddControllers();
        builder.Services.AddScoped<IGameService, GameService>();
        builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
        builder.Services.AddSerilog(options => {
            options.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning);
            options.ReadFrom.Configuration(builder.Configuration);
            options.WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Debug);
        });

        var app = builder.Build();

        app.UseSerilogRequestLogging();
        
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseCors("FreeCorsPolicy");
        app.UseStaticFiles();

        if(!HybridSupport.IsElectronActive)
        {
            app.UseHttpsRedirection();
        }
        
        app.MapGet("/api/test", () => new { result = "Succeeded" });
        app.MapGet("", () => Results.Redirect("index.html"));
        
        app.MapControllers();
        app.MapFallbackToFile("index.html");

        await app.StartAsync();
        if (HybridSupport.IsElectronActive)
        {
            var browserWindow = await Electron.WindowManager
                .CreateWindowAsync(new BrowserWindowOptions
                {
                    Width = 820,
                    Height = 420,
                    Show = false
                });
            await Task.Run(async () => await browserWindow.WebContents.Session.ClearCacheAsync());

            browserWindow.OnReadyToShow += () => browserWindow.Show();
            browserWindow.SetTitle("Domino");
        }
        app.WaitForShutdown();
    }
}
