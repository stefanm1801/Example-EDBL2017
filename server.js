var app = require('./app');

/*
 * Create server to listening requests.
 */
var server = app.listen(configuration.app.port, function() {
    console.log('Server is up and running...');
});z