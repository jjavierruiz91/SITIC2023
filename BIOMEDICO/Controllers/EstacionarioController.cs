using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class EstacionarioController : Controller
    {
        // GET: Estacionario
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaInformeEstacionario()
        {
            return View();
        }
        public struct ObjEstacionario
        {
            public Estacionario EstacionarioSport { get; set; }

        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }

        }
        [HttpGet]
        public JsonResult GetListEstacionario()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {

                var EstacionarioSport = db.Estacionario.ToList();
                foreach (var item in EstacionarioSport)
                {

                }

                ret.objeto = EstacionarioSport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }
            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            //return Json(ret, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult BuscarCedulaPass(long Identificacion)
        {
            var DatosInformeEstacionario = new Estacionario();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosInformeEstacionario = db.Estacionario.FirstOrDefault(w => w.NumeroIdentificacionEstacionario == Identificacion);
            }
            return Json(DatosInformeEstacionario, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult BuscarCitas(long Ducumento)
        {
            Respuesta respuesta = new Respuesta();

            var DatosInformeEstacionario = new Estacionario();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                try
                {
                    DatosInformeEstacionario = db.Estacionario.FirstOrDefault(w => w.NumeroIdentificacionEstacionario == Ducumento);
                    if (DatosInformeEstacionario == null)
                    {
                        respuesta.Error = false;
                        respuesta.mensaje = "No existe el registro";
                    }
                    else
                    {
                        respuesta.Error = false;
                        respuesta.objeto = DatosInformeEstacionario;
                    }
                }
                catch (Exception ex)
                {
                    respuesta.mensaje = ex.Message;
                    respuesta.Error = true;
                }

            }
            return Json(respuesta, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Agregar(bool ViewFree = false)
        {
            ViewBag.ViewFree = ViewFree;
            return View();

        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Agregar(ObjEstacionario a)
        {
            Respuesta Retorno = new Respuesta();

            if (!ModelState.IsValid)
                Retorno.mensaje = "Datos invalidos";



            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {

                    //a.PoliticaSocialsport.FechaRegistro = DateTime.Now;
                    db.Estacionario.Add(a.EstacionarioSport);
                    db.SaveChanges();
                    Retorno.Error = false;
                    Retorno.mensaje = "Oficina Trabajadores Estacionarios.! ";


                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Debes completar todos los registros del formulario!";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult EditarPoliticaSocial(bool ViewFree = false)
        {
            ViewBag.ViewFree = ViewFree;
            return View();

        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult EditarPoliticaSocial(ObjEstacionario a)
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
                        var PoliticaSocialExiste = db.Estacionario.FirstOrDefault(w => w.IdEstacionario == a.EstacionarioSport.IdEstacionario);
                        if (PoliticaSocialExiste != null)
                        {

                            //PoliticaSocialExiste.IdPoliticaSocial = a.PoliticaSocialsport.IdPoliticaSocial;
                            //PoliticaSocialExiste.NombresPolitica = a.PoliticaSocialsport.NombresPolitica;
                            //PoliticaSocialExiste.ApellidosPolitica = a.PoliticaSocialsport.ApellidosPolitica;
                            //PoliticaSocialExiste.FechaNacimiento = a.PoliticaSocialsport.FechaNacimiento;
                            //PoliticaSocialExiste.EdadPolitica = a.PoliticaSocialsport.EdadPolitica;
                            //PoliticaSocialExiste.TipoDocumento = a.PoliticaSocialsport.TipoDocumento;
                            //PoliticaSocialExiste.NumeroDocumento = a.PoliticaSocialsport.NumeroDocumento;
                            //PoliticaSocialExiste.SexoNacimiento = a.PoliticaSocialsport.SexoNacimiento;
                            //PoliticaSocialExiste.IdentidadGenero = a.PoliticaSocialsport.IdentidadGenero;
                            //PoliticaSocialExiste.OrientacionSexual = a.PoliticaSocialsport.OrientacionSexual;
                            //PoliticaSocialExiste.Discapacidad = a.PoliticaSocialsport.Discapacidad;
                            //PoliticaSocialExiste.GrupoEtnico = a.PoliticaSocialsport.GrupoEtnico;
                            //PoliticaSocialExiste.VictimaConflictoArmado = a.PoliticaSocialsport.VictimaConflictoArmado;
                            //PoliticaSocialExiste.PoblacionPriorizada = a.PoliticaSocialsport.PoblacionPriorizada;
                            //PoliticaSocialExiste.CorreoElectronico = a.PoliticaSocialsport.CorreoElectronico;
                            //PoliticaSocialExiste.TelefonoContacto = a.PoliticaSocialsport.TelefonoContacto;
                            //PoliticaSocialExiste.Municipios = a.PoliticaSocialsport.Municipios;
                            //PoliticaSocialExiste.Zona = a.PoliticaSocialsport.Zona;
                            //PoliticaSocialExiste.NivelEscolaridad = a.PoliticaSocialsport.NivelEscolaridad;
                            //PoliticaSocialExiste.Profesion = a.PoliticaSocialsport.Profesion;
                            //PoliticaSocialExiste.AmbienteLudico = a.PoliticaSocialsport.AmbienteLudico;
                            //PoliticaSocialExiste.AmbienteLudicoExpresa = a.PoliticaSocialsport.AmbienteLudicoExpresa;
                            //PoliticaSocialExiste.AmbienteLudicoCorporal = a.PoliticaSocialsport.AmbienteLudicoCorporal;
                            //PoliticaSocialExiste.FechaRegistro = DateTime.Now;



                        }

                        db.SaveChanges();

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
                Retorno.mensaje = "Error al agregar nutricionista";
            }
            return Json(Retorno);
        }

        [HttpGet]
        public JsonResult Eliminar(int IdPoliticaSocial)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var PoliticaSocialExiste = db.AmbulanteSemiestacionario.FirstOrDefault(w => w.IdAmbulanteSemiestacionario == IdPoliticaSocial);
                    if (PoliticaSocialExiste != null)
                    {
                    }

                    db.AmbulanteSemiestacionario.Remove(PoliticaSocialExiste);
                    db.SaveChanges();
                    respuesta.Error = false;

                }
                catch (Exception ex)
                {
                    respuesta.mensaje = ex.Message;
                    respuesta.Error = true;
                }


            }

            return Json(respuesta, JsonRequestBehavior.AllowGet);
        }
    }
}