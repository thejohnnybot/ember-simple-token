module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-simple-auth', target: '1.0.1' },
      { name: 'ember-fetch', target: '1.2.2' }
    ]);
  }
};
