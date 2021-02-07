Template.anclajes.events({
   'click .table tbody tr': function(event) {
    event.preventDefault();
    var categoria = this;
    $(".table tr").removeClass("filaSeleccionCategorias");
    $(event.currentTarget).addClass("filaSeleccionCategorias");
    
  },
  'mouseover tr': function(ev) {
    $(".table").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },

  'click tr': function(ev) {
    // $("#panelLateral").show("slow");
    // Session.set("seleccion", this);
  },
  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){ Anclajes.remove(id); swal("Quitado!", "El registro ha sido borrado", "success"); });

  },
  'click .update': function(ev) {
    var data=this;
    Modal.show("modificarAnclaje",function(e){
      return data;
    })
  },
  "click #observaciones":function(){
    Session.set("idAnclajeSeleccion",this._id);
    var data=this;
    Modal.show("anclajeObservaciones",function(e){
      return data
    })
  },
  'click #descargar': function(ev) {
    console.log(this)
    Router.go('/descargaCertificado/'+this.certificado);
  }
});
Template.anclajeObservaciones.rendered=function()
{
  buscarObservacionesAnclaje();
  console.log(this)
}
Template.anclajesEquipos.events({
  
  'mouseover tr': function(ev) {
    $(".table").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },
  
  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){ AnclajesEquipos.remove(id); swal("Quitado!", "El registro ha sido borrado", "success"); });

  },
  'click .update': function(ev) {
    var data=this;
    Modal.show("modificarEquipoAnclaje",function(e){
      return data;
    })
  }
});

getDiasVto=function(fechaInicio){
  var dias=365*2; // 2 anos
  var inicio = new Date(fechaInicio);
  
  var hasta=new Date();
  var desde = new Date(inicio.setTime( inicio.getTime() + (dias * 86400000) ));
  var dt1 = desde;  
var dt2 = hasta; 
  var diasVencidos=-Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
 
  return diasVencidos;
};

