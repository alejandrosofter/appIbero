Template.personalLiquidaciones.rendered=function(){
  Meteor.subscribe('PersonalLiquidaciones');
  Meteor.subscribe('Personal');
}
Template.horasLiquidacion.rendered=function(){
  Meteor.subscribe('Personal');
  Meteor.subscribe('PersonalLiquidaciones');
  buscarPersonalLiquidacion(this.data);
  getDataSeleccion()
}
Template.horasLiquidacion.events({
  "click #horas":function()
  {
    Session.set("idPersonalSeleccion",this._id);
  },
   'mouseover tr': function(ev) {
    $(".table").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },
   'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){
     Meteor.call("quitarItemGenerico","PersonalLiquidaciones",Router.current().params['_id'],"horas",id,function(err,res){
        swal("Quitado!", "El registro ha sido borrado", "success");
        buscarHorasPersonal()
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
})
function buscarPersonalLiquidacion(datos)
{
  Meteor.call("getPersonalLiquidacion",Router.current().params['_id'],function(err,res){
    Session.set("personalLiquidacion", res);
  })
  
}
function buscarHorasPersonal()
{
  var idLiquidacion=Router.current().params['_id'];
  var idPersonal=Session.get("idPersonalSeleccion");
  Meteor.call("getHorasPersonal",idLiquidacion,idPersonal,function(err,res){
    Session.set("getHorasPersonal", res);
  })
  
}
function getDataSeleccion()
{
  Meteor.call("getDataSeleccion","PersonalLiquidaciones",Router.current().params['_id'],function(err,res){
    Session.set("getDataSeleccion", res);
  })
  
}
Template.personalLiquidaciones.events({
  'mouseover tr': function(ev) {
    $(".table").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },

  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){ PersonalLiquidaciones.remove(id); swal("Quitado!", "El registro ha sido borrado", "success"); });

  },
  'click .update': function(ev) {
    var data=this;
    Modal.show("modificarLiquidacionPersonal",function(e){
      return data;
    })
  },
  "click #horas":function(){
    Session.set("liquidacionSeleccion",this);
    var data=this;
   Router.go("/horasLiquidacion/"+this._id);
  },

});

function buscarIndice(busca)
{
  var arr=Session.get("personalAccidentes");
  for (var i = 0; i < arr.length; i++)
    if(arr[i]._id==busca)return i;
  return -1;
}

// Template.modificarAccidente.helpers({
// "docuUpdate":function()
//   {
//     return Session.get("personalSeleccion");
//   },
//   "eti_fechaAccidente":function()
//   {
//     var ind=buscarIndice(Session.get("accidenteUpdate")._id);
//     return 'accidentes.'+ind+'.fechaAccidente';
//   },
//   "eti_fechaDenuncia":function()
//   {
//      var ind=buscarIndice(Session.get("accidenteUpdate")._id);
//     return 'accidentes.'+ind+'.fechaDenuncua';
//   },
//   "eti_fechaAlta":function()
//   {
//      var ind=buscarIndice(Session.get("accidenteUpdate")._id);
//     return 'accidentes.'+ind+'.fechaAlta';
//   },
//   "eti_comentarios":function()
//   {
//      var ind=buscarIndice(Session.get("accidenteUpdate")._id);
//     return 'accidentes.'+ind+'.comentario';
//   }
//   })

Template.horasLiquidacion.helpers({
"tipoPersonal":function(){
return Session.get("liquidacionSeleccion").tipoPersonal;
},
"idPersonalSeleccion":function(){
return Session.get("idPersonalSeleccion");
},
"desde":function(){
return Session.get("liquidacionSeleccion").fechaDesde.getFecha();
},
"hasta":function(){
return Session.get("liquidacionSeleccion").fechaHasta.getFecha();
},
"datos":function(){
return  Session.get("getDataSeleccion");
},
    'settings': function(){
        return {
 collection: Session.get("getHorasPersonal"),
 rowsPerPage: 10,
 showFilter:false,
 class: "table table-condensed",
  rowClass: function(item) {
       if(item.estado=="CANCELADA")return "success";
       
      },
 fields: [


   {
        key: 'dia',
        label: 'Dia',
        headerClass: 'col-md-2',
        fn: function (value, object, key) {
        return value
        // return new Spacebars.SafeString(value);
         }
      },
      {
        key: 'tipoHora',
        label: 'Tipo de HORA',
      },
      {
        key: 'cantidad',
        label: 'Cantidad',
       headerClass: 'col-md-1',
      },
       {
        key: 'viandas',
        label: 'Viandas',
        headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)return value;
          return "-"
        // return new Spacebars.SafeString(value);
         }
      },
    
  
      
   

  {
       label: '',
       headerClass: 'col-md-2',
       tmpl:Template.accionesHoras
     }
 ]
 };
    },
    'settingsPersonal': function(){
        return {
 collection: Session.get("personalLiquidacion"),
 rowsPerPage: 10,
 showFilter:false,
 class: "table table-condensed",
  rowClass: function(item) {
       if(item._id==Session.get("idPersonalSeleccion") ){
        buscarHorasPersonal();
        return "success";
       }
       
      },
 fields: [


   {
        key: '_id',
        label: "Personal",
        // headerClass: 'col-md-1',
        fn: function (value, object, key) {
        return new Spacebars.SafeString("<big><b>"+object.apellido+" </b>"+object.nombre+"<big>");
         }
      },
      
      
   

  {
       label: '',
       headerClass: 'col-md-3',
       tmpl:Template.accionesPersonalHora
     }
 ]
 };
    }
});
Template.personalLiquidaciones.helpers({

    'settings': function(){
        return {
 collection: PersonalLiquidaciones.find(),
 rowsPerPage: 10,
 showFilter: true,
 class: "table table-condensed",
  rowClass: function(item) {
       if(item.estado=="CANCELADA")return "success";
       
      },
 fields: [


   {
        key: 'fechaDesde',
        label: 'Desde',
        headerClass: 'col-md-1',
        fn: function (value, object, key) {
        return new Spacebars.SafeString(value.getFecha());
         }
      },
       {
        key: 'fechaHasta',
        label: 'Hasta',
        headerClass: 'col-md-1',
        fn: function (value, object, key) {
        return new Spacebars.SafeString(value.getFecha());
         }
      },
    {
        key: 'tipoPersonal',
        label: 'Tipo de Personal',
       headerClass: 'col-md-1',
      },
    {
        key: 'estado',
        label: 'Estado',
       headerClass: 'col-md-1',
      },
  
      
   

  {
       label: '',
       headerClass: 'col-md-2',
       tmpl:Template.accionesPersonalLiquidaciones
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
  
  'nuevoPersonalLiquidacion_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha agregado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'modificarPersonalLiquidacion_': {
    onSuccess: function (operation, result, template) {
      Modal.hide();
      swal({   title: "Genial!",   text: "Se ha modificdo el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
  'nuevaHoraPersonal_': {
    onSuccess: function (operation, result, template) {
      swal({   title: "Genial!",   text: "Se ha ingresado el registro!",   type: "success"});
      buscarHorasPersonal()
    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
 
});