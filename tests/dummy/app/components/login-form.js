import Ember from 'ember';
import layout from '../templates/components/login-form';

const { service } = Ember.inject;

export default Ember.Component.extend({
  layout: layout,

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
