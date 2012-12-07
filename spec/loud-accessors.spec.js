/* Setup tests */
if ( typeof define !== "undefined" && define.amd ) {
	// AMD
	buster.spec.expose();

	require.config({
		paths: {
			"wheels-loud-accessors":  "./wheels-loud-accessors",
			"wheels-pubsub": "spec/lib/dependencies-built"
		}
	});

	describe("When required with AMD", function( run ) {
		require( ["wheels-loud-accessors"], function( LoudAccessors ) {
			run( function() {
				runTests.call( this, LoudAccessors );
			});
		});
	});
} else if ( typeof exports !== "undefined" ) {
	// CommonJS / Node
	var buster = require("buster"),
			LoudAccessors = require("../wheels-loud-accessors");
	runTests( LoudAccessors );
} else {
	// Browser global
	runTests( Wheels.LoudAccessors );
}


function runTests( LoudAccessors ) {

	buster.spec.expose();

	describe("LoudAccessors", function() {

		before(function() {
			this.loudProps = new LoudAccessors();
		});

		describe("set", function() {

			it("sets the value of the attribute", function() {
				this.loudProps.set( "foo", "bar" );
				expect( this.loudProps._attributes.foo ).toEqual("bar");
			});

			it("publishes generic change event", function() {
				var cbk = this.spy();
				this.loudProps.on( "change", cbk );
				this.loudProps.set( "foo", 123 );
				expect( cbk ).toHaveBeenCalledOnce();
			});

			it("passes to generic change event handlers the name and value of the attribute", function() {
				var cbk = this.spy();
				this.loudProps.on( "change", cbk );
				this.loudProps.set( "foo", 123 );
				expect( cbk ).toHaveBeenCalledWith( "change", "foo", 123 );
			});

			it("publishes change:<attribute> event", function() {
				var cbk = this.spy();
				this.loudProps.on( "change:foo", cbk );
				this.loudProps.set( "foo", 123 );
				expect( cbk ).toHaveBeenCalledOnce();
			});

			it("passes to change:<attribute> event handlers the name and value of the attribute", function() {
				var cbk = this.spy();
				this.loudProps.on( "change:foo", cbk );
				this.loudProps.set( "foo", 123 );
				expect( cbk ).toHaveBeenCalledWith( "change:foo", "foo", 123 );
			});

			it("does not publish generic change event if silent option is true", function() {
				var cbk = this.spy();
				this.loudProps.on( "change", cbk );
				this.loudProps.set( "foo", 123, { silent: true } );
				refute.called( cbk );
			});

			it("does not publish change:<attribute> event if silent option is true", function() {
				var cbk = this.spy();
				this.loudProps.on( "change:foo", cbk );
				this.loudProps.set( "foo", 123, { silent: true } );
				refute.called( cbk );
			});

		});

		
		describe("get", function() {

			it("returns the value of attribute", function() {
				this.loudProps._attributes = {};
				this.loudProps._attributes.foo = "bar";
				expect( this.loudProps.get("foo") ).toEqual("bar");
			});

			it("publishes generic read event", function() {
				var cbk = this.spy();
				this.loudProps.on( "read", cbk );
				this.loudProps.get( "foo" );
				expect( cbk ).toHaveBeenCalledOnce();
			});

			it("passes to generic read event handlers the name and value of the attribute", function() {
				var cbk = this.spy();
				this.loudProps._attributes = { foo: 123 };
				this.loudProps.on( "read", cbk );
				this.loudProps.get( "foo" );
				expect( cbk ).toHaveBeenCalledWith( "read", "foo", 123 );
			});

			it("publishes read:<attribute> event", function() {
				var cbk = this.spy();
				this.loudProps.on( "read:foo", cbk );
				this.loudProps.get( "foo" );
				expect( cbk ).toHaveBeenCalledOnce();
			});

			it("passes to read:<attribute> event handlers the name and value of the attribute", function() {
				var cbk = this.spy();
				this.loudProps._attributes = { foo: 123 };
				this.loudProps.on( "read:foo", cbk );
				this.loudProps.get( "foo" );
				expect( cbk ).toHaveBeenCalledWith( "read:foo", "foo", 123 );
			});

			it("does not publish generic read event if silent option is true", function() {
				var cbk = this.spy();
				this.loudProps.on( "read", cbk );
				this.loudProps.get( "foo", { silent: true } );
				refute.called( cbk );
			});

			it("does not publish read:<attribute> event if silent option is true", function() {
				var cbk = this.spy();
				this.loudProps.on( "read:foo", cbk );
				this.loudProps.get( "foo", { silent: true } );
				refute.called( cbk );
			});

		});

		describe("class methods", function() {

			describe("attrAccessors", function() {
				
				it("defines a properties with loud setters", function() {
					var spy = this.spy(),
							Foo = LoudAccessors.subclass(function() {
								this.attrAccessors("bar");
							}),
							foo = new Foo();

					if ( Object.defineProperty ) {
						this.stub( foo, "set", spy );
						foo.bar = 123;
						expect( spy ).toHaveBeenCalledWith( "bar", 123 );
					} else {
						// Dummy assertion for engines not supporting Object.defineProperty
						expect( true ).toEqual( true );
					}
				});

				it("defines properties with loud getters", function() {
					var spy = this.spy(),
							Foo = LoudAccessors.subclass(function() {
								this.attrAccessors("bar");
							}),
							foo = new Foo();

					if ( Object.defineProperty ) {
						this.stub( foo, "get", spy );
						var bar = foo.bar;
						expect( spy ).toHaveBeenCalledWith( "bar" );
					} else {
						// Dummy assertion for engines not supporting Object.defineProperty
						expect( true ).toEqual( true );
					}
				});

			});

		});

	});

};