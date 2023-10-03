var ObjEncuenstaTrabajadores = {
    SiticEncuestaTrabajadores : {},
    EcoEncuestaTrabajadores: {},
    SocialEncuestaTrabajadores: {},
    VidaEncuestaTrabajadores: {},
    SaludEncuestaTrabajadores: {},
    TrabajoEncuestaTrabajadores: {}
}

var IsUpdate = false;
var idEncuestaData = 0;
var IdAntecedentes = 0;
var IdExamen = 0;
var VerDetalles = 'NO';
var validadorFormUsuario = [];
$(document).ready(function () {//FUNCION INICIAL;
    Get_DataGet(CargarSelectEsp, '/Eps/GetListEps');
    Get_DataGet(CargarSelectAfp, '/Afp/GetListAfp');
    
    idEncuestaData = getQueryVariable('IdReg');
    VerDetalles = getQueryVariable('Viewdetail');
 

    if (idEncuestaData > 0) {
        IsUpdate = true;
    }

    if (VerDetalles == "SI") {
        $('#SaveEncuestaTrabajadores').html('Atras')
        Get_Data(LlenarCampos, '/TrabajadoresIndependientes/GetTrabjadoresIndependientesById?IdEncTrabajadores=' + idEncuestaData);
        $('#container-firma').addClass('d-none')
        $('#container-firma-actions').addClass('d-none')
        $('#container-url-firma').addClass('d-none')
        $('#Firma').removeClass('d-none')
        $('#container-imagen-firmada').addClass('d-none')
    }

    if (IsUpdate && VerDetalles == 0) {
        
        $('#SaveEncuestaTrabajadores').html('Actualizar')
        Get_Data(LlenarCampos, '/TrabajadoresIndependientes/GetTrabjadoresIndependientesById?IdEncTrabajadores=' + idEncuestaData);      
        $('#Firma').removeClass('d-none')
    }
});

function CargarSelectEsp(data) {
    EpsAfiliado = data;
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>"
    $.each(data.objeto, function (index, item) {
        HtmlEmp += "<option value='" + item.IdePS + "'>" + item.NomEps + "</option>"
    })
    $('#EpsAfiliado').html(HtmlEmp);
   // $('#EpsAfiliado').select2();
}

function ValidarCedula() {
    let Cedula = $('#NumeroIdentificacionEncuestado').val();
    Get_Data(MostrarAlerta, '/TrabajadoresIndependientes/BuscarEncuestador?Identificacion=' + Cedula)
}
function MostrarAlerta(data) {
    if (data.objeto != null || data.objeto != undefined) {
        swal({
            title: "Atención",
            text: "El usuario ya fue encuestado",
            type: "warning",
            /*showCancelButton: true,*/
            /*   confirmButtonClass: "btn-danger",*/
            confirmButtonText: "Ok",
        });
       /* return;*/ 
    }
    
}

function CargarSelectAfp(data) {
    Afp = data;
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>"
    $.each(data.objeto, function (index, item) {
        HtmlEmp += "<option value='" + item.IdAfp + "'>" + item.Administradora + "</option>"
    })
    $('#Afp').html(HtmlEmp);
    //$('#Afp').select2();
}

