import Ember from 'ember';
import config from 'ember-get-config';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

const { get, isEmpty } = Ember;

export default BaseAuthorizer.extend({
  tokenAttributeName: config['ember-simple-token'].tokenAttributeName || 'token',

  authorize(data, block) {
    const token = get(data, this.tokenAttributeName);
    if (!isEmpty(token)) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
