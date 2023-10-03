var tablaEncuestaTrabajadores = [];
$(document).ready(function () {

    RenderTable('datatable-TrabajadoresIndependientes', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
       96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',
        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
                filename: "trabajadores",
                titleAttr: 'Excel',
            },
            {
                text: 'Siguiente',
                action: function (e, dt, node, config) {
                    Get_Data(FillTable, '/TrabajadoresIndependientes/GetListEncuestaTrabajadores?page=' + PaginaSiguiente);
                }
            }
        ]
    });

    tablaEncuestaTrabajadores = $('#datatable-TrabajadoresIndependientes').DataTable();
    Get_Data(FillTable, '/TrabajadoresIndependientes/GetListEncuestaTrabajadores?page=1')
    

});

//var table = $('#datatable-TrabajadoresIndependientes').DataTable();
function FillTable(data) {
    PaginaSiguiente = data.PageNext;
    

    if (SiticEncuestaTrabajadores.length > 0) {
        SiticEncuestaTrabajadores.push(...data.objeto);
    } else {
        SiticEncuestaTrabajadores.push(...data.objeto);
    }
    CargarTabla() 
    
}



var PaginaSiguiente = 0;
let SiticEncuestaTrabajadores = [];
function CargarTabla() {

    tablaEncuestaTrabajadores.clear().draw();
    //SiticEncuestaTrabajadores = data.objeto;
    
    console.log(SiticEncuestaTrabajadores);
    $.each(SiticEncuestaTrabajadores, function (index, item) {
        tablaEncuestaTrabajadores.row.add([
            item.IdSitic,
            item.AfiliacionActualEncuestado,
             item.HoraInicioEncuesta.Hours + ':' + item.HoraInicioEncuesta.Minutes + ':' + item.HoraInicioEncuesta.Seconds,
            item.TipoDocumentoEncuestador,item.NumeroIdentificacionEncuestador,
            
            JSONDateconverter(item.FechaEncuesta),
            
             item.TipoDocumentoEncuestado,
            item.NumeroIdentificacionEncuestado,
            //item.NombreMonitor + " " + item.PrimerApellido,
            item.PrimerNombre + " " +  " " + item.PrimerApellido  ,
            item.TrabajadoInformal,
            item.DepartamentoEncuestador,
            item.MunicipioEncuestador,
                 item.ClaseMunicipioEncuestador,
                 item.TipoDocumentoEncuestado,
                 item.NumeroIdentificacionEncuestado,
                 JSONDateconverter(item.FechaNacimiento),
                 item.PrimerNombre,
                 item.SegundoNombre,
                 item.PrimerApellido,
                 item.SegundoApellido,
                 item.Direccion,

            item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].Genero : "",

                //item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].Genero,
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].EstadoCivil: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].NivelEscolar: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].OtroNivelEscolar: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].AñosAprobados: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].CabezaFamilia: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].EconomiaFamilia: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].DependenciaFamiliar: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].DependenciaMenores: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].TipoPoblacion: "",
                //item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].OtraPoblacion: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].CondicionesTrabajo: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].OcupacionActual: "",
                item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].MotivoDesplazamiento: "",
            //    item.SocioDemograficos.length > 0 ? item.SocioDemograficos[0].OtroDesplazamiento: "",

            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].ActividadEconomicaEconomico : "",

            //item.SocioEconomicos[0].ActividadEconomicaEconomico,
            //item.SocioEconomicos[0].CualActividadEconomica,
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].TipoVivienda : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].DireccionOcupacion : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].Energia : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].Acueducto : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].Alcantarillado : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].TelefonoFijo : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].TieneCelular : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].ProductosVenta : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].TiempoOficio : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].JornadaLaborarl : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].HorasTrabajo : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].DiasSemanal : "",
            item.SocioEconomicos.length > 0 ? item.SocioEconomicos[0].IngesosMensuales : "",


            item.SeguridadSocial.length > 0 ? item.SeguridadSocial[0].AfiliadoSeguridad : "",
            //item.SeguridadSocial[0].AfiliadoSeguridad : "",
            item.SeguridadSocial.length > 0 ? item.SeguridadSocial[0].RegimenAfiliado : "",
            item.SeguridadSocial.length > 0 ? item.SeguridadSocial[0].RegimenSalud : "",
            item.SeguridadSocial.length > 0 ? item.SeguridadSocial[0].EpsAfiliado : "",
            item.SeguridadSocial.length > 0 ? item.SeguridadSocial[0].Pensiones : "",
            item.SeguridadSocial.length > 0 ? item.SeguridadSocial[0].Afp : "",


            item.EstiloVida.length > 0 ? item.EstiloVida[0].Peso : "",
            //item.EstiloVida[0].Peso : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].Estatura : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].ActividadFisica : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].DiasSemana : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].HorasPractica : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].EncuestadoFuma : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].ConsumeLicor : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].SustanciasPsicoactivas : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].CualSustancia : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].DietaFrutas : "",
            item.EstiloVida.length > 0 ? item.EstiloVida[0].FrecuenciaFrutas : "",


            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].EstadoSalud : "",
            //item.CondicionesSalud[0].EstadoSalud : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].SaludFisica : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].SaludMental : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].SaludPsicologica : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].ActividadNormalFisica : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].CausaActividadFisica : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].AccidenteLaborar : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].AccidenteOrigen : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].AccidneteTrabajoActividad : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].EnfermedadOrigen : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].EnfermedadOrigenOcupacional : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].LesionesOcurridad : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].ParteCuerpoLesion : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].AgenteAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].MecanismoAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].InformoAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].NoInformoAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].ActorInformoAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].IncapacidadAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].CostosAccidente : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].TramiteEnfermedad : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].EnfermedadDiagnosticada : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].CausaDiscapacidad : "",
            item.CondicionesSalud.length > 0 ? item.CondicionesSalud[0].TipoDiscapacidad : "",

            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].CondicionTrabajo : "",
            //item.CondicionesTrabajo[0].CondicionTrabajo : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].PeligrosFisico : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].PeligrosPsicosocial : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].Peligrosbiologico : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].CondicionesSeguridad : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].PeligrosBiomecanicos : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].PeligrosQuimicos : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].FenomenosNatural : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ElementosProteccion : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ProteccionCabeza : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ProteccionOcular : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ProteccionAuditiva : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ProteccionRespiratoria : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ExtremidadesSuperiores : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].ExtremidadesInferiores : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].OtrosElementos : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].RopaTrabajo : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].EmergenciaEncuestado : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].CasoEmergencia : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].Extintores : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].Botiquin : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].RutaEvacuacion : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].SalidaEmergencia : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].LugarCasoEmergencia : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].AguaPotable : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].RecoleccionResiduos : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].HoraTerminacion.Hours + ':' + item.HoraInicioEncuesta.Minutes + ':' + item.HoraInicioEncuesta.Seconds : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].NombreEncuestado : "",
            item.CondicionesTrabajo.length > 0 ? item.CondicionesTrabajo[0].CedulaEncuestado : "",
           /* item.CondicionesTrabajo[0].Firma : "",*/


            //    '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdSitic + ')" ></i>&ensp;' +
            //    '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdSitic + ')"></i>'
            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdSitic + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdSitic + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdSitic + ')" ></i>&ensp;' +
            '<i class="btn btn-danger btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdSitic + ')" ></i>&ensp;'
        ]).draw(false);
      
        var IdSitic = tablaEncuestaTrabajadores.column(0);
        var AfiliacionActualEncuestado = tablaEncuestaTrabajadores.column(1);
        var HoraInicioEncuesta = tablaEncuestaTrabajadores.column(2);

        var TrabajadoInformal = tablaEncuestaTrabajadores.column(9);
        var DepartamentoEncuestador = tablaEncuestaTrabajadores.column(10);
        var MunicipioEncuestador = tablaEncuestaTrabajadores.column(11);
        var ClaseMunicipioEncuestador = tablaEncuestaTrabajadores.column(12);
        var TipoDocumentoEncuestado = tablaEncuestaTrabajadores.column(13);
        var NumeroIdentificacionEncuestado = tablaEncuestaTrabajadores.column(14);
        var FechaNacimiento = tablaEncuestaTrabajadores.column(15);
        var PrimerNombre = tablaEncuestaTrabajadores.column(16);
        var SegundoNombre = tablaEncuestaTrabajadores.column(17);
        var PrimerApellido = tablaEncuestaTrabajadores.column(18);
        var SegundoApellido = tablaEncuestaTrabajadores.column(19);
        var Direccion = tablaEncuestaTrabajadores.column(20);

       var Genero= tablaEncuestaTrabajadores.column(21);
           var EstadoCivil= tablaEncuestaTrabajadores.column(22);
           var NivelEscolar= tablaEncuestaTrabajadores.column(23);
           var OtroNivelEscolar= tablaEncuestaTrabajadores.column(24);
           var AñosAprobados= tablaEncuestaTrabajadores.column(25);
           var CabezaFamilia= tablaEncuestaTrabajadores.column(26);
           var EconomiaFamilia= tablaEncuestaTrabajadores.column(27);
           var DependenciaFamiliar= tablaEncuestaTrabajadores.column(28);
           var DependenciaMenores= tablaEncuestaTrabajadores.column(29);
           var TipoPoblacion= tablaEncuestaTrabajadores.column(30);
           //var OtraPoblacion= tablaEncuestaTrabajadores.column(31);
           var CondicionesTrabajo= tablaEncuestaTrabajadores.column(31);
           var OcupacionActual= tablaEncuestaTrabajadores.column(32);
           var MotivoDesplazamiento= tablaEncuestaTrabajadores.column(33);
           //var OtroDesplazamiento= tablaEncuestaTrabajadores.column(35);

        var ActividadEconomicaEconomico= tablaEncuestaTrabajadores.column(34);
            //var CualActividadEconomica= tablaEncuestaTrabajadores.column(37);
            var TipoVivienda= tablaEncuestaTrabajadores.column(35);
            var DireccionOcupacion= tablaEncuestaTrabajadores.column(36);
            var Energia= tablaEncuestaTrabajadores.column(37);
            var Acueducto= tablaEncuestaTrabajadores.column(38);
            var Alcantarillado= tablaEncuestaTrabajadores.column(39);
            var TelefonoFijo= tablaEncuestaTrabajadores.column(40);
            var TieneCelular= tablaEncuestaTrabajadores.column(41);
            var ProductosVenta= tablaEncuestaTrabajadores.column(42);
            var TiempoOficio= tablaEncuestaTrabajadores.column(43);
            var JornadaLaborarl= tablaEncuestaTrabajadores.column(44);
            var HorasTrabajo= tablaEncuestaTrabajadores.column(45);
            var DiasSemanal= tablaEncuestaTrabajadores.column(46);
            var IngesosMensuales= tablaEncuestaTrabajadores.column(47);
            var AfiliadoSeguridad= tablaEncuestaTrabajadores.column(48);
            var RegimenAfiliado= tablaEncuestaTrabajadores.column(49);
            var RegimenSalud= tablaEncuestaTrabajadores.column(50);
            var EpsAfiliado= tablaEncuestaTrabajadores.column(51);
            var Pensiones= tablaEncuestaTrabajadores.column(52);
            var Afp= tablaEncuestaTrabajadores.column(53);
            var Peso= tablaEncuestaTrabajadores.column(54);
            var Estatura= tablaEncuestaTrabajadores.column(55);
            var ActividadFisica= tablaEncuestaTrabajadores.column(56);
            var DiasSemana= tablaEncuestaTrabajadores.column(57);
            var HorasPractica= tablaEncuestaTrabajadores.column(58);
            var EncuestadoFuma= tablaEncuestaTrabajadores.column(59);
            var ConsumeLicor= tablaEncuestaTrabajadores.column(60);
            var SustanciasPsicoactivas= tablaEncuestaTrabajadores.column(61);
            var CualSustancia= tablaEncuestaTrabajadores.column(62);
            var DietaFrutas= tablaEncuestaTrabajadores.column(63);
            var FrecuenciaFrutas= tablaEncuestaTrabajadores.column(64);
            var EstadoSalud= tablaEncuestaTrabajadores.column(65);
            var SaludFisica= tablaEncuestaTrabajadores.column(66);
            var SaludMental= tablaEncuestaTrabajadores.column(67);
            var SaludPsicologica= tablaEncuestaTrabajadores.column(68);
            var ActividadNormalFisica= tablaEncuestaTrabajadores.column(69);
            var CausaActividadFisica= tablaEncuestaTrabajadores.column(70);
            var AccidenteLaborar= tablaEncuestaTrabajadores.column(71);
            var AccidenteOrigen= tablaEncuestaTrabajadores.column(72);
            var AccidneteTrabajoActividad= tablaEncuestaTrabajadores.column(73);
            var EnfermedadOrigen= tablaEncuestaTrabajadores.column(74);
            var EnfermedadOrigenOcupacional= tablaEncuestaTrabajadores.column(75);
            var LesionesOcurridad= tablaEncuestaTrabajadores.column(76);
            var ParteCuerpoLesion= tablaEncuestaTrabajadores.column(77);
            var AgenteAccidente= tablaEncuestaTrabajadores.column(78);
            var MecanismoAccidente= tablaEncuestaTrabajadores.column(79);
            var InformoAccidente= tablaEncuestaTrabajadores.column(80);
            var NoInformoAccidente= tablaEncuestaTrabajadores.column(81);
            var ActorInformoAccidente= tablaEncuestaTrabajadores.column(82);
            var IncapacidadAccidente= tablaEncuestaTrabajadores.column(83);
            var CostosAccidente= tablaEncuestaTrabajadores.column(84);
            var TramiteEnfermedad= tablaEncuestaTrabajadores.column(85);
            var EnfermedadDiagnosticada= tablaEncuestaTrabajadores.column(86);
            var CausaDiscapacidad= tablaEncuestaTrabajadores.column(87);
            var TipoDiscapacidad= tablaEncuestaTrabajadores.column(88);
           var CondicionTrabajo= tablaEncuestaTrabajadores.column(89);
           var PeligrosFisico= tablaEncuestaTrabajadores.column(90);
           var PeligrosPsicosocial= tablaEncuestaTrabajadores.column(91);
           var Peligrosbiologico= tablaEncuestaTrabajadores.column(92);
           var CondicionesSeguridad= tablaEncuestaTrabajadores.column(93);
           var PeligrosBiomecanicos= tablaEncuestaTrabajadores.column(94);
           var PeligrosQuimicos= tablaEncuestaTrabajadores.column(95);
           var FenomenosNatural= tablaEncuestaTrabajadores.column(96);
           var ElementosProteccion= tablaEncuestaTrabajadores.column(97);
           var ProteccionCabeza= tablaEncuestaTrabajadores.column(98);
           var ProteccionOcular= tablaEncuestaTrabajadores.column(99);
           var ProteccionAuditiva= tablaEncuestaTrabajadores.column(100);
           var ProteccionRespiratoria= tablaEncuestaTrabajadores.column(101);
           var ExtremidadesSuperiores= tablaEncuestaTrabajadores.column(102);
           var ExtremidadesInferiores= tablaEncuestaTrabajadores.column(103);
           var OtrosElementos= tablaEncuestaTrabajadores.column(104);
           var RopaTrabajo= tablaEncuestaTrabajadores.column(105);
           var EmergenciaEncuestado= tablaEncuestaTrabajadores.column(106);
           var CasoEmergencia= tablaEncuestaTrabajadores.column(107);
           var Extintores= tablaEncuestaTrabajadores.column(108);
           var Botiquin= tablaEncuestaTrabajadores.column(109);
           var RutaEvacuacion= tablaEncuestaTrabajadores.column(110);
           var SalidaEmergencia= tablaEncuestaTrabajadores.column(111);
           var LugarCasoEmergencia= tablaEncuestaTrabajadores.column(112);
           var AguaPotable= tablaEncuestaTrabajadores.column(113);
           var RecoleccionResiduos= tablaEncuestaTrabajadores.column(114);
           var HoraTerminacion = tablaEncuestaTrabajadores.column(115);
           var NombreEncuestado= tablaEncuestaTrabajadores.column(116);
           var CedulaEncuestado= tablaEncuestaTrabajadores.column(117);

        IdSitic.visible(false);
        AfiliacionActualEncuestado.visible(false);
        HoraInicioEncuesta.visible(false);

        TrabajadoInformal.visible(false);
        DepartamentoEncuestador.visible(false);
        MunicipioEncuestador.visible(false);
        ClaseMunicipioEncuestador.visible(false);
        TipoDocumentoEncuestado.visible(false);
        NumeroIdentificacionEncuestado.visible(false);
        FechaNacimiento.visible(false);
        PrimerNombre.visible(false);
        SegundoNombre.visible(false);
        PrimerApellido.visible(false);
        SegundoApellido.visible(false);
        Direccion.visible(false);
        
        
         Genero.visible(false);
         EstadoCivil.visible(false);
         NivelEscolar.visible(false);
         OtroNivelEscolar.visible(false);
         AñosAprobados.visible(false);
         CabezaFamilia.visible(false);
         EconomiaFamilia.visible(false);
         DependenciaFamiliar.visible(false);
         DependenciaMenores.visible(false);
         TipoPoblacion.visible(false);
         //OtraPoblacion.visible(false);
         CondicionesTrabajo.visible(false);
         OcupacionActual.visible(false);
         MotivoDesplazamiento.visible(false);
         //OtroDesplazamiento.visible(false);



         ActividadEconomicaEconomico.visible(false);
         //CualActividadEconomica.visible(false);
         TipoVivienda.visible(false);
         DireccionOcupacion.visible(false);
         Energia.visible(false);
         Acueducto.visible(false);
         Alcantarillado.visible(false);
         TelefonoFijo.visible(false);
         TieneCelular.visible(false);
         ProductosVenta.visible(false);
         TiempoOficio.visible(false);
         JornadaLaborarl.visible(false);
         HorasTrabajo.visible(false);
         DiasSemanal.visible(false);
         IngesosMensuales.visible(false);
         AfiliadoSeguridad.visible(false);
         RegimenAfiliado.visible(false);
         RegimenSalud.visible(false);
         EpsAfiliado.visible(false);
         Pensiones.visible(false);
         Afp.visible(false);
         Peso.visible(false);
         Estatura.visible(false);
         ActividadFisica.visible(false);
         DiasSemana.visible(false);
         HorasPractica.visible(false);
         EncuestadoFuma.visible(false);
         ConsumeLicor.visible(false);
         SustanciasPsicoactivas.visible(false);
         CualSustancia.visible(false);
         DietaFrutas.visible(false);
         FrecuenciaFrutas.visible(false);
         EstadoSalud.visible(false);
         SaludFisica.visible(false);
         SaludMental.visible(false);
         SaludPsicologica.visible(false);
         ActividadNormalFisica.visible(false);
         CausaActividadFisica.visible(false);
         AccidenteLaborar.visible(false);
         AccidenteOrigen.visible(false);
         AccidneteTrabajoActividad.visible(false);
         EnfermedadOrigen.visible(false);
         EnfermedadOrigenOcupacional.visible(false);
         LesionesOcurridad.visible(false);
         ParteCuerpoLesion.visible(false);
         AgenteAccidente.visible(false);
         MecanismoAccidente.visible(false);
         InformoAccidente.visible(false);
         NoInformoAccidente.visible(false);
         ActorInformoAccidente.visible(false);
         IncapacidadAccidente.visible(false);
         CostosAccidente.visible(false);
         TramiteEnfermedad.visible(false);
         EnfermedadDiagnosticada.visible(false);
         CausaDiscapacidad.visible(false);
         TipoDiscapacidad.visible(false);
         CondicionTrabajo.visible(false);
         PeligrosFisico.visible(false);
         PeligrosPsicosocial.visible(false);
         Peligrosbiologico.visible(false);
         CondicionesSeguridad.visible(false);
         PeligrosBiomecanicos.visible(false);
         PeligrosQuimicos.visible(false);
         FenomenosNatural.visible(false);
         ElementosProteccion.visible(false);
         ProteccionCabeza.visible(false);
         ProteccionOcular.visible(false);
         ProteccionAuditiva.visible(false);
         ProteccionRespiratoria.visible(false);
         ExtremidadesSuperiores.visible(false);
         ExtremidadesInferiores.visible(false);
         OtrosElementos.visible(false);
         RopaTrabajo.visible(false);
         EmergenciaEncuestado.visible(false);
         CasoEmergencia.visible(false);
         Extintores.visible(false);
         Botiquin.visible(false);
         RutaEvacuacion.visible(false);
         SalidaEmergencia.visible(false);
         LugarCasoEmergencia.visible(false);
         AguaPotable.visible(false);
         RecoleccionResiduos.visible(false);
         HoraTerminacion.visible(false);
            NombreEncuestado.visible(false);
         CedulaEncuestado.visible(false);
        

        

    });
   
}

