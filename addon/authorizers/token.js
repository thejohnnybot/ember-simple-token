import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

export default BaseAuthorizer.extend({
  authorize({ token }, block) {
    block('Authorization', `Bearer ${token}`);
  }
});
