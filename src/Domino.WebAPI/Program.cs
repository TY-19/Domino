using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.OpenApi.Models;

namespace Domino.WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddElectron();
            builder.WebHost.UseElectron(args);

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
            var app = builder.Build();
            
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
}