using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;
using BIOMEDICO.Clases;
using Microsoft.Reporting.WinForms;
using System.IO;

namespace BIOMEDICO.Models
{
    
        public enum TipoParametro
        {
            Parametro,
            DataSource
        }

        public class Parametros
        {
            public string name { get; set; }
            public string value { get; set; }
            public TipoParametro tipo { get; set; }

            public List<Campo> campos { get; set; }

            public Parametros() { }
            public Parametros(string nombre, string valor, TipoParametro t, List<Campo> c)
            {

                this.name = nombre;
                this.value = valor;
                this.tipo = t;
                this.campos = c;
            }

            public Parametros(string nombre, string valor, TipoParametro t)
            {
                this.name = nombre;
                this.value = valor;
                this.tipo = t;
            }
        }
        public class Campo
        {
            public string name { get; set; }
            public int posicion { get; set; }

            public string Type { get; set; }


            public Campo(string name, int position, string type)
            {
                this.name = name;
                this.posicion = position;
                this.Type = type;
            }


            public Campo()
            {
            }

        }
        public class ReporteModel
        {
            public enum ReportFormat { PDF = 1, Word = 2, Excel = 3 }

            public ReporteModel()
            {
                List<ReportDataSource> ReportDataSets = new List<ReportDataSource>();
            }

            //Name of the report
            public string Name { get; set; }

            //Language of the report
            public string ReportLanguage { get; set; }

            //Reference to the RDLC file that contain the report definition
            public string FileName { get; set; }

            //date for printing the report
            public DateTime ReportDate { get; set; }

            //the user name that is printing the report
            public string UserNamPrinting { get; set; }

            public ReportParameterCollection Parameters { get; set; }
            //dataset holder
            public List<ReportDataSource> ReportDataSets { get; set; }


            public virtual void Iteracion_Handler(object sender, SubreportProcessingEventArgs e)
            {


            }

            //report format needed
            public ReportFormat Format { get; set; }
            public bool ViewAsAttachment { get; set; }
            //an helper class to store the data for each report data set
            //public class ReportDataSet
            //{
            //    public string DatasetName { get; set; }
            //    public List<dynamic> DataSetData { get; set; }
            //    //public Barcode DataSetCode { get; set; } 
            //}

            public string ReporExportFileName
            {
                get
                {
                    return string.Format("attachment; filename={0}{1}", this.Name, ReporExportExtention);
                }
            }
            public string ReporExportExtention
            {
                get
                {
                    switch (this.Format)
                    {
                        case ReporteModel.ReportFormat.Word: return ".doc";
                        case ReporteModel.ReportFormat.Excel: return ".xls";
                        default:
                            return ".pdf";
                    }
                }
            }

            public string LastmimeType
            {
                get
                {
                    return mimeType;
                }
            }
            private string mimeType;
            public byte[] RenderReport()
            {
                //geting repot data from the business object

                //creating a new report and setting its path
                LocalReport localReport = new LocalReport();
                localReport.ReportPath = HttpContext.Current.Server.MapPath(this.FileName);
                localReport.DisplayName = Name;

                // Se muestra el subreporte 
                //adding the reort datasets with there names

                //enabeling external images
                localReport.EnableExternalImages = true;

                localReport.SetParameters(Parameters);

                foreach (var dataset in this.ReportDataSets)
                {
                    //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                    localReport.DataSources.Add(dataset);
                }
                foreach (var dataset in this.ReportDataSets)
                {
                    //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                    localReport.DataSources.Add(dataset);
                }

                localReport.SubreportProcessing += new SubreportProcessingEventHandler(Iteracion_Handler);
                localReport.Refresh();


                string reportType = this.Format.ToString();

                string encoding;
                string fileNameExtension;

                //The DeviceInfo settings should be changed based on the reportType
                //http://msdn2.microsoft.com/en-us/library/ms155397.aspx
                string deviceInfo =
                "<DeviceInfo>" +
                "  <OutputFormat>" + Format.ToString() + "</OutputFormat>" +
                "</DeviceInfo>";

                Warning[] warnings;
                string[] streams;
                byte[] renderedBytes;

                //Render the report
                renderedBytes = localReport.Render(
                    reportType,
                    deviceInfo,
                    out mimeType,
                    out encoding,
                    out fileNameExtension,
                    out streams,
                    out warnings);

                return renderedBytes;
            }

