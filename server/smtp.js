// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username : 'conatel.meraki.breakfast',   // eg: server@gentlenode.com
    password : 'c0n4t3lc0n4t3l',   // eg: 3eeP1gtizk5eziohfervU
    server   : 'smtp.gmail.com',  // eg: mail.gandi.net
    port     : 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});