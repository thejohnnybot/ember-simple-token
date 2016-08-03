import Ember from 'ember';

const { getWithDefault } = Ember;

const DEFAULTS = {
  serverTokenEndpoint: '/token',
  tokenAttributeName: 'token',
  identificationAttributeName: 'email'
};

export default {
  serverTokenEndpoint: DEFAULTS.serverTokenEndpoint,

  tokenAttributeName: DEFAULTS.tokenAttributeName,

  identificationAttributeName: DEFAULTS.identificationAttributeName,

  load(config) {
    for (let property in this) {
      if (this.hasOwnProperty(property) && Ember.typeOf(this[property]) !== 'function') {
        this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
};
