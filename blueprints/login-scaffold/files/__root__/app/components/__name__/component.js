import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service(),

  actions: {
    authenticate() {
      let credentials = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:token', credentials).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