Template.comentario.helpers({
  "fechaRip":function(){
    var d = this.historial.fecha;
    return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
  }
});
function buscarObservacionesAnclaje()
{
  Meteor.call("buscarObservacionesAnclaje",Session.get("idAnclajeSeleccion"),function(err,res){
    Session.set("anclajeObservaciones",res)
  })
}
Template.filtro_equipoEnsayo.events({
  "change #idEquipoEnsayo":function(event,template){
    var valor=$("#idEquipoEnsayo").val();
    var obFiltro=Session.get("filtro_equipoEnsayo");
    if(obFiltro)
    if(valor)obFiltro.equipoEnsayo=valor;else delete obFiltro.equipoEnsayo
    
    
    Session.set("filtro_equipoEnsayo",obFiltro)
  }
})
Template.accionesAnclajes.helpers({
  "cantidadObservaciones":function(){
 if(this.observaciones) return this.observaciones.length;
  },
   "tieneCertificado":function()
  {
    if(this.certificado)return true;
    return false
  },
})
Template.anclajeObservaciones.helpers({
  "datos":function()
  {
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
  
 collection: Session.get("anclajeObservaciones"),
 rowsPerPage: 10,
 showFilter: false,
 class: "table table-condensed",

 fields: [
    {
        key: 'fecha',
        label: 'Fecha',
       
      fn: function (value, object, key) {
         return moment(value).format("D/M/Y");
         },
         headerClass: 'col-md-2',
      },

   {
        key: 'detalle',
        label: 'Observacion',
       // headerClass: 'col-md-2',
      },
    {
        key: 'usuario',
        label: 'Usuario',
       fn: function (value, object, key) {
         return value
         },
      },
    

  // {
  //      label: '',
  //      headerClass: 'col-md-2',
  //      tmpl:Template.accionesAnclajes
  //    }
 ]
 };
    }
})
Template.filtro_equipoEnsayo.helpers({
  verEquipoSelector:function(){
    return getModulo2("anclajesEquipos")
  },
})
Template.anclajes.helpers({

 selector: function (){
    return Session.get("filtro_equipoEnsayo");
  },
// selector() {
//      // if(Session.get("filtroEquipoIngresante"))
//      // var filtroEquipoIngresante=Session.get("filtroEquipoIngresante").length===0?null:{$in: Session.get("filtroGrupos") };
//      console.log(Session.get("filtroEquipoEnsayo"))
//      var selector={};
//     if(Session.get("filtroEquipoEnsayo")!=undefined)
//     selector.equipoEnsayo={$elemMatch:{equipoEnsayo:Session.get("filtroEquipoEnsayo")}};
   
//    // if(filtroActividades!=null)selector.actividades=filtroActividades;
//    // if(filtroPlanes!=null)selector.planesEmpresa=filtroPlanes;
//    console.log(selector)
//     return selector; // this could be pulled from a Session var or something that is reactive
//   },
  "seleccion":function(){
    return Session.get("seleccion");
  },
    'settings': function(){
        return {
 collection: Anclajes.find(),
 rowsPerPage: 10,
 showFilter: true,
 class: "table table-condensed",
  rowClass: function(item) {
       var dias=getDiasVto(item.fechaEnsayo);
       if(dias<=0)return "danger";
       if(dias>0 && dias<31)return "warning";
        return 'success';
      },
 fields: [
    {
        key: 'fechaEnsayo',
        label: 'Vto.',
       headerClass: 'col-md-1',
      fn: function (value, object, key) {
         var dias=getDiasVto(value);
        if(dias<90) return "Muy Vencido";
        return dias+" dias";
         }
      },

   {
        key: 'pozo',
        label: 'Pozo',
        headerClass: 'col-md-1',
      },
    {
        key: 'bateria',
        label: 'Bateria',
       headerClass: 'col-md-1',
      },
    {
        key: 'certificacion',
        label: 'Cert.',
       headerClass: 'col-md-1',
      },
    {
        key: 'equipoIngresante',
        label: 'Equipo',
       headerClass: 'col-md-1',
      },

   {
        key: 'fechaEnsayo',
        label: 'Fecha Ensayo',
      headerClass: 'col-md-1',
      fn: function (value, object, key) {
        var d = new Date(value);
        var hora=object.horaAnclaje?object.horaAnclaje:"";
           if(value) return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+hora;
           return "-"
         }
      },
    {
        key: 'fechaConstruccion',
        label: 'Fecha Const.',
       headerClass: 'col-md-1',
      fn: function (value, object, key) {
        var d = new Date(value);
        if(value)  return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
        return "-"
         }
      },
      // {
      //   key: '_id',
      //   label: 'ANCLAJES',
       
      // fn: function (value, object, key) {
      //   var ne=object.estadoNE?object.estadoNE:"";
      //   var no=object.estadoNO?object.estadoNO:"";
      //   var se=object.estadoSE?object.estadoSE:"";
      //   var so=object.estadoSE?object.estadoSE:"";

      //   return  new Spacebars.SafeString("NO "+colorearEstado(no)+"| NE "+colorearEstado(ne)+"| SO "+colorearEstado(so)+"| SE "+colorearEstado(se))
      //    }
      // },
      {
        key: 'estadoNO',
        label: 'NO',
       
      fn: function (value, object, key) {
        
        return  new Spacebars.SafeString(colorearEstado(value))
         }
      },
      {
        key: 'estadoNE',
        label: 'NE',
       
      fn: function (value, object, key) {
        
        return  new Spacebars.SafeString(colorearEstado(value))
         }
      },
      {
        key: 'estadoSO',
        label: 'SO',
       
      fn: function (value, object, key) {
        
        return  new Spacebars.SafeString(colorearEstado(value))
         }
      },
      {
        key: 'estadoSE',
        label: 'SE',
       
      fn: function (value, object, key) {
        
        return  new Spacebars.SafeString(colorearEstado(value))
         }
      },

   
   

  {
       label: '',
       headerClass: 'col-md-2',
       tmpl:Template.accionesAnclajes
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
Template.anclajesEquipos.rendered=function(){
  Meteor.subscribe('AnclajesEquipos');
  Meteor.subscribe('Anclajes');
}
Template.anclajes.rendered=function(){
  Meteor.subscribe('AnclajesEquipos');
  Meteor.subscribe('Anclajes');
  var filtro={};
  
  var mod=getModulo2("Anclajes");

      if(mod)
        if(mod.hasOwnProperty("soloVerMios"))
          if(mod.soloVerMios)filtro.idUsuario=Meteor.user()._id;
        console.log(filtro,mod)
  Session.set("filtro_equipoEnsayo", filtro);
}
function getUsuario(id)
{
  for(var i=0;i<Session.get("usuarios").length;i++)
    if(Session.get("usuarios")[i]._id==id)return Session.get("usuarios")[i].username;
  return "s/n"
}
Template.anclajesEquipos.helpers({
    'settings': function(){
        return {
 collection: AnclajesEquipos.find(),
 rowsPerPage: 10,
 showFilter: false,
 class: "table table-condensed",

 fields: [

      {
        key: 'nombreEquipo',
        label: 'Equipo',
        headerClass: 'col-md-2',
      },
   {
        key: 'detalle',
        label: 'Detalle',
       // headerClass: 'col-md-2',
      },
      {
        key: 'idUsuario',
        label: 'Usuario',
       headerClass: 'col-md-2',
       fn: function (value, object, key) {
        
        return  new Spacebars.SafeString(getUsuario(value))
         }
      },
    
   

  {
       label: '',
       headerClass: 'col-md-1',
       tmpl:Template.accionesAnclajesEquipos
     }
 ]
 };
    }
});
Template.archivosForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.archivosForm.helpers({
   myCallbacks: function() {
    return {
        finished: function(index, fileInfo, context) { 
        var seleccion=Session.get("seleccion");
         
          var aux=fileInfo.name;
          Anclajes.update(seleccion._id,{$set:{archivo:aux}});
          Session.set("seleccion",Anclajes.findOne({_id: seleccion._id}));
        },
    }
  }
});

Template.archivosForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});
AutoForm.hooks({
  
  'nuevaObservacionAnclaje_': {
    onSuccess: function (operation, result, template) {
     // Modal.hide();
      buscarObservacionesAnclaje();
      swal({   title: "Genial!",   text: "Se ha agregado el registro!",   type: "success"});

    },
    onError: function(operation, error, template) {
     swal("Ops!","Ha ocurrido un erro al ingresar el registro! por favor revisa que los campos esten completos: "+error,"error");
    }
  },
});