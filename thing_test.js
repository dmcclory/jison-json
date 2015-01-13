
var parser = require('./json').parser;
var assert = require('assert');
var _ = require('underscore');

function exec(input) {
  return parser.parse(input);
}

// list tests
assert(_.isEqual(exec('[]'), []), "'[]' evaluates to an empty list.");
assert(_.isEqual(exec('[1]'), [1]), "'[1]' evaluates to a 1 item list");
assert(_.isEqual(exec('[1, 2]'), [1, 2]), "'[1, 2]' evaluates to a 2 item list");
assert(_.isEqual(exec('[1, 2, 3, 4]'), [1, 2, 3, 4]), "'[1, 2, 3, 4]' evaluates to a 4 item list");

// numeric tests
assert(_.isEqual(exec('2'), 2), "'2' evaluates to 2");
assert(_.isEqual(exec('0'), 0), "'2' evaluates to 2");
assert(_.isEqual(exec('-1'), -1), "'-1' evaluates to -1");
assert(_.isEqual(exec('2.2'), 2.2), "2.2 evaluates to 2.2");
assert(_.isEqual(exec('-2.2'), -2.2), "-2.2 evaluates to -2.2");

// string tests
assert(_.isEqual(exec('"okonomiyaki"'), "okonomiyaki"), "simple strings evaluate to strings");
assert(_.isEqual(exec('"abc123"'), "abc123"), "digits in strings are evaluated as part of the string");
//assert(_.isEqual(exec('"\\"okonomiyaki\\""'), "\"okonomiyaki\""), "strings with escaped double quotes work");

// simple value tests
assert(_.isEqual(exec('false'), false), "'false' evaluates to false");
assert(_.isEqual(exec('true'), true), "'true' evaluates to true");
assert(_.isEqual(exec('null'), null), "'null' evaluates to null");

// object tests
assert(_.isEqual(exec('{}'), {}), "'{}' evaluates to empty object");
assert(_.isEqual(exec('{ "foo": "bar" }'), { foo: "bar" }), "simple objects evaluate to key/value pairs");
assert(_.isEqual(exec('{ "foo" : [1, 2, "four"] }'), { foo: [1, 2, "four"]}), "arrays can be used as values for objects");

assert(_.isEqual(exec('{ "foo" : { "bar" : { "baz" : [1, 2, 3] } } }'), { foo: { bar: { baz: [1, 2, 3] } } }), "objects can be nested arbitrarily deep");
