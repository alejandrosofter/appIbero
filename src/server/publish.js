Meteor.publishComposite("anclajesPublish", function (tableName, ids, fields) {
  // check(tableName, String);
  // check(ids, Array);
  // check(fields, Match.Optional(Object));

  // this.unblock(); // requires meteorhacks:unblock package

  return {
    find: function () {
      // this.unblock(); // requires meteorhacks:unblock package

      // check for admin role with alanning:roles package
      // if (!Roles.userIsInRole(this.userId, 'admin')) {
      //   return [];
      // }
      var mod=getModulo2("Anclajes");

      if(mod){
        
        if(mod.hasOwnProperty("soloVerMios")){
          
          if(mod.soloVerMios){
            console.log(Meteor.user()._id)
            return Anclajes.find({_id: {$in: ids}}, {idUsuario:"2ga37rdx57sGGLD7f"});
          }
        }
        
        return [];
      }
      return [];
      
    },
    children: [
      {
        find: function(feedback) {
          // this.unblock(); // requires meteorhacks:unblock package
          // Publish the related user
          return Meteor.users.find({_id: feedback.userId}, {limit: 1, fields: {emails: 1}, sort: {_id: 1}});
        }
      }
    ]
  };
});