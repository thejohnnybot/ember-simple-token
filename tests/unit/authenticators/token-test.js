import Ember from 'ember';
import sinon from 'sinon';
import Token from 'simple-token/authenticators/token';
import { module, test } from 'qunit';

let xhr;
let app;
let authenticator;

module('Unit | Authenticators | Token ', {
  beforeEach() {
    xhr = sinon.useFakeXMLHttpRequest();
    app = sinon.fakeServer.create({ autoRespond: true });
    authenticator = Token.create();
  },

  afterEach() {
    xhr.restore();
  }
});

test('#authenticate resolves with correct data', (assert) => {
  const credentials = {
    email: 'test@example.com',
    password: 'password'
  };

  const properties = {
    token: 'secret!'
  };

  app.respondWith('POST', '/token/', [
    201, {
      'Content-Type': 'application/json'
    },
    '{ "token": "secret!" }'
  ]);

  Ember.run(() => {
    authenticator.authenticate(credentials).then((content) => {
      assert.deepEqual(content, properties);
    });
  });
});

test('#restore resolves with the correct data', (assert) => {
  const properties = {
    token: 'secret!'
  };

  app.respondWith('POST', '/token/', [
    201, {
      'Content-Type': 'application/json'
    },
    '{ "token": "secret!" }'
  ]);

  Ember.run(() => {
    authenticator.restore(properties).then((content) => {
      assert.deepEqual(content, properties);
    });
  });
});
