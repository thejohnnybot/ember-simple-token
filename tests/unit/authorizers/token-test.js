import Ember from 'ember';
// import sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let authorizer;
let data;

moduleFor('authorizer:token', {
  beforeEach() {
    authorizer = Ember.getOwner(this).lookup('authorizer:token');
  }
});

test('#authorize', (assert) => {
  data = {
    token: '1981phc8yd0gpcjs'
  };
  authorizer.authorize(data, (headerName, headerValue) => {
    assert.equal(headerName, 'Authorization');
    assert.equal(headerValue, `Bearer ${data.token}`);
  });
});
