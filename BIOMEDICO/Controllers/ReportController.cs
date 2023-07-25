using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BIOMEDICO.Models;

namespace BIOMEDICO.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult Index()
        {
            //try
            //{
                //geting repot data from the business object
                string Id = (Request.QueryString["Id"] != null ? Request.QueryString["Id"] : "0");
                int IdUser = (Request.QueryString["IdUser"] != null ? int.Parse(Request.QueryString["IdUser"]) : 0);
                string tipo = Request.QueryString["tipo"] != null ? Request.QueryString["tipo"] : "";
                string Opcion = Request.QueryString["Opcion"] != null ? Request.QueryString["Opcion"] : "";
                Boolean View = Request.QueryString["View"] != null ? true : false;
                Core Core = new Core();
                var reportViewModel = Core.LlenarReporte(tipo, Id, IdUser, Opcion);

            reportViewModel.ViewAsAttachment = View;

            var renderedBytes = reportViewModel.RenderReport();

                if (reportViewModel.ViewAsAttachment)
                    Response.AddHeader("content-disposition", reportViewModel.ReporExportFileName);
                return File(renderedBytes, reportViewModel.LastmimeType);
            //}
            //catch (Exception ex)
            //{
            //    return null;
            //}

        }
    }
}