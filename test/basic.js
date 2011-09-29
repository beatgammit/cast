(function () {
    'use strict';

    var cast = require('../lib/cast'),
        fail = false,
        tests = [
            // array tests
            {
                args: [[], 'array'],
                expected: []
            },
            {
                args: [0, 'array'],
                expected: null
            },
            {
                args: ['cheese', 'array'],
                expected: null
            },
            {
                args: ['[]', 'array'],
                expected: []
            },
            // boolean tests
            {
                args: [true, 'boolean'],
                expected: true
            },
            {
                args: [false, 'boolean'],
                expected: false
            },
            {
                args: ['true', 'boolean'],
                expected: true
            },
            {
                args: ['false', 'boolean'],
                expected: false
            },
            {
                args: ['cheese', 'boolean'],
                expected: null
            },
            {
                args: ['', 'boolean'],
                expected: null
            },
            {
                args: [0, 'boolean'],
                expected: null
            },
            {
                args: [1, 'boolean'],
                expected: null
            },
            // float tests
            {
                args: [0, 'float'],
                expected: 0
            },
            {
                args: [0.1, 'float'],
                expected: 0.1
            },
            {
                args: [1.1, 'float'],
                expected: 1.1
            },
            {
                args: ['0', 'float'],
                expected: 0
            },
            {
                args: ['.1', 'float'],
                expected: 0.1
            },
            {
                args: ['0.1', 'float'],
                expected: 0.1
            },
            {
                args: ['1.1', 'float'],
                expected: 1.1
            },
            {
                args: ['1.1e6', 'float'],
                expected: null
            },
            {
                args: ['cheese', 'float'],
                expected: null
            },
            // number tests
            {
                args: [0, 'number'],
                expected: 0
            },
            {
                args: ['0', 'number'],
                expected: 0
            },
            {
                args: ['00', 'number'],
                expected: 0
            },
            {
                args: ['10', 'number'],
                expected: 10
            },
            {
                args: ['10', 'number', 2],
                expected: 2
            },
            {
                args: ['10', 'number', 16],
                expected: 16
            },
            {
                args: ['10', 'number', 10],
                expected: 10
            },
            {
                args: ['10', 'number', 'cheese'],
                expected: 10
            },
            {
                args: ['cheese', 'number'],
                expected: null
            },
            {
                args: ['10e6', 'number'],
                expected: null
            }
        ];

    tests.forEach(function (testCase, i) {
        var res,
            tFail = false;

        console.log('Test case:', i);
        console.log('Args:', testCase.args);
        console.log('Expected:', testCase.expected);
        console.log();
        console.log();

        res = cast.apply(this, testCase.args);

        if (res !== testCase.expected) {
            if (testCase.expected instanceof Array && res instanceof Array) {
                while (res.length) {
                    if (res.pop() !== testCase.pop()) {
                        console.error('Case failed:', i);
                        tFail = true;
                        fail = true;
                        break;
                    }
                }

                if (!tFail && (res.length || testCase.length)) {
                    console.error('Case failed:', i);
                    fail = true;
                }
            } else {
                console.error('Case failed:', i);
                fail = true;
            }
        }
    });

    if (fail) {
        console.error('At least one test failed =\'(');
        process.exit(1);
    } else {
        console.log('All tests passed!');
    }
}());