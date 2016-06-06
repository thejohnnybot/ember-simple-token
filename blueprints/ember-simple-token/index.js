/*jshint node:true*/
module.exports = {
  description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-simple-auth', target: '1.1.0' }
    ]);
  }
};
