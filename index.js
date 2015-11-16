/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-simple-token',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-simple-token/register-version.js');
  }
};
