using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace TodoApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        
        public static void SeedData(IHost host)
        {
            var services = host.Services;
            using var scope = services.CreateScope();
            var sp = scope.ServiceProvider;
            var context = sp.GetRequiredService<TodoContext>();
            if (!context.Todos.Any())
            {
                var todos = SetInitialTodoItems();
                context.Todos.AddRange(todos);
                context.SaveChanges();
            }
        }
        
        public static List<TodoItem> SetInitialTodoItems()
        {
            return new List<TodoItem>()
            {
                new TodoItem()
                {
                    Content = "Send an email to Alice at 6:00",
                    Finished = false,
                    Top = false,
                },
                new TodoItem()
                {
                    Content = "Connect with Bob to discuss the website",
                    Finished = true,
                    Top = false,
                },
                new TodoItem()
                {
                    Content = "Make a report of the meeting",
                    Finished = false,
                    Top = true,
                },
            };
        }
    }
}
