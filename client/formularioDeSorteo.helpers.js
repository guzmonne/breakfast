Template.formularioDeSorteo.events({
  'click #new_client': function(e){
    e.preventDefault();
    Session.set('loading', false);
    Session.set('clientId', null);
    Session.set('client', null);
  },
  'submit form': function(e){
    e.preventDefault();
    var template = Template.instance();
    var client = {
      name     : template.$('#inputName').val().toTitleCase(),
      email    : template.$('#inputEmail').val().toLowerCase(),
      company  : template.$('#inputCompany').val().toUpperCase(),
      //project  : template.$('#checkboxProject').prop('checked'),
      //contact  : template.$('#checkboxContact').prop('checked'),
    };
    if (Clients.isNotValid(client)) return Clients.clientIsNotValid(template, client);
    Session.set('loading', true);
    Session.set('error', false);
    Clients.insert(client, function(err, _id){
      if (err) {
        Session.set('loading', false);
        Session.set('error', err.reason);
      };
      Meteor.subscribe('client', _id);
      Session.set('clientId', _id);
    });
  }
});

Template.formularioDeSorteo.helpers({
  error              : function() { return Session.get('error'); },
  client             : function() { return Session.get('client'); },
  loading            : function() { return Session.get('loading') },
  clientIsNotCreated : function() {
    var client, clientId;
    clientId = Session.get('clientId');
    if (!clientId) 
      return true;
    client = Clients.findOne({_id: clientId});
    if (!client) 
      return true;
    Session.set('client', client);
    return false;
  },
});

var isNotValid = function(client){
  return nameIsNotValid(client) || emailIsNotValid(client) || companyIsNotValid(client);
};

var clientIsNotValid = function(template, client){
  var fields = [];
  if (nameIsNotValid(client))    
    fields.push('#inputName');
  if (emailIsNotValid(client))   
    fields.push('#inputEmail');
  if (companyIsNotValid(client)) 
    fields.push('#inputCompany');
  _.each(fields, function(field){
    template.$(field).closest('.form-group').addClass('has-error');
  });
}

var nameIsNotValid = function(client){
  if (client.name === "") return true;
};

var emailIsNotValid = function(client){
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return !re.test(client.email);
};

var companyIsNotValid = function(client){
  if (client.company === "") return true;
};
