import TokenAuthenticator from '../authenticators/token';

export function initialize(application) {
  application.register('authenticator:token', TokenAuthenticator);
  application.inject('route', 'token', 'authenticator:token');
}

export default {
  name: 'simple-token',
  initialize
};
