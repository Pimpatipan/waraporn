using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarapornSalapao.Resources
{
    public static class SharedResource
    {
        public static IStringLocalizer _localizer { get; set; }

        public static string GetValue(string resourceKey)
        {
            return _localizer[resourceKey];
        }
    }

    public interface IResource
    {
    }
    public class Resource : IResource
    {
        private readonly IStringLocalizer _localizer;

        public Resource(IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
        }

        public string this[string index]
        {
            get
            {
                return _localizer[index];
            }
        }
    }

}
