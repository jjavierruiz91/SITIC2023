

var TablaInformeAccidenteTrabajo = [];
$(document).ready(function () {

    RenderTable('datatable-InformeAccidnete', [0, 1, 2, 3, 4, 5,6], null, {
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


    TablaInformeAccidenteTrabajo = $('#datatable-InformeAccidnete').DataTable();
    Get_Data(CargarTabla, '/InformeAccidenteTrabajo/GetListInformeAccidenteTrabajo')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    TablaInformeAccidenteTrabajo.clear().draw();
    let InformeAccidenteTrabajoSport = data.objeto;
    Arraycitasglobal = InformeAccidenteTrabajoSport;
    console.log(InformeAccidenteTrabajoSport);
    $.each(InformeAccidenteTrabajoSport, function (index, item) {
       
            TablaInformeAccidenteTrabajo.row.add([
                /* item.IdCitasPasaporte,*/
                item.PrimerNombre,
                item.SegundoNombre,
                item.PrimerApellido,
                item.SegundoApellido,
                //item.FechaNacimiento == undefined ? '' : JSONDateconverter(item.FechaNacimiento),
                item.TipoIdentificacion,
                item.NumeroIdentificacion,



                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdAccidenteTrabajo + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardPoliticaSocial(' + item.IdAccidenteTrabajo + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdAccidenteTrabajo + ')" ></i>&ensp;'
            ]).draw(false);

            //var Discapacidad = TablaInformeAccidenteTrabajo.column(9);
            //var GrupoEtnico = TablaInformeAccidenteTrabajo.column(10);
            //var VictimaConflictoArmado = TablaInformeAccidenteTrabajo.column(11);
            //var PoblacionPriorizada = TablaInformeAccidenteTrabajo.column(12);
            //var CorreoElectronico = TablaInformeAccidenteTrabajo.column(13);
            //var TelefonoContacto = TablaInformeAccidenteTrabajo.column(14);
            //var Municipios = TablaInformeAccidenteTrabajo.column(15);
            //var Zona = TablaInformeAccidenteTrabajo.column(16);
            //var NivelEscolaridad = TablaInformeAccidenteTrabajo.column(17);
            //var Profesion = TablaInformeAccidenteTrabajo.column(18);
            //var AmbienteLudico = TablaInformeAccidenteTrabajo.column(19);
            //var AmbienteLudicoExpresa = TablaInformeAccidenteTrabajo.column(20);
            //var AmbienteLudicoCorporal = TablaInformeAccidenteTrabajo.column(21);
            //var FechaRegistro = TablaInformeAccidenteTrabajo.column(22);

        
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