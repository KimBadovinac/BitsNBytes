'use strict';

/**
 * Module dependencies.
 * */

var winston = require('winston');
var config = require('../configurations');

/**
 * Configure here your custom levels.
 * */
var customLevels = {
  levels: {
    error: 7,
    warning: 8,
    custom: 9,
    info: 12,
    debug: 13
  },
  colors: {
    error: 'red',
    warning: 'yellow',
    custom: 'magenta',
    info: 'white',
    debug: 'black'
  }
};

winston.emitErrs = true;
var logger = new winston.Logger({
  levels: customLevels.levels,
  colors: customLevels.colors,
  transports: [
    new winston.transports.File({
      createTree: false,
      level: config.log.level,
      filename: config.log.file,
      handleExceptions: true,
      json: false,
      tailable: true,
      maxsize: config.log.maxSize,
      maxFiles: config.log.maxFiles,
    }),
    new winston.transports.Console({
      level: config.loglevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true
    })
  ],
  exitOnError: false
});

/*
 * Export functions and Objects
 */
module.exports = logger;
