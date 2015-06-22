/**
 * Default Layout
 */
Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
  this.render('formularioDeSorteo');
});

Router.route('/admin', function(){
  //if (!Meteor.user()) return Router.go('/login');
  if (!Session.get('currentUser')) return Router.go('/login');
  this.wait(Meteor.subscribe('clients'));
  this.wait(Meteor.subscribe('counters'));
  if (this.ready()){
    this.render('admin');
  } else {
    this.render('loading');
  }
});

Router.route('/login', function(){
  this.render('login');
});
