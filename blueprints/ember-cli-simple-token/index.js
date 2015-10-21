module.exports = {
  description: 'ember-simple-token',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall() {
    return this.addBowerPackageToProject('ember-simple-auth', '1.0.0');
  }
};
