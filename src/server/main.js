import { Meteor } from 'meteor/meteor';
 
import "./funciones.js";
import { Funciones } from "./funciones.js";
  const bodyParser = require('body-parser');
// WebApp.connectHandlers.use(bodyParser.urlencoded({extended: false}))
// WebApp.connectHandlers.use('/setFotoPerfil', bodyParser.urlencoded());

var seting=Settings.findOne({clave:"cadenaConexionMail"});
var valorMail=seting?seting.valor:"";

process.env.MAIL_URL=valorMail;

//DATOS DE LA BASE DE DATOS!!!!//////////////////////////////////////////////////////////////////////////
	nombreBase="appCai";
puertoBase="27017";
	//DATOS DE LA BASE DE DATOS!!!!//////////////////////////////////////////////////////////////////////////
mesLetras=function(mes)
{ 
  if(mes==1)return "ENERO";
  if(mes==2)return "FEBRERO"; 
  if(mes==3)return "MARZO"; 
  if(mes==4)return "ABRIL";
  if(mes==5)return "MAYO";
  if(mes==6)return "JUNIO";
  if(mes==7)return "JULIO";
  if(mes==8)return "AGOSTO";
  if(mes==9)return "SEPTEMBRE";
  if(mes==10)return "OCTUBRE";
  if(mes==11)return "NOVIEMBRE";
  if(mes==12)return "DICIEMBRE";
  return "s/a";
}
var f=new Funciones();

Meteor.methods({
  "eliminarAnclajes":f.eliminarAnclajes,
  "importarAnclajes":f.importarAnclajes,
  "getHorasPersonal":f.getHorasPersonal,
  "getArchivos":f.getArchivos,
  "getDataSeleccion":f.getDataSeleccion,
  "getPersonalLiquidacion":f.getPersonalLiquidacion,
  "quitarItemGenerico":f.quitarItemGenerico,
	"buscarPersonalAccidentes":f.buscarPersonalAccidentes,
  "buscarObservacionesAnclaje":f.buscarObservacionesAnclaje,
	"loginUser": f.loginUser,
	"userInsert": f.userInsert,
  "userUpdate":f.userUpdate,
	"usuarios":f.usuarios ,
	"modificarClave": f.modificarClave,
	"userRemove":f.userRemove ,
  "generarVariables":f.generarVariables ,
}); 

Meteor.startup(() => {
 
   Meteor.publish('Settings', function(){
    return Settings.find();
}); 
   
   Meteor.publish('Anclajes', function(){
    return getColeccionPerfil("Anclajes");
});
    Meteor.publish('AnclajesEquipos', function(){
    return getColeccionPerfil("AnclajesEquipos");
});
      Meteor.publish('Archivos', function(){
    return Archivos.find();
});
      
        Meteor.publish('Personal', function(){
     return getColeccionPerfil("Personal");
});
          Meteor.publish('PersonalLiquidaciones', function(){
            return getColeccionPerfil("PersonalLiquidaciones");

});
           Meteor.publish('TipoPerfiles', function(){
    return TipoPerfiles.find();
});

 
 
});
