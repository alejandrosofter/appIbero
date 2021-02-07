var crearExp = function(searchText) {
	// this is a dumb implementation
	var parts = searchText.trim().split(/[ \-\:]+/);
	var re= new RegExp("(" + parts.join('|') + ")", "ig");
	return {"$where":re.test(searchText)};
}
Template.layoutApp.events({
    "click .salirSistema":function(){
      swal({   title: "Estas Seguro de salir?",   text: "Una vez que hecho debes vovler a ingresar con tus datos!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, salir!",   closeOnConfirm: true },
      function(){ Meteor.logout();Router.go('/');  });

    },
    "click #nuevoEquipoAnclaje":function(){
     Modal.show("nuevoEquipoAnclaje")
    },
    "click #nuevoAnclaje":function(){
     Modal.show("nuevoAnclaje")
    },
    "click #nuevaLiquidacionPersonal":function(){
     Modal.show("nuevaLiquidacionPersonal")
    },
    "click #nuevoPersonal":function(){
     Modal.show("nuevoPersonal")
    },

  	"autocompleteselect #buscadorSocio": function(event, template, doc) {
		$("#buscadorSocio").val("");
      Router.go("/fichaSocio/"+doc._id);
	},
		"click #btnBuscarSocio": function() {
			UIBlock.block('Buscando Socio...');
	Meteor.call("consultarSocio",($("#nroSocioGenerico").val()*1),false,function(err,res){
		UIBlock.unblock();
		if(res) Router.go("/fichaSocio/"+res._id);
			else swal("Ops..","No se encontro el nro de socio!")
	})
		
			
	},
})
Template.inicio.helpers({
	'empresa': function(){
     return Settings.findOne({clave:"nombreEmpresa"}).valor;
     },
	'usuario': function(){
     return Meteor.user()
     },
	  'esAdmin': function(){
	  	var profile=TipoPerfiles.findOne({_id:Meteor.user().profile});

     if(!Meteor.user())return false;
     if(profile)
     if(profile.esAdministrador)return true;
       return false;
     },
})

Template.layoutApp.rendered=function(){
	Meteor.call("usuarios",function(err,res){ Session.set("usuarios",res); })
}
Template.layoutApp.helpers({
"verAnclajes":function()
{
	var mod=getModulo2("Anclajes");
	console.log(mod)
	return mod?true:false;
},
"verPersonal":function()
{
	return getModulo2("Personal")?true:false;
},
"verEquipos":function()
{
	return getModulo2("AnclajesEquipos")?true:false;
},


     'esAdmin': function(){
     	var profile=TipoPerfiles.findOne({_id:Meteor.user().profile});
	  	
     if(!Meteor.user())return false;
     if(profile)
     if(profile.esAdministrador)return true;
       return false;
     },
     "estaLogueado":function(){
         if(!Meteor.user())return false;
         return true;
     },
	  
  "settings": function() {

		return {
			position: "bottom",
			limit: 15,
			rules: [{
				token: '',
				collection: Socios,
				field: "nroSocio",
				matchAll: false,
				selector: function(match) {
					var search = new RegExp(match, 'i');
					var exp="/^"+match+"*/";
					var buscaNro=null;
					//if(!isNaN(match)) buscaNro=};
					return {$or:[{dni:{$regex:search}},{nroSocio:{$eq:match}},{apellido:{$regex:search}}]};
				},
				template: Template.buscadorSocios
			}, ]
		};
	},
  'nombreUsuario':function(){
    if(!Meteor.user())return "";
    return Meteor.user().username;
  }
});