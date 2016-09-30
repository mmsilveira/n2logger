const assert = require('chai').assert;

describe('Logger', function() {
    it('check logger level', function() {
        var logMessage1 = null, logMessage2 = null;

        var loggerModule = require(process.cwd() + '/index');
        var logger1 = loggerModule.new('MOCHA', 'INFO');
        logger1.output = function(message) {
            logMessage1 = message;
        };

        var logger2 = loggerModule.new('MOCHA', 'DEBUG');
        logger2.output = function(message) {
            logMessage2 = message;
        };

        logger1.debug('Test Message');
        logger2.debug('Test Message');

        assert.equal(logMessage1, null);
        assert.equal(logMessage2, 'MOCHA - DEBUG: Test Message');
    });

});
