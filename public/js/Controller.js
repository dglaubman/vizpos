// Generated by CoffeeScript 1.6.3
(function() {
  var Server, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Controller = (function() {
    var avail, cache, inuse, make, numSlots, unmake;

    function Controller(log) {
      this.log = log;
    }

    Controller.prototype.stat = function(pid, losses) {
      return this.log.write("" + pid + ": " + losses);
    };

    Controller.prototype.ready = function(sender, dot, rak) {
      return this.log.write("" + sender + ": " + dot + " on " + rak);
    };

    Controller.prototype.stopped = function(name) {
      return unmake(name);
    };

    Controller.prototype.dataReady = function(at, text) {};

    Controller.prototype.stopServer = function(event) {
      return alert("please set action for Controller.stopServer");
    };

    make = function(type, name, stopServer) {};

    unmake = function(name) {};

    numSlots = 30;

    avail = (function() {
      var _i, _results;
      _results = [];
      for (_i = 0; 0 <= numSlots ? _i < numSlots : _i > numSlots; 0 <= numSlots ? _i++ : _i--) {
        _results.push(1);
      }
      return _results;
    })();

    cache = {};

    inuse = {};

    return Controller;

  })();

  Server = (function() {
    function Server(widget, type, name, stop, log) {
      this.widget = widget;
      this.log = log;
      this.log = __bind(this.log, this);
    }

    Server.prototype.log = function(text) {
      return this.log.write(text);
    };

    Server.prototype.die = function() {
      var _this = this;
      return this.widget.hide('slow', function() {
        return _this.widget.remove();
      });
    };

    Server.prototype.updateLoad = function(load) {};

    return Server;

  })();

}).call(this);
