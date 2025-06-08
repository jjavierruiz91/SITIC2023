

var TablaEstacionario = [];
$(document).ready(function () {

    RenderTable('datatable-Estacionario', [0, 1, 2, 3, 4, 5,6], null, {
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


    TablaEstacionario = $('#datatable-Estacionario').DataTable();
    Get_Data(CargarTabla, '/Estacionario/GetListEstacionario')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    TablaEstacionario.clear().draw();
    let EstacionarioSport = data.objeto;
    Arraycitasglobal = EstacionarioSport;
    console.log(EstacionarioSport);
    $.each(EstacionarioSport, function (index, item) {
       
            TablaEstacionario.row.add([
                /* item.IdCitasPasaporte,*/
                item.NombresEstacionario,
                item.ApellidosEstacionario,
                item.MunicipioEstacionario,
                item.FormaTrabajadorEstacionario,
                //item.FechaNacimiento == undefined ? '' : JSONDateconverter(item.FechaNacimiento),
                item.TipoIdentificacionEstacionario,
                item.NumeroIdentificacionEstacionario,



                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdEstacionario + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardPoliticaSocial(' + item.IdEstacionario + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdEstacionario + ')" ></i>&ensp;'
            ]).draw(false);

            //var Discapacidad = TablaEstacionario.column(9);
            //var GrupoEtnico = TablaEstacionario.column(10);
            //var VictimaConflictoArmado = TablaEstacionario.column(11);
            //var PoblacionPriorizada = TablaEstacionario.column(12);
            //var CorreoElectronico = TablaEstacionario.column(13);
            //var TelefonoContacto = TablaEstacionario.column(14);
            //var Municipios = TablaEstacionario.column(15);
            //var Zona = TablaEstacionario.column(16);
            //var NivelEscolaridad = TablaEstacionario.column(17);
            //var Profesion = TablaEstacionario.column(18);
            //var AmbienteLudico = TablaEstacionario.column(19);
            //var AmbienteLudicoExpresa = TablaEstacionario.column(20);
            //var AmbienteLudicoCorporal = TablaEstacionario.column(21);
            //var FechaRegistro = TablaEstacionario.column(22);

        
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