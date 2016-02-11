import { module, test } from 'qunit';
import TokenAuthorizer from 'ember-simple-token/authorizers/token';
import config from 'dummy/config/environment';
import sinon from 'sinon';

let server;
let tokenAuthorizer;
let block;

module('Unit | Authorizers | Token', {
  beforeEach() {
    server = sinon.fakeServer.create({
      autoRespond: true
    });
    tokenAuthorizer = TokenAuthorizer.create();
    block = sinon.spy();
  },
  afterEach() {
    server.restore();
    tokenAuthorizer = null;
    block = null;
  }
});

test('#authorize - when data contains token', assert => {
  assert.expect(1);
  const { tokenAttributeName } = tokenAuthorizer;
  const data = {};
  data[tokenAttributeName] = 'footoken';

  tokenAuthorizer.authorize(data, block);
  assert.ok(
    block.calledWith('Authorization', `Bearer ${data[tokenAttributeName]}`),
    'block was called with expected arguments'
  );
});

test('#authorize - when data is empty', assert => {
  assert.expect(1);
  const data = {};

  tokenAuthorizer.authorize(data, block);
  assert.notOk(block.called, 'block was not called');
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

  assert.equal(
    tokenAuthorizer.tokenAttributeName,
    'token',
    'use default value for tokenAttributeName if it\'s empty'
  );
});
