import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

const { get, isEmpty } = Ember;

export default BaseAuthorizer.extend({
  tokenAttributeName: 'token',

  init() {
    this._super(...arguments);
    const config = Ember.getOwner(this).resolveRegistration('config:environment')['ember-simple-token'];
    if (config !== undefined) {
      this.tokenAttributeName = config.tokenAttributeName;
    }
  },

  authorize(data, block) {
    const token = get(data, this.tokenAttributeName);
    if (!isEmpty(token)) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