function LlenarCampos(data) {

    //let Horaencuesta = data.objeto.HoraInicioEncuesta.Hours + ":" + data.objeto.HoraInicioEncuesta.Minutes + ":" ;
    //let HoraFin = data.objeto.CondicionesTrabajo[0].HoraTerminacion.Hours + ":" + data.objeto.CondicionesTrabajo[0].HoraTerminacion.Minutes + ":" ;


    $('#IdSitic').val(data.objeto.IdSitic);
    $('#AfiliacionActualEncuestado').val(data.objeto.AfiliacionActualEncuestado);
    $('#FechaEncuesta').val(JSONDateconverter(data.objeto.FechaEncuesta));
    //$('#HoraInicioEncuesta').val(Horaencuesta+"00");
    $('#TipoDocumentoEncuestador').val(data.objeto.TipoDocumentoEncuestador);
    $('#NumeroIdentificacionEncuestador').val(data.objeto.NumeroIdentificacionEncuestador);
    $('#TrabajadoInformal').val(data.objeto.TrabajadoInformal);
    $('#DepartamentoEncuestador').val(data.objeto.DepartamentoEncuestador);
    $('#MunicipioEncuestador').val(data.objeto.MunicipioEncuestador);
    $('#ClaseMunicipioEncuestador').val(data.objeto.ClaseMunicipioEncuestador);
    $('#TipoDocumentoEncuestado').val(data.objeto.TipoDocumentoEncuestado);
    $('#NumeroIdentificacionEncuestado').val(data.objeto.NumeroIdentificacionEncuestado);
    $('#FechaNacimiento').val(JSONDateconverter(data.objeto.FechaNacimiento));
    $('#PrimerNombre').val(data.objeto.PrimerNombre);
    $('#SegundoNombre').val(data.objeto.SegundoNombre);
    $('#PrimerApellido').val(data.objeto.PrimerApellido);
    $('#SegundoApellido').val(data.objeto.SegundoApellido);
    $('#Direccion').val(data.objeto.Direccion);
    $('#UsuarioRegistro').val(data.objeto.UsuarioRegistro);
         

    ////DATOS SOCIODEMOGRAFICO
    IdSocioDemograficos = data.objeto.SocioDemograficos[0].IdSocioDemograficos;
    $('#Genero').val(data.objeto.SocioDemograficos[0].Genero);
    $('#EstadoCivil').val(data.objeto.SocioDemograficos[0].EstadoCivil);
    $('#NivelEscolar').val(data.objeto.SocioDemograficos[0].NivelEscolar);
    $('#OtroNivelEscolar').val(data.objeto.SocioDemograficos[0].OtroNivelEscolar);
    $('#AñosAprobados').val(data.objeto.SocioDemograficos[0].AñosAprobados);
    $('#CabezaFamilia').val(data.objeto.SocioDemograficos[0].CabezaFamilia);
    $('#EconomiaFamilia').val(data.objeto.SocioDemograficos[0].EconomiaFamilia);
    $('#DependenciaFamiliar').val(data.objeto.SocioDemograficos[0].DependenciaFamiliar);
    $('#DependenciaMenores').val(data.objeto.SocioDemograficos[0].DependenciaMenores);
    $('#TipoPoblacion').val(data.objeto.SocioDemograficos[0].TipoPoblacion);
    //$('#OtraPoblacion').val(data.objeto.SocioDemograficos[0].OtraPoblacion);
    $('#CondicionesTrabajo').val(data.objeto.SocioDemograficos[0].CondicionesTrabajo);
    $('#OcupacionActual').val(data.objeto.SocioDemograficos[0].OcupacionActual);
    $('#MotivoDesplazamiento').val(data.objeto.SocioDemograficos[0].MotivoDesplazamiento);
    //$('#OtroDesplazamiento').val(data.objeto.SocioDemograficos[0].OtroDesplazamiento);

   

    //DATOS SOCIOECONOMICO
    IdSocioEconomicos = data.objeto.SocioEconomicos[0].SocioEconomicos
    $('#ActividadEconomicaEconomico').val(data.objeto.SocioEconomicos[0].ActividadEconomicaEconomico);
    //$('#CualActividadEconomica').val(data.objeto.SocioEconomicos[0].CualActividadEconomica);
    $('#TipoVivienda').val(data.objeto.SocioEconomicos[0].TipoVivienda);
    $('#DireccionOcupacion').val(data.objeto.SocioEconomicos[0].DireccionOcupacion);
    $('#Energia').val(data.objeto.SocioEconomicos[0].Energia);
    $('#Acueducto').val(data.objeto.SocioEconomicos[0].Acueducto);
    $('#Alcantarillado').val(data.objeto.SocioEconomicos[0].Alcantarillado);
    $('#TelefonoFijo').val(data.objeto.SocioEconomicos[0].TelefonoFijo);
    $('#TieneCelular').val(data.objeto.SocioEconomicos[0].TieneCelular);
    $('#ProductosVenta').val(data.objeto.SocioEconomicos[0].ProductosVenta);
    $('#TiempoOficio').val(data.objeto.SocioEconomicos[0].TiempoOficio);
    $('#JornadaLaborarl').val(data.objeto.SocioEconomicos[0].JornadaLaborarl);
    $('#HorasTrabajo').val(data.objeto.SocioEconomicos[0].HorasTrabajo);
    $('#DiasSemanal').val(data.objeto.SocioEconomicos[0].DiasSemanal);
    $('#IngesosMensuales').val(data.objeto.SocioEconomicos[0].IngesosMensuales);
           

    //DATOS SEGURIDAD SOCIAL

    IdSeguridadSocial = data.objeto.SeguridadSocial[0].IdSeguridadSocial
    $('#AfiliadoSeguridad').val(data.objeto.SeguridadSocial[0].AfiliadoSeguridad);
    $('#RegimenAfiliado').val(data.objeto.SeguridadSocial[0].RegimenAfiliado);
    $('#RegimenSalud').val(data.objeto.SeguridadSocial[0].RegimenSalud);
    $('#EpsAfiliado').val(data.objeto.SeguridadSocial[0].EpsAfiliado);
    $('#Pensiones').val(data.objeto.SeguridadSocial[0].Pensiones);
    $('#Afp').val(data.objeto.SeguridadSocial[0].Afp);



    //DATOS ESTILO VIDA

    IdEstiloVida = data.objeto.EstiloVida[0].IdEstiloVida
    $('#Peso').val(data.objeto.EstiloVida[0].Peso);
    $('#Estatura').val(data.objeto.EstiloVida[0].Estatura);
    $('#ActividadFisica').val(data.objeto.EstiloVida[0].ActividadFisica);
    $('#DiasSemana').val(data.objeto.EstiloVida[0].DiasSemana);
    $('#HorasPractica').val(data.objeto.EstiloVida[0].HorasPractica);
    $('#EncuestadoFuma').val(data.objeto.EstiloVida[0].EncuestadoFuma);
    $('#ConsumeLicor').val(data.objeto.EstiloVida[0].ConsumeLicor);
    $('#SustanciasPsicoactivas').val(data.objeto.EstiloVida[0].SustanciasPsicoactivas);
    $('#CualSustancia').val(data.objeto.EstiloVida[0].CualSustancia);
    $('#DietaFrutas').val(data.objeto.EstiloVida[0].DietaFrutas);
    $('#FrecuenciaFrutas').val(data.objeto.EstiloVida[0].FrecuenciaFrutas);
   


    //DATOS CONDICIONES DE SALUD

    IdCondicionesSalud = data.objeto.CondicionesSalud[0].IdCondicionesSalud
    $('#EstadoSalud').val(data.objeto.CondicionesSalud[0].EstadoSalud);
    $('#SaludFisica').val(data.objeto.CondicionesSalud[0].SaludFisica);
    $('#SaludMental').val(data.objeto.CondicionesSalud[0].SaludMental);
    $('#SaludPsicologica').val(data.objeto.CondicionesSalud[0].SaludPsicologica);
    $('#ActividadNormalFisica').val(data.objeto.CondicionesSalud[0].ActividadNormalFisica);
    $('#CausaActividadFisica').val(data.objeto.CondicionesSalud[0].CausaActividadFisica);
    $('#AccidenteLaborar').val(data.objeto.CondicionesSalud[0].AccidenteLaborar);
    $('#AccidenteOrigen').val(data.objeto.CondicionesSalud[0].AccidenteOrigen);
    $('#AccidneteTrabajoActividad').val(data.objeto.CondicionesSalud[0].AccidneteTrabajoActividad);
    $('#EnfermedadOrigen').val(data.objeto.CondicionesSalud[0].EnfermedadOrigen);
    $('#EnfermedadOrigenOcupacional').val(data.objeto.CondicionesSalud[0].EnfermedadOrigenOcupacional);
    $('#LesionesOcurridad').val(data.objeto.CondicionesSalud[0].LesionesOcurridad);
    $('#ParteCuerpoLesion').val(data.objeto.CondicionesSalud[0].ParteCuerpoLesion);
    $('#AgenteAccidente').val(data.objeto.CondicionesSalud[0].AgenteAccidente);
    $('#MecanismoAccidente').val(data.objeto.CondicionesSalud[0].MecanismoAccidente);
    $('#InformoAccidente').val(data.objeto.CondicionesSalud[0].InformoAccidente);
    $('#NoInformoAccidente').val(data.objeto.CondicionesSalud[0].NoInformoAccidente);
    $('#ActorInformoAccidente').val(data.objeto.CondicionesSalud[0].ActorInformoAccidente);
    $('#IncapacidadAccidente').val(data.objeto.CondicionesSalud[0].IncapacidadAccidente);
    $('#CostosAccidente').val(data.objeto.CondicionesSalud[0].CostosAccidente);
    $('#TramiteEnfermedad').val(data.objeto.CondicionesSalud[0].TramiteEnfermedad);
    $('#EnfermedadDiagnosticada').val(data.objeto.CondicionesSalud[0].EnfermedadDiagnosticada);
    $('#CausaDiscapacidad').val(data.objeto.CondicionesSalud[0].CausaDiscapacidad);
    $('#TipoDiscapacidad').val(data.objeto.CondicionesSalud[0].TipoDiscapacidad);
    
    //DATOS CONDICIONES DE TRABAJO

    IdCondicionesTrabajo = data.objeto.CondicionesTrabajo[0].IdCondicionesTrabajo
    $('#CondicionTrabajo').val(data.objeto.CondicionesTrabajo[0].CondicionTrabajo);
    $('#PeligrosFisico').val(data.objeto.CondicionesTrabajo[0].PeligrosFisico);
    $('#PeligrosPsicosocial').val(data.objeto.CondicionesTrabajo[0].PeligrosPsicosocial);
    $('#Peligrosbiologico').val(data.objeto.CondicionesTrabajo[0].Peligrosbiologico);
    $('#CondicionesSeguridad').val(data.objeto.CondicionesTrabajo[0].CondicionesSeguridad);
    $('#PeligrosBiomecanicos').val(data.objeto.CondicionesTrabajo[0].PeligrosBiomecanicos);
    $('#PeligrosQuimicos').val(data.objeto.CondicionesTrabajo[0].PeligrosQuimicos);
    $('#FenomenosNatural').val(data.objeto.CondicionesTrabajo[0].FenomenosNatural);
    $('#ElementosProteccion').val(data.objeto.CondicionesTrabajo[0].ElementosProteccion);
    $('#ProteccionCabeza').val(data.objeto.CondicionesTrabajo[0].ProteccionCabeza);
    $('#ProteccionOcular').val(data.objeto.CondicionesTrabajo[0].ProteccionOcular);
    $('#ProteccionAuditiva').val(data.objeto.CondicionesTrabajo[0].ProteccionAuditiva);
    $('#ProteccionRespiratoria').val(data.objeto.CondicionesTrabajo[0].ProteccionRespiratoria);
    $('#ExtremidadesSuperiores').val(data.objeto.CondicionesTrabajo[0].ExtremidadesSuperiores);
    $('#ExtremidadesInferiores').val(data.objeto.CondicionesTrabajo[0].ExtremidadesInferiores);
    $('#OtrosElementos').val(data.objeto.CondicionesTrabajo[0].OtrosElementos);
    $('#RopaTrabajo').val(data.objeto.CondicionesTrabajo[0].RopaTrabajo);
    $('#EmergenciaEncuestado').val(data.objeto.CondicionesTrabajo[0].EmergenciaEncuestado);
    $('#CasoEmergencia').val(data.objeto.CondicionesTrabajo[0].CasoEmergencia);
    $('#Extintores').val(data.objeto.CondicionesTrabajo[0].Extintores);
    $('#Botiquin').val(data.objeto.CondicionesTrabajo[0].Botiquin);
    $('#RutaEvacuacion').val(data.objeto.CondicionesTrabajo[0].RutaEvacuacion);
    $('#SalidaEmergencia').val(data.objeto.CondicionesTrabajo[0].SalidaEmergencia);
    $('#LugarCasoEmergencia').val(data.objeto.CondicionesTrabajo[0].LugarCasoEmergencia);
    $('#AguaPotable').val(data.objeto.CondicionesTrabajo[0].AguaPotable);
    $('#RecoleccionResiduos').val(data.objeto.CondicionesTrabajo[0].RecoleccionResiduos);
    
    $('#NombreEncuestado').val(data.objeto.CondicionesTrabajo[0].NombreEncuestado);
    $('#CedulaEncuestado').val(data.objeto.CondicionesTrabajo[0].CedulaEncuestado);
    $('#Firma').prop('src', data.objeto.CondicionesTrabajo[0].Firma);
   
 
}

