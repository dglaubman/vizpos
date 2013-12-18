root = exports ? window

class root.Controller

  constructor: (@log) ->

  stat: (track, position, loss) ->
    @log.write "#{position}: #{loss}"

  ready: (route, track) ->
    @log.write "#{route} on #{track}"

    # server = cache[name] ?= make( type, name, @stopServer, @log )
    # server.updateLoad load

  stopped: (type, name) ->
    @log.write "recd stopped signal for #{type} #{name}"


  dataReady: (at, text) ->
 #   @log.write "#{at} signal: #{JSON.stringify(text)}"

  stopServer: (event) -> alert "please set action for Controller.stopServer"

  make = (type, name, stopServer) ->
    # next = .inArray 1, avail
    # unless next is -1
    #   avail[next] = 0
    #   inuse[name] = next
    #   slot = $("ul.template.#{type}").children().clone()
    #   $("ul.target.#{type}s").append( slot )
    #   new Server( slot, type, name, stopServer )

  unmake = (name) ->
    # widget = cache[name]
    # widget?.die()
    # delete cache[name]
    # avail[ inuse[name] ] = 1
    # delete inuse[name]

  numSlots = 30
  avail = (1 for [0...numSlots])
  cache = {}
  inuse = {}

class Server
  constructor: (@widget, type, name, stop, @log ) ->
#     at = name
# #    $( ".info > .latest", @widget ).html type
# #    @logger = new Log $(".console", @widget)
#     $( ".at",        @widget ).html at
# #    $( ".clear",     @widget ).on 'click', => @logger.clear()
#     $( ".close",     @widget ).on 'click', =>
#       stop name
#       $( @widget ).css( "background-color", "lightgrey" )

  log: (text) => @log.write text

  die: -> @widget.hide('slow', => @widget.remove() )

  updateLoad: (load) ->
#     load = Math.min parseInt(load,10), 100
# #    @log.write load
#     switch load
#       when 100
#         $( ".verticalBar", @widget ).css( "background-color", "red" )
#       else
#         color =  Math.floor(load * 256 / 100)
#         $( ".verticalBar", @widget ).css( "background-color", "rgb(#{color},255,0)" )
#     $( ".verticalBar", @widget ).css( "height", "#{load}%" )