            public byte[] RenderReportContextExterno(HttpServerUtilityBase server)
            {
                //geting repot data from the business object

                //creating a new report and setting its path
                LocalReport localReport = new LocalReport();
                localReport.ReportPath = server.MapPath(this.FileName);
                localReport.DisplayName = Name;

                // Se muestra el subreporte 
                //adding the reort datasets with there names

                //enabeling external images
                localReport.EnableExternalImages = true;

                localReport.SetParameters(Parameters);

                foreach (var dataset in this.ReportDataSets)
                {
                    //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                    localReport.DataSources.Add(dataset);
                }
                foreach (var dataset in this.ReportDataSets)
                {
                    //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                    localReport.DataSources.Add(dataset);
                }

                localReport.SubreportProcessing += new SubreportProcessingEventHandler(Iteracion_Handler);
                localReport.Refresh();


                string reportType = this.Format.ToString();

                string encoding;
                string fileNameExtension;

                //The DeviceInfo settings should be changed based on the reportType
                //http://msdn2.microsoft.com/en-us/library/ms155397.aspx
                string deviceInfo =
                "<DeviceInfo>" +
                "  <OutputFormat>" + Format.ToString() + "</OutputFormat>" +
                "</DeviceInfo>";

                Warning[] warnings;
                string[] streams;
                byte[] renderedBytes;

                //Render the report
                renderedBytes = localReport.Render(
                    reportType,
                    deviceInfo,
                    out mimeType,
                    out encoding,
                    out fileNameExtension,
                    out streams,
                    out warnings);

                return renderedBytes;
            }

            public byte[] RenderReportII()
            {
                LocalReport report = new LocalReport();


                string format = "PDF";
                string deviceInfo = null;
                string encoding = String.Empty;
                string mimeType = String.Empty;
                string extension = String.Empty;
                Warning[] warnings = null;
                string[] streamIDs = null;

                report = new LocalReport();
                report.EnableExternalImages = true;
                report.ReportPath = System.Web.HttpContext.Current.Server.MapPath(this.FileName);
                report.DisplayName = Name;


                report.SetParameters(Parameters);

                foreach (var dataset in this.ReportDataSets)
                {
                    //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                    report.DataSources.Add(dataset);
                }

                report.SubreportProcessing += new SubreportProcessingEventHandler(Iteracion_Handler);
                report.Refresh();

                deviceInfo =
           "<DeviceInfo>" +
           "<HumanReadablePDF>True</HumanReadablePDF>" +
           "</DeviceInfo>";

                // <DeviceInfo><HumanReadablePDF>True</HumanReadablePDF></DeviceInfo>



                Byte[] pdfArray = report.Render(
                   format,
                   deviceInfo,
                   out mimeType,
                   out encoding,
                   out extension,
                   out streamIDs,
                   out warnings);


                return pdfArray;
            }
        }

        public class Core
        {
            public static Image Base64ToImage(string base64String)
            {
                // Convert base 64 string to byte[]
                byte[] imageBytes = Convert.FromBase64String(base64String);
                // Convert byte[] to Image
                using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
                {
                    Image image = Image.FromStream(ms, true);
                    return image;
                }
            }
            public static string ConvertImageToBase64(Image image, ImageFormat format)
            {
                byte[] imageArray;

                using (System.IO.MemoryStream imageStream = new System.IO.MemoryStream())
                {
                    image.Save(imageStream, format);
                    imageArray = new byte[imageStream.Length];
                    imageStream.Seek(0, System.IO.SeekOrigin.Begin);
                    imageStream.Read(imageArray, 0, int.Parse(imageStream.Length.ToString()));
                }

                return Convert.ToBase64String(imageArray);
            }

