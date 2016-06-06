import ENV from '../config/environment';
import setupRegistry from 'ember-simple-token/initializers/setup-registry';
import Configuration from 'ember-simple-token/configuration';

export default {
  name: 'ember-simple-token',
  initialize(registry) {
    const config = ENV['ember-simple-token'] || {};
    Configuration.load(config);
    setupRegistry(registry);
  }
}
