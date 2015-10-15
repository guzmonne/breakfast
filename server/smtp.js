// server/smtp.js
/*
Meteor.startup(function () {
  smtp = {
    username : 'preventaconatel',   // eg: server@gentlenode.com
    password : 'C0n4t3lC0n4t3l',   // eg: 3eeP1gtizk5eziohfervU
    server   : 'smtp.gmail.com',  // eg: mail.gandi.net
    port     : 465
  };

process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
*/
process.env.MAIL_URL = 'smtp://localhost:25'