            public ReporteModel LlenarReporte(string type, string id, int IdUser, string Opcion = "")
            {
                //Datos dt = new Datos();
                var reportViewModel = new ReporteModel();

                try
                {
                    switch (type)
                    {

                        case "EC":
                            return new ReportContrato(IdUser);
                        case "ECB":
                            return new ReportContratoBlanco();

                    default:
                            return null;
                    }
                }
                catch (Exception e)
                {
                    return reportViewModel;
                }
            }

            public class ReportEC : ReporteModel
            {

                //The main title for the reprt
                public string ReportTitle { get; set; }

                //The right and left titles and sub title for the report
                public string SubTitle1 { get; set; }
                public string SubTitle { get; set; }
                public string SubTitle2 { get; set; }
                public string PieTitle { get; set; }
                public string PieTitle2 { get; set; }
                public string Versionfisco { get; set; }
                public string CodigoRec { get; set; }
                public string codigoRecPago { get; set; }

                //the url for the logo, 
                public string ReportLogo { get; set; }
                public string ReportLogoPie { get; set; }

                public ReportEC(int Iduser, string Refe)
                {
                //ReciboModel Rm = new ReciboModel();
                //ParametrosModels Pm = new ParametrosModels();
                //UsuarioModel Um = new UsuarioModel();
                //PredialModel PreModel = new PredialModel();
                //Vw_Usuario user = Um.GetUsuarioById(Iduser);
                //RegistroContribuyenteModel Reg = new RegistroContribuyenteModel();
                //InfoMunicipioModel Im = new InfoMunicipioModel();
                //var Data = PreModel.GetListaPredios(Refe);

                //Vw_InfoMunicipio Muni = Im.InfoMunicipio();
                //List<Vw_Propietarios> ListProp = PreModel.GetListPredioByIdminos(Data[0].IDMINOS);
                //foreach (var item in Data)
                //{
                //    Vw_Propietarios propietarios = new Vw_Propietarios()
                //    {
                //        TipoDoc = item.TIPODOCUMENTO,
                //        NombreProp = item.NOMBRE,
                //        Identificacion = item.NUMERODOCUMENTO
                //    };
                //    ListProp.Add(propietarios);
                //}
                //ListProp = ListProp.DistinctBy(w => w.Identificacion).ToList();
                //Data = Data.DistinctBy(w => w.VIGENCIA).ToList();
                //ListProp.ForEach(W =>
                //{
                //    W.Identificacion = W.Identificacion.Trim();
                //    W.NombreProp = W.NombreProp.Trim();
                //    W.TipoDoc = W.TipoDoc.Trim();
                //});
                //// Datos de la alcadía
                //Vw_ConfigReportes datosAlcaldia = Rm.GetConfigReport();
                //// Datos Config Reporte


                FileName = "~/Reportes/EC.rdlc";
                Name = "EC";
                ReportDate = DateTime.Now;
                //Logo nuevo Alcaldía
                ReportLogo = "XXX";
                ReportLogoPie = "";
                ReportTitle = "YYY";
                SubTitle = "DDD";
                SubTitle1 = "DD";
                SubTitle2 = "DD";

                ReportLanguage = "en-US";
                UserNamPrinting =Utilidades.ActiveUser.NomUsuario;

                Versionfisco = "";
                PieTitle = "";
                PieTitle2 = "";


                Format = ReporteModel.ReportFormat.PDF;
                ViewAsAttachment = false;
                string UsuarioACtivo = Utilidades.ActiveUser.NomUsuario;





                Parameters = new ReportParameterCollection();

                Parameters.Add(new ReportParameter("SubTitle", this.SubTitle));
                Parameters.Add(new ReportParameter("SubTitle1", this.SubTitle1));
                Parameters.Add(new ReportParameter("SubTitle2", this.SubTitle1));

                Parameters.Add(new ReportParameter("ReportTitle", "CERTIFICADO DE AVALUO CATASTRAL"));

                Parameters.Add(new ReportParameter("UsuarioActivo", UsuarioACtivo));
                


                




                //ReportDataSets = new List<ReportDataSource>();
                //ReportDataSets.Add(new ReportDataSource("DataSetPredios", ListProp));
                //ReportDataSets.Add(new ReportDataSource("DataSetPrediosA", Data.OrderByDescending(w => w.VIGENCIA).ToList()));
            }
            }

