var ObjAmbulanteSemiestacionario = {
    AmbulanteSemiestacionarioSport: {}//{objetos} llaves y [array] corchetes

}
//var validadorFormDeportista = [];
var IsUpdate = false;
var AmbulanteSemiestacionarioData = 0;
var VerDetalles = 'NO';
var formCitas = [];
$(document).ready(function () {//FUNCION INICIAL;
    let DocumentoAmbulanteSemiestacionario = getQueryVariable('Document');
    VerDetalles = getQueryVariable('Viewdetail');
    AmbulanteSemiestacionarioData = getQueryVariable('IdReg');
    //Get_DataGet(CargarSelectSucursales, '/Sucursal/GetListSucursalesPasaporte');

    if (DocumentoAmbulanteSemiestacionario > 0) {
        IsUpdate = true;
        CargarInfoCita(DocumentoAmbulanteSemiestacionario);
    }

    //initValidador();

});

//function initValidador() {
//    formCitas = Validador("FormCitasMedicasDeportiva2", {
//        NumeroDocumento: {
//            required: true,
//            StringEmpty: true
//        }
//    }
//    );
//}

//function ValidarCedula() {
//    let Cedula = $('#NumeroDocumento').val();
//    Get_Data(MostrarAlerta, '/InformeAccidenteTrabajo/BuscarCedulaPass?Identificacion=' + Cedula)
//}


//function MostrarAlerta(data) {

//    if (data != null || data != undefined) {
//        swal({
//            title: "El usuario ya tiene un registro en el formulario.!",
//            text: "No se pueden diligenciar dos formulario",
//            type: "warning",
//            /*showCancelButton: true,*/
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Gracias por su visita",
//           /* cancelButtonText: "No, jamás",*/
//            closeOnConfirm: false,
//            closeOnCancel: false
            
//        },
         
//            function (isConfirm) {
//                if (isConfirm) {
//                    swal("¡Gobernacion del cesar!",
//                        "Gracias por utilizar nuestros servicios",
//                        "success");
//                    timer: 90000000
                    
//                } else {
//                    swal("¡Gobernacion del cesar!",
//                        "Gracias por utilizar nuestros servicios",
//                        "error");
                    
//                }
//                window.location.href = 'https://localhost:44379/InformeAccidenteTrabajo/Agregar';
//            });
        
////                
//    }
    
//}

    



//function CargarInfoCita(Documento) {
//    Get_Data(LlenarDatosformularioInformeAccidenteTrabajo, '/InformeAccidenteTrabajo/BuscarCitas?Ducumento=' + Documento)
//}

//function LlenarDatosformularioInformeAccidenteTrabajo(data) {
//    $('#TipoSolicitudPasaporte').val(data.objeto.TipoSolicitudPasaporte);
//    $('#TipoSolicitudPasaporte')[0].disabled = true;
//    $('#TipoDocumentoPasaporte').val(data.objeto.TipoDocumentoPasaporte);
//    $('#TipoDocumentoPasaporte')[0].disabled = true;
//    $('#NumeroDocumento').val(data.objeto.NumeroDocumento);
//    $('#NumeroDocumento')[0].disabled = true;
//    $('#TipoPasaporte').val(data.objeto.TipoPasaporte);
//    $('#TipoPasaporte')[0].disabled = true;
//    $('#FechaExpedicionDocumento').val(JSONDateconverter(data.objeto.FechaExpedicionDocumento));
//    $('#FechaExpedicionDocumento')[0].disabled = true;

//    $('#NombresPasaporte').val(data.objeto.NombresPasaporte);
//    $('#NombresPasaporte')[0].disabled = true;
//    $('#ApellidosPasaporte').val(data.objeto.ApellidosPasaporte);
//    $('#ApellidosPasaporte')[0].disabled = true;
//    $('#CelularPasaporte').val(data.objeto.CelularPasaporte);
//    $('#CelularPasaporte')[0].disabled = true;
//    $('#CorreoPasaporte').val(data.objeto.CorreoPasaporte);
//    $('#CorreoPasaporte')[0].disabled = true;
//    $('#CorreoPasaporteRepeated').val(data.objeto.CorreoPasaporteRepeated);
//    $('#CorreoPasaporteRepeated')[0].disabled = true;
//    $('#ParentescoMenor').val(data.objeto.ParentescoMenor);
//    $('#ParentescoMenor')[0].disabled = true;
//    $('#CuantosMenores').val(data.objeto.CuantosMenores);
//    $('#CuantosMenores')[0].disabled = true;
//    IdAmbulanteSemiestacionarioData = data.objeto.IdAmbulanteSemiestacionario;
//}


//function CargarInfoinicial() {
//    var ValueCitaPasaporte = $('#NumeroDocumento').val();
//    Get_Data(LlenarcamposInicial, '/InformeAccidenteTrabajo/BuscarCitas?Ducumento=' + ValueCitaPasaporte)
//}



