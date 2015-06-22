Counters = new Mongo.Collection('counters');

Counters.allow({
  insert: function(userId){ return userId; },
  update: function(userId){ return userId; },
});