 import Tabular from 'meteor/aldeed:tabular';
import moment from 'moment';

 so__=new Tabular.Table({
  name: "Anclajes",
   language: {
     processing: "<img src='/images/loading.gif'>"
  },
   processing: true,
   stateSave: true,
  collection: Anclajes,
  filters: ['filtro_equipoEnsayo'],
   createdRow( row, data, dataIndex ) {
    if(data.estado=="BAJA"){
      var fila=$(row);
      
      var dias=getDiasVto(row.fechaEnsayo);
        if(dias<90) fila.attr("class","warning"); //danger, success,info
        
    }
  },
   extraFields: ['equipoEnsayo', 'horaEnsayo',"certificado","observaciones","equipoIngresante"],
    buttons: ['copy', 'excel', 'csv', 'colvis'],
   autoWidth: false, // puse esto por que cuando eliminaba un socio y volvia a socios queda la tabla por la mitad
//classname:"compact",
  columns: [
     {
        title: 'Vto.',
       width: '80px',
       data:"fechaEnsayo",
      render:function (value, type, object) {
         var dias=getDiasVto(value);
        if(dias<90) return "Muy Vencido";
        return dias+" dias";
         }
      },
      {
        title: 'Pozo',
        width: '100px',
        data:"pozo"
      },
      
      {
        title: 'Bateria',
       	width: '70px',
      	data:"bateria",
        render:function (value, type, object) {
         if(value)return value;
         return "-"
         }
      },
      {
        title: 'Cert.',
       	width: '70px',
      	data:"certificacion"
      },
      {
        title: 'Equipo',
       	width: '100px',
      	data:"equipoEnsayo",
        render:function (value, type, object) {
         var aux=AnclajesEquipos.findOne(value);
         if(aux)return aux.nombreEquipo;
         return "-"
         },
         visible:true
      },
      {
        title: 'Ensayado..',
       	width: '100px',
       	data:"fechaEnsayo",
      	render:function (value, type, object) {
         var d = new Date(value);
        var hora=object.horaAnclaje?object.horaAnclaje:"";
           if(value) return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+hora;
           return "-"
         }
      },
      {
        title: 'Construido..',
       	width: '100px',
       	data:"fechaConstruccion",
      	render:function (value, type, object) {
         var d = new Date(value);
        if(value)  return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
        return "-"
         }
      },
      {
        title: 'NO',
       	width: '30px',
      	data:"estadoNO",
      	render:function (value, type, object) {
          return  new Spacebars.SafeString(colorearEstado(value))
         }

      },
      {
        title: 'NE',
       	width: '30px',
      	data:"estadoNE",
      	render:function (value, type, object) {
          return  new Spacebars.SafeString(colorearEstado(value))
         }

      },
      {
        title: 'SO',
       	width: '30px',
      	data:"estadoSO",
      	render:function (value, type, object) {
          return  new Spacebars.SafeString(colorearEstado(value))
         }

      },
      {
        title: 'SE',
       	width: '30px',
      	data:"estadoSE",
      	render:function (value, type, object) {
          return  new Spacebars.SafeString(colorearEstado(value))
         }

      },
      {
      	width: '160px',
      tmpl: Meteor.isClient && Template.accionesAnclajes
    }
      
  ]
});
 function colorearEstado(estado)
{
  if(estado=="A")return "<b style='color:green'>"+estado+"</b>";
  if(estado=="R")return "<b style='color:red'>"+estado+"</b>";
  return "<b style='color:grey'> - </b>";
}