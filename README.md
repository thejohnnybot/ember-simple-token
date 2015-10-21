# ember-simple-token

This README outlines the details of collaborating on this Ember addon.

## Installation

`ember install ember-simple-token`


### Code to put in your component

```
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
});```

### Code for the template

```
<form {{action 'authenticate' on='submit'}}>
  <div class="form-group">
    <label for="identification">Login</label>
    {{input value=identification placeholder='Enter Login' class='form-control'}}
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    {{input value=password placeholder='Enter Password' class='form-control' type='password'}}
  </div>
  <button type="submit" class="btn btn-default">Login</button>
</form>
```

### TODO:
- [] Test
