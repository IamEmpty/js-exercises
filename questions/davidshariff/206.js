var x = 3;

var foo = {
  x: 2,
  baz: {
    x: 1,
    bar: function() {
      return this.x;
    }
  }
}

var go = foo.baz.bar;

alert(go());
alert(foo.baz.bar());
