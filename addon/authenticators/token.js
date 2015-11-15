import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';
import fetch from 'fetch';

const { get, isEmpty, RSVP } = Ember;

export default BaseAuthenticator.extend({

  serverTokenEndpoint: '/token',

  tokenAttributeName: 'token',

  identificationAttributeName: 'email',

  authenticate(credentials) {
    return fetch(this.serverTokenEndpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((response) => {
      return response.json();
    });
  },

  restore(data) {
    const { tokenAttributeName, identificationAttributeName } = this.getProperties('tokenAttributeName', 'identificationAttributeName');
    const tokenAttribute = get(data, tokenAttributeName);
    const identificationAttribute = get(data, identificationAttributeName);
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  invalidate() {
    return RSVP.resolve();
  }

});
