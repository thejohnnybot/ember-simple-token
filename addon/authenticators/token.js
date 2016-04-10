import Ember from 'ember';
import fetch from 'fetch';
import config from 'ember-get-config';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { get, isEmpty, RSVP } = Ember;
const { resolve, reject } = RSVP;

export default BaseAuthenticator.extend({
  serverTokenEndpoint: config['ember-simple-token'].serverTokenEndpoint || '/token',

  tokenAttributeName: config['ember-simple-token'].tokenAttributeName || 'token',

  identificationAttributeName: config['ember-simple-token'].identificationAttributeName || 'email',

  authenticate(data) {
    return fetch(this.serverTokenEndpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
