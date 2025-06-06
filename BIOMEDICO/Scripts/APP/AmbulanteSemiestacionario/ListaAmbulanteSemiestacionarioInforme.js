

var TablaAmbulanteSemiestacionario = [];
$(document).ready(function () {

    RenderTable('datatable-AmbulanteSemiestacionario', [0, 1, 2, 3, 4, 5,6], null, {
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
                filename: "InformeAccidente",
                titleAttr: 'Excel',
            },
            {
                extend: 'pdfHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
                filename: "InformeAccidente",
                titleAttr: 'Pdf',
            },

        ]
    });


    TablaAmbulanteSemiestacionario = $('#datatable-AmbulanteSemiestacionario').DataTable();
    Get_Data(CargarTabla, '/AmbulanteSemiestacionario/GetListAmbulanteSemiestacionario')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    TablaAmbulanteSemiestacionario.clear().draw();
    let AmbulanteSemiestacionarioSport = data.objeto;
    Arraycitasglobal = AmbulanteSemiestacionarioSport;
    console.log(AmbulanteSemiestacionarioSport);
    $.each(AmbulanteSemiestacionarioSport, function (index, item) {
       
            TablaAmbulanteSemiestacionario.row.add([
                /* item.IdCitasPasaporte,*/
                item.NombresAmbulanteSemiestacionario,
                item.ApellidosAmbulanteSemiestacionario,
                item.MunicipicioAmbulanteSemiestacionario,
                item.FormaTrabajoAmbulanteAmbulanteSemiestacionario,
                //item.FechaNacimiento == undefined ? '' : JSONDateconverter(item.FechaNacimiento),
                item.TipoIdentificacionAmbulanteSemiestacionario,
                item.NumeroIDAmbulanteSemiestacionario,



                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdAmbulanteSemiestacionario + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardPoliticaSocial(' + item.IdAmbulanteSemiestacionario + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdAmbulanteSemiestacionario + ')" ></i>&ensp;'
            ]).draw(false);

            //var Discapacidad = TablaAmbulanteSemiestacionario.column(9);
            //var GrupoEtnico = TablaAmbulanteSemiestacionario.column(10);
            //var VictimaConflictoArmado = TablaAmbulanteSemiestacionario.column(11);
            //var PoblacionPriorizada = TablaAmbulanteSemiestacionario.column(12);
            //var CorreoElectronico = TablaAmbulanteSemiestacionario.column(13);
            //var TelefonoContacto = TablaAmbulanteSemiestacionario.column(14);
            //var Municipios = TablaAmbulanteSemiestacionario.column(15);
            //var Zona = TablaAmbulanteSemiestacionario.column(16);
            //var NivelEscolaridad = TablaAmbulanteSemiestacionario.column(17);
            //var Profesion = TablaAmbulanteSemiestacionario.column(18);
            //var AmbienteLudico = TablaAmbulanteSemiestacionario.column(19);
            //var AmbienteLudicoExpresa = TablaAmbulanteSemiestacionario.column(20);
            //var AmbienteLudicoCorporal = TablaAmbulanteSemiestacionario.column(21);
            //var FechaRegistro = TablaAmbulanteSemiestacionario.column(22);

        
        //Discapacidad.visible(false);
        // GrupoEtnico.visible(false);
        //  VictimaConflictoArmado.visible(false);
        //  PoblacionPriorizada.visible(false);
        //  CorreoElectronico.visible(false);
        //  TelefonoContacto.visible(false);
        //  Municipios.visible(false);
        //  Zona.visible(false);
        //  NivelEscolaridad.visible(false);
        //  Profesion.visible(false);
        //  AmbienteLudico.visible(false);
        //  AmbienteLudicoExpresa.visible(false);
        //  AmbienteLudicoCorporal.visible(false);
        //  FechaRegistro.visible(false);

        
        
    });
}







function ActualizardPoliticaSocial(idCitasPasport) {
    window.location.href = '../CitasPasaporte/Agregar?IdCitasPasportReg=' + idCitasPasport +'&IsUpdate=true';

}


function DetalleData(idCitasPasport) {
    window.location.href = '../CitasPasaporte/Agregar?IdCitasPasportReg=' + idCitasPasport + "&Viewdetail=SI";

}
//function ActualizarEstadoTramitados(idCitasPasport) {
//    swal({
//        title: "Atención",
//        text: "¿Estas seguro de tramitar la cita ?",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonClass: "btn-danger",
//        confirmButtonText: "Si",
//        cancelButtonText: "No",
//        closeOnConfirm: false,
//        closeOnCancel: false
//    },
//        function (isConfirm) {
//            if (isConfirm) {
//                swal.close()
//                Get_Data(RecargarTabla, '/CitasPasaporte/ActualizarEstadoTramitado?IdCitaPasaporte=' + idCitasPasport);
//            }
//            else {
//                swal.close()
//            }
//        });
//}



//function ActualizarCitasPasapor(idCitasPasport) {
//    swal({
//        title: "Atención",
//        text: "¿Estas seguro de actualizar la cita ?",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonClass: "btn-danger",
//        confirmButtonText: "Si",
//        cancelButtonText: "No",
//        closeOnConfirm: false,
//        closeOnCancel: false
//    },
//        function (isConfirm) {
//            if (isConfirm) {
//                swal.close()
//                Get_Data(RecargarTabla, '/CitasPasaporte/EditarCitasPasaporte?IdCitaPasaporte=' + idCitasPasport);
//            }
//            else {
//                swal.close()
//            }
//        });
//}

function RecargarTabla() {
    Get_Data(CargarTabla, '/InformeAccidenteTrabajo/GetListInformeAccidenteTrabajo')
}