﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace api2
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore()
                .AddAuthorization()
                .AddJsonFormatters();

            services.AddCors();

            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.RequireHttpsMetadata = false;
                    
                    options.ApiName = "api2";
                });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseAuthentication();
            app.UseCors(policy => policy.AllowAnyOrigin()
                                       .AllowAnyHeader()
                                       .AllowAnyMethod());
            app.UseMvc();
        }
    }
}