import { Random } from 'meteor/random'

import { FilesCollection } from 'meteor/ostrio:files';
Settings = new Mongo.Collection('settings');
Anclajes = new Mongo.Collection('anclajes');
AnclajesEquipos = new Mongo.Collection('anclajesEquipos');
Personal = new Mongo.Collection('personal');
PersonalLiquidaciones = new Mongo.Collection('personalLiquidaciones');
TipoPerfiles = new Mongo.Collection('tipoPerfiles');
Archivos = new FilesCollection({collectionName: 'Archivos'});
// export default Archivos; 
// Archivos = new FS.Collection("archivos", {
//   stores: [new FS.Store.FileSystem("archivos", {path: "/var/www/uploads"})]
// });
// Archivos.allow({
//  insert: function(){
//  return true;
//  },
//  update: function(){
//  return true;
//  },
//  remove: function(){
//  return true;
//  },
//  download: function(){
//  return true;
//  }
// });
TipoPerfiles.attachSchema(new SimpleSchema({
  nombrePerfil: {
    type: String,
    label: "Nombre Perfil",
  },
   esAdministrador: {
    type: Boolean,
    label: "Es administrador?",
    autoform:{ type:"boolean-checkbox" },
  },

  modulosAcceso: {
    type: Array,
    label: 'Modulos de Acceso',
    optional: true
  },
  "modulosAcceso.$":{
    type:Object,
  },
   "modulosAcceso.$._id":{

    type: String,
    autoform:{
      type:"hidden"
    },
    autoValue: function() {
      return Random.id();
    }
 
  },
   "modulosAcceso.$.soloVerMios":{

    type: Boolean,
    autoform:{
      type:"boolean-checkbox"
    },
    optional:true
 
  },
  "modulosAcceso.$.nombre":{

    type: String,
    label:"Nombre Modulo [acciones]"
 
  },

 
 
}));



PersonalLiquidaciones.attachSchema(new SimpleSchema({
   horas: {
    type: Array,
    label: 'Horas',
    optional: true
  },
  "horas.$":{
    type:Object,
  },
   "horas.$._id":{

    type: String,
    autoValue: function() {
      return Random.id();
    }
 
  },
   "horas.$.dia":{
    type: Number,
    optional:true,
    label:"Día",
    autoform: {
      style:"width:60px"
      },
 
  },
  "horas.$.viandas":{
    type: Number,
    optional:true,
    autoform: {
      style:"width:60px"
      },
 
  },
  "horas.$.cantidad":{
    type: Number,
    optional:false,
    autoform: {
      style:"width:60px"
      },
 
  },
  "horas.$.idPersonal":{
    type: String,
    optional:false,
    label:"Personal",
    autoform: {
      type:"hidden",
      style:"width:60px"
      },
 
  },
   "horas.$.tipoHora":{
    type: String,
    optional:true,
    label:"Tipo de Hora",
    autoform: {
       type: "select2",
        placeholder: 'Seleccione...',
        style: "width:120px",
        options: [

            {label: "NORMAL", value: "NORMAL"},
            {label: "AL 50%", value: "AL 50%"},
            {label: "AL 100%", value: "AL 100%"},
            {label: "50% NOCT.", value: "50% NOCT."},
            {label: "100% NOCT", value: "100% NOCT"},
            {label: "FERIADO", value: "FERIADO"},
            {label: "ESPECIAL", value: "ESPECIAL"},


      ]
    }
 
  },
  fechaDesde: {
    type: Date,
    label: "Desde",
  },
  fechaHasta: {
    type: Date,
    label: "Hasta",
  },
  tipoPersonal: {
    type: String,
    label: "Tipo Personal",
    autoform: {
       type: "select2",
        placeholder: 'TIPO PERSONAL',
        style: "width:220px",
        options: [

            {label: "UOCRA", value: "UOCRA"},
            {label: "FUERA CONVENIO", value: "FUERA CONVENIO"},
      ]
    }
  },
   estado: {
    type: String,
    label: "Estado",
    autoform: {
       type: "select2",
        placeholder: 'Estado',
        style: "width:220px",
        options: [

            {label: "PENDIENTE", value: "PENDIENTE"},
            {label: "CANCELADO", value: "CANCELADO"},
      ]
    }
  },
}) )

