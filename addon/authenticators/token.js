import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Configuration from '../configuration';

const { get, isEmpty, inject: { service }, RSVP: { resolve, reject } } = Ember;

export default Base.extend({
  ajax: service(),

  init() {
    this._super(...arguments);
    this.serverTokenEndpoint = Configuration.serverTokenEndpoint;
    this.tokenAttributeName = Configuration.tokenAttributeName;
    this.identificationAttributeName = Configuration.identificationAttributeName;
  },

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
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }
});
