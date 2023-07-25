var tablaEpsEncuesta = [];
$(document).ready(function () {

    RenderTable('datatable-eps', [0, 1, 2, 3 ], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,

        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
                
    });

    tablaEpsEncuesta = $('#datatable-eps').DataTable();
    Get_Data(CargarTabla, '/Eps/GetListEps')

});

function CargarTabla(data) {
    tablaEpsEncuesta.clear().draw();
    let EpsEncuesta = data.objeto;
    console.log(EpsEncuesta);
    $.each(EpsEncuesta, function (index, item) {
        tablaEpsEncuesta.row.add([
            item.IdePS,
            item.CodEps,
            item.NomEps,
           
            //    '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdePS + ')" ></i>&ensp;' +
            ////    '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdePS + ')"></i>'
            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdePS + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdePS + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdePS + ')" ></i>&ensp;'
        ]).draw(false);





    });
}


function ActualizardEportistaData(idEpsData) {
    window.location.href = '/Eps/Agregar?IdReg=' + idEpsData;

}
function DetalleData(idEpsData) {
    window.location.href = '/Eps/Agregar?IdReg=' + idEpsData + "&Viewdetail=SI";

}




function RecargarTabla() {
    Get_Data(CargarTabla, '/Eps/GetListEps')
}