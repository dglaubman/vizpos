// Generated by CoffeeScript 1.6.3
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Log = (function() {
    function Log(targ) {
      this.targ = targ;
      this.lines = 0;
    }

    Log.prototype.write = function(message) {
      if (this.lines++ > Log.MaxLines) {
        this.clear();
      }
      return this.targ.prepend("<pre>" + message + "</pre>");
    };

    Log.prototype.clear = function() {
      this.targ.html('');
      return this.lines = 0;
    };

    Log.MaxLines = 500;

    return Log;

  })();

}).call(this);
