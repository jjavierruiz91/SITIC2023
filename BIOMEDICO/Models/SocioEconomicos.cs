//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BIOMEDICO.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class SocioEconomicos
    {
        public int IdSocioEconomicos { get; set; }
        public string ActividadEconomicaEconomico { get; set; }
        public string TipoVivienda { get; set; }
        public string DireccionOcupacion { get; set; }
        public string Energia { get; set; }
        public string Acueducto { get; set; }
        public string Alcantarillado { get; set; }
        public string TelefonoFijo { get; set; }
        public string TieneCelular { get; set; }
        public string ProductosVenta { get; set; }
        public string TiempoOficio { get; set; }
        public string JornadaLaborarl { get; set; }
        public Nullable<int> HorasTrabajo { get; set; }
        public Nullable<int> DiasSemanal { get; set; }
        public string IngesosMensuales { get; set; }
        public Nullable<int> IdSitic { get; set; }
    
        public virtual SiTic SiTic { get; set; }
    }
}
