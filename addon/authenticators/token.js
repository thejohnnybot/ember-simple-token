import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Configuration from '../configuration';

const { get, isEmpty, inject: { service }, RSVP: { resolve, reject } } = Ember;

export default Base.extend({
  ajax: service(),

  serverTokenEndpoint: Configuration.serverTokenEndpoint,

  tokenAttributeName: Configuration.tokenAttributeName,

  identificationAttributeName: Configuration.identificationAttributeName,

  restore(data) {
    const token = get(data, this.tokenAttributeName);
    if (!isEmpty(token)) {
      return resolve(data);
    } else {
      return reject();
    }
  },

  authenticate(data) {
    return get(this, 'ajax').post(this.serverTokenEndpoint, {
      data: JSON.stringify(data)
    }).then((response) => {
      return resolve(response);
    }).catch((error) => {
      Ember.Logger.warn(error);
      return reject();
    });
  }
});
