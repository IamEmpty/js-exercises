var bar = 1,
  foo = {};

foo: {
  bar: 2;
  baz: ++bar;
};
foo.baz + foo.bar + bar;
