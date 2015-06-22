Clients.before.insert(function(userId, doc){
  var client = Clients.findOne({email: doc.email});
  if (client) {
    console.log('Error. Email already registered.');
    throw new Meteor.Error('Email already registered', 'Esta dirección de correo ya esta registrada.');    
  }
  Counters.upsert({collection: 'clients'}, {$inc: { count: 1 }});
  doc.count   = Counters.findOne({collection: 'clients'}).count;
  doc.deleted = false;
});


Clients.after.insert(function(userId, client){
  var body = [
    '<style>@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");</style>',
    '<div style="font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.846; color: #666666; background-color: #ffffff>',
      '<div class="well" style="font-family: inherit; display: block; text-align: center; padding: 19px; margin-bottom:20px; background-color: #f9f9f9; border: 1px solid transparent">',
        '<h1 style="font-family: inherit; margin: 0.67em 0; font-size: 56px; margin-top: 23px; margin-bottom: 11.5px; font-weight: 400; line-height: 1.1; color: #444444">Registro Completo!</h1>',
        '<p style="font-family: inherit; margin: 0 0 1em; display: block;">Felicitaciones <b>' + client.name +'!</b> Ha realizado su registro con exito.</p>',
        '<p style="font-family: inherit; margin: 0 0 1em; display: block;">Su número para el sorteo es el:</p>',
        '<h2 style="font-family: inherit; font-size: 45px; margin-top: 23px; margin-bottom: 11.5px; font-weight: 400; line-height: 1.1; color: #444444">' + client.count + '</h2>',
      '</div>',
    '</div>'
  ].join('');

  Email.send({
    from    : "conatel.meraki.breakfast@gmail.com",
    to      : client.email,
    subject : "Meraki Breakfast - Número de Sorteo",
    html    : body
  });

  console.log('Email sent to ' + client.email + ' successfully');
});