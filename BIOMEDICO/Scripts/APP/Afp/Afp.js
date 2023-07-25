var ObjAfp = {
    AfpEncuesta: {}//{objetos} llaves y [array] corchetes

}


//var validadorFormDeportista = [];
var IsUpdate = false;
var idAfpData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idAfpData = getQueryVariable('IdReg');
    VerDetalles = getQueryVariable('Viewdetail');
    if (idAfpData > 0) {
        IsUpdate = true;
    }
    if (VerDetalles == "SI") {
        $('#SaveAfp').html('Atras')
        Get_Data(LlenarCampos, '/Eps/GetEpsById?IdAfpEnc=' + idAfpData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveAfp').html('Actualizar')
        Get_Data(LlenarCampos, '/Eps/GetEpsById?IdAfpEnc=' + idAfpData);
    }

});



function LlenarCampos(data) {

     
    $('#IdAfp').val(data.objeto.IdAfp);
    $('#TipoAdministradora').val(data.objeto.TipoAdministradora);
    $('#Código').val(data.objeto.Código);
    $('#Administradora').val(data.objeto.Administradora);

}

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

function Atras() {
    window.history.back();
}

function Createobj() {
    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdAfp = 0;
        if (IsUpdate) {
            IdAfp = idAfpData;
        }
        ObjEps = {
            EpsEncuesta: {
                IdAfp: IdAfp,
                TipoAdministradora: $('#TipoAdministradora').val(),
                Código: $('#Código').val(),
                Administradora: $('#Administradora').val(),

            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/Afp/Actualizar', ObjAfp, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/Afp/Agregar', ObjAfp, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Afp/ListaAfp"
    }
}


function LimpiarFormulario() {
    
    $('#IdAfp').val('')
    $('#TipoAdministradora').val('')
    $('#Código').val('')
    $('#Administradora').val('')
}
