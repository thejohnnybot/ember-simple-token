import TokenAuthenticator from '../authenticators/token';
import TokenAuthorizer from '../authorizers/token';

export function initialize(application) {
  application.register('authenticator:token', TokenAuthenticator);
  application.register('authorizer:token', TokenAuthorizer);
}

export default {
  name: 'simple-token',
  initialize
};
