module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'ember-simple-auth', target: '1.0.1' },
      { name: 'ember-fetch', target: '1.2.2' },
      { name: 'ember-get-config', target: '0.0.2' }
    ]);
  }
};