Personal.attachSchema(new SimpleSchema({
  accidentes: {
    type: Array,
    label: 'Accidentes',
    optional: true
  },
  "accidentes.$":{
    type:Object,
  },
   "accidentes.$._id":{

    type: String,
    autoValue: function() {
      return Random.id();  
    }
 
  },
  "accidentes.$.fechaAccidente": {
    type: Date,
    label: "Fecha Accidente",
    autoform:{
       style:"font-size:9px;text-indent:0.5px",
    }
  },
  "accidentes.$.fechaDenuncua": {
    type: Date,
    label: "Fecha Denuncia",
     autoform:{
      style:"font-size:9px;text-indent:0.5px",

    }
  },
  "accidentes.$.fechaAlta": {
    type: Date,
    label: "Fecha Alta",
     autoform:{
       style:"font-size:9px;text-indent:0.5px",
    }
  },
  "accidentes.$.comentario": {
    type: String,
    optional:true,
    label: "Comentarios",
     autoform: {
       type: "textarea",
     }
  },
  apellido: {
    type: String,
    label: "Apellido",
  },
  nombre: {
    type: String,
    label: "Nombre",
  },
  nroLegajo: {
    type: Number,
    unique:true,
    label: "Nro Legajo",
  },
  cuil: {
    type: String,
    label: "CUIL",
  },
  tipoPersonal: {
    type: String,
    label: "Tipo Personal",
    autoform: {
       type: "select2",
        placeholder: 'TIPO PERSONAL',
        style: "width:140px",
        options: [

            {label: "UOCRA", value: "UOCRA"},
            {label: "FUERA CONVENIO", value: "FUERA CONVENIO"},
      ]
    }
  },

  obraSocial: {
    type: String,
    label: "Obra Social",
  },
  sueldo: {
    type: String,
    label: "Sueldo",
  },
  centroCosto: {
    type: String,
    label: "CC",
    autoform: {
       type: "select2",
        placeholder: 'CC',
        style: "width:80px",
        options: [

            {label: "100", value: "100"},
            {label: "101", value: "101"},
            {label: "200", value: "200"},
            {label: "300", value: "300"},
            {label: "500", value: "500"},
            {label: "600", value: "600"},
            {label: "601", value: "601"},
            {label: "603", value: "603"},
            {label: "700", value: "700"},
            {label: "701", value: "701"},
      ]
    }
  },
  categoria: {
    type: String,
    label: "Cactegoria",
    autoform: {
       type: "select2",
        placeholder: 'Categoria',
        style: "width:160px",
        options: [

            {label: "AYUDANTE", value: "AYUDANTE"},
            {label: "MEDIO OFICIAL", value: "MEDIO OFICIAL"},
            {label: "OFICIAL", value: "OFICIAL"},
            {label: "OFICIAL ESPECIAL", value: "OFICIAL ESPECIAL"},
            {label: "SERENO", value: "SERENO"},
      ]
    }
  },
  fechaExamen: {
    type: Date,
    label: "Exámen Preoc.",
    optional:true
  },
  estado: {
    type: String,
    label: "Estado",
    autoform: {
       type: "select2",
        placeholder: 'Estado',
        style: "width:160px",
        options: [

            {label: "ALTA", value: "ALTA"},
            {label: "BAJA", value: "BAJA"},
            {label: "SUSPENDIDO", value: "SUSPENDIDO"},
      ]
    }
  },
}))

AnclajesEquipos.attachSchema(new SimpleSchema({
  nombreEquipo: {
    type: String,
    label: "Nombre Equipo",
  },
  detalle: {
    type: String,
    label: 'Detalle',
    optional:true,
     autoform: {
       type: "textarea",
        placeholder: 'Detalle para el equipo de ensayo',
     
    },
  },
  idUsuario: {
    type: String,
    label: 'Usuario',
    optional:true,
      autoform: {
       type: "select2",
       options: function () {
        if(Meteor.isClient)
        return _.map(Session.get("usuarios"), function (c, i) {
          return {label: c.username, value: c._id};
        })},
        style: "width:250px",
      },
  },
  created: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset();
      }
    },
  },
  updated: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
  },
 
})); 

