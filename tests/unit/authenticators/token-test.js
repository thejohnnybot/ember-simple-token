import Ember from 'ember';
import sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let xhr;
let app;
let authenticator;

moduleFor('authenticator:token', {
  needs: ['service:ajax'],

  beforeEach() {
    xhr = sinon.useFakeXMLHttpRequest();
    app = sinon.fakeServer.create({ autoRespond: true });
    authenticator = Ember.getOwner(this).lookup('authenticator:token');
  },

  afterEach() {
    xhr.restore();
  }
});

test('#authenticate resolves with correct data', (assert) => {
  assert.expect(1);

  const credentials = {
    email: 'test@example.com',
    password: 'password'
  };

  const properties = {
    token: 'secret!'
  };

  app.respondWith('POST', '/token', [
    201, {
      'Content-Type': 'application/json'
    },
    '{ "token": "secret!" }'
  ]);

  return authenticator.authenticate(credentials).then((content) => {
    assert.deepEqual(content, properties);
  });
});

test('#restore resolves with the correct data', (assert) => {
  assert.expect(1);

  const properties = {
    token: 'secret!'
  };

  app.respondWith('POST', '/token/', [
    201, {
      'Content-Type': 'application/json'
    },
    '{ "token": "secret!" }'
  ]);

  return authenticator.restore(properties).then((content) => {
    assert.deepEqual(content, properties);
  });
});
