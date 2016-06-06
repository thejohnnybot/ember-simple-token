import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';
import Configuration from '../configuration';

const { get, isEmpty } = Ember;

export default Base.extend({
  tokenAttributeName: Configuration.tokenAttributeName,

  authorize(data, block) {
    const token = get(data, this.tokenAttributeName);
    if (!isEmpty(token)) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
