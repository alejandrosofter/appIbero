import time
import sys
import time
import datetime
import re
import bson

from config import db
from config import exeRemote
from config import conectar
from config import desconectar
from config import ejecutar
from config import consultaRemote
from bson.objectid import ObjectId
reload(sys)
sys.setdefaultencoding('utf8')

def getValorRip(data,campo,ultimo):
	if ultimo: return "'"+str(data[campo]).encode('ascii', 'ignore').decode('ascii')+"') ;"
	return "'"+str(data[campo]).encode('ascii', 'ignore').decode('ascii')+"' , "

def getValorRipNro(data,campo,ultimo):
	if ultimo: return str(data[campo])+") ;"
	return str(data[campo])+" , "

def getFecha(campo):
	formatoFecha="%Y-%m-%d"
	campo=str(campo)
	try:
		fecha=datetime.datetime.strptime(campo,formatoFecha)
	except Exception as e:
		fecha=datetime.datetime.now()
	return fecha
def getEquipoIngresante(idEquipoIngresante):
	idEquipoIngresante=str(idEquipoIngresante)

	if(idEquipoIngresante=="7"): return "DRILLING"
	if(idEquipoIngresante=="17"): return "PULLING"
	if(idEquipoIngresante=="38"): return "WORK OVER"
	return "PULLING"
def getEstadoAnclaje(estadoAnclaje):
	if(estadoAnclaje=="1"):return "A"
	if(estadoAnclaje=="2"):return "R"
	return ""
def getEstado(idEstado):
	idEquipoIngresante=idEstado
	if(idEstado==1): return "PENDIENTE"
	if(idEstado==2): return "FINALIZADO"
	return ""
def getObservaciones(observacion,fechaEnsayo):
	# print(observacion)
	if(observacion!=""):
		return [{"usuario":"sistema","fecha":getFecha(fechaEnsayo),"detalle":observacion}]
	return []

def isset(variable):
	return variable in locals() or variable in globals()

def getUsuarioEquipo(nombreEquipo):
	regx = bson.regex.Regex(nombreEquipo,"$i")
	data=(db.users.find_one({"username":regx }))
	if(data!=None):
		return str(data['_id'])
	return "000"
	

def ingresarAnclajes(idEquipoEnsayo,nombreEquipo):
	connection=conectar()
	anclajes=consultaRemote("SELECT * from jos_montaje where idEquipoEnsayo="+str(idEquipoEnsayo));
	hayError=False
	errores=""
	# db.anclajes.remove({})
	# return
	for data in anclajes:
		try:
			idUsuario=(getUsuarioEquipo(nombreEquipo))
			aux={"idUsuario":idUsuario,"observaciones":getObservaciones(data['observaciones'],data['fechaEnsayo']),"_id":str(data['idmontaje']),"estado":getEstado(data['idEstadoMontaje']),"equipoIngresante":getEquipoIngresante(data['idEquipoIngresante']),"estadoSE":getEstadoAnclaje(data['idEstadoAnclajeSE']),"estadoSO":getEstadoAnclaje(data['idEstadoAnclajeSO']),"estadoNE":getEstadoAnclaje(data['idEstadoAnclajeNE']),"estadoNO":getEstadoAnclaje(data['idEstadoAnclajeNO']),"cantidadAnclaje":str(data['cantidadAnclaje']),"constConstruido":str(data['constEnsayo']),"constEnsayo":str(data['constEnsayo']),"horaEnsayo":str(data['hora']),"pozo":str(data['numeroPozo']),"bateria":str(data['bateria']),"certificacion":str(data['certificacion']),"equipoEnsayo":str(idEquipoEnsayo),"fechaConstruccion":getFecha(data['fechaConstruccion']),"fechaEnsayo":getFecha(data['fechaEnsayo']) }
			db.anclajes.insert(aux)
			# print("cargo "+str(data['idmontaje'])+"\n")
		except  Exception, e:
			hayError=True
			errores+=str(e)+"id:"+str(data['idmontaje'])+", "
			print(errores)
			return
			#errores+="ERROR CARGA en "+str(data['nombreOs'])+" PACIENTE:"+str(data['paciente'])+" importe: "+str(data['importe'])+"\n"
	desconectar(connection)
	if(hayError): 
		print(errores)
	return ""

def syncEquipos():
	connection=conectar()
	anclajes=consultaRemote("SELECT * from jos_equipoEnsayo");
	hayError=False
	errores=""
	db.anclajesEquipos.remove({})
	for data in anclajes:
		try:
			obj={"_id":str(data["idEquipoEnsayo"]),"nombreEquipo":data["nombreEquipo"]}
			
			if(data["nombreEquipo"]!=""):
				db.anclajesEquipos.insert(obj)
				ingresarAnclajes(data["idEquipoEnsayo"],data["nombreEquipo"])
			# anclajesEquipos
		except  Exception, e:
			hayError=True
			errores+=str(e)
			#errores+="ERROR CARGA en "+str(data['nombreOs'])+" PACIENTE:"+str(data['paciente'])+" importe: "+str(data['importe'])+"\n"
	desconectar(connection)
	if(hayError): print(errores)
	return ""

def test(equipo):
	regx = bson.regex.Regex(equipo,"$i")
	equipo=db.anclajesEquipos.find_one({"nombreEquipo":re.compile(equipo, re.IGNORECASE)})
	data=(db.users.find_one({"username":regx }))
	print (data)
	# print (equipo)
	
	
def syncAnclajes():
	errores=ingresarAnclajes()

	if errores!="": sys.exit(errores)
def buscar():
	print(db.anclajes.find())

# buscar()
syncEquipos()
# equipo='Caliper'
# test(equipo)
