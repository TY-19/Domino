using Domino.AITournament.Interfaces;
using Domino.AITournament.Services;
using Domino.Application;
using Domino.Application.Exceptions;
using Domino.Application.Interfaces;
using Domino.Application.Services;
using Domino.Application.Strategies;
using Domino.Application.Validators;
using Domino.Infrastructure.Repositories;
using Domino.WebAPI.Common;
using ElectronNET.API;
using ElectronNET.API.Entities;
using FluentValidation;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

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

        builder.Services.AddValidatorsFromAssemblyContaining<PlayerCreateDtoValidator>();
        builder.Services.AddFluentValidationAutoValidation();


        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options => {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Domino", Version = "v1" });
        });
        builder.Services.AddControllers();
        builder.Services.AddScoped<TournamentService>();
        builder.Services.AddScoped<AIGameService>();
        builder.Services.AddScoped<IGameRepository, GameRepository>();
        builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
        builder.Services.AddScoped<IEngineRepository, EngineRepository>();
        builder.Services.AddScoped<IGameService, GameService>();
        builder.Services.AddScoped<IPlayerService, PlayerService>();
        builder.Services.AddScoped<IStrategyFactory, StrategyFactory>();
        builder.Services.AddSerilog(options => {
            options.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning);
            options.ReadFrom.Configuration(builder.Configuration);
            options.Filter.ByExcluding(ev => ev.Exception is GameException);
            options.WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Debug);
        });

        builder.Services.AddApplicationServices();
        builder.Services.AddExceptionHandler<GameExceptionHandler>();

        var app = builder.Build();

        app.UseSerilogRequestLogging();
        
        app.UseExceptionHandler(_ => {});

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
                    Width = 1920,
                    Height = 1080,
                    Show = false
                });
            await Task.Run(async () => await browserWindow.WebContents.Session.ClearCacheAsync());

            browserWindow.OnReadyToShow += () => browserWindow.Show();
            browserWindow.SetTitle("Domino");
        }
        app.WaitForShutdown();
    }
}
