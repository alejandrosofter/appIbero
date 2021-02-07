var consultarUsuarios=function()
{
   Meteor.call("usuarios",function(err,res){ Session.set("usuarios",res); })
}

Template.usuarios.helpers({
    'settings': function(){
     consultarUsuarios();
        return {
 collection: Session.get("usuarios"),
 rowsPerPage: 10,
 class: "table table-condensed",
 showFilter: true,
 fields: [
      {
        key: 'username',
        label: 'Usuario',
      },
    {
        key: 'profile',
        label: 'Perfil',
        fn: function (value, object, key) {
        return new Spacebars.SafeString("<big><b>"+getPerfil(value)+"<big>");
         }
      },
    {
        label: '',
        headerClass: 'col-md-2',
        tmpl:Template.accionesUsuarios
      }
 ]
 };
    }
});
Template.nuevoUsuario.rendered=function(){
 var datos = $.map(TipoPerfiles.find().fetch(), function (obj) {
  obj.id = obj._id;
  obj.text=obj.nombrePerfil;

  return obj;
});
 $("#perfil").select2({data:datos})
  
}
Template.modificarUsuario.helpers({
  "usuario":function(){
    return this.username
  },
  "perfil":function(){
    return this.profile
  }
})
function getPerfil(idPerfil)
{
  var items=TipoPerfiles.find().fetch();
  for(var i=0;i<items.length;i++) 
    if(items[i]._id==idPerfil)return items[i].nombrePerfil;
  return "s/n"
}
Template.modificarUsuario.rendered=function(){
 var datos = $.map(TipoPerfiles.find().fetch(), function (obj) {
  obj.id = obj._id;
  obj.text=obj.nombrePerfil;

  return obj;
});
 $("#perfil").select2({data:datos});
 $('#perfil').val(this.data.profile);
 $('#perfil').trigger('change');
  
}
Template.cambiarClave.helpers({
  "usuario":function(){
    return this.username;
  }
})
Template.nuevoUsuario.rendered=function(){
 var datos = $.map(TipoPerfiles.find().fetch(), function (obj) {
  obj.id = obj._id;
  obj.text=obj.nombrePerfil;

  return obj;
});
 $("#perfil").select2({data:datos});
 $('#perfil').trigger('change');
  
}
Template.modificarUsuario.events({
    'click #btnModificar': function(){
      console.log(this)
      var doc={username:$("#usuario").val(),profile:$("#perfil").val(),_id:this._id};
      Meteor.call("userUpdate",doc,function(err,res){
        consultarUsuarios();
          Modal.hide();
        
      })
    },
})
Template.nuevoUsuario.events({
    'click #btnAgregar': function(){
      var doc={username:$("#usuario").val(),password:$("#clave").val(),profile:$("#perfil").val()};
      Meteor.call("userInsert",doc,function(err,res){
        consultarUsuarios();
          Modal.hide();
        
      })
    },
})
Template.cambiarClave.events({
    'click #btnAceptar': function(){
      Meteor.call("modificarClave",this._id,$("#clave").val(),function(err,res){
        consultarUsuarios();
				console.log(err)
        	Modal.hide();
        
      })
    },
})
Template.usuarios.events({
  'click #btnAgregar': function(){
        Modal.show('nuevoUsuario', function() {
			
		});
    },
 
  'mouseover tr': function(ev) {
    $("#tablaUsuarios").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },
  'mousemove tr': function(ev) {
    
  },
  'click .delete': function(ev) {
    var id=this._id;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false }, function(){ Meteor.call("userRemove",id,function(err,res){
      swal("Quitado!", "El registro ha sido borrado", "success"); });
      consultarUsuarios()
    }); 

  },
  'click .update': function(ev) {
    var aux=this;
    Modal.show('modificarUsuario', function() {
			return aux;
		});
  },
	 'click .cambiarClave': function(ev) {
    var aux=this;
    Modal.show('cambiarClave', function() {
			return aux;
		});
  },
});