//function geoloc() {
//  d=document.getElementById("demo");
//  if (navigator.geolocation){
//    d.innerHTML="<p>Tu dispositivo soporta la geolocalización.</p>";
//    navigator.geolocation.getCurrentPosition(showPosition);
//  }
//else {
//    d.innerHTML="<p>Lo sentimos, tu dispositivo no admite la geolocaización.</p>";
//  }
//}
//function showPosition(position){
//  latitud=position.coords.latitude;
//  longitud=position.coords.longitude;
//  d.innerHTML+="<p>Latitud: "+latitud+"</p>";
//  d.innerHTML+="<p>Longitud: "+longitud+"</p>";
//}

function getQueryVariable(variable) {//saca los valores de la uRL
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 0;
}


    validadorFormUsuario = Validador("FormEncuestaTrabajadores", {
        Iden: {
            AfiliacionActualEncuestado: true
        },
                FechaEncuesta: {
                    required: true
                },

                HoraInicioEncuesta: {
                    required: true
                },
                TipoDocumentoEncuestador: {
                    required: true
                },
                NumeroIdentificacionEncuestador: {
                    required: true
                },
                TrabajadoInformal: {
                    required: true
                },
                DepartamentoEncuestador: {
                    required: true
                },

                MunicipioEncuestador: {
                    required: true
                },
                ClaseMunicipioEncuestador: {
                    required: true
                },
                TipoDocumentoEncuestado: {
                    required: true
                },
                NumeroIdentificacionEncuestado: {
                    required: true
                },
                FechaNacimiento: {
                    required: true
                },
                PrimerNombre: {
                    required: true
                },
                //SegundoNombre: {
                //    required: true
                //},
                PrimerApellido: {
                    required: true
                },
                //SegundoApellido: {
                //    required: true
                //},
                Direccion: {
                    required: true
                },
                UsuarioRegistro: {
                    required: true
                },
                Genero: {
                    required: true
                },
                EstadoCivil: {
                    required: true
                },
                NivelEscolar: {
                    required: true
                },
                OtroNivelEscolar: {
                    required: true
                },
                AñosAprobados: {
                    required: true
                },
                CabezaFamilia: {
                    required: true
                },
                EconomiaFamilia: {
                    required: true
                },
                DependenciaFamiliar: {
                    required: true
                },
                DependenciaMenores: {
                    required: true
                },
                TipoPoblacion: {
                    required: true
                },
                OtraPoblacion: {
                    required: true
                },
                CondicionesTrabajo: {
                    required: true
                },
                OcupacionActual: {
                    required: true
                },
                MotivoDesplazamiento: {
                    required: true
                },
                OtroDesplazamiento: {
                    required: true
                },
                ActividadEconomicaEconomico: {
                    required: true
                },
                CualActividadEconomica: {
                    required: true
                },
                TipoVivienda: {
                    required: true
                },
                DireccionOcupacion: {
                    required: true
                },
                Energia: {
                    required: true
                },
                Acueducto: {
                    required: true
                },
                Alcantarillado: {
                    required: true
                },
                TelefonoFijo: {
                    required: true
                },
                TieneCelular: {
                    required: true
                },
                ProductosVenta: {
                    required: true
                },
                TiempoOficio: {
                    required: true
                },
                JornadaLaborarl: {
                    required: true
                },
                HorasTrabajo: {
                    required: true
                },
                DiasSemanal: {
                    required: true
                },
                IngesosMensuales: {
                    required: true
                },
                AfiliadoSeguridad: {
                    required: true
                },
                RegimenAfiliado: {
                    required: true
                },
                RegimenSalud: {
                    required: true
                },
                EpsAfiliado: {
                    required: true
                },
                Pensiones: {
                    required: true
                },
                Afp: {
                    required: true
                },
                Peso: {
                    required: true
                },
                Estatura: {
                    required: true
                },
                ActividadFisica: {
                    required: true
                },
                DiasSemana: {
                    required: true
                },
                HorasPractica: {
                    required: true
                },
                EncuestadoFuma: {
                    required: true
                },
                ConsumeLicor: {
                    required: true
                },
                SustanciasPsicoactivas: {
                    required: true
                },
                CualSustancia: {
                    required: true
                },
                DietaFrutas: {
                    required: true
                },
                FrecuenciaFrutas: {
                    required: true
                },
                EstadoSalud: {
                    required: true
                },
                SaludFisica: {
                    required: true
                },
                SaludMental: {
                    required: true
                },
                SaludPsicologica: {
                    required: true
                },
                ActividadNormalFisica: {
                    required: true
                },
                CausaActividadFisica: {
                    required: true
                },
                AccidenteLaborar: {
                    required: true
                },
                AccidenteOrigen: {
                    required: true
                },
                AccidneteTrabajoActividad: {
                    required: true
                },
                EnfermedadOrigen: {
                    required: true
                },
                EnfermedadOrigenOcupacional: {
                    required: true
                },
                LesionesOcurridad: {
                    required: true
                },
                ParteCuerpoLesion: {
                    required: true
                },
                AgenteAccidente: {
                    required: true
                },
                MecanismoAccidente: {
                    required: true
                },
                InformoAccidente: {
                    required: true
                },
                NoInformoAccidente: {
                    required: true
                },
                ActorInformoAccidente: {
                    required: true
                },
                IncapacidadAccidente: {
                    required: true
                },
                CostosAccidente: {
                    required: true
                },
                TramiteEnfermedad: {
                    required: true
                },
                //EnfermedadDiagnosticada: {
                //    required: true
                //},
                CausaDiscapacidad: {
                    required: true
                },
                CondicionTrabajo: {
                    required: true
                },
                PeligrosFisico: {
                    required: true
                },
                PeligrosPsicosocial: {
                    required: true
                },
                Peligrosbiologico: {
                    required: true
                },
                CondicionesSeguridad: {
                    required: true
                },
                PeligrosBiomecanicos: {
                    required: true
                },
                PeligrosQuimicos: {
                    required: true
                },
                FenomenosNatural: {
                    required: true
                },
                ElementosProteccion: {
                    required: true
                },
                ProteccionCabeza: {
                    required: true
                },
                ProteccionOcular: {
                    required: true
                },
                ProteccionAuditiva: {
                    required: true
                },
                ProteccionRespiratoria: {
                    required: true
                },
                ExtremidadesSuperiores: {
                    required: true
                },
                ExtremidadesInferiores: {
                    required: true
                },
                OtrosElementos: {
                    required: true
                },
                RopaTrabajo: {
                    required: true
                },
                EmergenciaEncuestado: {
                    required: true
                },
                CasoEmergencia: {
                    required: true
                },
                Extintores: {
                    required: true
                },
                Botiquin: {
                    required: true
                         },
                 Peso: {
                    required: true
                         },
                
                    HoraTerminacion: {
                        required: true
                    },
                    TipoDiscapacidad: {
                        required: true
                    },
                RutaEvacuacion: {
                    required: true
                     },
                    ActividadNormalFisica: {
                        required: true
                    },
        
                      EpsAfiliado: {
                    required: true
                    },
                SalidaEmergencia: {
                    required: true
                },
                LugarCasoEmergencia: {
                    required: true
                },
                AguaPotable: {
                    required: true
                },
                RecoleccionResiduos: {
                    required: true
                },
                HoraTerminacion: {
                    required: true
                },
                NombreEncuestado: {
                    required: true
                },
                CedulaEncuestado: {
                    required: true
                },
                Firma: {
                    required: true
                },

    
 });



    function Atras() {
        window.history.back();
    }

