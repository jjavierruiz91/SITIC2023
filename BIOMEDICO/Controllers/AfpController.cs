using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class AfpController : Controller
    {
        // GET: Afp
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaAfp()
        {
            return View();
        }
        public struct ObjAfp
        {
            public CodigoAFP AfpEncuesta { get; set; }

        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }

        }

        [HttpGet]
        public JsonResult GetListAfp()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var AfpEncuesta = db.CodigoAFP.ToList();
                foreach (var item in AfpEncuesta)
                {

                }

                ret.objeto = AfpEncuesta; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAfpById(int IdAfpEnc)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var AfpUpdate = db.CodigoAFP.FirstOrDefault(w => w.IdAfp == IdAfpEnc);
                if (AfpUpdate != null)
                {
                }


                ret.objeto = AfpUpdate;



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
        public JsonResult Agregar(ObjAfp a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {



                    db.CodigoAFP.Add(a.AfpEncuesta);
                    db.SaveChanges();


                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjAfp a)
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
                        var AfpExiste = db.CodigoAFP.FirstOrDefault(w => w.IdAfp == a.AfpEncuesta.IdAfp);
                        if (AfpExiste != null)
                        {

                            AfpExiste.IdAfp = a.AfpEncuesta.IdAfp;
                            AfpExiste.TipoAdministradora = a.AfpEncuesta.TipoAdministradora;
                            AfpExiste.Código = a.AfpEncuesta.Código;
                            AfpExiste.Administradora = a.AfpEncuesta.Administradora;
                         

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
                Retorno.mensaje = "Error al agregar ";
            }
            return Json(Retorno);
        }



    }
}

