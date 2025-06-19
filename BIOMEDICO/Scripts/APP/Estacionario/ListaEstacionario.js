var TablaEstacionario = [];
$(document).ready(function () {
    // Ajustar RenderTable para incluir todas las columnas (0-5 visibles, 6-55 ocultas, 56 para acciones)
    RenderTable('datatable-Estacionario', [0, 1, 2, 3, 4, 5], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        "columnDefs": [
            {
                // Ocultar columnas: desde la 6 hasta la 55 (NO la columna de acciones que es la 56)
                "targets": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
                "visible": false
            }
        ],
        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
                filename: "InformeAccidente",
                titleAttr: 'Excel',
                exportOptions: {
                    // Incluye todas las columnas excepto la de acciones (índice 56)
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
                }
            },
            {
                extend: 'pdfHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
                filename: "InformeAccidente",
                titleAttr: 'Pdf',
                exportOptions: {
                    // Solo columnas visibles para PDF (excluye ocultas y acciones)
                    columns: [0, 1, 2, 3, 4, 5]
                }
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
            // Columnas originales visibles (0-5)
            item.NombresEstacionario || '',
            item.ApellidosEstacionario || '',
            item.MunicipioEstacionario || '',
            item.FormaTrabajadorEstacionario || '',
            item.TipoIdentificacionEstacionario || '',
            item.NumeroIdentificacionEstacionario || '',

            // Campos originales ocultos (6-37)
            item.FechaNacimientoEstacionario == undefined ? '' : JSONDateconverter(item.FechaNacimientoEstacionario),
            item.OficioEstacionario || '',
            item.SexoEstacionario || '',
            item.EducacionEstacionario || '',
            item.PoblacionEstacionario || '',
            item.CondicionEstacionario || '',
            item.OrgnizacionSocialEstacionario || '',
            item.SeguridadSocialEstacionario || '',
            item.AntiguedadTrabajoEstacionario || '',
            item.JornadaEstacionario || '',
            item.HorasDiasEstacionario || '',
            item.DiasSemanaEstacionario || '',
            item.DesplazamientoEstacionario || '',
            item.EnfermedadEstacionario || '',
            item.SustaniaEstacionario || '',
            item.AlcoholEstacionario || '',
            item.ActividadFisicaEstacionario || '',
            item.HorasDuermeEstacionario || '',
            item.FrutasVerdurasEstacionario || '',
            item.ComportamientoEstacionario || '',
            item.SintomasEstacionario || '',
            item.AcidenteEstacionario || '',
            item.DiscapacidadEstacionario || '',
            item.SeguridadEstacionario || '',
            item.PeligroFisicoEstacionario || '',
            item.PeligroBiomecanicoEstacionario || '',
            item.PeligroQuimicoEstacionario || '',
            item.PeligroBiologicoEstacionario || '',
            item.PeligroPsicosocialEstacionario || '',
            item.AguaEstacionario || '',
            item.ExcretaEstacionario || '',
            item.ResiduosEstacionario || '',
            item.CombustibleEstacionario || '',

            // Nuevos campos agregados (38-55) - Todos ocultos
            item.OcupacionEstacionario || '',
            item.LugarTrabajoViviendaEstacionario || '',
            item.PersonaContactoEstacionario || '',
            item.TelefonoEstacionario || '',
            item.DireccionTrabajoEstacionario || '',
            item.ActividadEconomicaEstacionario || '',
            item.AguaConsumoEstacionario || '',
            item.TratamientoAguaEstacionario || '',
            item.AlmacenamientoAguaEstacionario || '',
            item.ResiduosSolidosEstacionario || '',
            item.AguasResidualesEstacionario || '',
            item.UsoQuimicosEstacionario || '',
            item.AlmacenanQuimicosEstacionario || '',
            item.GeneranResiduosPeligrososEstacionario || '',
            item.DisponenResiduosPeligrososEstacionario || '',
            item.PlagasEstacionario || '',
            item.AnimalesVenenososEstacionario || '',
            item.RiesgosAnimalesVenenososEstacionario || '',

            // Columna de acciones (56) - Visible
            '<i class="btn btn-lg btn-success" title="Imprimir" onclick="Imprimir(' + item.IdEstacionario + ')"><i class="fas fa-print"></i></i>'
        ]).draw(false);
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