var TablaAmbulanteSemiestacionario = [];
$(document).ready(function () {
    TablaAmbulanteSemiestacionario = $('#datatable-AmbulanteSemiestacionario').DataTable({
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        "columnDefs": [
            {
                // Ocultar columnas originales: Oficio y Sexo + todos los nuevos campos (NO la columna de acciones)
                "targets": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                "visible": false
            }
        ],
        buttons: [
            {
                extend: 'excelHtml5',
                text: "   Excel ",
                filename: "InformeAccidente",
                titleAttr: 'Exportar a Excel',
                exportOptions: {
                    // Incluye todas las columnas excepto la de acciones (índice 40)
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
                }
            },
            {
                extend: 'pdfHtml5',
                text: "   PDF ",
                filename: "InformeAccidente",
                titleAttr: 'Exportar a PDF',
                exportOptions: {
                    // Solo columnas visibles para PDF (excluye ocultas y acciones)
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },
        ]
    });
    // Carga los datos
    Get_Data(CargarTabla, '/AmbulanteSemiestacionario/GetListAmbulanteSemiestacionario');
});

var Arraycitasglobal = [];
function CargarTabla(data) {
    TablaAmbulanteSemiestacionario.clear().draw();
    let AmbulanteSemiestacionarioSport = data.objeto;
    Arraycitasglobal = AmbulanteSemiestacionarioSport;
    console.log(AmbulanteSemiestacionarioSport);

    $.each(AmbulanteSemiestacionarioSport, function (index, item) {
        TablaAmbulanteSemiestacionario.row.add([
            // Columnas originales (0-8)
            item.IdAmbulanteSemiestacionario,
            item.NombresAmbulanteSemiestacionario,
            item.ApellidosAmbulanteSemiestacionario,
            item.MunicipicioAmbulanteSemiestacionario,
            item.FormaTrabajoAmbulanteAmbulanteSemiestacionario,
            item.TipoIdentificacionAmbulanteSemiestacionario,
            item.NumeroIDAmbulanteSemiestacionario,
            item.OficioAmbulanteSemiestacionario,
            item.SexoAmbulanteSemiestacionario,

            // Nuevos campos agregados (9-40) - Todos ocultos
            item.FechaNacimientoAmbulanteSemiestacionario == undefined ? '' : JSONDateconverter(item.FechaNacimientoAmbulanteSemiestacionario),
            item.EducacionAmbulanteSemiestacionario,
            item.PoblacionAmbulanteSemiestacionario,
            item.CondicionAmbulanteSemiestacionario,
            item.OrgnizacionSocialAmbulanteSemiestacionario,
            item.SeguridadSocialAmbulanteSemiestacionario,
            item.AntiguedadTrabajoAmbulanteSemiestacionario,
            item.JornadaAmbulanteSemiestacionario,
            item.HorasDiasAmbulanteSemiestacionario,
            item.DiasSemanaAmbulanteSemiestacionario,
            item.DesplazamientoAmbulanteSemiestacionario,
            item.EnfermedadAmbulanteSemiestacionario,
            item.SustaniaAmbulanteSemiestacionario,
            item.AlcoholAmbulanteSemiestacionario,
            item.ActividadFisicaAmbulanteSemiestacionario,
            item.HorasDuermeAmbulanteSemiestacionario,
            item.FrutasVerdurasAmbulanteSemiestacionario,
            item.ComportamientoAmbulanteSemiestacionario,
            item.SintomasAmbulanteSemiestacionario,
            item.AcidenteAmbulanteSemiestacionario,
            item.DiscapacidadAmbulanteSemiestacionario,
            item.SeguridadAmbulanteSemiestacionario,
            item.PeligroFisicoAmbulanteSemiestacionario,
            item.PeligroBiomecanicoAmbulanteSemiestacionario,
            item.PeligroQuimicoAmbulanteSemiestacionario,
            item.PeligroBiologicoAmbulanteSemiestacionario,
            item.PeligroPsicosocialAmbulanteSemiestacionario,
            item.AguaAmbulanteSemiestacionario,
            item.ExcretaAmbulanteSemiestacionario,
            item.ResiduosAmbulanteSemiestacionario,
            item.CombustibleAmbulanteSemiestacionario,

            // Columna de acciones (40) - Visible
            '<i class="btn btn-lg btn-success" title="Imprimir" onclick="Imprimir(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-print"></i></i>'

            //'<i class="btn btn-sm btn-primary" title="Editar" onclick="Editar(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-edit"></i></i>' +
            //' <i class="btn btn-sm btn-danger" title="Eliminar" onclick="Eliminar(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-trash"></i></i>' +
            //' <i class="btn btn-sm btn-info" title="Ver más" onclick="Ver(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-eye"></i></i>'
        ]).draw(false);
    });
}
//var TablaAmbulanteSemiestacionario = [];
//$(document).ready(function () {
//    TablaAmbulanteSemiestacionario = $('#datatable-AmbulanteSemiestacionario').DataTable({
//        "paging": true,
//        "ordering": false,
//        "info": true,
//        "searching": true,
//        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
//        "columnDefs": [
//            {
//                "targets": [7, 8], // Ocultar columnas Oficio y Sexo
//                "visible": false
//            }
//        ],
//        buttons: [
//            {
//                extend: 'excelHtml5',
//                text: "   Excel ",
//                filename: "InformeAccidente",
//                titleAttr: 'Exportar a Excel',
//                exportOptions: {
//                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8] // Incluye columnas ocultas pero NO la de acciones
//                }
//            },
//            {
//                extend: 'pdfHtml5',
//                text: "   PDF ",
//                filename: "InformeAccidente",
//                titleAttr: 'Exportar a PDF',
//                exportOptions: {
//                    columns: [0, 1, 2, 3, 4, 5, 6] // Excluye columnas ocultas y de acciones
//                }
//            },
//        ]
//    });

//    // Carga los datos
//    Get_Data(CargarTabla, '/AmbulanteSemiestacionario/GetListAmbulanteSemiestacionario');
//});

//var Arraycitasglobal = [];

//function CargarTabla(data) {
//    TablaAmbulanteSemiestacionario.clear().draw();
//    let AmbulanteSemiestacionarioSport = data.objeto;
//    Arraycitasglobal = AmbulanteSemiestacionarioSport;
//    console.log(AmbulanteSemiestacionarioSport);

//    $.each(AmbulanteSemiestacionarioSport, function (index, item) {
//        TablaAmbulanteSemiestacionario.row.add([
//            item.IdAmbulanteSemiestacionario,
//            item.NombresAmbulanteSemiestacionario,
//            item.ApellidosAmbulanteSemiestacionario,
//            item.MunicipicioAmbulanteSemiestacionario,
//            item.FormaTrabajoAmbulanteAmbulanteSemiestacionario,
//            item.TipoIdentificacionAmbulanteSemiestacionario,
//            item.NumeroIDAmbulanteSemiestacionario,
//            item.OficioAmbulanteSemiestacionario,
//            item.SexoAmbulanteSemiestacionario,
//            // Columna de acciones con botones visibles
//            '<i class="btn btn-sm btn-primary" title="Editar" onclick="Editar(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-edit"></i></i>' +
//            ' <i class="btn btn-sm btn-danger" title="Eliminar" onclick="Eliminar(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-trash"></i></i>' +
//            ' <i class="btn btn-sm btn-info" title="Ver más" onclick="Ver(' + item.IdAmbulanteSemiestacionario + ')"><i class="fas fa-eye"></i></i>'
//        ]).draw(false);
//    });
//}

//var TablaAmbulanteSemiestacionario = [];
//$(document).ready(function () {

//    RenderTable('datatable-AmbulanteSemiestacionario', [0, 1, 2, 3, 4, 5, 6, 7, 8,9], null, {
//        "paging": true,
//        "ordering": false,
//        "info": true,
//        "searching": true,

//        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
//        //dom: 'frtip',

//        buttons: [
//            {
//                extend: 'excelHtml5',
//                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
//                filename: "InformeAccidente",
//                titleAttr: 'Excel',
//            },
//            {
//                extend: 'pdfHtml5',
//                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
//                filename: "InformeAccidente",
//                titleAttr: 'Pdf',
//            },

//        ]
//    });


//    TablaAmbulanteSemiestacionario = $('#datatable-AmbulanteSemiestacionario').DataTable();
//    Get_Data(CargarTabla, '/AmbulanteSemiestacionario/GetListAmbulanteSemiestacionario')

//});
//var Arraycitasglobal = [];
//function CargarTabla(data) {
//    TablaAmbulanteSemiestacionario.clear().draw();
//    let AmbulanteSemiestacionarioSport = data.objeto;
//    Arraycitasglobal = AmbulanteSemiestacionarioSport;
//    console.log(AmbulanteSemiestacionarioSport);
//    $.each(AmbulanteSemiestacionarioSport, function (index, item) {
       
//            TablaAmbulanteSemiestacionario.row.add([
//                item.IdAmbulanteSemiestacionario,
//                item.NombresAmbulanteSemiestacionario,
//                item.ApellidosAmbulanteSemiestacionario,
//                item.MunicipicioAmbulanteSemiestacionario,
//                item.FormaTrabajoAmbulanteAmbulanteSemiestacionario,
//                //item.FechaNacimiento == undefined ? '' : JSONDateconverter(item.FechaNacimiento),
//                item.TipoIdentificacionAmbulanteSemiestacionario,
//                item.NumeroIDAmbulanteSemiestacionario,
//                item.OficioAmbulanteSemiestacionario,
//                item.SexoAmbulanteSemiestacionario,
                
                       
                    


//                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdAmbulanteSemiestacionario + ')" ></i>&ensp;' +
//                '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardPoliticaSocial(' + item.IdAmbulanteSemiestacionario + ')"></i>&ensp;' +
//                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdAmbulanteSemiestacionario + ')" ></i>&ensp;'
//            ]).draw(false);

        
        
//    });
//}







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