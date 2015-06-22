Template.login.events({
  'submit form': function(e){
    e.preventDefault();
    var temp = Template.instance();
    var user = temp.$('#inputUsername').val();
    var pass = temp.$('#inputPassword').val();
    Meteor.loginWithPassword(user, pass, function(err){
      if (err) {
        console.log(err); 
        temp.$('form-control').addClass('has-error');
        return;
      }
      Session.set('currentUser', Meteor.users.findOne({username: user}));
      Router.go('/admin');
    });
  }
});