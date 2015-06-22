//Meteor.users.remove({});
//console.log(Meteor.users.find().count());

if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    username : 'conatel',
    email    : 'email',
    password : 'C0n4t3l'
  });
  var user = Meteor.users.findOne({username: 'conatel'});
  Accounts.setPassword(user._id, 'C0n4t3l');
  console.log('A default "conatel" user was created');
}