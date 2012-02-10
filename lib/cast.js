(function () {
    'use strict';

    var regexes = {
        base2: /^-?[0-1]+$/,
        base8: /^-?[0-7]+$/,
        base10: /^-?\d+$/,
        base16: /^[A-Za-z0-9]+$/,
        decimal: /^-?(\d*\.)?\d+$/
    };

    function cast(val, type, radix) {
        var dataType = typeof type;

        if (dataType === 'function') {
            return (val instanceof type) ? val : null;
        }

        if (dataType !== 'string') {
            throw 'Second parameter to cast must be a string or a function';
        }

        switch (type.toLowerCase()) {
            case 'boolean':
                dataType = typeof val;
                if (dataType === 'boolean') {
                    return val;
                } else if (val instanceof Boolean) {
                    // just in case they're a bunch of Jokers
                    return val.valueOf();
                } else if (dataType !== 'string') {
                    return null;
                }

                if (val === 'true') {
                    return true;
                } else if (val === 'false') {
                    return false;
                }
                return null;

            case 'integer':
                // call ourselves to figure out what radix should be
                // this covers us if a string is passed in
                radix = parseInt(radix || 10, 10);

                if (!regexes['base' + radix]) {
                    console.warn('Radix \'' + radix + '\' not supported, assuming base10');
                    radix = 10;
                }

                // just in case they're a Joker
                if (val instanceof Number) {
                    val = val.valueOf();
                }

                if (regexes['base' + radix].test(val)) {
                    return parseInt(val, radix);
                }

                return null;

            case 'number':
            case 'float':
                dataType = typeof val;

                if (dataType === 'number') {
                    return val;
                } else if (val instanceof Number) {
                    return val.valueOf();
                }

                if (regexes.decimal.test(val)) {
                    return parseFloat(val);
                }

                return null;

            case 'array':
                if (val instanceof Array) {
                    return val;
                } else if (typeof val === 'string') {
                    try {
                        val = JSON.parse(val);
                        if (val instanceof Array) {
                            return val;
                        }
                    } catch (e) {
                        return null;
                    }
                }

                return null;

            case 'string':
                if (typeof val === 'string') {
                    return val;
                }

                if (typeof val === 'number' || typeof val === 'boolean') {
                    return val.toString();
                }

                return null;
        }

        return null;
    }

    module.exports = cast;
}());