//function LlenarcamposInicial(data) {

//    if (data.objeto == null) {

//        /*swal("Good job!", "You clicked the button!", "success");*/
//        swal({
//            title: "Oficina Politica Social",
//            text: "Usted no tiene registros!",
//            type: "warning",
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Muchas Gacias!",


//        });

//        return;



//    }
//    $('#TipoSolicitudPasaporte').val(data.objeto.TipoSolicitudPasaporte);
//    $('#TipoDocumentoPasaporte').val(data.objeto.TipoDocumentoPasaporte);
//    $('#NumIdentificacion').val(data.objeto.NumIdentificacion);
//    $('#Fecha').val(JSONDateconverter(data.objeto.Fecha));
//    $('#Hora').val(data.objeto.Hora +" : " + data.objeto.Minutos); 
//    /*$('#Minutos').val(data.objeto.Minutos);*/
   
    
//    $('#NombresPasaporte').val(data.objeto.NombresPasaporte);
//    $('#ApellidosPasaporte').val(data.objeto.ApellidosPasaporte);
//    $('#CelularPasaporte').val(data.objeto.CelularPasaporte);
//    $('#CorreoPasaporte').val(data.objeto.CorreoPasaporte);
    
   
//    $('#IdCitas').val(data.objeto.IdAmbulanteSemiestacionario);
//    Alternar(ConsultaPasaporte);
//}

//function LlenarCampos(data) {
//    $('#NombresPasaporte').val(data.objeto.NombresPasaporte);
//    $('#ApellidosPasaporte').val(data.objeto.ApellidosPasaporte);

//    CargarInfoinicial();
//}

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

