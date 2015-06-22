var count = function(){ return Clients.find({}).fetch().map(function(client){ return client.count || 0 }); };

var first = function(){ 
  if (Clients.find({}).count() === 0){ return 0; }
  return count().reduce(function(n, m){ if (n < m) { return n } else { return m } }); };

var last  = function(){ 
  if (Clients.find({}).count() === 0){ return 0; }
  return count().reduce(function(n, m){ if (n > m) { return n } else { return m } }); };

var next  = function(){ return Counters.findOne({collection: 'clients'}).count + 1; }

var resetCounter = function(){ Counters.update(clientsCounterId(), { $set: { count: 0 } }); };

var clientsCounterId = function(){ return Counters.findOne({collection: 'clients'})._id; };

var filter = function(event, template){ Session.set('filter', template.$('#filter').val()); };

var clients = function(){
  var query = {}, filter = Session.get('filter');
  if (filter && filter !== ""){
    query = {$or: [ {name: filter}, {company: filter}, {count: parseInt(filter)} ]};
  }
  return Clients.find(query, {sort: {count: -1}}).fetch();
};

Template.admin.helpers({
  clients : function(){ return clients(); },
  first   : function(){ return first(); },
  last    : function(){ return last(); },
  next    : function(){ return next(); },
  project : function(){ if (this.project) { return 'SI' } else { return 'NO' } },
  contact : function(){ if (this.contact) { return 'SI' } else { return 'NO' } }
});

Template.admin.events({
  'click #reset_counter': function(e){
    e.preventDefault();
    if (confirm('¿Esta seguro que desea reiniciar el contador?')){
      resetCounter();
    }
  },
  'click #clean_clients_table': function(e){
    e.preventDefault();
    if (confirm('¿Esta seguro que desea limpiar la tabla de clientes?')){
      resetCounter();
      Meteor.call('cleanClientsTable');
    }
  },
  'keydown #filter': _.debounce(filter, 500),
});