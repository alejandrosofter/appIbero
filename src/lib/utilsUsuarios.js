getModulo=function(nombreModulo,modulos)
{
if(modulos)
  for (var i = 0; i < modulos.length; i++)
    if(String(modulos[i].nombre).toLocaleLowerCase()==String(nombreModulo).toLowerCase())return modulos[i]
  
  return false;
}
getModulo2=function(nombreModulo)
{
  var tipoPerfil=TipoPerfiles.findOne({_id:Meteor.user().profile});
  console.log(Meteor.user().profile)
  if(tipoPerfil){
    var modulos=tipoPerfil.modulosAcceso;
    if(tipoPerfil.esAdministrador)return true;
  for (var i = 0; i < modulos.length; i++)
    if(String(modulos[i].nombre).toLocaleLowerCase()==String(nombreModulo).toLowerCase())return modulos[i]
  
  }
  return false;
}

getColeccionAcceso=function(tipoPerfil,user, nombreColeccion)
{
  var Coleccion=eval(nombreColeccion);
  var modulo=getModulo("anclajes",tipoPerfil.modulosAcceso);
  if(tipoPerfil.esAdministrador)return Coleccion.find();
  if(modulo){
     if(modulo.soloVerMios){
      return Coleccion.find({idUsuario:user._id});
     }
  return Coleccion.find();
  }

  
}
getColeccionPerfil=function(nombreColeccion)
{
  var usuario=Meteor.user();
  if(usuario){
    var tipoPerfil=TipoPerfiles.findOne({_id:usuario.profile});
    if(tipoPerfil)return getColeccionAcceso(tipoPerfil,usuario, nombreColeccion)
  }return []
    
}