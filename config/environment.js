/*jshint node:true*/
'use strict';

module.exports = function(environment, appConfig) {
  appConfig['ember-simple-token'] = {
    serverTokenEndpoint: 'token',
    identificationAttributeName: 'email'
  };
  return { };
};
