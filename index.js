const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

module.exports = {
    new: function(namespace, level, output) {
        return new Logger(namespace, level, output);
    }
};

function Logger(namespace, level, output) {
    this.level = level || 'INFO';
    this.namespace = namespace || '';
    this.output = output || console.log;
    this.outputError = console.error;

    this.debug = function() {
        log('DEBUG', argsToString(arguments));
    };

    this.info = function() {
        log('INFO', argsToString(arguments));
    };

    this.warn = function() {
        log('WARN', argsToString(arguments));
    };

    this.error = function() {
        log('ERROR', argsToString(arguments));
    };

    var self = this;

    function argsToString(messages) {
        var args = Array.prototype.slice.call(messages);
        return args.join(' ');
    }

    function log(level, message) {
        if (levels.indexOf(level) >= levels.indexOf(self.level)) {
            if (typeof message !== 'string') {
                message = JSON.stringify(message);
            }

            var writer = level === 'ERROR' ? self.outputError : self.output;
            writer(`${self.namespace} - ${level}: ${message}`);
        }
    }
}
