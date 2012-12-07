(function( top, factory ) {

  // Export LoudAccessors as
  if ( typeof exports !== "undefined" ) {
    // CommonJS / Node
    var PubSub = require("wheels-pubsub");
    exports = module.exports = exports.LoudAccessors = factory( PubSub );
  } else if ( typeof define === "function" && define.amd ) {
    // AMD
    define(["wheels-pubsub"], function( PubSub ) {
      return factory( PubSub );
    });
  } else {
    // Browser global
    top.Wheels = top.Wheels || {};
    top.Wheels.LoudAccessors = factory( top.Wheels.PubSub );
  }

}( this, function( PubSub ) {

    var LoudAccessors = PubSub.subclass(function( proto ) {

      proto.set = function( name, val, options ) {
        this._attributes = this._attributes || {};
        this._attributes[ name ] = val;

        if ( !options || !options.silent ) {
          this.emit( "change", name, val );
          this.emit( "change:" + name, name, val );
        }
      };

      proto.get = function( name, options ) {
        this._attributes = this._attributes || {};

        if ( !options || !options.silent ) {
          this.emit( "read", name, this._attributes[ name ] );
          this.emit( "read:" + name, name, this._attributes[ name ] );
        }

        return this._attributes[ name ];
      };

      this.attrAccessors = function() {
        var klass = this,
            args = Array.prototype.slice.call( arguments );

        function makeAccessors( name ) {
          Object.defineProperty( klass.prototype, name, {
            get: function() {
              return this.get( name );
            },
            set: function( val ) {
              this.set( name, val );
            }
          });
        }

        for ( var i = 0, len = args.length; i < len; i++ ) {
          if ( Object.defineProperty ) {
            if ( ({}).toString.call( args[ i ] ) === "[object Array]" ) {
              klass.attrAccessors.apply( klass, args[ i ] );
            } else {
              makeAccessors( args[ i ] );
            }
          }
        }
      };

    });

    return LoudAccessors;

  })

);