//************************* FUNCIONES AUX ************************************************//
/*eslint-disable no-undef, semi, semi, eqeqeq, no-undef, no-unreachable, unknown-require, forbiddenExportImport, no-unused-vars, no-empty-label, forbiddenExportImport*/
    import "../lib/utils.js";
var exec = Npm.require('child_process').exec;
var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');
var fs = Npm.require('fs');
const fetch = Npm.require('node-fetch');

export class Auxiliares {

async cargaImagen(archivo,id)
{
	const http = require("http");
	var path="http://appibero.yavu.com.ar/javier/archivos/"+id+"/"+archivo;
const file = fs.createWriteStream(archivo);
const response = await fetch(path);
  const data = await response.buffer();
   Archivos.write(data, {
      fileName: archivo,
      fielId: id, //optional
    }, function (writeError, fileRef) {
      if (writeError) {
        throw writeError;
      } else {
      	Anclajes.update({_id:id},{$set:{certificado:fileRef._id}})
        console.log(fileRef.name + ' is successfully saved to FS. _id: ' + fileRef._id);
      }
    });
// try{
// await http.get(, response => {
//   response.pipe(file);
//   var data= fs.readFileSync(archivo)

//   fs.readFile(archivo, function (error, data) {
//   if (error) {
//     throw error;
//   } else {
    //  Archivos.write(data, {
    //   fileName: archivo,
    //   fielId: id, //optional
    // }, function (writeError, fileRef) {
    //   if (writeError) {
    //     throw writeError;
    //   } else {
    //     console.log(fileRef.name + ' is successfully saved to FS. _id: ' + fileRef._id);
    //   }
    // });
//   }
// });

// });
// }catch (err){
// 	console.log("no encuentro")
// }
}
async cargarImagenes(fut1){ 

var path="http://appibero.yavu.com.ar/javier/archivos/";
// Archivos.remove({})
// return;
var a=Settings.findOne({clave: "desdeHastaImportaAnclaje"}).valor.split(",");
var desde=a[0]*1;
var hasta=a[1]*1;
var cantidadImagenes=0;
console.log("DESDE: "+desde+" HSTA: "+hasta)
for (var i = desde; i < hasta; i++) {
	var aux=await Anclajes.findOne({_id:(i+"")}) 
	if(aux){
		cantidadImagenes++;
		var archivo=i+"_1.pdf";
		await this.cargaImagen(archivo,i+"")
		
	}
	
}
fut1.return(cantidadImagenes+ "imagenes cargadas") 
 // console.log(Archivos.find().fetch())
	}


}


 
//getTotalDebitosAutomaticos(2017,null,null,null);


// db.socios.aggregate([{$unwind: "$cambiosEstado"},{$project:{_id:1,estado:"$estado",ano:{$year:"$cambiosEstado.fecha"},mes:{$month:"$cambiosEstado.fecha"},nombre:"$nombre",apellido:"$apellido",total:1,edad: {
//                  $divide: [{$subtract: [ new Date(), "$fechaNacimiento" ] }, 
//                     (365 * 24*60*60*1000)]
//             },esActivo:"$esActivo"}},{$match:{edad:{$gte:20},estado:"ALTA",ano:2017,mes:11}},{$group: {_id: null,total:{$sum:1}}}])



//*******************************FUNCIONES AUX***************************************//