function CreateobjAmbulanteSemiestacionario() {

    

        // if (validadorFormMedicinaDeportiva.form()) {
        if (VerDetalles == "SI") {
            Atras();
        }
        else {

            var IdAmbulanteSemiestacionario = 0;
            if (IsUpdate) {
                IdAmbulanteSemiestacionario = AmbulanteSemiestacionarioData;
            }
            ObjAmbulanteSemiestacionario = {
                AmbulanteSemiestacionarioSport: {


                    IdAmbulanteSemiestacionario: IdAmbulanteSemiestacionario,
                    FechaAmbulanteSemiestacionario: $('#FechaAmbulanteSemiestacionario').val(),
                    FormaTrabajoAmbulanteAmbulanteSemiestacionario: $('#FormaTrabajoAmbulanteAmbulanteSemiestacionario').val(),
                    MunicipicioAmbulanteSemiestacionario: $('#MunicipicioAmbulanteSemiestacionario').val(),
                    AmbitoTerritorialAmbulanteSemiestacionario: $('#AmbitoTerritorialAmbulanteSemiestacionario').val(),
                    NombresAmbulanteSemiestacionario: $('#NombresAmbulanteSemiestacionario').val(),
                    ApellidosAmbulanteSemiestacionario: $('#ApellidosAmbulanteSemiestacionario').val(),
                    TipoIdentificacionAmbulanteSemiestacionario: $('#TipoIdentificacionAmbulanteSemiestacionario').val(),
                    NumeroIDAmbulanteSemiestacionario: $('#NumeroIDAmbulanteSemiestacionario').val(),
                    FechaNacimientoAmbulanteSemiestacionario: $('#FechaNacimientoAmbulanteSemiestacionario').val(),
                    OficioAmbulanteSemiestacionario: $('#OficioAmbulanteSemiestacionario').val(),
                    SexoAmbulanteSemiestacionario: $('#SexoAmbulanteSemiestacionario').val(),
                    EducacionAmbulanteSemiestacionario: $('#EducacionAmbulanteSemiestacionario').val(),
                    PoblacionAmbulanteSemiestacionario: $('#PoblacionAmbulanteSemiestacionario').val(),
                    CondicionAmbulanteSemiestacionario: $('#CondicionAmbulanteSemiestacionario').val(),
                    OrgnizacionSocialAmbulanteSemiestacionario: $('#OrgnizacionSocialAmbulanteSemiestacionario').val(),
                    SeguridadSocialAmbulanteSemiestacionario: $('#SeguridadSocialAmbulanteSemiestacionario').val(),
                    AntiguedadTrabajoAmbulanteSemiestacionario: $('#AntiguedadTrabajoAmbulanteSemiestacionario').val(),
                    JornadaAmbulanteSemiestacionario: $('#JornadaAmbulanteSemiestacionario').val(),
                    HorasDiasAmbulanteSemiestacionario: $('#HorasDiasAmbulanteSemiestacionario').val(),
                    DiasSemanaAmbulanteSemiestacionario: $('#DiasSemanaAmbulanteSemiestacionario').val(),
                    DesplazamientoAmbulanteSemiestacionario: $('#DesplazamientoAmbulanteSemiestacionario').val(),
                    EnfermedadAmbulanteSemiestacionario: $('#EnfermedadAmbulanteSemiestacionario').val(),
                    SustaniaAmbulanteSemiestacionario: $('#SustaniaAmbulanteSemiestacionario').val(),
                    AlcoholAmbulanteSemiestacionario: $('#AlcoholAmbulanteSemiestacionario').val(),
                    ActividadFisicaAmbulanteSemiestacionario: $('#ActividadFisicaAmbulanteSemiestacionario').val(),
                    HorasDuermeAmbulanteSemiestacionario: $('#HorasDuermeAmbulanteSemiestacionario').val(),
                    FrutasVerdurasAmbulanteSemiestacionario: $('#FrutasVerdurasAmbulanteSemiestacionario').val(),
                    ComportamientoAmbulanteSemiestacionario: $('#ComportamientoAmbulanteSemiestacionario').val(),
                    SintomasAmbulanteSemiestacionario: $('#SintomasAmbulanteSemiestacionario').val(),
                    AcidenteAmbulanteSemiestacionario: $('#AcidenteAmbulanteSemiestacionario').val(),
                    DiscapacidadAmbulanteSemiestacionario: $('#DiscapacidadAmbulanteSemiestacionario').val(),
                    SeguridadAmbulanteSemiestacionario: $('#SeguridadAmbulanteSemiestacionario').val(),
                    PeligroFisicoAmbulanteSemiestacionario: $('#PeligroFisicoAmbulanteSemiestacionario').val(),
                    PeligroBiomecanicoAmbulanteSemiestacionario: $('#PeligroBiomecanicoAmbulanteSemiestacionario').val(),
                    PeligroQuimicoAmbulanteSemiestacionario: $('#PeligroQuimicoAmbulanteSemiestacionario').val(),
                    PeligroBiologicoAmbulanteSemiestacionario: $('#PeligroBiologicoAmbulanteSemiestacionario').val(),
                    PeligroPsicosocialAmbulanteSemiestacionario: $('#PeligroPsicosocialAmbulanteSemiestacionario').val(),
                    AguaAmbulanteSemiestacionario: $('#AguaAmbulanteSemiestacionario').val(),
                    ExcretaAmbulanteSemiestacionario: $('#ExcretaAmbulanteSemiestacionario').val(),
                    ResiduosAmbulanteSemiestacionario: $('#ResiduosAmbulanteSemiestacionario').val(),
                    CombustibleAmbulanteSemiestacionario: $('#CombustibleAmbulanteSemiestacionario').val()
                    
                    

       
        


                }
            }
            let id = 10;

            if (IsUpdate) {
                swal({
                    title: "Atención",
                    text: "¿Estas seguro de actualizar el formulario ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            swal.close()
                            Save_Data(ActualizarVista, '/AmbulanteSemiestacionario/EditarInformeAccidenteTrabajo', ObjAmbulanteSemiestacionario, 'Actualizacion');
                            /*window.location.href = 'http://127.0.0.1:5501/index.html';*/
                        }
                        else {
                            swal.close()
                        }
                    });


            }
            else {
                Save_Data(ActualizarVista, '/AmbulanteSemiestacionario/Agregar', ObjAmbulanteSemiestacionario, 'Guardado');
                /*window.location.href = 'http://127.0.0.1:5501/index.html';*/

                // LimpiarFormulario()
            }

            //} else {
            //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
            //}

        

    }
}
function ActualizarVista() {
    window.location.reload();
}

//function RenderUpdateCita(viewfree) {

//    window.location.href = "../InformeAccidenteTrabajo/agregar?ViewFree=" + viewfree + "&Document=" + $('#NumeroDocumento').val();

//}

//function CancelarCita() {
//    swal({
//        title: "Atención",
//        text: "¿Estas seguro de cancelar la cita ?",
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
//                Get_Data(reloadPage, "/InformeAccidenteTrabajo/ActualizarEstadoCancelar?IdCitaPasaporte=" + $('#IdCitas').val())
//            }
//            else {
//                swal.close()
//            }
//        });


//}


function reloadPage() {
    window.location.reload();
}


//function LimpiarFormulario() {

//    $('#IdAmbulanteSemiestacionario').val('')
//    $('#Sucursales').val('')
//    $('#FechaCalen').val('')
//    $('#Hora').val('')
//    $('#Minutos').val(''),
//        $('#Segundos').val('')


//}


//function validarCorreo() {
//    var correoElectronico = document.getElementById("CorreoElectronico").value;
//    var expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//    if (!expresionRegular.test(correoElectronico)) {
//        alert("Por favor, ingrese un correo electrónico válido.");
//    }
//}
