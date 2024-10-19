using System.Reflection;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Domino.Application.Behaviors;

public class LoggingBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;
    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
         _logger.LogInformation("Handling {requestName}", typeof(TRequest).Name);
        // Type type = request.GetType();
        // List<PropertyInfo> properties = new(type.GetProperties());
        // foreach (PropertyInfo property in properties)
        // {
        //     object? propertyValue = property.GetValue(request, null);
        //     _logger.LogInformation("{Property} : {@Value}", property.Name, propertyValue);
        // }
        var response = await next();
        _logger.LogInformation("Handled {responseName}", typeof(TRequest).Name);
        return response;
    }
}
