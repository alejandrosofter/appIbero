
	applicationController = RouteController.extend({
  layoutTemplate: 'layoutApp',
	  loadingTemplate: 'loaderGral',
	  notFoundTemlplate: 'notFound',
// 	  yieldTemplates: {
// 		'applicationHeader': {to: 'header'},
// 		'projectSwitcher': {to: 'projectSwitcher'},
// 		'applicationMainNav': {to: 'mainNav'},
// 		'applicationFooter': {to: 'footer'}
// 	  },
	  waitOn: function() {
		return [
			 
       
		];
	  },
	  onBeforeAction: function(pause) {
		this.render('loaderGral');
		
		if ( !Meteor.user() )
			{this.render('login');}
// 		if (!!this.ready() && Projects.find().count() === 0)
 	else		{this.next();}
	  },
	  action: function () {
		if (!this.ready()) {
      
		  this.render('loaderGral');
		}
		else {
			UIBlock.unblock();
		  this.render();

		}
	  }
	});

Router.route('/inicio', {
 path: '/inicio',
 // layoutTemplate: 'layoutVacio',
    template:"inicio",
		controller: applicationController,
});
Router.route('descargaCertificado', {
    where: 'server',
    path: '/descargaCertificado/:id',
    action: function() {
    	var a=Settings.findOne({clave:"folderUploads"})
    	var pathUploads=a?a.valor:"/var/www/??";
    	var archivo=Archivos.findOne({_id:this.params.id});
    	if(archivo){
    
    		 var filename = archivo.path;
        
      var path = pathUploads+filename;

      var serv=this;
     fs = Npm.require('fs');
     if(!fs.existsSync(path)) {
       this.response.writeHead(200, { 'Content-Disposition': "attachment; filename=notFound.pdf"  });
      return this.response.end(false);
}
		var data = fs.readFileSync(path);
    this.response.writeHead(200, { 'Content-Disposition': "attachment; filename="+filename  });
       
      return this.response.end(data);
    
    	}
    	// return this.response.end("No encuentro archivo!");
     
      
     
    }
  })
Router.route('/personalLiquidaciones', {
 path: '/personalLiquidaciones',
 // layoutTemplate: 'layoutVacio',
    template:"personalLiquidaciones",
		controller: applicationController,
});
Router.route('/tipoPerfiles', {
 path: '/tipoPerfiles',
 // layoutTemplate: 'layoutVacio',
    template:"tipoPerfiles",
		controller: applicationController,
});
Router.route('/horasLiquidacion/:_id', {
    template: 'horasLiquidacion',
    controller: applicationController
});
Router.route('/personal', {
 path: '/personal',
 // layoutTemplate: 'layoutVacio',
    template:"personal",
		controller: applicationController,
});
Router.route('/', {
 path: '/',
 // layoutTemplate: 'layoutVacio',
    template:"inicio",
		controller: applicationController,
});
Router.route('/anclajes', {
 path: '/anclajes',
 // layoutTemplate: 'layoutVacio',
    template:"anclajes",
		controller: applicationController,
});
Router.route('/anclajesEquipos', {
 path: '/anclajesEquipos',
 // layoutTemplate: 'layoutVacio',
    template:"anclajesEquipos",
		controller: applicationController,
});
Router.route('/datosSistema', {
 path: '/datosSistema',
 // layoutTemplate: 'layoutVacio',
    template:"datosSistema",
		controller: applicationController,
});
Router.route('/modificarDatosSistema/:_id', {
    template: 'modificarDatosSistema',
    controller: applicationController,
    data: function(){
         var sal=Settings.findOne({_id: this.params._id});
         return sal;
    }
});
Router.route('/usuarios', {
 path: '/usuarios',
 // layoutTemplate: 'layoutVacio',
    template:"usuarios",
		controller: applicationController,
});