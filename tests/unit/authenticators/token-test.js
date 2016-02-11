import { module, test } from 'qunit';
import TokenAuthenticator from 'ember-simple-token/authenticators/token';
import config from 'dummy/config/environment';
import sinon from 'sinon';

let server;
let tokenAuthenticator;

function mockAuthRequest(server, endpoint, status, responseBody, callback) {
  server.respondWith('POST', endpoint, request => {
    // fails in phantomjs for me, but works with this workaround:
    // https://github.com/sinonjs/sinon/issues/864
    request.responseType = 'text';
    request.respond(
      status,
      { 'Content-Type': 'application/json' },
      JSON.stringify(responseBody)
    );
    callback(request);
  });
}

module('Unit | Authenticators | Token', {
  beforeEach() {
    server = sinon.fakeServer.create({
      autoRespond: true
    });
    tokenAuthenticator = TokenAuthenticator.create();
  },
  afterEach() {
    server.restore();
    tokenAuthenticator = null;
  }
});

test('#invalidate', (assert) => {
  assert.expect(1);

  return tokenAuthenticator.invalidate().then(() => {
    assert.ok(true, 'invalidate always resolves');
  });
});

test('#restore - token present in data', assert => {
  assert.expect(1);
  const attributeName = tokenAuthenticator.tokenAttributeName;
  const data = {};
  data[attributeName] = 'authdata';

  return tokenAuthenticator.restore(data).then(callbackData => {
    assert.deepEqual(
      data,
      callbackData
    );
  });
});

test('#restore - data empty', assert => {
  assert.expect(1);
  const data = {};

  return tokenAuthenticator.restore(data).then(() => {
    assert.ok(false, 'promise should not be fullfiled');
  }).catch(() => {
    assert.ok(true, 'promise was rejected');
  });
});

test('#authenticate - valid request', assert => {
  assert.expect(2);
  const endpoint = tokenAuthenticator.serverTokenEndpoint;
  const data = { login: 'foo', pass: 'bar' };
  const responseBody = { 'user_token': 'secret token!' };

  mockAuthRequest(server, endpoint, 201, responseBody, request => {
    const requestBody = JSON.parse(request.requestBody);
    assert.deepEqual(data, requestBody);
  });

  return tokenAuthenticator.authenticate(data).then(callbackData => {
    assert.deepEqual(
      callbackData,
      responseBody,
      'callbackData matches responseBody'
    );
  });
});

test('#authenticate - invalid request', assert => {
  assert.expect(2);
  const endpoint = tokenAuthenticator.serverTokenEndpoint;
  const data = { login: 'foo', pass: 'bar' };
  const responseBody = { error: 'foo error occured!' };

  mockAuthRequest(server, endpoint, 400, responseBody, request => {
    const requestBody = JSON.parse(request.requestBody);
    assert.deepEqual(data, requestBody);
  });

  return tokenAuthenticator.authenticate(data).then(() => {
    assert.ok(false, 'promise should not be fullfiled');
  }).catch(() => {
    assert.ok(true, 'promise was rejected');
  });
});

test('Config attributes are read properly from environment.js', assert => {
  const emberSimpleTokenConf = config['ember-simple-token'];

  assert.deepEqual(
    emberSimpleTokenConf,
    {
      serverTokenEndpoint: 'customEndpoint',
      identificationAttributeName: 'customAttributeName'
    },
    'Dummy apps environment.js has the expected simpleToken config ' +
    'for this test to work'
  );

  const {
    serverTokenEndpoint, identificationAttributeName
  } = emberSimpleTokenConf;

  assert.equal(
    tokenAuthenticator.serverTokenEndpoint,
    serverTokenEndpoint
  );

  assert.equal(
    tokenAuthenticator.tokenAttributeName,
    'token',
    'use default value for tokenAttributeName if it\'s empty'
  );

  assert.equal(
    tokenAuthenticator.identificationAttributeName,
    identificationAttributeName
  );
});
