import ENV from '../config/environment';
import setupRegistry from 'simple-token/initializers/setup-registry';
import Configuration from 'simple-token/configuration';

export default {
  name: 'simple-token',
  initialize(registry) {
    const config = ENV['simple-auth'] || {};
    Configuration.load(config);
    setupRegistry(registry);
  }
}