        public class ReportContrato : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportContrato(int IdEncuesta)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/Encuesta.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle ="";
                SubTitle ="";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad =  true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var Encuesta = db.SiTic.FirstOrDefault(w => w.IdSitic == IdEncuesta);
                    if (Encuesta != null)
                    {
                        Parameters.Add(new ReportParameter("AfiliacionActualEncuestado", Encuesta.AfiliacionActualEncuestado));
                        Parameters.Add(new ReportParameter("FechaEncuesta", Encuesta.FechaEncuesta.ToString()));
                        Parameters.Add(new ReportParameter("HoraInicioEncuesta", Encuesta.HoraInicioEncuesta.ToString()));
                        Parameters.Add(new ReportParameter("TipoDocumentoEncuestador", Encuesta.TipoDocumentoEncuestador));
                        Parameters.Add(new ReportParameter("NumeroIdentificacionEncuestador", Encuesta.NumeroIdentificacionEncuestador.ToString()));
                        Parameters.Add(new ReportParameter("TrabajadoInformal", Encuesta.TrabajadoInformal));
                        Parameters.Add(new ReportParameter("DepartamentoEncuestador", Encuesta.DepartamentoEncuestador));
                        Parameters.Add(new ReportParameter("MunicipioEncuestador", Encuesta.MunicipioEncuestador));
                        Parameters.Add(new ReportParameter("ClaseMunicipioEncuestador", Encuesta.ClaseMunicipioEncuestador));
                        Parameters.Add(new ReportParameter("TipoDocumentoEncuestado", Encuesta.TipoDocumentoEncuestado));
                        Parameters.Add(new ReportParameter("NumeroIdentificacionEncuestado", Encuesta.NumeroIdentificacionEncuestado.ToString()));
                        Parameters.Add(new ReportParameter("FechaNacimiento", Encuesta.FechaNacimiento.ToString()));
                        Parameters.Add(new ReportParameter("PrimerNombre", Encuesta.PrimerNombre));
                        Parameters.Add(new ReportParameter("SegundoNombre", Encuesta.SegundoNombre));
                        Parameters.Add(new ReportParameter("PrimerApellido", Encuesta.PrimerApellido));
                        Parameters.Add(new ReportParameter("SegundoApellido", Encuesta.SegundoApellido));
                        Parameters.Add(new ReportParameter("Direccion", Encuesta.Direccion));


                        var SocioDemograficos = db.SocioDemograficos.FirstOrDefault(w => w.IdSitic == IdEncuesta);

                        Parameters.Add(new ReportParameter("Genero", SocioDemograficos.Genero));
                        Parameters.Add(new ReportParameter("EstadoCivil", SocioDemograficos.EstadoCivil));
                        Parameters.Add(new ReportParameter("NivelEscolar", SocioDemograficos.NivelEscolar));
                        Parameters.Add(new ReportParameter("OtroNivelEscolar", SocioDemograficos.OtroNivelEscolar));
                        Parameters.Add(new ReportParameter("AñosAprobados", SocioDemograficos.AñosAprobados.ToString()));
                        Parameters.Add(new ReportParameter("CabezaFamilia", SocioDemograficos.CabezaFamilia));
                        Parameters.Add(new ReportParameter("EconomiaFamilia", SocioDemograficos.EconomiaFamilia));
                        Parameters.Add(new ReportParameter("DependenciaFamiliar", SocioDemograficos.DependenciaFamiliar.ToString()));
                        Parameters.Add(new ReportParameter("DependenciaMenores", SocioDemograficos.DependenciaMenores.ToString()));
                        Parameters.Add(new ReportParameter("TipoPoblacion", SocioDemograficos.TipoPoblacion));
                        //Parameters.Add(new ReportParameter("OtraPoblacion", SocioDemograficos.OtraPoblacion));
                        Parameters.Add(new ReportParameter("CondicionesTrabajo", SocioDemograficos.CondicionesTrabajo));
                        Parameters.Add(new ReportParameter("OcupacionActual", SocioDemograficos.OcupacionActual));
                        Parameters.Add(new ReportParameter("MotivoDesplazamiento", SocioDemograficos.MotivoDesplazamiento));
                        //Parameters.Add(new ReportParameter("OtroDesplazamiento", SocioDemograficos.OtroDesplazamiento));

                        //EncuestaUpdate.SocioEconomicos = db.SocioEconomicos.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                        //EncuestaUpdate.SeguridadSocial = db.SeguridadSocial.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                        //EncuestaUpdate.EstiloVida = db.EstiloVida.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                        //EncuestaUpdate.CondicionesSalud = db.CondicionesSalud.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                        //EncuestaUpdate.CondicionesTrabajo = db.CondicionesTrabajo.Where(w => w.IdSitic == EncuestaUpdate.IdSitic).ToList();
                        var SocioEconomicos = db.SocioEconomicos.FirstOrDefault(w => w.IdSitic == IdEncuesta);

                        Parameters.Add(new ReportParameter("ActividadEconomicaEconomico", SocioEconomicos.ActividadEconomicaEconomico));
                        //Parameters.Add(new ReportParameter("CualActividadEconomica", SocioEconomicos.CualActividadEconomica));
                        Parameters.Add(new ReportParameter("TipoVivienda", SocioEconomicos.TipoVivienda));
                        Parameters.Add(new ReportParameter("DireccionOcupacion", SocioEconomicos.DireccionOcupacion));
                        Parameters.Add(new ReportParameter("Energia", SocioEconomicos.Energia));
                        Parameters.Add(new ReportParameter("Acueducto", SocioEconomicos.Acueducto));
                        Parameters.Add(new ReportParameter("Alcantarillado", SocioEconomicos.Alcantarillado));
                        Parameters.Add(new ReportParameter("TelefonoFijo", SocioEconomicos.TelefonoFijo));
                        Parameters.Add(new ReportParameter("TieneCelular", SocioEconomicos.TieneCelular));
                        Parameters.Add(new ReportParameter("ProductosVenta", SocioEconomicos.ProductosVenta));
                        Parameters.Add(new ReportParameter("TiempoOficio", SocioEconomicos.TiempoOficio));
                        Parameters.Add(new ReportParameter("JornadaLaborarl", SocioEconomicos.JornadaLaborarl));
                        Parameters.Add(new ReportParameter("HorasTrabajo", SocioEconomicos.HorasTrabajo.ToString()));
                        Parameters.Add(new ReportParameter("DiasSemanal", SocioEconomicos.DiasSemanal.ToString()));
                        Parameters.Add(new ReportParameter("IngesosMensuales", SocioEconomicos.IngesosMensuales));

                        var SeguridadSocial = db.SeguridadSocial.FirstOrDefault(w => w.IdSitic == IdEncuesta);

                        Parameters.Add(new ReportParameter("AfiliadoSeguridad", SeguridadSocial.AfiliadoSeguridad));
                        Parameters.Add(new ReportParameter("RegimenAfiliado", SeguridadSocial.RegimenAfiliado));
                        Parameters.Add(new ReportParameter("RegimenSalud", SeguridadSocial.RegimenSalud));
                        Parameters.Add(new ReportParameter("EpsAfiliado", SeguridadSocial.EpsAfiliado));
                        Parameters.Add(new ReportParameter("Pensiones", SeguridadSocial.Pensiones));
                        Parameters.Add(new ReportParameter("Afp", SeguridadSocial.Afp));

                        var EstiloVida = db.EstiloVida.FirstOrDefault(w => w.IdSitic == IdEncuesta);

                        Parameters.Add(new ReportParameter("Peso", EstiloVida.Peso));
                        Parameters.Add(new ReportParameter("Estatura", EstiloVida.Estatura));
                        Parameters.Add(new ReportParameter("ActividadFisica", EstiloVida.ActividadFisica));
                        Parameters.Add(new ReportParameter("DiasSemana", EstiloVida.DiasSemana));
                        Parameters.Add(new ReportParameter("HorasPractica", EstiloVida.HorasPractica));
                        Parameters.Add(new ReportParameter("EncuestadoFuma", EstiloVida.EncuestadoFuma));
                        Parameters.Add(new ReportParameter("ConsumeLicor", EstiloVida.ConsumeLicor));
                        Parameters.Add(new ReportParameter("SustanciasPsicoactivas", EstiloVida.SustanciasPsicoactivas));
                        Parameters.Add(new ReportParameter("CualSustancia", EstiloVida.CualSustancia));
                        Parameters.Add(new ReportParameter("DietaFrutas", EstiloVida.DietaFrutas));
                        Parameters.Add(new ReportParameter("FrecuenciaFrutas", EstiloVida.FrecuenciaFrutas));

                        var CondicionesSalud = db.CondicionesSalud.FirstOrDefault(w => w.IdSitic == IdEncuesta);

                        Parameters.Add(new ReportParameter("EstadoSalud", CondicionesSalud.EstadoSalud));
                        Parameters.Add(new ReportParameter("SaludFisica", CondicionesSalud.SaludFisica));
                        Parameters.Add(new ReportParameter("SaludMental", CondicionesSalud.SaludMental));
                        Parameters.Add(new ReportParameter("SaludPsicologica", CondicionesSalud.SaludPsicologica));
                        Parameters.Add(new ReportParameter("ActividadNormalFisica", CondicionesSalud.ActividadNormalFisica));
                        Parameters.Add(new ReportParameter("CausaActividadFisica", CondicionesSalud.CausaActividadFisica));
                        Parameters.Add(new ReportParameter("AccidenteLaborar", CondicionesSalud.AccidenteLaborar));
                        Parameters.Add(new ReportParameter("AccidenteOrigen", CondicionesSalud.AccidenteOrigen));
                        Parameters.Add(new ReportParameter("EnfermedadOrigenOcupacional", CondicionesSalud.EnfermedadOrigenOcupacional));
                        Parameters.Add(new ReportParameter("AccidneteTrabajoActividad", CondicionesSalud.AccidneteTrabajoActividad));
                        Parameters.Add(new ReportParameter("EnfermedadOrigen", CondicionesSalud.EnfermedadOrigen));
                        Parameters.Add(new ReportParameter("EnfermedadOrigenOcupacional", CondicionesSalud.EnfermedadOrigenOcupacional));
                        Parameters.Add(new ReportParameter("LesionesOcurridad", CondicionesSalud.LesionesOcurridad));
                        Parameters.Add(new ReportParameter("ParteCuerpoLesion", CondicionesSalud.ParteCuerpoLesion));
                        Parameters.Add(new ReportParameter("AgenteAccidente", CondicionesSalud.AgenteAccidente));
                        Parameters.Add(new ReportParameter("MecanismoAccidente", CondicionesSalud.MecanismoAccidente));
                        Parameters.Add(new ReportParameter("InformoAccidente", CondicionesSalud.InformoAccidente));
                        Parameters.Add(new ReportParameter("NoInformoAccidente", CondicionesSalud.NoInformoAccidente));
                        Parameters.Add(new ReportParameter("ActorInformoAccidente", CondicionesSalud.ActorInformoAccidente));
                        Parameters.Add(new ReportParameter("IncapacidadAccidente", CondicionesSalud.IncapacidadAccidente));
                        Parameters.Add(new ReportParameter("CostosAccidente", CondicionesSalud.CostosAccidente));
                        Parameters.Add(new ReportParameter("TramiteEnfermedad", CondicionesSalud.TramiteEnfermedad));
                        Parameters.Add(new ReportParameter("EnfermedadDiagnosticada", CondicionesSalud.EnfermedadDiagnosticada));
                        Parameters.Add(new ReportParameter("CausaDiscapacidad", CondicionesSalud.CausaDiscapacidad));
                        Parameters.Add(new ReportParameter("TipoDiscapacidad", CondicionesSalud.TipoDiscapacidad));

                        var CondicionesTrabajo = db.CondicionesTrabajo.FirstOrDefault(w => w.IdSitic == IdEncuesta);

                        Parameters.Add(new ReportParameter("CondicionTrabajo", CondicionesTrabajo.CondicionTrabajo));
                        Parameters.Add(new ReportParameter("PeligrosFisico", CondicionesTrabajo.PeligrosFisico));
                        Parameters.Add(new ReportParameter("PeligrosPsicosocial", CondicionesTrabajo.PeligrosPsicosocial));
                        Parameters.Add(new ReportParameter("Peligrosbiologico", CondicionesTrabajo.Peligrosbiologico));
                        Parameters.Add(new ReportParameter("CondicionesSeguridad", CondicionesTrabajo.CondicionesSeguridad));
                        Parameters.Add(new ReportParameter("PeligrosBiomecanicos", CondicionesTrabajo.PeligrosBiomecanicos));
                        Parameters.Add(new ReportParameter("PeligrosQuimicos", CondicionesTrabajo.PeligrosQuimicos));
                        Parameters.Add(new ReportParameter("FenomenosNatural", CondicionesTrabajo.FenomenosNatural));
                        Parameters.Add(new ReportParameter("ElementosProteccion", CondicionesTrabajo.ElementosProteccion));
                        Parameters.Add(new ReportParameter("ProteccionCabeza", CondicionesTrabajo.ProteccionCabeza));
                        Parameters.Add(new ReportParameter("ProteccionOcular", CondicionesTrabajo.ProteccionOcular));
                        Parameters.Add(new ReportParameter("ProteccionAuditiva", CondicionesTrabajo.ProteccionAuditiva));
                        Parameters.Add(new ReportParameter("ProteccionRespiratoria", CondicionesTrabajo.ProteccionRespiratoria));
                        Parameters.Add(new ReportParameter("ExtremidadesSuperiores", CondicionesTrabajo.ExtremidadesSuperiores));
                        Parameters.Add(new ReportParameter("ExtremidadesInferiores", CondicionesTrabajo.ExtremidadesInferiores));
                        Parameters.Add(new ReportParameter("OtrosElementos", CondicionesTrabajo.OtrosElementos));
                        Parameters.Add(new ReportParameter("RopaTrabajo", CondicionesTrabajo.RopaTrabajo));
                        Parameters.Add(new ReportParameter("EmergenciaEncuestado", CondicionesTrabajo.EmergenciaEncuestado));
                        Parameters.Add(new ReportParameter("CasoEmergencia", CondicionesTrabajo.CasoEmergencia));
                        Parameters.Add(new ReportParameter("Extintores", CondicionesTrabajo.Extintores));
                        Parameters.Add(new ReportParameter("Botiquin", CondicionesTrabajo.Botiquin));
                        Parameters.Add(new ReportParameter("RutaEvacuacion", CondicionesTrabajo.RutaEvacuacion));
                        Parameters.Add(new ReportParameter("SalidaEmergencia", CondicionesTrabajo.SalidaEmergencia));
                        Parameters.Add(new ReportParameter("LugarCasoEmergencia", CondicionesTrabajo.LugarCasoEmergencia));
                        Parameters.Add(new ReportParameter("AguaPotable", CondicionesTrabajo.AguaPotable));
                        Parameters.Add(new ReportParameter("RecoleccionResiduos", CondicionesTrabajo.RecoleccionResiduos));
                        Parameters.Add(new ReportParameter("HoraTerminacion", CondicionesTrabajo.HoraTerminacion.ToString()));
                        Parameters.Add(new ReportParameter("NombreEncuestado", CondicionesTrabajo.NombreEncuestado.ToString()));
                        Parameters.Add(new ReportParameter("CedulaEncuestado", CondicionesTrabajo.CedulaEncuestado.ToString()));

                        if (!string.IsNullOrEmpty(CondicionesTrabajo.Firma))
                        {
                            CondicionesTrabajo.Firma = CondicionesTrabajo.Firma.Substring(22);
                            Image imagenFirma = Core.Base64ToImage(CondicionesTrabajo.Firma);
                            string FirmaImg = Core.ConvertImageToBase64(imagenFirma, ImageFormat.Png);

                            Parameters.Add(new ReportParameter("Firma", FirmaImg));
                        }


                       

                  
                       
                    }

                }



              
               
