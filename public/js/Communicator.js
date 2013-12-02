// Generated by CoffeeScript 1.6.3
(function() {
  var Communicator, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Communicator = (function() {
    Communicator.prototype.semver = "0.1.1";

    function Communicator(log, onmessage) {
      var _this = this;
      this.log = log;
      this.onmessage = onmessage != null ? onmessage : this.onMessageDefault;
      this.doBind = __bind(this.doBind, this);
      this.listen = __bind(this.listen, this);
      this.serverChannelOpenHandler = __bind(this.serverChannelOpenHandler, this);
      this.exposureChannelOpenHandler = __bind(this.exposureChannelOpenHandler, this);
      this.publishChannelOpenHandler = __bind(this.publishChannelOpenHandler, this);
      this.channelOpenHandler = __bind(this.channelOpenHandler, this);
      this.onMessageDefault = __bind(this.onMessageDefault, this);
      this.errorHandler = __bind(this.errorHandler, this);
      this.flow = __bind(this.flow, this);
      this.startRak = __bind(this.startRak, this);
      this.stopServer = __bind(this.stopServer, this);
      this.sling = __bind(this.sling, this);
      this.startAdapter = __bind(this.startAdapter, this);
      this.startEngine = __bind(this.startEngine, this);
      this.publish = __bind(this.publish, this);
      this.disconnect = __bind(this.disconnect, this);
      this.amqp = new AmqpClient();
      this.amqp.addEventListener("close", function() {
        return _this.log.write("DISCONNECTED");
      });
      this.amqp.addEventListener("error", function(e) {
        return _this.log.write("error: " + e.message);
      });
      this.portIndex = 0;
    }

    Communicator.prototype.connect = function(config, credentials, onconnected) {
      var _this = this;
      this.config = config;
      this.onconnected = onconnected;
      return this.amqp.connect({
        url: config.url,
        virtualHost: config.virtualhost,
        credentials: credentials
      }, function(evt) {
        _this.log.write("CONNECTED");
        _this.channelsReady = 0;
        _this.publishChannel = _this.amqp.openChannel(_this.publishChannelOpenHandler);
        _this.exposureChannel = _this.amqp.openChannel(_this.exposureChannelOpenHandler);
        return _this.serverChannel = _this.amqp.openChannel(_this.serverChannelOpenHandler);
      });
    };

    Communicator.prototype.disconnect = function() {
      return this.amqp.disconnect();
    };

    Communicator.prototype.publish = function(exchange, text, routingKey) {
      var body, headers;
      body = new ByteBuffer();
      body.putString(text, Charset.UTF8);
      body.flip();
      headers = {};
      return this.publishChannel.publishBasic({
        body: body,
        exchange: exchange,
        routingKey: routingKey
      });
    };

    Communicator.prototype.startEngine = function(name) {
      return this.publish(this.config.workX, "start engine " + name, this.config.execQ);
    };

    Communicator.prototype.startAdapter = function(name) {
      return this.publish(this.config.workX, "start adapter " + name, this.config.execQ);
    };

    Communicator.prototype.sling = function(signal, test, rak) {
      return this.publish(this.config.workX, "start sling " + signal + " " + test + " " + rak, this.config.execQ);
    };

    Communicator.prototype.stopServer = function(pid) {
      return this.publish(this.config.workX, "stop " + pid, this.config.execQ);
    };

    Communicator.prototype.startRak = function(name) {
      return this.publish(this.config.workX, "start dot " + name, this.config.execQ);
    };

    Communicator.prototype.flow = function(onOff) {
      this.exposureChannel.flowChannel(onOff);
      return this.serverChannel.flowChannel(onOff);
    };

    Communicator.prototype.errorHandler = function(evt) {
      return this.log.write("Error: " + evt.type);
    };

    Communicator.prototype.onMessageDefault = function(msg) {
      return this.log.write("" + msg.args.routingKey + "> " + (msg.body.getString(Charset.UTF8)));
    };

    Communicator.prototype.channelOpenHandler = function(channel, exchange, type, label) {
      var _this = this;
      this.log.write("open '" + exchange + "' channel ok");
      channel.declareExchange(exchange, type, false, false, false);
      channel.addEventListener("declareexchange", function() {
        return _this.log.write("declare '" + exchange + "' exchange ok");
      });
      channel.addEventListener("close", function() {
        return _this.log.write("close '" + exchange + "' channel ok");
      });
      this.channelsReady++;
      if (this.channelsReady === 3) {
        return this.doBind();
      }
    };

    Communicator.prototype.publishChannelOpenHandler = function(evt) {
      return this.channelOpenHandler(this.publishChannel, this.config.workX, 'direct');
    };

    Communicator.prototype.exposureChannelOpenHandler = function(evt) {
      return this.channelOpenHandler(this.exposureChannel, this.config.signalX, 'topic');
    };

    Communicator.prototype.serverChannelOpenHandler = function(evt) {
      return this.channelOpenHandler(this.serverChannel, this.config.serverX, 'topic');
    };

    Communicator.prototype.listen = function(channel, event, label) {
      var _this = this;
      return channel.addEventListener(event, function() {
        return _this.log.write("" + event + " for '" + label + "' ok");
      });
    };

    Communicator.prototype.doBind = function() {
      var autoDelete, durable, eQName, exclusive, noAck, noLocal, noWait, passive, qArgs, sQName, tag;
      this.exposureChannel.onmessage = this.onmessage;
      this.serverChannel.onmessage = this.onmessage;
      eQName = "exposureQ" + (new Date().getTime());
      sQName = "serverQ" + (new Date().getTime());
      passive = durable = autoDelete = noWait = exclusive = noLocal = noAck = true;
      qArgs = null;
      tag = "";
      this.exposureChannel.declareQueue(eQName, !passive, !durable, exclusive, autoDelete, !noWait).bindQueue(eQName, this.config.signalX, "#", !noWait).consumeBasic(eQName, tag, !noLocal, noAck, noWait, !exclusive);
      this.serverChannel.declareQueue(sQName, !passive, !durable, exclusive, autoDelete, !noWait).bindQueue(sQName, this.config.serverX, "#", !noWait).consumeBasic(sQName, tag, !noLocal, noAck, noWait, !exclusive);
      return typeof this.onconnected === "function" ? this.onconnected() : void 0;
    };

    return Communicator;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Communicator = Communicator;

}).call(this);