function PDFBLANK() {
    var formURL = '/Report?tipo=ECB';
    window.open(formURL, "_blank");
}
function VerPdf(IdEncTrabj) {
    var formURL = '/Report?tipo=EC' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}

function ActualizardEportistaData(IdEncTrabj) {
    window.location.href = '/TrabajadoresIndependientes/Agregar?IdReg=' + IdEncTrabj;

}
function DetalleData(IdEncTrabj) {
    window.location.href = '/TrabajadoresIndependientes/Agregar?IdReg=' + IdEncTrabj + "&Viewdetail=SI";

}

function Buscar() {
    let FechaInicio = $('#FechaInicio').val();
    let FechaFin = $('#FechaFin').val();
    let Municipio = $('#Municipio').val();
    Get_Data(FillTableBuscar, '/TrabajadoresIndependientes/GetListEncuestaTrabajadores?page=1&Fechainicio=' + FechaInicio + '&Fechafin=' + FechaFin + '&Municipio=' + Municipio)

}

function FillTableBuscar(data) {
    SiticEncuestaTrabajadores = [];
    PaginaSiguiente = data.PageNext;


    if (SiticEncuestaTrabajadores.length > 0) {
        SiticEncuestaTrabajadores.push(...data.objeto);
    } else {
        SiticEncuestaTrabajadores.push(...data.objeto);
    }
    CargarTabla()

}

