const questions =
[ { name: '10',
    category: 'unclassified',
    value: 'console.log(4 - "5" + 0xf - "1e1");\n' },
  { name: '11',
    category: 'unclassified',
    value: 'function F() {}\n\nconsole.log(F.prototyope);\n' },
  { name: '12',
    category: 'unclassified',
    value: 'function F() {}\n\nconsole.log(F instanceof Function);\n' },
  { name: '13',
    category: 'unclassified',
    value: 'var a = [1, 2, 3];\nvar b = [1, 2, 3];\n\nconsole.log(a == b);\n' },
  { name: '4',
    category: 'unclassified',
    value: 'var y = 1;\n\nif (function f(){}) {\n  y += typeof f;\n}\n\nconsole.log(y);\n' },
  { name: '7',
    category: 'unclassified',
    value: 'var a = new Array(1,2),\n    b = new Array(3);\n\nconsole.log(a[0] + b[0]);\n' },
  { name: '6',
    category: 'unclassified',
    value: 'console.log( +"something" );\n' },
  { name: '8',
    category: 'unclassified',
    value: 'var a = (1,5 - 1) * 2;\n\nconsole.log(a);\n' },
  { name: '9',
    category: 'unclassified',
    value: 'for (var key in {1:1, 0:0}) {\n  console.log(key);\n}\n' },
  { name: '400',
    category: 'array',
    value: 'var arr = [];\r\narr[0]  = \'a\';\r\narr[1]  = \'b\';\r\narr.foo = \'c\';\r\nalert(arr.length);\r\n' },
  { name: '500',
    category: 'boolean',
    value: '10 > 9 > 8 === true;\r\n' },
  { name: '501', category: 'boolean', value: 'NaN === NaN;\r\n' },
  { name: '1',
    category: 'hoisting',
    value: 'var foo = 1;\n\nfunction bar() {\n  if ( !foo ) {\n    var foo = 10;\n  }\n\n  console.log(foo);\n}\n\nbar();\n' },
  { name: '3',
    category: 'hoisting',
    value: 'var a = 1;\n\nfunction test() {\n  a = 10;\n\n  return;\n\n  function a() {}\n}\n\ntest();\n\nconsole.log(a);\n' },
  { name: '2',
    category: 'hoisting',
    value: 'function test() {\n  a = 1;\n\n  console.log(a);\n\n  console.log(b);\n\n  console.log(c());\n\n  var a;\n\n  var b = 2;\n\n  function c() {\n    return 3;\n  }\n}\n\ntest();\n' },
  { name: 'two-for-loops',
    category: 'hoisting',
    value: 'var a = [];\n\nfor (var i = 0; i < 10; i++)\n  a.push(function () {\n    console.log(i);\n  })\n\nfor (var j = 0; j < 10; ++j)\n  a[j]()\n' },
  { name: '5',
    category: 'hoisting',
    value: 'console.log(str);\nvar str = "Hello";\n' },
  { name: '200',
    category: 'davidshariff',
    value: 'var foo = function foo() {\r\n  console.log(foo === foo);\r\n};\r\nfoo();\r\n' },
  { name: '201',
    category: 'davidshariff',
    value: 'function aaa() {\r\n  return\r\n  {\r\n    test: 1\r\n  };\r\n}\r\nalert(typeof aaa());\r\n' },
  { name: '202',
    category: 'davidshariff',
    value: 'Number("1") - 1 == 0;\r\n' },
  { name: '203',
    category: 'davidshariff',
    value: '(true + false) > 2 + true;\r\n' },
  { name: '204',
    category: 'davidshariff',
    value: 'function bar() {\r\n  return foo;\r\n  foo = 10;\r\n  function foo() {}\r\n  var foo = \'11\';\r\n}\r\nalert(typeof bar());\r\n' },
  { name: '205',
    category: 'davidshariff',
    value: '"1" - - "1";\r\n' },
  { name: '206',
    category: 'davidshariff',
    value: 'var x = 3;\r\n\r\nvar foo = {\r\n  x: 2,\r\n  baz: {\r\n    x: 1,\r\n    bar: function() {\r\n      return this.x;\r\n    }\r\n  }\r\n}\r\n\r\nvar go = foo.baz.bar;\r\n\r\nalert(go());\r\nalert(foo.baz.bar());\r\n' },
  { name: '207',
    category: 'davidshariff',
    value: 'new String("This is a string") instanceof String;\r\n' },
  { name: '209',
    category: 'davidshariff',
    value: 'new Array(5).toString();\r\n' },
  { name: '208',
    category: 'davidshariff',
    value: '[] + [] + \'foo\'.split(\'\');\r\n' },
  { name: '210',
    category: 'davidshariff',
    value: 'var myArr = [\'foo\', \'bar\', \'baz\'];\r\nmyArr.length = 0;\r\nmyArr.push(\'bin\');\r\nconsole.log(myArr);\r\n' },
  { name: '211',
    category: 'davidshariff',
    value: 'String(\'Hello\') === \'Hello\';\r\n' },
  { name: '212',
    category: 'davidshariff',
    value: 'var x = 0;\r\nfunction foo() {\r\n  x++;\r\n  this.x = x;\r\n  return foo;\r\n}\r\nvar bar = new new foo;\r\nconsole.log(bar.x);\r\n' },
  { name: '213',
    category: 'davidshariff',
    value: 'var bar = 1,\r\n  foo = {};\r\n\r\nfoo: {\r\n  bar: 2;\r\n  baz: ++bar;\r\n};\r\nfoo.baz + foo.bar + bar;\r\n' },
  { name: '214',
    category: 'davidshariff',
    value: 'var myArr = [\'foo\', \'bar\', \'baz\'];\r\nmyArr[2];\r\nconsole.log(\'2\' in myArr);\r\n' },
  { name: '215',
    category: 'davidshariff',
    value: 'function foo(a, b) {\r\n  arguments[1] = 2;\r\n  alert(b);\r\n}\r\nfoo(1);\r\n' },
  { name: '300',
    category: 'instanceof',
    value: '"This is a string" instanceof String;\r\n' },
  { name: '100',
    category: 'perfectionkills',
    value: '(function(){\r\n  return typeof arguments;\r\n})();\r\n' },
  { name: '101',
    category: 'perfectionkills',
    value: 'var f = function g(){ return 23; };\r\ntypeof g();\r\n' },
  { name: '102',
    category: 'perfectionkills',
    value: '(function(x){\r\n  delete x;\r\n  return x;\r\n})(1);\r\n' },
  { name: '103',
    category: 'perfectionkills',
    value: 'var y = 1, x = y = typeof x;\r\nx;\r\n' },
  { name: '104',
    category: 'perfectionkills',
    value: '(function f(f){\r\n  return typeof f();\r\n})(function(){ return 1; });\r\n' },
  { name: '106',
    category: 'perfectionkills',
    value: 'var foo = {\r\n  bar: function(){ return this.baz; },\r\n  baz: 1\r\n}\r\ntypeof (f = foo.bar)();\r\n' },
  { name: '107',
    category: 'perfectionkills',
    value: 'var f = (function f(){ return "1"; }, function g(){ return 2; })();\r\ntypeof f;\r\n' },
  { name: '108',
    category: 'perfectionkills',
    value: 'var x = 1;\r\nif (function f(){}) {\r\n  x += typeof f;\r\n}\r\nx;\r\n' },
  { name: '105',
    category: 'perfectionkills',
    value: 'var foo = {\r\n  bar: function() { return this.baz; },\r\n  baz: 1\r\n};\r\n(function(){\r\n  return typeof arguments[0]();\r\n})(foo.bar);\r\n' },
  { name: '109',
    category: 'perfectionkills',
    value: 'var x = [typeof x, typeof y][1];\r\ntypeof typeof x;\r\n' },
  { name: '110',
    category: 'perfectionkills',
    value: '(function(foo){\r\n  return typeof foo.bar;\r\n})({ foo: { bar: 1 } });\r\n' },
  { name: '111',
    category: 'perfectionkills',
    value: '(function f(){\r\n  function f(){ return 1; }\r\n  return f();\r\n  function f(){ return 2; }\r\n})();\r\n' },
  { name: '112',
    category: 'perfectionkills',
    value: 'function f(){ return f; }\r\nnew f() instanceof f;\r\n' },
  { name: '113',
    category: 'perfectionkills',
    value: 'with (function(x, undefined){}) length;\r\n' } ];

export default questions;
