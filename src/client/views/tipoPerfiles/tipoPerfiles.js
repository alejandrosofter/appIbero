Template.tipoPerfiles.rendered=function(){
  Meteor.subscribe('TipoPerfiles');
}
function getId()
{
  return new Date().getTime().toString().substr(4)
}

Template.nuevoTipoPerfiles.helpers({
  "id":function(){
    return getId()
  }
})

Template.tipoPerfiles.events({
  'mouseover tr': function(ev) {
    $(".table").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },
'click #btnAgregar': function(ev) {
    Modal.show("nuevoTipoPerfiles");
  },
  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){ TipoPerfiles.remove(id); swal("Quitado!", "El registro ha sido borrado", "success"); });

  },
  'click .update': function(ev) {
    var data=this;
    Modal.show("modificarTipoPerfiles",function(e){
      return data;
    })
  },
 

});

function buscarIndice(busca)
{
  var arr=Session.get("personalAccidentes");
  for (var i = 0; i < arr.length; i++)
    if(arr[i]._id==busca)return i;
  return -1;
}
function getModulos(items)
{
  var sal=""
  for(var i=0;i<items.length;i++) sal+=items[i].nombre+", ";
  return sal;
}
Template.tipoPerfiles.helpers({

  "seleccion":function(){
    return Session.get("seleccion");
  },
    'settings': function(){
        return {
 collection: TipoPerfiles.find(),
 rowsPerPage: 10,
 showFilter: false,
 class: "table table-condensed",
  rowClass: function(item) {
       if(item.estado=="SUSPENDIDO")return "warning";
       if(item.estado=="BAJA")return "danger";
       
      },
 fields: [
    {
        key: 'nombrePerfil',
        label: 'Nombre Perfil',
      fn: function (value, object, key) {
        console.log(object)
        return new Spacebars.SafeString("<big><b>"+value+"<big>");
         }
      },
       {
        key: 'modulosAcceso',
        label: 'Acceso a...',
      fn: function (value, object, key) {
        return new Spacebars.SafeString("<big><b>"+getModulos(value)+"<big>");
         }
      },
      {
        key: 'esAdministrador',
        label: 'Es Admin...',
      fn: function (value, object, key) {
        if(value) return new Spacebars.SafeString("<i style='color:green'>SI</i>");
      return new Spacebars.SafeString("<i style='color:red'>NO</i>");
         }
      },


  {
       label: '',
       headerClass: 'col-md-1',
       tmpl:Template.accionesTipoPerfiles
     }
 ]
 };
    }
});
function colorearEstado(estado)
{
  if(estado=="A")return "<b style='color:green'>"+estado+"</b>";
  if(estado=="R")return "<b style='color:red'>"+estado+"</b>";
  return "<b style='color:grey'> - </b>";
}




AutoForm.hooks({
  
  'nuevoTipoPerfil_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha agregado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'modificarTipoPerfil_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha modificdo el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  
});