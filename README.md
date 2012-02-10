TL;DR
=====

**Node**

`npm install cast`

**Ender**

`ender add cast`

**Usage**

    var cast = require('cast');
    
    cast('false', 'boolean'); // will return the boolean false

Intro
=====

Types in JavaScript can be unpredictable, and trying to protect against the edge-cases is a headache. Consider the following:

**Booleans**

> true === "true" // makes sense
> false !== "false" // ??
> false === "" // ??
> true === "0" // ?? or any string

**Numbers**

> isNaN(null) // false
> isNaN(undefined) // true

There are many others, but these conditions make it very difficult to write truly high-level code. This module tries to solve this problem.

The main use case is simplification of form validation/user input. A single call to cast will eliminate the need to do extensive type-checking.

Usage
=====

*function cast(val, type[, radix])*

* val- the value to cast (strings are the most useful, but integers and arrays can also make sense)
* type- string or function (anything else will throw an exception)
    * if a function, an `instanceof` will be done internally
    * if a string, acceptable values are: 'array', 'boolean', 'float', 'integer', 'number' (alias for 'float')
* radix- only applies for integers

There are only two possible return values, `null` or something of the type specified by type. Since null cannot be assigned to (as undefined can), this makes complete sense. The first parameter is never modified, so this function truly does no evil.

Examples
--------

**Arrays**

> cast([], 'array'); // returns [] (same reference)
> cast('[]', 'array'); // returns [] (from JSON.parse)

**Booleans**

> cast('true', 'boolean'); // returns true
> cast('false', 'boolean'); // returns false
> cast(true, 'boolean'); // returns true
> cast(false, 'boolean'); // returns false

**Integers**

> cast('10', 'integer'); // returns 10
> cast('10c', 'integer'); // returns null
> cast('10e10', 'integer'); // returns null
> cast(10, 'integer'); // returns 10
> cast('10', 'integer', 8); // returns 8
> cast('10', 'integer', '8'); // returns 8
> cast('10.1', 'integer', 10); // returns null
> cast('10.1', 'integer'); // returns null

**Floats**

> cast('5.25', 'float'); // returns 5.25

**Strings**

> cast(5, 'string'); // returns '5'
> cast(true, 'string'; // returns 'true'
> cast('hello', 'string'); // returns 'hello'
> cast({}, 'string'); // returns null
> cast(undefined, 'string'); // returns null
> cast(null, 'string'); // returns null
> cast([], 'string'); // returns null
