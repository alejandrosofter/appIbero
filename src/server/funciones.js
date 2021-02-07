/*eslint-disable no-unreachable, semi, no-undef, unknown-require, no-empty-label, no-extra-semi, no-unused-params,
 forbiddenExportImport, no-unused-vars*/
import { Auxiliares } from "./funciones_aux.js";
var _AUX= new Auxiliares();
	Future = Npm.require('fibers/future');
	import {PythonShell} from 'python-shell';
	var fs = Npm.require('fs');
export class Funciones
{	
	async getArchivos(){
		 Archivos.remove({}) 
		// console.log(Archivos.find().fetch())
		_AUX.cargarImagenes();
		
	
	}
	eliminarAnclajes()
	{
		Anclajes.remove({});
		Archivos.remove({});
	} 
	importarAnclajes(){
	

		var fut1 = new Future();
		// var PythonShell = require('python-shell');
		var archi = './importarAnclajes.py';
		var path = process.cwd() + '/../web.browser/app/shellPython';
		var options = { 
			mode: 'text',
			pythonPath: '/usr/bin/python2',
			scriptPath: path,
			args: []
		};
		PythonShell.run(archi, options, function(err, res) {
			if (err) throw err;
			 return _AUX.cargarImagenes(fut1);
			

		});
		return fut1.wait();
	}
	
	generarVariables () {
		//Settings.remove({});
    	if (!Settings.findOne({
    			clave: "dbInyeccion"
    		})) Settings.insert({
    		clave: "dbInyeccion",
    		valor: "utesa"
    	});
    	if (!Settings.findOne({
    			clave: "claveInyeccion"
    		})) Settings.insert({
    		clave: "claveInyeccion",
    		valor: "peterete" 
    	});
    	if (!Settings.findOne({
    			clave: "usuarioInyeccion"
    		})) Settings.insert({
    		clave: "usuarioInyeccion",
    		valor: "alejandro"
    	});
    	if (!Settings.findOne({
    			clave: "hostInyeccion"
    		})) Settings.insert({
    		clave: "hostInyeccion",
    		valor: "134.209.175.156"
    	});
    	if (!Settings.findOne({
    			clave: "cuitEmpresa"
    		})) Settings.insert({
    		clave: "cuitEmpresa",
    		valor: "30670251140001"
    	});
		if (!Settings.findOne({
				clave: "datosContacto"
			})) Settings.insert({
			clave: "datosContacto",
			valor: "email:su email, domicilio:suDomicilio otros datos"
		});
		if (!Settings.findOne({
				clave: "cadenaConexionMail"
			})) Settings.insert({
			clave: "cadenaConexionMail",
			valor: "smtp://USUARIO%40gmail.com:CLAVE@smtp.gmail.com:465/"
		});
		if (!Settings.findOne({
				clave: "puntoVentaDeudas"
			})) Settings.insert({
			clave: "puntoVentaDeudas",
			valor: "3"
		});
		if (!Settings.findOne({
				clave: "folderUploads"
			})) Settings.insert({
			clave: "folderUploads",
			valor: "/var/www/uploads/"
		});
		if (!Settings.findOne({
				clave: "desdeHastaImportaAnclaje"
			})) Settings.insert({
			clave: "desdeHastaImportaAnclaje",
			valor: "1,1000"
		});
		if (!Settings.findOne({
				clave: "modoServidor"
			})) Settings.insert({
			clave: "modoServidor",
			valor: "PRODUCCION"
		});
		if (!Settings.findOne({
				clave: "nombreEmpresa"
			})) Settings.insert({
			clave: "nombreEmpresa",
			valor: "Nombre Fantasia"
		});
		if (!Settings.findOne({
				clave: "proxNroRecivoDeudas"
			})) Settings.insert({
			clave: "proxNroRecivoDeudas",
			valor: "1"
		});
			
	}
	getHorasPersonal(idLiquidacion,idPersonal)
	{
		var unw={ 	$unwind:  { path: "$horas" } }
		var proy={ 	$project: {
				_id: "$horas._id",
				idLiquidacion:"$_id",
				dia:"$horas.dia",
				tipoHora:"$horas.tipoHora",
				cantidad:"$horas.cantidad",
				viandas:"$horas.viandas",
				idPersonal:"$horas.idPersonal",
				idHora:"$horas._id",
			}
		};
		var match={
			$match: {
				idLiquidacion: idLiquidacion,
				idPersonal: idPersonal,
			}
		}
		var raw = PersonalLiquidaciones.rawCollection();
		var q = Meteor.wrapAsync(raw.aggregate, raw)
		return q([ unw, proy,match ]).toArray();
	}
	getDataSeleccion(coleccion,id)
	{
		var Coleccion=eval(coleccion);
		return Coleccion.findOne({_id:id});
	}
	getPersonalLiquidacion(idLiquidacion)
	{
		var liqu=PersonalLiquidaciones.findOne({_id:idLiquidacion});
		if(liqu){
			return Personal.find({tipoPersonal:liqu.tipoPersonal,estado:"ALTA"}).fetch();
		}
		return []
	}
	buscarPersonalAccidentes(idPersonal)
	{
		var data=Personal.findOne({_id:idPersonal});
		if(data)
			if(data.accidentes)return data.accidentes;
		return [];
	}
	quitarItemGenerico(coleccion,id,subcoleccion,idSubColeccion)
	{
		
		var Coleccion=eval(coleccion);
		if(subcoleccion){
			var res = Coleccion.update(
		    {_id: id }, 
		    { $pull: { [subcoleccion]: { "_id": idSubColeccion } } },
		    { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
		    )
		}else{

		}
		var aux= Coleccion.findOne({_id:id});
		console.log(aux[subcoleccion])
		return aux[subcoleccion];
	}
	"buscarObservacionesAnclaje"(idAnclaje)
	{
		var data=Anclajes.findOne({_id:idAnclaje});
		console.log(data,idAnclaje)
		if(data)
			if(data.observaciones)return data.observaciones;
		return [];
	}
	loginUser (data) {
		// Meteor.call('loginUser',{email: "vxxxxx@xxxx.com",password: "123456"}, function(error, result){
		//      if(!error) Meteor.loginWithToken(result.token);
		// });
		console.log(data);
		var user = Meteor.users.findOne({
			'emails.address': data.email
		});
		if (user) {
			var password = data.password;
			var result = Accounts._checkPassword(user, password);
			console.log(result);
			if (result.error) {
				return result.error;
			} else {
				return result;
			}
		} else {
			return {
				error: "user not found"
			}
		}
	}
	 userUpdate (doc) {
		console.log(doc)
		Meteor.users.update({_id:doc._id},{$set:doc});
		console.log(Meteor.users.find().fetch())
		return id;
	}
	 userInsert (doc) {
		console.log(doc)
		id = Accounts.createUser({
			username: doc.username,
			password: doc.password,
			profile: doc.profile
		});
		console.log(Meteor.users.find().fetch())
		return id;
	}
	 usuarios () {
		var res = Meteor.users.find().fetch();
		console.log(res);
		return res;
	}
	 modificarClave (id, clave) {
		var res = Accounts.setPassword(id, clave, {
			logout: false
		});
		console.log(res)
		console.log(id)
		console.log(clave)
	}
	 userRemove (id) {

		Meteor.users.remove(id);

		return id;
	}
	

}

