// Generated by CoffeeScript 1.6.3
(function() {
  var root, semver;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  semver = "0.1.1";

  root.config = {
    serverX: 'serverX',
    workX: 'workX',
    signalX: 'signalX',
    execQ: 'execQ',
    url: 'ws://cadt0734.rms.com:8001/amqp',
    virtualhost: "v" + semver,
    credentials: {
      username: 'guest',
      password: 'guest'
    }
  };

}).call(this);
