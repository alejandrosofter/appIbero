import datetime
import time
import sys
from dateutil import parser
from config import db
from config import consultaRemote
from config import seEncuentra
from config import FOLDER_NOMENCLADORES
from bson.objectid import ObjectId

def cargarNomencladores():
  db.nomencladores.remove({}) 
  for data in  consultaRemote("select * from facturasProfesional_rangoNomencladores order by fechaHasta desc"):
    aux=[]
    for dataNomenclador in  consultaRemote("select * from facturasProfesional_nomencladores where idRangoNomenclador="+str(data['id'])+""):
      aux.append({"_id":str(dataNomenclador['id']),"nombreNomenclador":dataNomenclador['detalle'],"idNomencladorAsociacion":dataNomenclador['id'],"codigoNomenclador":dataNomenclador['codigoInterno'],"importe":dataNomenclador['importe']})

    fechaDesde=datetime.datetime.now()
    fechaHasta=datetime.datetime.now()
    if data["fechaDesde"] is not None: fechaDesde=parser.parse(data['fechaDesde'].strftime("%Y-%m-%d"))
    if data["fechaHasta"] is not None: fechaHasta=parser.parse(data['fechaHasta'].strftime("%Y-%m-%d"))
    if(str(data['id']) != ''): db.nomencladores.insert({"_id":str(data['id']),"fechaDesde": fechaDesde,"fechaDesde": fechaDesde,"fechaHasta": fechaHasta,"idObraSocial":data['idObraSocial'],"idAsociacion":data['id'],"nomencladores":aux})

def cargarEquipos():
  db.anclajesEquipos.remove({})
  for data in  consultaRemote("select * from jos_equipoEnsayo"):
    aux={"_id":str(data['idEquipoEnsayo']),"nombreEquipo":str(data['nombreEquipo'])}
    db.anclajesEquipos.insert(aux)

def getEstado(estado):
  if(estado==1): return "A"
  if(estado==2): return "R"
  return ""

def cargarAnclajes():
  db.anclajes.remove({})
  for data in  consultaRemote("select * from jos_montaje"):
    equipo=db.anclajesEquipos.find_one({"_id":str(data['idEquipoEnsayo'])})
    print(str(data['idEquipoEnsayo']))
    idUsuario=equipo['idUsuario']
    equipoIngresante=equipo['_id']
    aux={"_id":str(data['idmontaje']),"pozo":str(data['numeroPozo']),"bateria":str(data['bateria']),"usuario":idUsuario,"certificacion":str(data['certificacion']),"equipoEnsayo":str(data['equipoEnsayo']),"equipoIngresante":equipoIngresante,'fechaEnsayo':str(data['fechaEnsayo']),'fechaConstruccion':str(data['fechaConstruccion']),'horaEnsayo':str(data['hora']),'numeroAFE':str(data['numeroAFE']),'cantidadAnclajes':str(data['cantidadAnclaje']),'numeroFactura':str(data['numeroFactura']),'estadoNO':getEstado(str(data['idEstadoAnclajeNO'])),'estadoNE':getEstado(str(data['idEstadoAnclajeNE'])),'estadoSE':getEstado(str(data['idEstadoAnclajeSE'])),'estadoSO':getEstado(str(data['idEstadoAnclajeSO'])),"nroReporte":str(data['idEstadoAnclajeSO'])}
    observaciones=[]
    if(str(data['observaciones'])!=""): 
      fecha = datetime.datetime.strptime(str(data['fechaEnsayo']), '%Y-%m-%d %H:%M:%S')
      id=ObjectId()
      observaciones.append({"fecha":fecha,"_id":id,"usuario":idUsuario,"detalle":str(data['observaciones'])})
    if(str(data['observacionCliente'])!=""): 
      fecha = datetime.datetime.strptime(str(data['fechaEnsayo']), '%Y-%m-%d %H:%M:%S')
      id=ObjectId()
      observaciones.append({"fecha":fecha,"_id":id,"usuario":idUsuario,"detalle":str(data['observacionCliente'])})
    if(len(observaciones)>0): aux['observaciones']=observaciones
    db.anclajes.insert(aux)

def existeOs(idOs):
        res=db.obrasSociales.find_one({"_id":str(idOs)})
        if(res==None): return False
        return True

if(str(sys.argv[1])=="0"): cargarEquipos()
if(str(sys.argv[1])=="1"):cargarAnclajes()

# !!!REQUIERE sudo pip install python-dateutil
