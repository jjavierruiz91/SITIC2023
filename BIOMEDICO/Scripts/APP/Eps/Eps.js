var ObjEps = {
    EpsEncuesta: {}//{objetos} llaves y [array] corchetes

}

//var validadorFormDeportista = [];
var IsUpdate = false;
var idEpsData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idEpsData = getQueryVariable('IdReg');
    VerDetalles = getQueryVariable('Viewdetail');
       if (idEpsData > 0) {
        IsUpdate = true;
    }
    if (VerDetalles == "SI") {
        $('#SaveEps').html('Atras')
        Get_Data(LlenarCampos, '/Eps/GetEpsById?IdEpsEnc=' + idEpsData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveEps').html('Actualizar')
        Get_Data(LlenarCampos, '/Eps/GetEpsById?IdEpsEnc=' + idEpsData);
    }

});



function LlenarCampos(data) {
        
$('#IdePS').val(data.objeto.IdePS);
$('#CodEps').val(data.objeto.CodEps);
$('#NomEps').val(data.objeto.NomEps);
 
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
        var IdePS = 0;
        if (IsUpdate) {
            IdePS = idEpsData;
        }
        ObjEps = {
            EpsEncuesta: {
                IdePS: IdePS,
                CodEps: $('#CodEps').val(),
                NomEps: $('#NomEps').val(),
              
               
            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/Eps/Actualizar', ObjEps, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/Eps/Agregar', ObjEps, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Eps/ListaEps"
    }
}


function LimpiarFormulario() {

    $('#IdePS').val('')
    $('#CodEps').val('')
    $('#NomEps').val('')
 }