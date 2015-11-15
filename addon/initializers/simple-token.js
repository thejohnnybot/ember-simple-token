import TokenAuthenticator from '../authenticators/token';

export function initialize(application) {
  application.register('authenticator:token', TokenAuthenticator);
}

export default {
  name: 'simple-token',
  initialize
};
