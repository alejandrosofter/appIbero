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
Template.modificarAnclaje.events({
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
Template.modificarAnclaje.helpers({
    'zonas': function(){
         return [
          {label: "AH", value: "AH"},
            {label: "BV", value: "BV"},
            {label: "CL", value: "CL"},
            {label: "CM", value: "CM"},
            {label: "COV", value: "COV"},
            {label: "CS", value: "CS"},
            {label: "CW", value: "CW"},
            {label: "EC", value: "EC"},
            {label: "EH", value: "EH"},
            {label: "HT", value: "ET"},
            {label: "KK", value: "KK"},
            {label: "LH", value: "LH"},
            {label: "ME", value: "ME"},
            {label: "MS", value: "MS"},
            {label: "MSA", value: "MSA"},
            {label: "PC", value: "PC"},
            {label: "PCX", value: "PCX"},
            {label: "SPC", value: "SPC"},
            {label: "TP", value: "TP"},
           
         ];
    },
   'equipos': function(){
         return [
          {label: "Workover", value: "WO"},
            {label: "Drilling", value: "DR"},
            {label: "Pulling", value: "P"},
           
         ];
    }
});
AutoForm.hooks({
  'modificaAnclaje_': {
    onSuccess: function (operation, result, template) {
       swal("Genial!","Se ha modificado el registro!","success");
      Router.go('/anclajes');
    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
});