Anclajes.attachSchema( new SimpleSchema({
  // zona: {
  //   type: String,
  //   label: 'Zona',
  //   autoform: {
  //      type: "select2",
  //     placeholder: 'Seleccione Zona',
  //     style: "width:80px",
  //     options: [
  //       {label: "AH", value: "AH"},
  //           {label: "BV", value: "BV"},
  //           {label: "CL", value: "CL"},
  //           {label: "CM", value: "CM"},
  //           {label: "COV", value: "COV"},
  //           {label: "CS", value: "CS"},
  //           {label: "CW", value: "CW"},
  //           {label: "EC", value: "EC"},
  //           {label: "EH", value: "EH"},
  //           {label: "HT", value: "ET"},
  //           {label: "KK", value: "KK"},
  //           {label: "LH", value: "LH"},
  //           {label: "ME", value: "ME"},
  //           {label: "MS", value: "MS"},
  //           {label: "MSA", value: "MSA"},
  //           {label: "PC", value: "PC"},
  //           {label: "PCX", value: "PCX"},
  //           {label: "SPC", value: "SPC"},
  //           {label: "TP", value: "TP"},
  //     ]
  //   },
  //   max: 200
  // },
  certificado: {
    type: String,
    optional:true,
    label:"Certificado",

    autoform: {
      placeholder:"Click para seleccionar el archivo del CERTIFICADO (puede arrastrar aquí tambien)...",
      // afFieldInput: {
      //   type: "cfs-file",
      //   collection: "archivos"
      // }
       afFieldInput: {
        type: 'fileUpload',
        collection: 'Archivos',
        // uploadTemplate: 'uploadField' // <- Optional
        // previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  },

   pozo: {
    type: String,
    label: 'Pozo'
  },
  bateria: {
    type: String,
    label: 'Bateria',
     optional: true
  },
  idUsuario: {
    type: String,
    label: 'Usuario',
    optional: true
  },
  certificacion: {
    type: String,
    label: 'Nro Cert.'
  },
  equipoEnsayo:{
     type: String,
    optional:true,
    label:"Equipo Ensayo",
    autoform: {
       type: "select2",
       select2Options:{
           placeholder: 'Seleccione...',
         width:"200px",
         allowClear:true,
       },
       options: function () {
        return _.map(AnclajesEquipos.find().fetch(), function (c, i) {
          return {label: c.nombreEquipo, value: c._id};
        })},
        style: "width:250px",
      },
  },
   equipoIngresante: {
    type: String,
    label: 'Equipo Ingresante',
     autoform: {
       type: "select2",
        placeholder: 'Equipo Ingresante',
        style: "width:120px",
        options: [

            {label: "PULLING", value: "PULLING"},
            {label: "DRILLING", value: "DRILLING"},
            {label: "WORK OVER", value: "WORK OVER"},
      ]
    }
  },
  fechaEnsayo:{
    type: Date,
    label: 'Fecha Construccion',
    optional:true
  },
   fechaConstruccion:{
    type: Date,
    label: 'Fecha Ensayo',
    optional:true
  },
   horaEnsayo: {
    type: String,
    label: 'Hora Ensayo',
    optional: true
  },
  numeroAFE: {
    type: String,
    label: 'Nro AFE',
    optional: true
  },
  cantidadAnclajes: {
    type: Number,
    label: 'Cant. Construidos',
    optional: true
  },
  tipoAnclajesConstruidos: {
    type: Number,
    label: 'Tipo Anclaje Construido',
     autoform: {
       type: "select2",
        placeholder: 'Tipo Anclaje Construido',
        style:"width:300px",
        options: [

            {label: "PERFORACIÓN", value: "PERFORACIÓN"},
            {label: "TERMINACIÓN", value: "TERMINACIÓN"},
      ]
    },
    optional: true
  },
  numeroFactura: {
    type: String,
    label: 'Nro Factura',
    optional: true
  },
  archivo: {
    type: String,
    label: 'Archivo',
    optional: true,
    
  },
  constEnsayo: {
    type: String,
    label: 'constEnsayo',
    optional: true,
    
  },
  cantidadAnclaje: {
    type: String,
    label: 'cantidadAnclaje',
    optional: true,
    
  },
  constConstruido: {
    type: String,
    label: 'constConstruido',
    optional: true,
    
  },
  estadoNO: {
    type: String,
    label: 'NO',
    optional: true,
    autoform: {
       type: "select",
       firstOption:"",
        options: [
            {label: "A", value: "A"},
            {label: "R", value: "R"},
            {label: "", value: ""},

      ]
    },
  },
  estadoNE: {
    type: String,
    label: 'NE',
    optional: true,
    autoform: {
       type: "select",
       firstOption:"",
        options: [
            {label: "A", value: "A"},
            {label: "R", value: "R"},
            {label: "", value: ""},
      ]
    },
  },
  estadoSO: {
    type: String,
    label: 'SO',
    optional: true,
    autoform: {
       type: "select",
       firstOption:"",
        options: [
            {label: "A", value: "A"},
            {label: "R", value: "R"},
            {label: "", value: ""},
      ]
    },
  },
  estadoSE: {
    type: String,
    label: 'SE',
    optional: true,
    autoform: {
       type: "select",
     firstOption:"",
        options: [
            {label: "A", value: "A"},
            {label: "R", value: "R"},
            {label: "", value: ""},
      ]
    },
  },
   nroReporte: {
    type: String,
    label: 'Nro Reporte',
     optional: true
  },
  
  observaciones: {
    type: Array,
    label: 'Observaciones',
    optional: true
  },
  "observaciones.$":{
    type:Object,
  },
   "observaciones.$._id":{

    type: String,
    autoValue: function() {
      return Random.id();
    }
 
  },
   "observaciones.$.fecha":{
    type: Date,
    optional:true,
    autoform: {
      type:"hidden",
      },
 
  },
  "observaciones.$.usuario":{
    type: String,
    optional:true,
    autoform: {
      type:"hidden",
      },
 
  },
  "observaciones.$.detalle":{
    type: String,
    label:"Observacion",
    // optional:true,
    autoform: {
      // type:"textarea",
      // style:"width:450px",
      placeholder:"Describa la observación..."
      },
 
  },
  estado: {
    type: String,
    label: 'Estado',
    optional: true
  },
}) );

Settings.attachSchema(new SimpleSchema({
  clave: {
    type: String,
    label: "Clave",
  },
  valor: {
    type: String,
    label: 'Valor',
  },
  fecha: {
    type: Date,
     label: 'Fecha',
    optional: true,

  },
  created: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset();
      }
    },
  },
  updated: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
  },
 
}));

TipoPerfiles.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
})
Anclajes.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
})

AnclajesEquipos.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
})
PersonalLiquidaciones.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
})
PersonalLiquidaciones.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
})
TipoPerfiles.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
})
