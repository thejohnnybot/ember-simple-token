module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-simple-auth', target: '1.1.0' }
    ]);
  }
};
