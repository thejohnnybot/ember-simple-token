# ember-simple-token

This README outlines the details of collaborating on this Ember addon.

## Installation

`ember install ember-simple-token`


### Code to put in your component

```javascript
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
```

### Code for the template

```html
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

### Ember-Data usage

```javascript
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:token'
});
```
### Change Configuration

```javascript
ENV['ember-simple-token'] = {
  serverTokenEndpoint: "/another-token",
  identificationAttributeName: "email"
};
```

### Generators
`ember g login-scaffold <name>`

Will generate all the code seen above in pod structure in a component

### TODO:
- [] Test
