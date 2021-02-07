Template.personal.rendered=function(){
  Meteor.subscribe('PersonalAccidentes');
  Meteor.subscribe('Personal');
}
Template.personalAccidentes.rendered=function(){
  Meteor.subscribe('PersonalAccidentes');
  Meteor.subscribe('Personal');
  buscarPersonalAccidentes()
}
Template.personal.events({
  'mouseover tr': function(ev) {
    $(".table").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();

  },

  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){ Personal.remove(id); swal("Quitado!", "El registro ha sido borrado", "success"); });

  },
  'click .update': function(ev) {
    var data=this;
  
    Modal.show("modificarPersonal",function(e){
      return data;
    })
  },
  "click #accidentes":function(){
    Session.set("idPersonalSeleccion",this._id);
    Session.set("personalSeleccion",this);
    var data=this;
    Modal.show("personalAccidentes",function(e){
      return data
    })
  },

});

Template.personalAccidentes.events({
  'mouseover tr': function(ev) {
    $("#tablaAccidentes").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();

  },

  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){
     Meteor.call("quitarItemGenerico","Personal",Session.get("idPersonalSeleccion"),"accidentes",id,function(err,res){
        swal("Quitado!", "El registro ha sido borrado", "success");
        buscarPersonalAccidentes()
     })

      });

  },
  'click .update': function(ev) {
    var data=this;
    Session.set("accidenteUpdate",this);
    Modal.show("modificarAccidente",function(){
      return data
    })
  },

});



function buscarPersonalAccidentes()
{
  Meteor.call("buscarPersonalAccidentes",Session.get("idPersonalSeleccion"),function(err,res){
    Session.set("personalAccidentes",res)
  })
}
function buscarIndice(busca)
{
  var arr=Session.get("personalAccidentes");
  for (var i = 0; i < arr.length; i++)
    if(arr[i]._id==busca)return i;
  return -1;
}
Template.accionesPersonal.helpers({
  "cantidadAccidentes":function(){
 if(this.accidentes) return this.accidentes.length;
  }
})
Template.modificarAccidente.helpers({
"docuUpdate":function()
  {
    return Session.get("personalSeleccion");
  },
  "eti_fechaAccidente":function()
  {
    var ind=buscarIndice(Session.get("accidenteUpdate")._id);
    return 'accidentes.'+ind+'.fechaAccidente';
  },
  "eti_fechaDenuncia":function()
  {
     var ind=buscarIndice(Session.get("accidenteUpdate")._id);
    return 'accidentes.'+ind+'.fechaDenuncua';
  },
  "eti_fechaAlta":function()
  {
     var ind=buscarIndice(Session.get("accidenteUpdate")._id);
    return 'accidentes.'+ind+'.fechaAlta';
  },
  "eti_comentarios":function()
  {
     var ind=buscarIndice(Session.get("accidenteUpdate")._id);
    return 'accidentes.'+ind+'.comentario';
  }
  })
Template.personalAccidentes.helpers({

  "datos":function()
  {
    console.log(this)
    return this
  },
  "fechaActual":function()
  {
    return new Date();
  },
  "usuario":function()
  {
    return Meteor.user()._id
  },
   'settings': function(){
        return {

 collection: Session.get("personalAccidentes"),
 rowsPerPage: 10,
 showFilter: false,
 class: "table table-condensed",

 fields: [
    {
        key: 'fechaAccidente',
        label: 'Fecha Accidente',

      fn: function (value, object, key) {
         return moment(value).format("D/M/Y");
         },
         headerClass: 'col-md-1',
      },

   {
        key: 'fechaDenuncua',
        label: 'Fecha Denuncia',

      fn: function (value, object, key) {
         return moment(value).format("D/M/Y");
         },
         headerClass: 'col-md-1',
      },
    {
        key: 'fechaAlta',
        label: 'Fecha Alta',

      fn: function (value, object, key) {
         return moment(value).format("D/M/Y");
         },
         headerClass: 'col-md-1',
      },
      {
        key: 'comentario',
        label: 'Comentario',
         headerClass: 'col-md-2',
      },


  {
       label: '',
       headerClass: 'col-md-1',
       tmpl:Template.accionesPersonalAccidentes
     }
 ]
 };
    }
})
Template.personal.helpers({

  "seleccion":function(){
    return Session.get("seleccion");
  },
    'settings': function(){
        return {
 collection: Personal.find(),
 rowsPerPage: 10,
 showFilter: true,
 class: "table table-condensed",
  rowClass: function(item) {
       if(item.estado=="SUSPENDIDO")return "warning";
       if(item.estado=="BAJA")return "danger";

      },
 fields: [
    {
        key: 'nombre',
        label: 'Nombre/s',
       headerClass: 'col-md-2',
      fn: function (value, object, key) {
        return new Spacebars.SafeString("<big><b>"+object.apellido+" </b>"+object.nombre+"<big>");
         }
      },

   {
        key: 'nroLegajo',
        label: 'Nro Legajo',
        headerClass: 'col-md-1',
      },
    {
        key: 'cuil',
        label: 'CUIL',
       headerClass: 'col-md-1',
      },
    {
        key: 'tipoPersonal',
        label: 'Tipo',
       headerClass: 'col-md-1',
      },
    {
        key: 'centroCosto',
        label: 'CC',
       headerClass: 'col-md-1',
      },


    {

        key: 'categoria',
        label: 'Cat.',
       headerClass: 'col-md-1',
      },
       {

        key: 'estado',
        label: 'ESTADO',
       headerClass: 'col-md-1',
      },




  {
       label: '',
       headerClass: 'col-md-2',
       tmpl:Template.accionesPersonal
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

  'nuevoPersonal_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha agregado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'modificarPersonal_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha modificdo el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'nuevoPersonalAccidentes_': {
    onSuccess: function (operation, result, template) {
     // Modal.hide();
      buscarPersonalAccidentes();
      swal({   title: "Genial!",   text: "Se ha agregado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'modificarAccidentePersonal_': {
    onSuccess: function (operation, result, template) {
     // Modal.hide();
     $("#modificarAccidenteModal").remove();
     $(".modal-backdrop")[1].remove()
      buscarPersonalAccidentes();
      swal({   title: "Genial!",   text: "Se ha modificado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'nuevoAccidentePersonal_': {
    onSuccess: function (operation, result, template) {
      buscarPersonalAccidentes();
      setTimeout(function(){ $("#fechaAccidente").focus(); }, 1000);

      //swal({   title: "Genial!",   text: "Se ha ingresado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
});
