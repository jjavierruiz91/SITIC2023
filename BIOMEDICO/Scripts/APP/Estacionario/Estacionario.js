﻿var ObjEstacionario = {
    EstacionarioSport: {}//{objetos} llaves y [array] corchetes

}
//var validadorFormDeportista = [];
var IsUpdate = false;
var EstacionarioData = 0;
var VerDetalles = 'NO';
var formCitas = [];
$(document).ready(function () {//FUNCION INICIAL;
    let DocumentoEstacionario = getQueryVariable('Document');
    VerDetalles = getQueryVariable('Viewdetail');
    EstacionarioData = getQueryVariable('IdReg');
    //Get_DataGet(CargarSelectSucursales, '/Sucursal/GetListSucursalesPasaporte');

    if (DocumentoEstacionario > 0) {
        IsUpdate = true;
        CargarInfoCita(DocumentoEstacionario);
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
//    IdEstacionarioData = data.objeto.IdEstacionario;
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
    
   
//    $('#IdCitas').val(data.objeto.IdEstacionario);
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

function CreateObjEstacionario() {

    

        // if (validadorFormMedicinaDeportiva.form()) {
        if (VerDetalles == "SI") {
            Atras();
        }
        else {

            var IdEstacionario = 0;
            if (IsUpdate) {
                IdEstacionario = EstacionarioData;
            }
            ObjEstacionario = {
                EstacionarioSport: {


                    IdEstacionario: IdEstacionario,
                    FechaEstacionario: $('#FechaEstacionario').val(),
                    FormaTrabajadorEstacionario: $('#FormaTrabajadorEstacionario').val(),
                    MunicipioEstacionario: $('#MunicipioEstacionario').val(),
                    AmbitoTerritorioEstacionario: $('#AmbitoTerritorioEstacionario').val(),
                    NombresEstacionario: $('#NombresEstacionario').val(),
                    ApellidosEstacionario: $('#ApellidosEstacionario').val(),
                    TipoIdentificacionEstacionario: $('#TipoIdentificacionEstacionario').val(),
                    NumeroIdentificacionEstacionario: $('#NumeroIdentificacionEstacionario').val(),
                    FechaNacimientoEstacionario: $('#FechaNacimientoEstacionario').val(),
                    OcupacionEstacionario: $('#OcupacionEstacionario').val(),
                    LugarTrabajoViviendaEstacionario: $('#LugarTrabajoViviendaEstacionario').val(),
                    PersonaContactoEstacionario: $('#PersonaContactoEstacionario').val(),
                    TelefonoEstacionario: $('#TelefonoEstacionario').val(),
                    DireccionTrabajoEstacionario: $('#DireccionTrabajoEstacionario').val(),
                    ActividadEconomicaEstacionario: $('#ActividadEconomicaEstacionario').val(),
                    AguaConsumoEstacionario: $('#AguaConsumoEstacionario').val(),
                    TratamientoAguaEstacionario: $('#TratamientoAguaEstacionario').val(),
                    AlmacenamientoAguaEstacionario: $('#AlmacenamientoAguaEstacionario').val(),
                    ExcretaEstacionario: $('#ExcretaEstacionario').val(),
                    ResiduosEstacionario: $('#ResiduosEstacionario').val(),
                    ResiduosSolidosEstacionario: $('#ResiduosSolidosEstacionario').val(),
                    AguasResidualesEstacionario: $('#AguasResidualesEstacionario').val(),
                    CombustibleEstacionario: $('#CombustibleEstacionario').val(),
                    UsoQuimicosEstacionario: $('#UsoQuimicosEstacionario').val(),
                    AlmacenanQuimicosEstacionario: $('#AlmacenanQuimicosEstacionario').val(),
                    GeneranResiduosPeligrososEstacionario: $('#GeneranResiduosPeligrososEstacionario').val(),
                    DisponenResiduosPeligrososEstacionario: $('#DisponenResiduosPeligrososEstacionario').val(),
                    PlagasEstacionario: $('#PlagasEstacionario').val(),
                    AnimalesVenenososEstacionario: $('#AnimalesVenenososEstacionario').val(),
                    RiesgosAnimalesVenenososEstacionario: $('#RiesgosAnimalesVenenososEstacionario').val(),



                    SexoEstacionario: $('#SexoEstacionario').val(),
                    EducacionEstacionario: $('#EducacionEstacionario').val(),
                    PoblacionEstacionario: $('#PoblacionEstacionario').val(),
                    CondicionEstacionario: $('#CondicionEstacionario').val(),
                    OrgnizacionSocialEstacionario: $('#OrgnizacionSocialEstacionario').val(),
                    SeguridadSocialEstacionario: $('#SeguridadSocialEstacionario').val(),
                    AntiguedadTrabajoEstacionario: $('#AntiguedadTrabajoEstacionario').val(),
                    JornadaEstacionario: $('#JornadaEstacionario').val(),
                    HorasDiasEstacionario: $('#HorasDiasEstacionario').val(),
                    DiasSemanaEstacionario: $('#DiasSemanaEstacionario').val(),
                    DesplazamientoEstacionario: $('#DesplazamientoEstacionario').val(),
                    EnfermedadEstacionario: $('#EnfermedadEstacionario').val(),
                    SustaniaEstacionario: $('#SustaniaEstacionario').val(),
                    AlcoholEstacionario: $('#AlcoholEstacionario').val(),
                    ActividadFisicaEstacionario: $('#ActividadFisicaEstacionario').val(),
                    HorasDuermeEstacionario: $('#HorasDuermeEstacionario').val(),
                    FrutasVerdurasEstacionario: $('#FrutasVerdurasEstacionario').val(),
                    ComportamientoEstacionario: $('#ComportamientoEstacionario').val(),
                    SintomasEstacionario: $('#SintomasEstacionario').val(),
                    AcidenteEstacionario: $('#AcidenteEstacionario').val(),
                    DiscapacidadEstacionario: $('#DiscapacidadEstacionario').val(),
                    SeguridadEstacionario: $('#SeguridadEstacionario').val(),
                    PeligroFisicoEstacionario: $('#PeligroFisicoEstacionario').val(),
                    PeligroBiomecanicoEstacionario: $('#PeligroBiomecanicoEstacionario').val(),
                    PeligroQuimicoEstacionario: $('#PeligroQuimicoEstacionario').val(),
                    PeligroBiologicoEstacionario: $('#PeligroBiologicoEstacionario').val(),
                    PeligroPsicosocialEstacionario: $('#PeligroPsicosocialEstacionario').val(),

       
        


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
                            Save_Data(ActualizarVista, '/Estacionario/EditarInformeAccidenteTrabajo', ObjEstacionario, 'Actualizacion');
                            /*window.location.href = 'http://127.0.0.1:5501/index.html';*/
                        }
                        else {
                            swal.close()
                        }
                    });


            }
            else {
                Save_Data(ActualizarVista, '/Estacionario/Agregar', ObjEstacionario, 'Guardado');
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

//    $('#IdEstacionario').val('')
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
