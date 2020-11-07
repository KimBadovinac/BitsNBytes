'use strict';

/**
 * Module dependencies.
 * */

var jsyaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

/*
 * Export functions and Objects
 */
var config = {
    addConfiguration: _addConfiguration
};

module.exports = config;

/*
 * Implement the functions
 */
function _addConfiguration(uri, encoding) {
    var configString = null;

    if (!uri) {
        throw new Error("Parameter URI is required");
    } else {
        configString = fs.readFileSync(path.join(__dirname, uri), encoding);
    }

    var newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

    for (var c in newConfigurations) {
        this[c] = newConfigurations[c];
    }
}

/*
 * Setup default config location
 */
config.addConfiguration('config.yaml', 'utf8');