                //Parameters.Add(new ReportParameter("SubTitle1", this.SubTitle1));
                //Parameters.Add(new ReportParameter("SubTitle2", this.SubTitle2));
                //Parameters.Add(new ReportParameter("ReportTitle", this.ReportTitle));
                //Parameters.Add(new ReportParameter("Versionfisco", this.Versionfisco));
                //Parameters.Add(new ReportParameter("CodAlcaldia", "1"));

                //Parameters.Add(new ReportParameter("Nit", "1"));
                //Parameters.Add(new ReportParameter("NomberRazonSocial","2"));
                //Parameters.Add(new ReportParameter("Correo", "3"));
                //// Parameters.Add(new ReportParameter("Direccion", this.Direccion));
                //Parameters.Add(new ReportParameter("DigitoVerificacion", "4"));
                //Parameters.Add(new ReportParameter("Fecha", DateTime.Now.ToString()));
                //Parameters.Add(new ReportParameter("Contrato", this.Contrato));
                //Parameters.Add(new ReportParameter("Visibilidad", Visibilidad.ToString(), Visibilidad));
                this.ReportDataSets = new List<ReportDataSource>();

            }


        }
        public class ReportContratoBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportContratoBlanco()
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/EncuestaBlanco.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                





                //Parameters.Add(new ReportParameter("SubTitle1", this.SubTitle1));
                //Parameters.Add(new ReportParameter("SubTitle2", this.SubTitle2));
                //Parameters.Add(new ReportParameter("ReportTitle", this.ReportTitle));
                //Parameters.Add(new ReportParameter("Versionfisco", this.Versionfisco));
                //Parameters.Add(new ReportParameter("CodAlcaldia", "1"));

                //Parameters.Add(new ReportParameter("Nit", "1"));
                //Parameters.Add(new ReportParameter("NomberRazonSocial","2"));
                //Parameters.Add(new ReportParameter("Correo", "3"));
                //// Parameters.Add(new ReportParameter("Direccion", this.Direccion));
                //Parameters.Add(new ReportParameter("DigitoVerificacion", "4"));
                //Parameters.Add(new ReportParameter("Fecha", DateTime.Now.ToString()));
                //Parameters.Add(new ReportParameter("Contrato", this.Contrato));
                //Parameters.Add(new ReportParameter("Visibilidad", Visibilidad.ToString(), Visibilidad));
                this.ReportDataSets = new List<ReportDataSource>();

            }


        }


    }
    
}