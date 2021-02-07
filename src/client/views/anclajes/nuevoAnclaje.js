getValorConstruccion=function(){
  var cantidad=0;
  var valorConstruccion=11506.82;
  var indice=$("#indiceAjuste").val();
  if(indice==="")indice=1;
  if($("#estadoNO").is(':checked'))cantidad++;
  if($("#estadoNE").is(':checked'))cantidad++;
  if($("#estadoSO").is(':checked'))cantidad++;
  if($("#estadoSE").is(':checked'))cantidad++;
  return cantidad*valorConstruccion*indice;
};
getValorEnsayo=function(){
  var cantidad=0;
  var valorEnsayo=4139.15;
  var indice=$("#indiceAjuste").val();
    if(indice==="")indice=1;
  if($("#a_estadoNO").is(':checked'))cantidad++;
  if($("#a_estadoNE").is(':checked'))cantidad++;
  if($("#a_estadoSO").is(':checked'))cantidad++;
  if($("#a_estadoSE").is(':checked'))cantidad++;
  return cantidad*valorEnsayo*indice;
};
Template.nuevoAnclaje.rendered=function(){
  
}
Template.nuevoAnclaje.events({
  "click #btnAceptar":function()
  {
    UIBlock.block('Aguarde un momento...');
  },
  //********************indice
  'keyup #indiceAjuste': function(){
         var valorConstruccion=getValorConstruccion();
        var valorEnsayo=getValorEnsayo();
      $("#valorAnclaje").val(valorConstruccion.toFixed(2));
     $("#valorEnsayo").val(valorEnsayo.toFixed(2));
    },
  //***********CONSTRUCCION
    'click #estadoNO': function(){
         var valorConstruccion=getValorConstruccion();
      $("#valorAnclaje").val(valorConstruccion.toFixed(2));
    },
  'click #estadoNE': function(){
         var valorConstruccion=getValorConstruccion();
      $("#valorAnclaje").val(valorConstruccion.toFixed(2));
    },
  'click #estadoSO': function(){
         var valorConstruccion=getValorConstruccion();
      $("#valorAnclaje").val(valorConstruccion.toFixed(2));
    },
  'click #estadoSE': function(){
         var valorConstruccion=getValorConstruccion();
      $("#valorAnclaje").val(valorConstruccion.toFixed(2));
    },
  // ENSAYO***************************
  'click #a_estadoNO': function(){
         var valor=getValorEnsayo();
      $("#valorEnsayo").val(valor.toFixed(2));
    },
  'click #a_estadoNE': function(){
         var valor=getValorEnsayo();
      $("#valorEnsayo").val(valor.toFixed(2));
    },
  'click #a_estadoSO': function(){
         var valor=getValorEnsayo();
      $("#valorEnsayo").val(valor.toFixed(2));
    },
  'click #a_estadoSE': function(){
         var valor=getValorEnsayo();
      $("#valorEnsayo").val(valor.toFixed(2));
    },
});
Template.nuevoAnclaje.helpers({
   "usuario":function(){
    return Meteor.user()._id;
   }
});

AutoForm.hooks({
  'nuevoAnclaje_': {

    onSuccess: function (operation, result, template) {
      UIBlock.unblock();
       Modal.hide();
      swal({   title: "Genial!",   text: "Y ahora.. deseas cargar otro anclaje?",   type: "success",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Cargar Nuevo!",   closeOnConfirm: true }, function(){
        Modal.show("nuevoAnclaje")
      });

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'nuevoAnclajeEquipo_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Y ahora.. deseas cargar otro equipo?",   type: "success",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Cargar Nuevo!",   closeOnConfirm: true }, function(){
        Modal.show("nuevoEquipoAnclaje")
      });

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'modificarAnclaje_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha modificado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'modificarAnclajeEquipo_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha modificado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
});