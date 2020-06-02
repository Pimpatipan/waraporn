using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using WarapornSalapao.Resources;

namespace WarapornSalapao
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public static string AllowOrigin = "_allowOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(365);
                options.Cookie.Expiration = TimeSpan.FromDays(365); 
                options.SlidingExpiration = true;
                options.Cookie.SameSite = SameSiteMode.None;
            });

            services.AddLocalization();

            services.Configure<RequestLocalizationOptions>(options =>
            {
                CultureInfo[] supportedCultures = new[]
                {
                    new CultureInfo("th"),
                    new CultureInfo("en")
                };

                options.DefaultRequestCulture = new RequestCulture("th");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders = new List<IRequestCultureProvider>
                {
                       new QueryStringRequestCultureProvider(),
                       new CookieRequestCultureProvider()
                };
            });
            services.AddCors(options =>
            {
                //options.AddPolicy("AllowOrigin", policy => policy.AllowAnyOrigin());
                options.AddPolicy(AllowOrigin,
                builder =>
                {
                    builder.WithOrigins("http://npi-pipe.com/")
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod();
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                         .AllowCredentials()
                        .AllowAnyMethod();
                });

            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IStringLocalizer<Resource> stringLocalizer)
        {
            SharedResource._localizer = stringLocalizer;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/ErrorPage");
                app.UseHsts();
            }

            app.UseRequestLocalization();

            app.UseStatusCodePagesWithReExecute("/Home/ErrorPage/{0}");

            app.UseHttpsRedirection();
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = context =>
                {
                    context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
                    context.Context.Response.Headers.Add("Expires", "-1");
                }
            });
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",    
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }
    }
}
