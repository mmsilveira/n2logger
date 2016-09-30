const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

module.exports = {
    new: function (namespace, level, output) {
        return new Logger(namespace, level, output);
    }
};

function Logger(namespace, level, output) {
    this.level = level || 'INFO';
    this.namespace = namespace || '';
    this.output = output || console.log;
    this.outputError = console.error;
    this.debug = function(message) {
        log('DEBUG', message);
    };

    this.info = function(message) {
        log('INFO', message);
    };

    this.error = function(message) {
        log('ERROR', message);
    };

    this.warn = function(message) {
        log('WARN', message);
    };

    var self = this;

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
