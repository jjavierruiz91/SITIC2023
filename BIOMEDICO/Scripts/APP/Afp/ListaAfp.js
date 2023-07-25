var tablaAfpEncuesta = [];
$(document).ready(function () {

    RenderTable('datatable-afp', [0, 1, 2, 3,4], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,

        "dom": '<"top"flB>rt<"bottom"ip><"clear">',

    });

    tablaAfpEncuesta = $('#datatable-afp').DataTable();
    Get_Data(CargarTabla, '/Afp/GetListAfp')

});

function CargarTabla(data) {
    tablaAfpEncuesta.clear().draw();
    let AfpEncuesta = data.objeto;
    console.log(AfpEncuesta);
    $.each(AfpEncuesta, function (index, item) {
        tablaAfpEncuesta.row.add([
            item.IdePS,
            item.TipoAdministradora,
            item.Código,
            item.Administradora,

            //    '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdePS + ')" ></i>&ensp;' +
            ////    '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdePS + ')"></i>'
            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdePS + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdePS + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdePS + ')" ></i>&ensp;'
        ]).draw(false);





    });
}


function ActualizardEportistaData(idAfpData) {
    window.location.href = '/Afp/Agregar?IdReg=' + idAfpData;

}
function DetalleData(idAfpData) {
    window.location.href = '/Afp/Agregar?IdReg=' + idAfpData + "&Viewdetail=SI";

}




function RecargarTabla() {
    Get_Data(CargarTabla, '/Afp/GetListAfp')
}