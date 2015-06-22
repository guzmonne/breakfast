Meteor.publish('clients', function(){
  return Clients.find({deleted: false});
});

Meteor.publish('client', function(_id){
  return Clients.find({_id: _id});
});

Meteor.publish('counters', function(){
  return Counters.find();
});