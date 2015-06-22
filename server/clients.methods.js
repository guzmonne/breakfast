Meteor.methods({
  cleanClientsTable: function(){
    if (!Meteor.userId()) throw Meteor.Error('Not Authorized', 'You must be logged in to clean the clients table.');
    Clients.update({}, {$set: { deleted: true }}, {multi: true});
  }
});