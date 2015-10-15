Clients  = new Mongo.Collection('clients');

Clients.allow({
  insert: function(){ return true; },
  remove: function(userId){ return userId; },
})

_.extend(Clients, {
  /**
   * Check if client is not valid
   * @param  {Object}  client Client object taken from params on form
   * @return {Boolean}        Returns true if the client is no valid.
   */
  isNotValid: function(client){
    return Clients.nameIsNotValid(client) || Clients.emailIsNotValid(client) || Clients.companyIsNotValid(client);
  },
  /**
   * It checks each parameter that needs validation and updates the template to express the errors
   * @param  {Blaze.Template} template Active template to apply the changes
   * @param  {Object} client   Client object taken from the form
   * @return {Void}          Only responsability is to change the template
   */
  clientIsNotValid: function(template, client){
    var fields = [];
    if (Clients.nameIsNotValid(client))    fields.push('#inputName');
    if (Clients.emailIsNotValid(client))   fields.push('#inputEmail');
    if (Clients.companyIsNotValid(client)) fields.push('#inputCompany');
    _.each(fields, function(field){
      template.$(field).closest('.form-group').addClass('has-error');
    });
  },
  /*
    Validation calls
   */
  nameIsNotValid: function(client){
    if (client.name === "") return true;
  },
  emailIsNotValid: function(client){
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return !re.test(client.email);
  },
  companyIsNotValid: function(client){
    if (client.company === "") return true;
  }
});