async function CreateobjEncuesta() {

    let Cedula = $('#NumeroIdentificacionEncuestado').val();
    //Get_Data(Guardar, '/TrabajadoresIndependientes/BuscarEncuestador?Identificacion=' + Cedula);
    let data = await ExisteEncuesta(Guardar, '/TrabajadoresIndependientes/BuscarEncuestador?Identificacion=' + Cedula);
    if (!data.Error) {
        Guardar();
    } else
        Swal({
            icon: 'error',
            title: 'Error...',
            text: 'Ha ocurrido un error, esta encuesta no existe!',
        })
        

    
}


function Guardar(data) {

    if (data?.objeto != null || data?.objeto != undefined) {
        swal({
            title: "Atención",
            text: "El usuario ya fue encuestado",
            type: "warning",
            /*showCancelButton: true,*/
            /*   confirmButtonClass: "btn-danger",*/
            confirmButtonText: "Ok",
        });
        return;
    } else {
        if (validadorFormUsuario.form()) {

            console.log($('input:radio[name=AfiliacionActualEncuestado]:checked').val())

            if (VerDetalles == "SI") {
                Atras();
            }
            else {
                var test = $('#NumIde').val();
                var IdSitic = 0;
                if (IsUpdate) {
                    IdSitic = idEncuestaData;

                }
                document.getElementById("SaveEncuestaTrabajadores").disabled = true;
                ObjEncuenstaTrabajadores = {
                    SiticEncuestaTrabajadores: {
                        IdSitic: IdSitic,
                        AfiliacionActualEncuestado: $('input:radio[name=AfiliacionActualEncuestado]:checked').val(),
                        FechaEncuesta: $('#FechaEncuesta').val(),
                        HoraInicioEncuesta: $('#HoraInicioEncuesta').val(),
                        TipoDocumentoEncuestador: $('#TipoDocumentoEncuestador').val(),
                        NumeroIdentificacionEncuestador: $('#NumeroIdentificacionEncuestador').val(),
                        TrabajadoInformal: $('#TrabajadoInformal').val(),
                        DepartamentoEncuestador: $('#DepartamentoEncuestador').val(),
                        MunicipioEncuestador: $('#MunicipioEncuestador').val(),
                        ClaseMunicipioEncuestador: $('#ClaseMunicipioEncuestador').val(),
                        TipoDocumentoEncuestado: $('#TipoDocumentoEncuestado').val(),
                        NumeroIdentificacionEncuestado: $('#NumeroIdentificacionEncuestado').val(),
                        FechaNacimiento: $('#FechaNacimiento').val(),
                        PrimerNombre: $('#PrimerNombre').val(),
                        SegundoNombre: $('#SegundoNombre').val(),
                        PrimerApellido: $('#PrimerApellido').val(),
                        SegundoApellido: $('#SegundoApellido').val(),
                        Direccion: $('#Direccion').val(),
                        UsuarioRegistro: $('#UsuarioRegistro').val(),

                    },
                    DemoEncuestaTrabajadores: {
                        //IdSocioDemograficos: IdSocioDemograficos, 
                        Genero: $('#Genero').val(),
                        EstadoCivil: $('#EstadoCivil').val(),
                        NivelEscolar: $('#NivelEscolar').val(),
                        OtroNivelEscolar: $('#OtroNivelEscolar').val(),
                        AñosAprobados: $('#AñosAprobados').val(),
                        CabezaFamilia: $('#CabezaFamilia').val(),
                        EconomiaFamilia: $('#EconomiaFamilia').val(),
                        DependenciaFamiliar: $('#DependenciaFamiliar').val(),
                        DependenciaMenores: $('#DependenciaMenores').val(),
                        TipoPoblacion: $('#TipoPoblacion').val(),
                        //OtraPoblacion: $('#OtraPoblacion').val(),
                        CondicionesTrabajo: $('#CondicionesTrabajo').val(),
                        OcupacionActual: $('#OcupacionActual').val(),
                        MotivoDesplazamiento: $('#MotivoDesplazamiento').val(),
                        //OtroDesplazamiento: $('#OtroDesplazamiento').val(),
                        IdSitic: $('#IdSitic').val(),


                    },
                    EcoEncuestaTrabajadores: {

                        //IdSocioEconomicos: IdSocioEconomicos,
                        ActividadEconomicaEconomico: $('#ActividadEconomicaEconomico').val(),
                        //CualActividadEconomica: $('#CualActividadEconomica').val(),
                        TipoVivienda: $('#TipoVivienda').val(),
                        DireccionOcupacion: $('#DireccionOcupacion').val(),
                        Energia: $('#Energia').val(),
                        Acueducto: $('#Acueducto').val(),
                        Alcantarillado: $('#Alcantarillado').val(),
                        TelefonoFijo: $('#TelefonoFijo').val(),
                        TieneCelular: $('#TieneCelular').val(),
                        ProductosVenta: $('#ProductosVenta').val(),
                        TiempoOficio: $('#TiempoOficio').val(),
                        JornadaLaborarl: $('#JornadaLaborarl').val(),
                        HorasTrabajo: $('#HorasTrabajo').val(),
                        DiasSemanal: $('#DiasSemanal').val(),
                        IngesosMensuales: $('#IngesosMensuales').val(),
                        IdSitic: $('#IdSitic').val(),
                    },

                    SocialEncuestaTrabajadores: {
                        //IdSeguridadSocial: IdSeguridadSocial,
                        AfiliadoSeguridad: $('#AfiliadoSeguridad').val(),
                        RegimenAfiliado: $('#RegimenAfiliado').val(),
                        RegimenSalud: $('#RegimenSalud').val(),
                        EpsAfiliado: $('#EpsAfiliado').val(),
                        Pensiones: $('#Pensiones').val(),
                        Afp: $('#Afp').val(),
                        IdSitic: $('#IdSitic').val(),
                    },
                    VidaEncuestaTrabajadores: {
                        //IdEstiloVida: IdEstiloVida,
                        Peso: $('#Peso').val(),
                        Estatura: $('#Estatura').val(),
                        ActividadFisica: $('#ActividadFisica').val(),
                        DiasSemana: $('#DiasSemana').val(),
                        HorasPractica: $('#HorasPractica').val(),
                        EncuestadoFuma: $('#EncuestadoFuma').val(),
                        ConsumeLicor: $('#ConsumeLicor').val(),
                        SustanciasPsicoactivas: $('#SustanciasPsicoactivas').val(),
                        CualSustancia: $('#CualSustancia').val(),
                        DietaFrutas: $('#DietaFrutas').val(),
                        FrecuenciaFrutas: $('#FrecuenciaFrutas').val(),
                        IdSitic: $('#IdSitic').val(),

                    },

                    SaludEncuestaTrabajadores: {

                        //IdCondicionesSalud: IdCondicionesSalud,
                        EstadoSalud: $('#EstadoSalud').val(),
                        SaludFisica: $('#SaludFisica').val(),
                        SaludMental: $('#SaludMental').val(),
                        SaludPsicologica: $('#SaludPsicologica').val(),
                        ActividadNormalFisica: $('#ActividadNormalFisica').val(),
                        CausaActividadFisica: $('#CausaActividadFisica').val(),
                        AccidenteLaborar: $('#AccidenteLaborar').val(),
                        AccidenteOrigen: $('#AccidenteOrigen').val(),
                        AccidneteTrabajoActividad: $('#AccidneteTrabajoActividad').val(),
                        EnfermedadOrigen: $('#EnfermedadOrigen').val(),
                        EnfermedadOrigenOcupacional: $('#EnfermedadOrigenOcupacional').val(),
                        LesionesOcurridad: $('#LesionesOcurridad').val(),
                        ParteCuerpoLesion: $('#ParteCuerpoLesion').val(),
                        AgenteAccidente: $('#AgenteAccidente').val(),
                        MecanismoAccidente: $('#MecanismoAccidente').val(),
                        InformoAccidente: $('#InformoAccidente').val(),
                        NoInformoAccidente: $('#NoInformoAccidente').val(),
                        ActorInformoAccidente: $('#ActorInformoAccidente').val(),
                        IncapacidadAccidente: $('#IncapacidadAccidente').val(),
                        CostosAccidente: $('#CostosAccidente').val(),
                        TramiteEnfermedad: $('#TramiteEnfermedad').val(),
                        EnfermedadDiagnosticada: $('#EnfermedadDiagnosticada').val(),
                        CausaDiscapacidad: $('#CausaDiscapacidad').val(),
                        TipoDiscapacidad: $('#TipoDiscapacidad').val(),
                        IdSitic: $('#IdSitic').val(),

                    },
                    TrabajoEncuestaTrabajadores: {

                        //IdCondicionesTrabajo: IdCondicionesTrabajo,
                        CondicionTrabajo: $('#CondicionTrabajo').val(),
                        PeligrosFisico: $('#PeligrosFisico').val(),
                        PeligrosPsicosocial: $('#PeligrosPsicosocial').val(),
                        Peligrosbiologico: $('#Peligrosbiologico').val(),
                        CondicionesSeguridad: $('#CondicionesSeguridad').val(),
                        PeligrosBiomecanicos: $('#PeligrosBiomecanicos').val(),
                        PeligrosQuimicos: $('#PeligrosQuimicos').val(),
                        FenomenosNatural: $('#FenomenosNatural').val(),
                        ElementosProteccion: $('#ElementosProteccion').val(),
                        ProteccionCabeza: $('#ProteccionCabeza').val(),
                        ProteccionOcular: $('#ProteccionOcular').val(),
                        ProteccionAuditiva: $('#ProteccionAuditiva').val(),
                        ProteccionRespiratoria: $('#ProteccionRespiratoria').val(),
                        ExtremidadesSuperiores: $('#ExtremidadesSuperiores').val(),
                        ExtremidadesInferiores: $('#ExtremidadesInferiores').val(),
                        OtrosElementos: $('#OtrosElementos').val(),
                        RopaTrabajo: $('#RopaTrabajo').val(),
                        EmergenciaEncuestado: $('#EmergenciaEncuestado').val(),
                        CasoEmergencia: $('#CasoEmergencia').val(),
                        Extintores: $('#Extintores').val(),
                        Botiquin: $('#Botiquin').val(),
                        RutaEvacuacion: $('#RutaEvacuacion').val(),
                        SalidaEmergencia: $('#SalidaEmergencia').val(),
                        LugarCasoEmergencia: $('#LugarCasoEmergencia').val(),
                        AguaPotable: $('#AguaPotable').val(),
                        RecoleccionResiduos: $('#RecoleccionResiduos').val(),
                        HoraTerminacion: $('#HoraTerminacion').val(),
                        NombreEncuestado: $('#NombreEncuestado').val(),
                        CedulaEncuestado: $('#CedulaEncuestado').val(),
                        Firma: $('#draw-dataUrl').val(),
                        IdSitic: $('#IdSitic').val(),


                    },
                }

                let id = 10;

                if (IsUpdate) {
                    Save_Data(ActualizarVista, '/TrabajadoresIndependientes/Actualizar', ObjEncuenstaTrabajadores, 'Actualizacion');
                }
                else {
                    Save_Data(ActualizarVista, '/TrabajadoresIndependientes/Agregar', ObjEncuenstaTrabajadores, 'Guardado');

                    // LimpiarFormulario()
                }
            }

        } else {
            swal({
                title: "Atención",
                text: "¿Debes completar todos los registros de la encuesta?",
                type: "warning",
                /*showCancelButton: true,*/
                /*   confirmButtonClass: "btn-danger",*/
                confirmButtonText: "Ok",
                /*cancelButtonText: "No",*/
                /* closeOnConfirm: false,*/
                /*closeOnCancel: false*/
            },
                function (isConfirm) {
                    if (isConfirm) {
                        swal.close()
                        /*Get_Data(RecargarTabla, '/CitasMedicas/Eliminar?IdCitasDepor=' + IdCitasMed);*/
                    }
                    else {
                        swal.close()
                    }
                });

        }


    }


    
}





    function ActualizarVista(data) {
        if (!data.Error) {
            window.location.href = "../TrabajadoresIndependientes/ListaTrabajadoresIndependientes"
        }
    }


    function LimpiarFormulario() {

        $('#IdSitic').val('')
        $('#AfiliacionActualEncuestado').val('')
        $('#FechaEncuesta').val('')
        $('#HoraInicioEncuesta').val('')
        $('#TipoDocumentoEncuestador').val('')
        $('#NumeroIdentificacionEncuestador').val('')
        $('#TrabajadoInformal').val('')
        $('#DepartamentoEncuestador').val('')
        $('#MunicipioEncuestador').val('')
        $('#ClaseMunicipioEncuestador').val('')
        $('#TipoDocumentoEncuestado').val('')
        $('#NumeroIdentificacionEncuestado').val('')
        $('#FechaNacimiento').val('')
        $('#PrimerNombre').val('')
        $('#SegundoNombre').val('')
        $('#PrimerApellido').val('')
        $('#SegundoApellido').val('')
        $('#Direccion').val('')
        $('#UsuarioRegistro').val('')
        $('#Genero').val('')
        $('#EstadoCivil').val('')
        $('#NivelEscolar').val('')
        $('#OtroNivelEscolar').val('')
        $('#AñosAprobados').val('')
        $('#CabezaFamilia').val('')
        $('#EconomiaFamilia').val('')
        $('#DependenciaFamiliar').val('')
        $('#DependenciaMenores').val('')
        $('#TipoPoblacion').val('')
        $('#OtraPoblacion').val('')
        $('#CondicionesTrabajo').val('')
        $('#OcupacionActual').val('')
        $('#MotivoDesplazamiento').val('')
        $('#OtroDesplazamiento').val('')
        $('#ActividadEconomicaEconomico').val('')
        $('#CualActividadEconomica').val('')
        $('#TipoVivienda').val('')
        $('#DireccionOcupacion').val('')
        $('#Energia').val('')
        $('#Acueducto').val('')
        $('#Alcantarillado').val('')
        $('#TelefonoFijo').val('')
        $('#TieneCelular').val('')
        $('#ProductosVenta').val('')
        $('#TiempoOficio').val('')
        $('#JornadaLaborarl').val('')
        $('#HorasTrabajo').val('')
        $('#DiasSemanal').val('')
        $('#IngesosMensuales').val('')
        $('#AfiliadoSeguridad').val('')
        $('#RegimenAfiliado').val('')
        $('#RegimenSalud').val('')
        $('#EpsAfiliado').val('')
        $('#Pensiones').val('')
        $('#Afp').val('')
        $('#Peso').val('')
        $('#Estatura').val('')
        $('#ActividadFisica').val('')
        $('#DiasSemana').val('')
        $('#HorasPractica').val('')
        $('#EncuestadoFuma').val('')
        $('#ConsumeLicor').val('')
        $('#SustanciasPsicoactivas').val('')
        $('#CualSustancia').val('')
        $('#DietaFrutas').val('')
        $('#FrecuenciaFrutas').val('')
        $('#EstadoSalud').val('')
        $('#SaludFisica').val('')
        $('#SaludMental').val('')
        $('#SaludPsicologica').val('')
        $('#ActividadNormalFisica').val('')
        $('#CausaActividadFisica').val('')
        $('#AccidenteLaborar').val('')
        $('#AccidenteOrigen').val('')
        $('#AccidneteTrabajoActividad').val('')
        $('#EnfermedadOrigen').val('')
        $('#EnfermedadOrigenOcupacional').val('')
        $('#LesionesOcurridad').val('')
        $('#ParteCuerpoLesion').val('')
        $('#AgenteAccidente').val('')
        $('#MecanismoAccidente').val('')
        $('#InformoAccidente').val('')
        $('#NoInformoAccidente').val('')
        $('#ActorInformoAccidente').val('')
        $('#IncapacidadAccidente').val('')
        $('#CostosAccidente').val('')
        $('#TramiteEnfermedad').val('')
        $('#EnfermedadDiagnosticada').val('')
        $('#CausaDiscapacidad').val('')
        $('#CondicionTrabajo').val('')
        $('#PeligrosFisico').val('')
        $('#PeligrosPsicosocial').val('')
        $('#Peligrosbiologico').val('')
        $('#CondicionesSeguridad').val('')
        $('#PeligrosBiomecanicos').val('')
        $('#PeligrosQuimicos').val('')
        $('#FenomenosNatural').val('')
        $('#ElementosProteccion').val('')
        $('#ProteccionCabeza').val('')
        $('#ProteccionOcular').val('')
        $('#ProteccionAuditiva').val('')
        $('#ProteccionRespiratoria').val('')
        $('#ExtremidadesSuperiores').val('')
        $('#ExtremidadesInferiores').val('')
        $('#OtrosElementos').val('')
        $('#RopaTrabajo').val('')
        $('#EmergenciaEncuestado').val('')
        $('#CasoEmergencia').val('')
        $('#Extintores').val('')
        $('#Botiquin').val('')
        $('#RutaEvacuacion').val('')
        $('#SalidaEmergencia').val('')
        $('#LugarCasoEmergencia').val('')
        $('#AguaPotable').val('')
        $('#RecoleccionResiduos').val('')
        $('#HoraTerminacion').val('')
        $('#NombreEncuestado').val('')
        $('#CedulaEncuestado').val('')
        $('#Firma').val('')

    }


