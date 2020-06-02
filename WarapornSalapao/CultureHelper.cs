using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace WarapornSalapao
{
    public class CultureHelper
    {
        public static string GetCulture()
        {
            var cultureName = CultureInfo.CurrentCulture.TwoLetterISOLanguageName.ToUpper();
            if (cultureName == "TH")
            {
                cultureName = "TH";
            }
            return cultureName;
        }
    }
}
