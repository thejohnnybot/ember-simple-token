module.exports = {
  description: 'ember-simple-token',
  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-simple-auth', target: '1.0.1' },
      { name: 'ember-fetch', target: '1.2.2' }
    ]);
  }
};
