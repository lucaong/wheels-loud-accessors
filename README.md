Wheels Loud Accessors
=====================

A constructor for objects with attribute accessors that emit change/read events. Fully compatible with CommonJS (Node), AMD and standard browser script tag include.


Install
=======

`wheels-loud-accessors` can be included in a project with CommonJS / npm, AMD or standard browser script tag. Its dependencies are `wheels-pubsub` and `wheels-class`.

**npm**

```shell
npm install wheels-loud-accessors
```

**AMD / RequireJS**

```javascript
// Remember to provide the dependencies `wheels-pubsub` and `wheels-class`
require(["wheels-loud-accessors"], function( LoudAccessors ) {
  var foo = new LoudAccessors();
});
```

**Traditional browser script tag**

```html
<script type="text/javascript" src="path/to/wheels-class.js"></script>
<script type="text/javascript" src="path/to/wheels-pubsub.js"></script>
<script type="text/javascript" src="path/to/wheels-loud-accessors.js"></script>
<script type="text/javascript">
  var foo = new Wheels.LoudAccessors();
</script>
```


Usage
-----

**Setters:**

```javascript
var foo = new LoudAccessors();

foo.on("change", function( evt, attribute, val ) {
  console.log("Attribute " + attribute + " was set to value " + val );
});

foo.set( "bar", 123 ); // console: Attribute bar was set to value 123
```

**Getters:**

```javascript
var foo = new LoudAccessors();

foo.on("read", function( evt, attribute, val ) {
  console.log("Attribute " + attribute + " was read" );
});

foo.get( "bar" ); // console: Attribute bar was read
```

In JavaScript engines that support Object.defineProperty, we can do even better:

```javascript
var Foo = LoudAccessors.subclass(function() {
      this.loudAccessors("bar")
    }),
    foo = new Foo();

foo.on("change", function( evt, attribute, val ) {
  console.log("Attribute " + attribute + " was set to value " + val );
});
foo.on("read", function( evt, attribute, val ) {
  console.log("Attribute " + attribute + " was read" );
});

foo.bar = 123;      // console: Attribute bar was set to value 123
var qux = foo.bar;  // console: Attribute bar was read
```