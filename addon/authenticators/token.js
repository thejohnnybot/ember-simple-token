import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { get, isEmpty, inject: { service }, RSVP } = Ember;
const { resolve, reject } = RSVP;

export default BaseAuthenticator.extend({
  ajax: service(),

  serverTokenEndpoint: '/token',

  tokenAttributeName: 'token',

  identificationAttributeName: 'email',

  init() {
    this._super(...arguments);
    const config = Ember.getOwner(this).resolveRegistration('config:environment')['ember-simple-token'];
    if (config !== undefined) {
      this.serverTokenEndpoint = config.serverTokenEndpoint;
      this.tokenAttributeName = config.tokenAttributeName;
      this.identificationAttributeName = config.identificationAttributeName;
    }
  },

  authenticate(data) {
    return get(this, 'ajax').post(this.serverTokenEndpoint, {
      data: JSON.stringify(data)
    }).then((response) => {
      return response.json().then((json) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(json);
        } else {
          return reject(json);
        }
      });
    });
  },

  restore(data) {
    const token = get(data, this.tokenAttributeName);
    if (isEmpty(token)) {
      return reject();
    } else {
      return resolve(data);
    }
  },

  invalidate() {
    return resolve();
  }
});
