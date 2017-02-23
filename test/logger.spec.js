const assert = require('chai').assert;

describe('Logger', function() {
    it('check logger level', function() {
        var logMessage1 = null, logMessage2 = null;

        var loggerModule = require(process.cwd() + '/index');

        var logger1 = loggerModule.new('MOCHA', 'INFO');
        logger1.output = function() {
            logMessage1 = argsToString(arguments);
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

    it('run all log types', function() {
        var loggerModule = require(process.cwd() + '/index');
        var logger = loggerModule.new('MOCHA', 'DEBUG');
        try {
            logger.debug('Test', 'DEBUG', 'log');
            logger.info('Test INFO log');
            logger.warn('Test WARN log');
            logger.error('Test ERROR log');
        } catch (e) {
            assert.isNUll(e);
        }
    });

});
