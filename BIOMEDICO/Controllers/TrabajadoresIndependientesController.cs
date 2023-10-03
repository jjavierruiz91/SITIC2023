using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class TrabajadoresIndependientesController : Controller
    {
        // GET: TrabajadoresIndependientes
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaTrabajadoresIndependientes()
        {
            return View();
        }
        public struct ObjEncuenstaTrabajadores
        {
            public SiTic SiticEncuestaTrabajadores { get; set; }
            public SocioDemograficos DemoEncuestaTrabajadores { get; set; }
            public SocioEconomicos EcoEncuestaTrabajadores { get; set; }
            public SeguridadSocial SocialEncuestaTrabajadores { get; set; }
            public EstiloVida VidaEncuestaTrabajadores { get; set; }
            public CondicionesSalud SaludEncuestaTrabajadores { get; set; }
            public CondicionesTrabajo TrabajoEncuestaTrabajadores { get; set; }



        }

        public struct Respuesta//esta es tu respuesta siempre
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }
            public int PageCurrent { get; set; }
            public int PageNext { get; set; }
            public int PageAll { get; set; }


        }

        [HttpGet]
        public JsonResult BuscarEncuestador(long Identificacion)
        {
            var DatosEncuesta = new SiTic();
            Respuesta Retorno = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
               db.Configuration.LazyLoadingEnabled= false;
                DatosEncuesta = db.SiTic.FirstOrDefault(w => w.NumeroIdentificacionEncuestado == Identificacion);
                if (DatosEncuesta != null)
                {
                    Retorno.Error = false;
                    Retorno.objeto = DatosEncuesta;
                }


                return Json(Retorno, JsonRequestBehavior.AllowGet);
            }
            
        }


        [HttpGet]
        public JsonResult GetListEncuestaTrabajadores(int? page, DateTime? Fechainicio = null, DateTime? Fechafin = null, string Municipio = null)
        //public JsonResult GetListEncuestaTrabajadores(int? page, DateTime? Fechainicio = null, DateTime? Fechafin = null, string Municipio = null)
        {
            Respuesta ret = new Respuesta();
            List<SiTic> SiticEncuestaTrabajadores = new List<SiTic>();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                db.Configuration.LazyLoadingEnabled = false;
                db.Configuration.ProxyCreationEnabled = false;

                //var SiticEncuestaTrabajadores = db.SiTic.ToList().OrderBy(o => o.IdSitic).ToList();

                if (Fechafin == null && Fechafin == null && Municipio == null)
                {
                    SiticEncuestaTrabajadores = db.SiTic.ToList().OrderByDescending(o => o.IdSitic).ToList();
                }
                else
                {
                    SiticEncuestaTrabajadores = db.SiTic.Where(P => (Fechainicio >= P.FechaEncuesta && Fechafin <= P.FechaEncuesta) || P.MunicipioEncuestador == Municipio).ToList().OrderByDescending(o => o.IdSitic).ToList();
                    
                }
                ret.PageAll = (int)Math.Ceiling((double)SiticEncuestaTrabajadores.Count / 500); ;
                ret.PageCurrent = (int) page;

                if ((int)page == ret.PageAll || ret.PageAll == 0)
                {
                    ret.PageNext = 0;
                }
                else
                {
                    ret.PageNext = (int)page + 1;
                }
                SiticEncuestaTrabajadores = SiticEncuestaTrabajadores.Page((int)page, 500).ToList();


                var SocioDemograficos = db.SocioDemograficos.ToList();
                var SocioEconomicos = db.SocioEconomicos.ToList();
                var SeguridadSocial = db.SeguridadSocial.ToList();
                var EstiloVida = db.EstiloVida.ToList();
                var CondicionesSalud = db.CondicionesSalud.ToList();
                var CondicionesTrabajo = db.CondicionesTrabajo.ToList();
                var i = 0;
                SiticEncuestaTrabajadores.ForEach(item =>
                {
                    i++;
                    item.SocioDemograficos = SocioDemograficos.Where(w => w.IdSitic == item.IdSitic).ToList();
                    item.SocioEconomicos = SocioEconomicos.Where(w => w.IdSitic == item.IdSitic).ToList();
                    item.SeguridadSocial = SeguridadSocial.Where(w => w.IdSitic == item.IdSitic).ToList();
                    item.EstiloVida = EstiloVida.Where(w => w.IdSitic == item.IdSitic).ToList();
                    item.CondicionesSalud = CondicionesSalud.Where(w => w.IdSitic == item.IdSitic).ToList();
                    item.CondicionesTrabajo = CondicionesTrabajo.Where(w => w.IdSitic == item.IdSitic).ToList();

                }
                );

                ret.objeto = SiticEncuestaTrabajadores.OrderByDescending(o => o.IdSitic); //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            //return Json(ret, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }


        [HttpGet]
        public JsonResult GetTrabjadoresIndependientesById(int IdEncTrabajadores)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                db.Configuration.LazyLoadingEnabled = false;
                db.Configuration.ProxyCreationEnabled = false;
                var EncuestaUpdate = db.SiTic.FirstOrDefault(w => w.IdSitic == IdEncTrabajadores);
                if (EncuestaUpdate != null)
                {
                    EncuestaUpdate.SocioDemograficos = db.SocioDemograficos.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                    EncuestaUpdate.SocioEconomicos = db.SocioEconomicos.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                    EncuestaUpdate.SeguridadSocial = db.SeguridadSocial.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                    EncuestaUpdate.EstiloVida = db.EstiloVida.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                    EncuestaUpdate.CondicionesSalud = db.CondicionesSalud.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                    EncuestaUpdate.CondicionesTrabajo = db.CondicionesTrabajo.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                }


                ret.objeto = EncuestaUpdate;



            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }



        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Agregar(ObjEncuenstaTrabajadores a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {


                    ////a.Depor = db.Deportistas.Where(w => w.CodRol == a.CodRol).FirstOrDefault();
                    //a.Deport.FechaCreacion = DateTime.Now;
                    //a.Deport.FechaServicio = DateTime.Now;

                    a.SiticEncuestaTrabajadores.FechaRegistro = DateTime.Now;
                    a.SiticEncuestaTrabajadores.UsuarioRegistro = Utilidades.ActiveUser.NomUsuario;

                    db.SiTic.Add(a.SiticEncuestaTrabajadores);
                    db.SaveChanges();
                    var Id = a.SiticEncuestaTrabajadores.IdSitic;

                    //ADD ID TO TABLE SOCIODEMOGRAFICA
                    a.DemoEncuestaTrabajadores.IdSitic = Id;
                    a.DemoEncuestaTrabajadores.SiTic = db.SiTic.FirstOrDefault(w => w.IdSitic == Id);


                    ////ADD ID TO TABLE SOCIOECONOMICO

                    a.EcoEncuestaTrabajadores.IdSitic = Id;
                    a.EcoEncuestaTrabajadores.SiTic = db.SiTic.FirstOrDefault(w => w.IdSitic == Id);

                    ////ADD ID TO TABLE SEGURIDAD SOCIAL

                    a.SocialEncuestaTrabajadores.IdSitic = Id;
                    a.SocialEncuestaTrabajadores.SiTic = db.SiTic.FirstOrDefault(w => w.IdSitic == Id);

                    ////ADD ID TO TABLE ESTILO VIDA

                    a.VidaEncuestaTrabajadores.IdSitic = Id;
                    a.VidaEncuestaTrabajadores.SiTic = db.SiTic.FirstOrDefault(w => w.IdSitic == Id);

                    // //ADD ID TO TABLE TRABAJO

                    a.SaludEncuestaTrabajadores.IdSitic = Id;
                    a.SaludEncuestaTrabajadores.SiTic = db.SiTic.FirstOrDefault(w => w.IdSitic == Id);

                    ////ADD ID TO TABLE CONDICIONES SALUD

                    a.TrabajoEncuestaTrabajadores.IdSitic = Id;
                    a.TrabajoEncuestaTrabajadores.SiTic = db.SiTic.FirstOrDefault(w => w.IdSitic == Id);




                    db.SocioDemograficos.Add(a.DemoEncuestaTrabajadores);
                    db.SocioEconomicos.Add(a.EcoEncuestaTrabajadores);
                    db.SeguridadSocial.Add(a.SocialEncuestaTrabajadores);
                    db.EstiloVida.Add(a.VidaEncuestaTrabajadores);
                    db.CondicionesSalud.Add(a.SaludEncuestaTrabajadores);
                    db.CondicionesTrabajo.Add(a.TrabajoEncuestaTrabajadores);
                    db.SaveChanges();

                    if (Id > 0)
                    {
                        Retorno.Error = false;
                        Retorno.mensaje = "Guardado";

                    }
                    else
                    {
                        Retorno.Error = true;
                        Retorno.mensaje = "No se pudo guardar";
                    }

                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Datos de encuesta incompletos. Por favor, verifíquelos.";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjEncuenstaTrabajadores a)
        {
            Respuesta Retorno = new Respuesta();
            //JsonConvert.DeserializeObject<List<ObjDeportista>>(a);
            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    
                    try
                    {
                        db.Configuration.LazyLoadingEnabled = false;
                        db.Configuration.ProxyCreationEnabled = false;
                        var SiticTrabajadoresExiste = db.SiTic.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                        if (SiticTrabajadoresExiste != null)
                        {

                            SiticTrabajadoresExiste.IdSitic = a.SiticEncuestaTrabajadores.IdSitic;
                            SiticTrabajadoresExiste.AfiliacionActualEncuestado = a.SiticEncuestaTrabajadores.AfiliacionActualEncuestado;
                            SiticTrabajadoresExiste.FechaEncuesta = a.SiticEncuestaTrabajadores.FechaEncuesta;
                            SiticTrabajadoresExiste.HoraInicioEncuesta = a.SiticEncuestaTrabajadores.HoraInicioEncuesta;
                            SiticTrabajadoresExiste.TipoDocumentoEncuestador = a.SiticEncuestaTrabajadores.TipoDocumentoEncuestador;
                            SiticTrabajadoresExiste.NumeroIdentificacionEncuestador = a.SiticEncuestaTrabajadores.NumeroIdentificacionEncuestador;
                            SiticTrabajadoresExiste.TrabajadoInformal = a.SiticEncuestaTrabajadores.TrabajadoInformal;
                            SiticTrabajadoresExiste.DepartamentoEncuestador = a.SiticEncuestaTrabajadores.DepartamentoEncuestador;
                            SiticTrabajadoresExiste.MunicipioEncuestador = a.SiticEncuestaTrabajadores.MunicipioEncuestador;
                            SiticTrabajadoresExiste.ClaseMunicipioEncuestador = a.SiticEncuestaTrabajadores.ClaseMunicipioEncuestador;
                            SiticTrabajadoresExiste.TipoDocumentoEncuestado = a.SiticEncuestaTrabajadores.TipoDocumentoEncuestado;
                            SiticTrabajadoresExiste.NumeroIdentificacionEncuestado = a.SiticEncuestaTrabajadores.NumeroIdentificacionEncuestado;
                            SiticTrabajadoresExiste.FechaNacimiento = a.SiticEncuestaTrabajadores.FechaNacimiento;
                            SiticTrabajadoresExiste.PrimerNombre = a.SiticEncuestaTrabajadores.PrimerNombre;
                            SiticTrabajadoresExiste.SegundoNombre = a.SiticEncuestaTrabajadores.SegundoNombre;
                            SiticTrabajadoresExiste.PrimerApellido = a.SiticEncuestaTrabajadores.PrimerApellido;
                            SiticTrabajadoresExiste.SegundoApellido = a.SiticEncuestaTrabajadores.SegundoApellido;
                            SiticTrabajadoresExiste.Direccion = a.SiticEncuestaTrabajadores.Direccion;
                            db.SaveChanges();


                            var SocioDemograficoExiste = db.SocioDemograficos.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                            if (SocioDemograficoExiste != null)
                            {
                                //SocioDemograficoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                SocioDemograficoExiste.Genero = a.DemoEncuestaTrabajadores.Genero;

                                SocioDemograficoExiste.EstadoCivil = a.DemoEncuestaTrabajadores.EstadoCivil;
                                SocioDemograficoExiste.NivelEscolar = a.DemoEncuestaTrabajadores.Genero;
                                SocioDemograficoExiste.OtroNivelEscolar = a.DemoEncuestaTrabajadores.OtroNivelEscolar;
                                SocioDemograficoExiste.AñosAprobados = a.DemoEncuestaTrabajadores.AñosAprobados;
                                SocioDemograficoExiste.CabezaFamilia = a.DemoEncuestaTrabajadores.CabezaFamilia;
                                SocioDemograficoExiste.EconomiaFamilia = a.DemoEncuestaTrabajadores.EconomiaFamilia;
                                SocioDemograficoExiste.DependenciaFamiliar = a.DemoEncuestaTrabajadores.DependenciaFamiliar;
                                SocioDemograficoExiste.DependenciaMenores = a.DemoEncuestaTrabajadores.DependenciaMenores;
                                SocioDemograficoExiste.TipoPoblacion = a.DemoEncuestaTrabajadores.TipoPoblacion;
                                //SocioDemograficoExiste.OtraPoblacion = a.DemoEncuestaTrabajadores.OtraPoblacion;
                                SocioDemograficoExiste.CondicionesTrabajo = a.DemoEncuestaTrabajadores.CondicionesTrabajo;
                                SocioDemograficoExiste.OcupacionActual = a.DemoEncuestaTrabajadores.OcupacionActual;
                                SocioDemograficoExiste.MotivoDesplazamiento = a.DemoEncuestaTrabajadores.MotivoDesplazamiento;
                                //SocioDemograficoExiste.OtroDesplazamiento = a.DemoEncuestaTrabajadores.OtroDesplazamiento;
                                SocioDemograficoExiste.IdSitic = SiticTrabajadoresExiste.IdSitic;
                                SocioDemograficoExiste.SiTic = SiticTrabajadoresExiste;
                                db.SaveChanges();



                            }

                            var SocioEconomicoExiste = db.SocioEconomicos.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                            if (SocioEconomicoExiste != null)
                            {
                                //SocioDemograficoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                SocioEconomicoExiste.ActividadEconomicaEconomico = a.EcoEncuestaTrabajadores.ActividadEconomicaEconomico;
                                //SocioEconomicoExiste.CualActividadEconomica = a.EcoEncuestaTrabajadores.CualActividadEconomica;
                                SocioEconomicoExiste.TipoVivienda = a.EcoEncuestaTrabajadores.TipoVivienda;
                                SocioEconomicoExiste.DireccionOcupacion = a.EcoEncuestaTrabajadores.DireccionOcupacion;
                                SocioEconomicoExiste.Energia = a.EcoEncuestaTrabajadores.Energia;
                                SocioEconomicoExiste.Acueducto = a.EcoEncuestaTrabajadores.Acueducto;
                                SocioEconomicoExiste.Alcantarillado = a.EcoEncuestaTrabajadores.Alcantarillado;
                                SocioEconomicoExiste.TelefonoFijo = a.EcoEncuestaTrabajadores.TelefonoFijo;
                                SocioEconomicoExiste.TieneCelular = a.EcoEncuestaTrabajadores.TieneCelular;
                                SocioEconomicoExiste.ProductosVenta = a.EcoEncuestaTrabajadores.ProductosVenta;
                                SocioEconomicoExiste.TiempoOficio = a.EcoEncuestaTrabajadores.TiempoOficio;
                                SocioEconomicoExiste.JornadaLaborarl = a.EcoEncuestaTrabajadores.JornadaLaborarl;
                                SocioEconomicoExiste.HorasTrabajo = a.EcoEncuestaTrabajadores.HorasTrabajo;
                                SocioEconomicoExiste.DiasSemanal = a.EcoEncuestaTrabajadores.DiasSemanal;
                                SocioEconomicoExiste.IngesosMensuales = a.EcoEncuestaTrabajadores.IngesosMensuales;
                                SocioEconomicoExiste.IdSitic = SiticTrabajadoresExiste.IdSitic;
                                SocioEconomicoExiste.SiTic = SiticTrabajadoresExiste;
                                db.SaveChanges();



                            }
                            var SeguridadSocialExiste = db.SeguridadSocial.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                            if (SeguridadSocialExiste != null)
                            {
                                //SeguridadSocialExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                SeguridadSocialExiste.AfiliadoSeguridad = a.SocialEncuestaTrabajadores.AfiliadoSeguridad;
                                SeguridadSocialExiste.RegimenAfiliado = a.SocialEncuestaTrabajadores.RegimenAfiliado;
                                SeguridadSocialExiste.RegimenSalud = a.SocialEncuestaTrabajadores.RegimenSalud;
                                SeguridadSocialExiste.EpsAfiliado = a.SocialEncuestaTrabajadores.EpsAfiliado;
                                SeguridadSocialExiste.Pensiones = a.SocialEncuestaTrabajadores.Pensiones;
                                SeguridadSocialExiste.Afp = a.SocialEncuestaTrabajadores.Afp;
                                SeguridadSocialExiste.IdSitic = SiticTrabajadoresExiste.IdSitic;
                                SeguridadSocialExiste.SiTic = SiticTrabajadoresExiste;
                                db.SaveChanges();



                            }


                            var EstiloVidaExiste = db.EstiloVida.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                            if (EstiloVidaExiste != null)
                            {
                                //SocioDemograficoDepoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                EstiloVidaExiste.Peso = a.VidaEncuestaTrabajadores.Peso;
                                EstiloVidaExiste.Estatura = a.VidaEncuestaTrabajadores.Estatura;
                                EstiloVidaExiste.ActividadFisica = a.VidaEncuestaTrabajadores.ActividadFisica;
                                EstiloVidaExiste.DiasSemana = a.VidaEncuestaTrabajadores.DiasSemana;
                                EstiloVidaExiste.HorasPractica = a.VidaEncuestaTrabajadores.HorasPractica;
                                EstiloVidaExiste.EncuestadoFuma = a.VidaEncuestaTrabajadores.EncuestadoFuma;
                                EstiloVidaExiste.ConsumeLicor = a.VidaEncuestaTrabajadores.ConsumeLicor;
                                EstiloVidaExiste.SustanciasPsicoactivas = a.VidaEncuestaTrabajadores.SustanciasPsicoactivas;
                                EstiloVidaExiste.DietaFrutas = a.VidaEncuestaTrabajadores.DietaFrutas;
                                EstiloVidaExiste.FrecuenciaFrutas = a.VidaEncuestaTrabajadores.FrecuenciaFrutas;
                                EstiloVidaExiste.IdSitic = SiticTrabajadoresExiste.IdSitic;
                                EstiloVidaExiste.SiTic = SiticTrabajadoresExiste;
                                db.SaveChanges();



                            }
                            var CondicionesSaludExiste = db.CondicionesSalud.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                            if (CondicionesSaludExiste != null)
                            {
                                //CondicionesSaludExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                CondicionesSaludExiste.EstadoSalud = a.SaludEncuestaTrabajadores.EstadoSalud;
                                CondicionesSaludExiste.SaludFisica = a.SaludEncuestaTrabajadores.SaludFisica;
                                CondicionesSaludExiste.SaludMental = a.SaludEncuestaTrabajadores.SaludMental;
                                CondicionesSaludExiste.SaludPsicologica = a.SaludEncuestaTrabajadores.SaludPsicologica;
                                CondicionesSaludExiste.ActividadNormalFisica = a.SaludEncuestaTrabajadores.ActividadNormalFisica;
                                CondicionesSaludExiste.CausaActividadFisica = a.SaludEncuestaTrabajadores.CausaActividadFisica;
                                CondicionesSaludExiste.AccidenteLaborar = a.SaludEncuestaTrabajadores.AccidenteLaborar;
                                CondicionesSaludExiste.AccidenteOrigen = a.SaludEncuestaTrabajadores.AccidenteOrigen;
                                CondicionesSaludExiste.AccidneteTrabajoActividad = a.SaludEncuestaTrabajadores.AccidneteTrabajoActividad;
                                CondicionesSaludExiste.EnfermedadOrigen = a.SaludEncuestaTrabajadores.EnfermedadOrigen;
                                CondicionesSaludExiste.EnfermedadOrigenOcupacional = a.SaludEncuestaTrabajadores.EnfermedadOrigenOcupacional;
                                CondicionesSaludExiste.LesionesOcurridad = a.SaludEncuestaTrabajadores.LesionesOcurridad;
                                CondicionesSaludExiste.ParteCuerpoLesion = a.SaludEncuestaTrabajadores.ParteCuerpoLesion;
                                CondicionesSaludExiste.AgenteAccidente = a.SaludEncuestaTrabajadores.AgenteAccidente;
                                CondicionesSaludExiste.MecanismoAccidente = a.SaludEncuestaTrabajadores.MecanismoAccidente;
                                CondicionesSaludExiste.InformoAccidente = a.SaludEncuestaTrabajadores.InformoAccidente;
                                CondicionesSaludExiste.NoInformoAccidente = a.SaludEncuestaTrabajadores.NoInformoAccidente;
                                CondicionesSaludExiste.ActorInformoAccidente = a.SaludEncuestaTrabajadores.ActorInformoAccidente;
                                CondicionesSaludExiste.IncapacidadAccidente = a.SaludEncuestaTrabajadores.IncapacidadAccidente;
                                CondicionesSaludExiste.CostosAccidente = a.SaludEncuestaTrabajadores.CostosAccidente;
                                CondicionesSaludExiste.TramiteEnfermedad = a.SaludEncuestaTrabajadores.TramiteEnfermedad;
                                CondicionesSaludExiste.EnfermedadDiagnosticada = a.SaludEncuestaTrabajadores.EnfermedadDiagnosticada;
                                CondicionesSaludExiste.CausaDiscapacidad = a.SaludEncuestaTrabajadores.CausaDiscapacidad;
                                CondicionesSaludExiste.TipoDiscapacidad = a.SaludEncuestaTrabajadores.TipoDiscapacidad;
                                CondicionesSaludExiste.IdSitic = SiticTrabajadoresExiste.IdSitic;
                                CondicionesSaludExiste.SiTic = SiticTrabajadoresExiste;
                                db.SaveChanges();



                            }
                            var CondicionesTrabajoExiste = db.CondicionesTrabajo.FirstOrDefault(w => w.IdSitic == a.SiticEncuestaTrabajadores.IdSitic);
                            if (CondicionesTrabajoExiste != null)
                            {
                                //CondicionesTrabajoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                CondicionesTrabajoExiste.CondicionTrabajo = a.TrabajoEncuestaTrabajadores.CondicionTrabajo;
                                CondicionesTrabajoExiste.PeligrosFisico = a.TrabajoEncuestaTrabajadores.PeligrosFisico;
                                CondicionesTrabajoExiste.PeligrosPsicosocial = a.TrabajoEncuestaTrabajadores.PeligrosPsicosocial;
                                CondicionesTrabajoExiste.Peligrosbiologico = a.TrabajoEncuestaTrabajadores.Peligrosbiologico;
                                CondicionesTrabajoExiste.CondicionesSeguridad = a.TrabajoEncuestaTrabajadores.CondicionesSeguridad;
                                CondicionesTrabajoExiste.PeligrosBiomecanicos = a.TrabajoEncuestaTrabajadores.PeligrosBiomecanicos;
                                CondicionesTrabajoExiste.PeligrosQuimicos = a.TrabajoEncuestaTrabajadores.PeligrosQuimicos;
                                CondicionesTrabajoExiste.FenomenosNatural = a.TrabajoEncuestaTrabajadores.FenomenosNatural;
                                CondicionesTrabajoExiste.ElementosProteccion = a.TrabajoEncuestaTrabajadores.ElementosProteccion;
                                CondicionesTrabajoExiste.ProteccionCabeza = a.TrabajoEncuestaTrabajadores.ProteccionCabeza;
                                CondicionesTrabajoExiste.ProteccionOcular = a.TrabajoEncuestaTrabajadores.ProteccionOcular;
                                CondicionesTrabajoExiste.ProteccionAuditiva = a.TrabajoEncuestaTrabajadores.ProteccionAuditiva;
                                CondicionesTrabajoExiste.ProteccionRespiratoria = a.TrabajoEncuestaTrabajadores.ProteccionRespiratoria;
                                CondicionesTrabajoExiste.ExtremidadesSuperiores = a.TrabajoEncuestaTrabajadores.ExtremidadesSuperiores;
                                CondicionesTrabajoExiste.ExtremidadesInferiores = a.TrabajoEncuestaTrabajadores.ExtremidadesInferiores;
                                CondicionesTrabajoExiste.OtrosElementos = a.TrabajoEncuestaTrabajadores.OtrosElementos;
                                CondicionesTrabajoExiste.RopaTrabajo = a.TrabajoEncuestaTrabajadores.RopaTrabajo;
                                CondicionesTrabajoExiste.EmergenciaEncuestado = a.TrabajoEncuestaTrabajadores.EmergenciaEncuestado;
                                CondicionesTrabajoExiste.CasoEmergencia = a.TrabajoEncuestaTrabajadores.CasoEmergencia;
                                CondicionesTrabajoExiste.Extintores = a.TrabajoEncuestaTrabajadores.Extintores;
                                CondicionesTrabajoExiste.Botiquin = a.TrabajoEncuestaTrabajadores.Botiquin;
                                CondicionesTrabajoExiste.RutaEvacuacion = a.TrabajoEncuestaTrabajadores.RutaEvacuacion;
                                CondicionesTrabajoExiste.SalidaEmergencia = a.TrabajoEncuestaTrabajadores.SalidaEmergencia;
                                CondicionesTrabajoExiste.LugarCasoEmergencia = a.TrabajoEncuestaTrabajadores.LugarCasoEmergencia;
                                CondicionesTrabajoExiste.AguaPotable = a.TrabajoEncuestaTrabajadores.AguaPotable;
                                CondicionesTrabajoExiste.RecoleccionResiduos = a.TrabajoEncuestaTrabajadores.RecoleccionResiduos;
                                CondicionesTrabajoExiste.NombreEncuestado = a.TrabajoEncuestaTrabajadores.NombreEncuestado;
                                CondicionesTrabajoExiste.CedulaEncuestado = a.TrabajoEncuestaTrabajadores.CedulaEncuestado;
                                CondicionesTrabajoExiste.Firma = a.TrabajoEncuestaTrabajadores.Firma;
                                CondicionesTrabajoExiste.IdSitic = SiticTrabajadoresExiste.IdSitic;
                                CondicionesTrabajoExiste.SiTic = SiticTrabajadoresExiste;
                                db.SaveChanges();


                            }

                        }

                        Retorno.Error = false;
                        Retorno.mensaje = "Actualizado";


                    }
                    catch (Exception ex)
                    {
                        Retorno.Error = true;
                        Retorno.mensaje = "Error al Actualizar";
                    }




                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar ";
            }
            return Json(Retorno);
        }


        public static List<SiTic> listaSiticFechas()
        {
            List<SiTic> listaSiticFechas = new List<SiTic>();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                listaSiticFechas = db.SiTic.ToList().OrderBy(o => o.FechaEncuesta).DistinctBy(w => w.FechaEncuesta).ToList();

            }

            return listaSiticFechas;
        }

        public static List<SiTic> listaSiticDepartamento()
        {
            List<SiTic> listaSiticDepartamento = new List<SiTic>();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                listaSiticDepartamento = db.SiTic.ToList().OrderByDescending(o => o.IdSitic).DistinctBy(w => w.MunicipioEncuestador).ToList();

            }

            return listaSiticDepartamento;
        }

        [HttpGet]
        public JsonResult GetListEncuestaTrabajadoresFilter(int page, DateTime Fechainicio, DateTime Fechafin, string Municipio)
        {
            Respuesta ret = new Respuesta();
            string result = "";
            try
            {
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    //var SiticEncuestaTrabajadores = db.SiTic.ToList().OrderBy(o => o.IdSitic).ToList();
                    var SiticEncuestaTrabajadores = db.SiTic.Where(P => (Fechainicio >= P.FechaEncuesta && Fechafin <= P.FechaEncuesta) || P.MunicipioEncuestador == Municipio).ToList().OrderByDescending(o => o.IdSitic).ToList();
                    ret.PageAll = (int)Math.Ceiling((double)SiticEncuestaTrabajadores.Count / 500); ;
                    ret.PageCurrent = page;

                    if (page == ret.PageAll || ret.PageAll == 0)
                    {
                        ret.PageNext = 0;
                    }
                    else
                    {
                        ret.PageNext = page + 1;
                    }
                    SiticEncuestaTrabajadores = SiticEncuestaTrabajadores.Page(page, 500).ToList();


                    var SocioDemograficos = db.SocioDemograficos.ToList();
                    var SocioEconomicos = db.SocioEconomicos.ToList();
                    var SeguridadSocial = db.SeguridadSocial.ToList();
                    var EstiloVida = db.EstiloVida.ToList();
                    var CondicionesSalud = db.CondicionesSalud.ToList();
                    var CondicionesTrabajo = db.CondicionesTrabajo.ToList();
                    var i = 0;
                    SiticEncuestaTrabajadores.ForEach(item =>
                    {
                        i++;
                        item.SocioDemograficos = SocioDemograficos.Where(w => w.IdSitic == item.IdSitic).ToList();
                        item.SocioEconomicos = SocioEconomicos.Where(w => w.IdSitic == item.IdSitic).ToList();
                        item.SeguridadSocial = SeguridadSocial.Where(w => w.IdSitic == item.IdSitic).ToList();
                        item.EstiloVida = EstiloVida.Where(w => w.IdSitic == item.IdSitic).ToList();
                        item.CondicionesSalud = CondicionesSalud.Where(w => w.IdSitic == item.IdSitic).ToList();
                        item.CondicionesTrabajo = CondicionesTrabajo.Where(w => w.IdSitic == item.IdSitic).ToList();

                    }
                    );

                    ret.objeto = SiticEncuestaTrabajadores.OrderByDescending(o => o.IdSitic); //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                    //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                    //new JsonSerializerSettings
                    //{
                    //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    //});
                    ret.Error = false;

                }
            }
            catch (Exception ex)
            {
                Utilidades.WriteExceptionLog(ex, "log");
                ret.mensaje = "Error en la solicitud";
                ret.Error = true;
            }




            //return Json(ret, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}