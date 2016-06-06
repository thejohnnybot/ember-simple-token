import Ember from 'ember';

const { get, getProperties, inject: { service }, set } = Ember;

export default Ember.Component.extend({
  session: service(),

  actions: {
    authenticate() {
      let credentials = getProperties(this, 'email', 'password');
      get(this, 'session').authenticate('authenticator:token', credentials).catch((reason) => {
        set(this, 'errorMessage', reason.error);
      });
    }
  }
});
