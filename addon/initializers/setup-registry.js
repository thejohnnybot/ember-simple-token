import TokenAuthenticator from '../authenticators/token';
import TokenAuthorizer from '../authorizers/token';

export default function setupRegistry(application) {
  application.register('authenticator:token', TokenAuthenticator);
  application.register('authorizer:token', TokenAuthorizer);
}
